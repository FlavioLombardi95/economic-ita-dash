'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DataPoint } from '@/lib/types';
import { HighlightedReferenceLines } from './HighlightedReferenceLines';

interface LineChartProps {
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  unit?: string;
  /** Anno base per indici (es. 2000). Mostra legenda "100 = livello 2000" e tooltip in % */
  indexBaseYear?: number;
}

function formatIndexTooltip(value: number, baseYear: number): string {
  const pct = Math.round(value - 100);
  if (pct === 0) return `stesso livello del ${baseYear}`;
  if (pct > 0) return `circa +${pct}% rispetto al ${baseYear}`;
  return `circa ${pct}% rispetto al ${baseYear}`;
}

/** Calcola dominio Y stretto sul range dei dati per far risaltare le variazioni */
function computeYDomain(values: number[], paddingRatio = 0.08): [number, number] {
  if (values.length === 0) return [0, 100];
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal;
  const padding = range > 0 ? Math.max(range * paddingRatio, range * 0.02) : Math.abs(minVal) * 0.05 || 1;
  return [minVal - padding, maxVal + padding];
}

export function LineChart({
  data,
  dataKey = 'value',
  color = '#2563eb',
  unit = '',
  indexBaseYear,
}: LineChartProps): JSX.Element {
  const chartData = data.map((d) => ({ ...d, [dataKey]: d.value }));
  const isIndex = indexBaseYear != null;
  const values = data.map((d) => d.value);
  const yDomain = computeYDomain(values);

  return (
    <div className="w-full">
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              type="number"
              domain={['dataMin', 'dataMax']}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={yDomain}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(v: number) => {
                const n = Number(v);
                const rounded = Number.isInteger(n) ? n : Math.round(n);
                return unit && !isIndex ? `${rounded}${unit}` : String(rounded);
              }}
              label={
                isIndex
                  ? {
                      value: `Livello (${indexBaseYear} = 100)`,
                      angle: -90,
                      position: 'insideLeft',
                      style: { fill: '#64748b', fontSize: 11 },
                    }
                  : undefined
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
              labelFormatter={(year) => `Anno ${year}`}
              formatter={(value: number) => {
                const rounded = typeof value === 'number' ? Math.round(value) : value;
                if (isIndex && typeof value === 'number') {
                  const read = formatIndexTooltip(value, indexBaseYear);
                  return [`${rounded} — ${read}`, 'Valore'];
                }
                return [
                  unit ? `${rounded} ${unit}`.trim() : String(rounded),
                  'Valore',
                ];
              }}
            />
            <HighlightedReferenceLines />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 2, fill: color }}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      {isIndex && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400" aria-hidden>
          <strong>Come leggere il grafico:</strong> 100 = stesso potere d’acquisto del {indexBaseYear}. Sopra 100 = crescita; sotto 100 = calo.
        </p>
      )}
    </div>
  );
}
