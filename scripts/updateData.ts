/**
 * Update dashboard data from Eurostat API (JSON-stat).
 * Run: npm run update-data
 *
 * - Fetches from Eurostat dissemination API
 * - Saves raw responses to /data/raw
 * - Normalizes to { year, value }[] and saves to /data
 */

import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, '..', 'data');
const RAW_DIR = path.join(DATA_DIR, 'raw');
const BASE = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data';
const PARAMS = 'format=JSON&lang=EN&geo=IT&sinceTimePeriod=2000';

interface DataPoint {
  year: number;
  value: number;
}

/** Eurostat dataset code + optional dimension filters (suffix to PARAMS). */
const DATASETS: Record<string, string> = {
  employment: 'LFSI_EMP_A',
  inflation: 'PRC_HICP_AIND',
  poverty: 'ILC_LI02',
  consumption: 'NAMA_10_CO3_P3',
  income: 'NAMA_10_GDP',
  wages: 'NAMA_10_GDP',
};

/** Extra query params. Avoid filters that empty a dimension (API returns empty category). */
const EXTRA_PARAMS: Record<string, string> = {
  employment: '&age=Y15-64&sex=T&unit=PC_POP',
  inflation: '&coicop=CP00',
  poverty: '&age=Y_GE16&unit=PC&sex=T',
  consumption: '',
  income: '',
  wages: '',
};

/** For datasets with multiple series, take only these dimension=code. */
const SLICE: Partial<Record<string, { dimension: string; code: string }[]>> = {
  employment: [{ dimension: 'indic_em', code: 'EMP_L' }],
  inflation: [{ dimension: 'unit', code: 'RTCH_A_AVG' }],
  income: [
    { dimension: 'na_item', code: 'B1GM' },
    { dimension: 'unit', code: 'CLV_I10' },
  ],
  consumption: [
    { dimension: 'unit', code: 'CLV05_MN' },
    { dimension: 'coicop', code: 'TOTAL' },
  ],
  wages: [
    { dimension: 'na_item', code: 'D1' },
    { dimension: 'unit', code: 'CLV05_MN' },
  ],
};

interface JsonStatDimension {
  category: {
    index: Record<string, number>;
    label?: Record<string, string>;
  };
}

interface JsonStatResponse {
  id?: string[];
  size?: number[];
  dimension?: Record<string, JsonStatDimension>;
  value?: (number | null)[] | Record<string, number>;
}

function ensureDirs(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });
}

/** Convert linear index to dimension positions (row-major: first dim slowest). */
function indexToPositions(index: number, sizes: number[]): number[] {
  const positions: number[] = [];
  let remaining = index;
  for (let d = sizes.length - 1; d >= 0; d--) {
    positions[d] = remaining % sizes[d];
    remaining = Math.floor(remaining / sizes[d]);
  }
  return positions;
}

/** Parse Eurostat JSON-stat and extract (year, value) for geo=IT. Optional slices: only keep series where each dimension = code. */
function parseJsonStat(
  raw: unknown,
  slices?: { dimension: string; code: string }[]
): DataPoint[] {
  const data = raw as JsonStatResponse;
  const ids = data.id;
  const sizes = data.size;
  const dimensions = data.dimension;
  const valuePayload = data.value;
  if (!ids || !sizes || !dimensions || (valuePayload !== undefined && typeof valuePayload !== 'object')) return [];

  const timeIdx = ids.indexOf('time');
  const geoIdx = ids.indexOf('geo');
  if (timeIdx === -1 || geoIdx === -1) return [];

  const timeDim = dimensions.time;
  const geoDim = dimensions.geo;
  if (!timeDim?.category?.index || !geoDim?.category?.index) return [];

  const timeCodes: string[] = [];
  for (const [code, pos] of Object.entries(timeDim.category.index)) {
    timeCodes[pos] = code;
  }
  const geoCodeToPos = geoDim.category.index;
  const itPos = geoCodeToPos['IT'];
  if (itPos === undefined) return [];

  const sliceFilters: { dimIdx: number; pos: number }[] = [];
  if (slices) {
    for (const s of slices) {
      const dimIdx = ids.indexOf(s.dimension);
      if (dimIdx !== -1 && dimensions[s.dimension]?.category?.index) {
        const p = dimensions[s.dimension].category.index[s.code];
        if (p !== undefined) sliceFilters.push({ dimIdx, pos: p });
      }
    }
  }

  const entries: [number, number][] = [];
  if (Array.isArray(valuePayload)) {
    valuePayload.forEach((val, i) => {
      if (val != null && !Number.isNaN(Number(val))) entries.push([i, Number(val)]);
    });
  } else if (valuePayload && typeof valuePayload === 'object' && !Array.isArray(valuePayload)) {
    for (const [idxStr, val] of Object.entries(valuePayload)) {
      const i = parseInt(idxStr, 10);
      if (Number.isNaN(i) || val == null || Number.isNaN(Number(val))) continue;
      entries.push([i, Number(val)]);
    }
  }

  const totalSize = sizes.reduce((a, b) => a * b, 1);
  const out: DataPoint[] = [];

  for (const [i, val] of entries) {
    if (i >= totalSize) continue;
    const positions = indexToPositions(i, sizes);
    if (positions[geoIdx] !== itPos) continue;
    if (sliceFilters.length > 0 && !sliceFilters.every((f) => positions[f.dimIdx] === f.pos)) continue;
    const timeCode = timeCodes[positions[timeIdx]];
    if (!timeCode) continue;
    const year = parseInt(timeCode, 10);
    if (Number.isInteger(year) && year >= 2000) {
      out.push({ year, value: val });
    }
  }

  return out.sort((a, b) => a.year - b.year);
}

