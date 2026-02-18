'use client';

import { useEffect, useState } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import type { DataPoint } from '@/lib/types';

interface InflationWagesComparisonChartProps {
  inflationData: DataPoint[];
  wagesData: DataPoint[];
}

/** Crescita % anno su anno a partire dall'indice salari */
function wageGrowthSeries(wages: DataPoint[]): { year: number; crescitaSalari: number }[] {
  const out: { year: number; crescitaSalari: number }[] = [];
  for (let i = 1; i < wages.length; i++) {
    const prev = wages[i - 1].value;
    const curr = wages[i].value;
    const pct = prev !== 0 ? ((curr - prev) / prev) * 100 : 0;
    out.push({ year: wages[i].year, crescitaSalari: Math.round(pct * 10) / 10 });
  }
  return out;
}

function mergeSeries(
  inflation: DataPoint[],
  wageGrowth: { year: number; crescitaSalari: number }[]
): { year: number; inflazione: number; crescitaSalari: number }[] {
  const byYear = new Map(inflation.map((d) => [d.year, d.value]));
  return wageGrowth
    .filter((w) => byYear.has(w.year))
    .map((w) => ({
      year: w.year,
      inflazione: byYear.get(w.year) ?? 0,
      crescitaSalari: w.crescitaSalari,
    }));
}

const CHART_HEIGHT = 320;

export function InflationWagesComparisonChart({
  inflationData,
  wagesData,
}: InflationWagesComparisonChartProps): JSX.Element {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const wageGrowth = wageGrowthSeries(wagesData);
  const merged = mergeSeries(inflationData, wageGrowth);
  const allValues = merged.flatMap((d) => [d.inflazione, d.crescitaSalari]);
  const minVal = Math.min(...allValues, 0);
  const maxVal = Math.max(...allValues, 0);
  const padding = Math.max((maxVal - minVal) * 0.1, 0.5);
  const yDomain: [number, number] = [minVal - padding, maxVal + padding];

  if (!mounted) {
    return (
      <div className="flex h-[320px] w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        Caricamento grafico…
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="h-[320px] w-full" style={{ minHeight: CHART_HEIGHT }}>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <RechartsLineChart
            data={merged}
            margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              type="number"
              domain={['dataMin', 'dataMax']}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={yDomain}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(v) => `${Math.round(v)}%`}
              width={40}
              label={{
                value: 'Variazione % (anno su anno)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#64748b', fontSize: 10 },
              }}
            />
            <ReferenceLine
              y={0}
              stroke="#64748b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{ value: 'Stabile', position: 'right', fill: '#64748b', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: 14,
              }}
              labelFormatter={(year) => `Anno ${year}`}
              formatter={(value: number, name: string) => [
                `${Number(value).toFixed(1)}%`,
                name === 'inflazione' ? 'Inflazione' : 'Crescita salari',
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) =>
                value === 'inflazione' ? 'Inflazione (% prezzi)' : 'Crescita % salari reali'
              }
            />
            <Line
              type="monotone"
              dataKey="inflazione"
              name="inflazione"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 2, fill: '#2563eb' }}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="crescitaSalari"
              name="crescitaSalari"
              stroke="#059669"
              strokeWidth={2}
              dot={{ r: 2, fill: '#059669' }}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400" aria-hidden>
        <strong>Come leggere:</strong> Quando la linea blu (inflazione) è sopra la linea verde
        (crescita salari), i prezzi aumentano più degli stipendi: il potere d&apos;acquisto si
        erode e in media si diventa più poveri.
      </p>
    </div>
  );
}
