/**
 * Update dashboard data from ISTAT SDMX (placeholder endpoints).
 * Run: npm run update-data
 *
 * - Fetches from configured URLs
 * - Saves raw responses to /data/raw
 * - Normalizes to standard schema and saves to /data
 */

import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(__dirname, '..', 'data');
const RAW_DIR = path.join(DATA_DIR, 'raw');

interface DataPoint {
  year: number;
  value: number;
}

/** Placeholder ISTAT SDMX-style endpoints. Replace with real flow IDs when available. */
const ENDPOINTS: Record<string, string> = {
  income:
    'https://esploradati.istat.it/SDMXWS/rest/data/22_289/',
  wages:
    'https://esploradati.istat.it/SDMXWS/rest/data/22_289/',
  inflation:
    'https://esploradati.istat.it/SDMXWS/rest/data/22_289/',
  employment:
    'https://esploradati.istat.it/SDMXWS/rest/data/22_289/',
  consumption:
    'https://esploradati.istat.it/SDMXWS/rest/data/22_289/',
  poverty:
    'https://esploradati.istat.it/SDMXWS/rest/data/22_289/',
};

function ensureDirs(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });
}

function normalizeToSchema(raw: unknown): DataPoint[] {
  if (Array.isArray(raw)) {
    const out: DataPoint[] = [];
    for (const item of raw) {
      if (item && typeof item === 'object' && 'year' in item && 'value' in item) {
        const year = Number((item as { year: unknown }).year);
        const value = Number((item as { value: unknown }).value);
        if (Number.isInteger(year) && !Number.isNaN(value)) {
          out.push({ year, value });
        }
      }
    }
    return out.sort((a, b) => a.year - b.year);
  }
  return [];
}

async function fetchDataset(name: string, url: string): Promise<void> {
  const rawPath = path.join(RAW_DIR, `${name}.json`);
  const outPath = path.join(DATA_DIR, `${name}.json`);

  try {
    process.stdout.write(`Fetching ${name}... `);
    const res = await fetch(url, { headers: { Accept: 'application/json' } });

    const text = await res.text();
    fs.writeFileSync(rawPath, text, 'utf8');
    process.stdout.write('raw saved. ');

    let parsed: unknown;
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      process.stdout.write('(response not JSON, skipping normalize)\n');
      return;
    }

    const normalized = normalizeToSchema(parsed);
    if (normalized.length === 0) {
      process.stdout.write('no array data to normalize; leaving existing file unchanged.\n');
      return;
    }

    fs.writeFileSync(outPath, JSON.stringify(normalized, null, 2), 'utf8');
    process.stdout.write(`normalized ${normalized.length} points → ${name}.json\n`);
  } catch (err) {
    process.stderr.write(`Error ${name}: ${err instanceof Error ? err.message : String(err)}\n`);
  }
}

async function main(): Promise<void> {
  ensureDirs();
  console.log('Data directories ready.');
  console.log('Updating datasets from placeholder ISTAT SDMX endpoints...\n');

  for (const [name, url] of Object.entries(ENDPOINTS)) {
    await fetchDataset(name, url);
  }

  console.log('\nDone.');
}

main();