/** Deduplicate by year: keep one value per year (e.g. employment rate vs activity rate; inflation rate vs index). */
function dedupeByYear(
  points: DataPoint[],
  hint: 'employment' | 'inflation' | 'poverty'
): DataPoint[] {
  const byYear = new Map<number, number[]>();
  for (const p of points) {
    const arr = byYear.get(p.year) ?? [];
    arr.push(p.value);
    byYear.set(p.year, arr);
  }
  const out: DataPoint[] = [];
  for (const [year, vals] of Array.from(byYear.entries())) {
    let v: number;
    if (hint === 'employment') {
      v = vals.find((x: number) => x >= 50 && x <= 75) ?? vals[0];
    } else if (hint === 'inflation') {
      v = vals.find((x: number) => x >= -2 && x <= 20) ?? vals[0];
    } else {
      v = vals.find((x: number) => x >= 5 && x <= 35) ?? vals[0];
    }
    out.push({ year, value: v });
  }
  return out.sort((a, b) => a.year - b.year);
}

/** One value per year for index-like series (50–200 around base 100); drop outliers in millions. */
function dedupeByYearIndex(points: DataPoint[]): DataPoint[] {
  const byYear = new Map<number, number[]>();
  for (const p of points) {
    const arr = byYear.get(p.year) ?? [];
    arr.push(p.value);
    byYear.set(p.year, arr);
  }
  const out: DataPoint[] = [];
  for (const [year, vals] of Array.from(byYear.entries())) {
    const inRange = vals.filter((x: number) => x >= 50 && x <= 200);
    const v = inRange.length > 0 ? inRange[0] : vals[0];
    out.push({ year, value: Math.round(v * 100) / 100 });
  }
  return out.sort((a, b) => a.year - b.year);
}

/** Normalize consumption/income/wages to index 2000=100 if values are large (e.g. millions). */
function toIndex2000(points: DataPoint[]): DataPoint[] {
  const base = points.find((p) => p.year === 2000);
  if (!base || base.value === 0) return points;
  return points.map((p) => ({ year: p.year, value: Math.round((p.value / base.value) * 100 * 100) / 100 }));
}

async function fetchDataset(name: string): Promise<void> {
  const datasetCode = DATASETS[name];
  const extra = EXTRA_PARAMS[name] ?? '';
  const url = `${BASE}/${datasetCode}?${PARAMS}${extra}`;
  const rawPath = path.join(RAW_DIR, `${name}.json`);
  const outPath = path.join(DATA_DIR, `${name}.json`);

  try {
    process.stdout.write(`Fetching ${name} (${datasetCode})... `);
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const text = await res.text();
    fs.writeFileSync(rawPath, text, 'utf8');

    let parsed: unknown;
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      process.stdout.write('(response not JSON)\n');
      return;
    }

    const slice = SLICE[name];
    let normalized = parseJsonStat(parsed, slice);
    if (normalized.length === 0) {
      process.stdout.write('no series extracted; leaving existing file unchanged.\n');
      return;
    }

    if (name === 'employment' || name === 'inflation' || name === 'poverty') {
      normalized = dedupeByYear(normalized, name);
    }

    const toSave =
      name === 'consumption' || name === 'income' || name === 'wages'
        ? dedupeByYearIndex(toIndex2000(normalized))
        : normalized;

    fs.writeFileSync(outPath, JSON.stringify(toSave, null, 2), 'utf8');
    process.stdout.write(`${toSave.length} points → ${name}.json\n`);
  } catch (err) {
    process.stderr.write(`Error ${name}: ${err instanceof Error ? err.message : String(err)}\n`);
  }
}

async function main(): Promise<void> {
  ensureDirs();
  console.log('Data directories ready.');
  console.log('Updating datasets from Eurostat API...\n');

  for (const name of Object.keys(DATASETS)) {
    await fetchDataset(name);
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log('\nDone.');
}

main();
