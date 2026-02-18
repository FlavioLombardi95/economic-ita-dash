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
} from 'recharts';
import type { DataPoint } from '@/lib/types';

export type ChartVariant = 'index' | 'percent' | 'inflation';

interface LineChartProps {
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  unit?: string;
  /** Anno base per indici (es. 2000). Mostra "100 = livello 2000" */
  indexBaseYear?: number;
  /** Tipo di grafico: assi e legenda adattati (indice, %, inflazione anno su anno) */
  chartVariant?: ChartVariant;
  /** Linea orizzontale "punto di partenza": indice = 100, inflazione = 0, percentuale = valore anno 2000 */
  baselineValue?: number;
}

function formatIndexTooltip(value: number, baseYear: number): string {
  const pct = Math.round(value - 100);
  if (pct === 0) return `stesso livello del ${baseYear}`;
  if (pct > 0) return `circa +${pct}% rispetto al ${baseYear}`;
  return `circa ${pct}% rispetto al ${baseYear}`;
}

/** Calcola dominio Y che includa il baseline e i dati, con padding */
function computeYDomain(
  values: number[],
  baseline: number | undefined,
  paddingRatio = 0.08
): [number, number] {
  if (values.length === 0) {
    const b = baseline ?? 100;
    return [Math.min(0, b - 10), Math.max(100, b + 10)];
  }
  const all = baseline != null ? [...values, baseline] : values;
  const minVal = Math.min(...all);
  const maxVal = Math.max(...all);
  const range = maxVal - minVal || 1;
  const padding = Math.max(range * paddingRatio, range * 0.02);
  return [minVal - padding, maxVal + padding];
}

const CHART_HEIGHT = 320;

const Y_AXIS_CONFIG: Record<
  ChartVariant,
  { label: string; tickFormatter: (v: number) => string; helpText: string }
> = {
  index: {
    label: 'Livello (anno 2000 = 100)',
    tickFormatter: (v) => String(Math.round(v)),
    helpText: 'Sopra 100 = situazione migliore del 2000; sotto 100 = peggiore.',
  },
  percent: {
    label: 'Percentuale (%)',
    tickFormatter: (v) => `${Math.round(v)}%`,
    helpText: 'È la percentuale sulla popolazione di riferimento (es. occupati su 15-64 anni).',
  },
  inflation: {
    label: 'Variazione % prezzi (anno su anno)',
    tickFormatter: (v) => `${Math.round(v)}%`,
    helpText: 'Quanto sono aumentati i prezzi in un anno rispetto all’anno prima. 0% = prezzi stabili.',
  },
};

export function LineChart({
  data,
  dataKey = 'value',
  color = '#2563eb',
  unit = '',
  indexBaseYear,
  chartVariant = indexBaseYear != null ? 'index' : unit === '%' ? 'percent' : 'percent',
  baselineValue,
}: LineChartProps): JSX.Element {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isIndex = indexBaseYear != null;
  const variant: ChartVariant =
    chartVariant ?? (isIndex ? 'index' : unit === '%' ? 'inflation' : 'percent');
  const effectiveBaseline: number | undefined =
    baselineValue ?? (isIndex ? 100 : variant === 'inflation' ? 0 : undefined);

  const chartData = data.map((d) => ({ ...d, [dataKey]: d.value }));
  const values = data.map((d) => d.value);
  const yDomain = computeYDomain(values, effectiveBaseline);

  const config = Y_AXIS_CONFIG[variant];

  if (!mounted) {
    return (
      <div className="w-full" style={{ minHeight: CHART_HEIGHT }}>
        <div className="flex h-[320px] items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Caricamento grafico…
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="h-[320px] w-full min-h-[280px] sm:min-h-0" style={{ minHeight: CHART_HEIGHT }}>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <RechartsLineChart
            data={chartData}
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
              tickFormatter={config.tickFormatter}
              width={variant === 'index' ? 44 : 40}
              label={{
                value: config.label,
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#64748b', fontSize: 10 },
              }}
            />
            {effectiveBaseline != null && (
              <ReferenceLine
                y={effectiveBaseline}
                stroke="#64748b"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: variant === 'index' ? `Anno ${indexBaseYear ?? 2000}` : 'Riferimento',
                  position: 'right',
                  fill: '#64748b',
                  fontSize: 10,
                }}
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: 14,
              }}
              labelFormatter={(year) => `Anno ${year}`}
              formatter={(value: number) => {
                const rounded = typeof value === 'number' ? Math.round(value) : value;
                if (isIndex && typeof value === 'number' && indexBaseYear != null) {
                  const read = formatIndexTooltip(value, indexBaseYear);
                  return [`${rounded} — ${read}`, 'Valore'];
                }
                return [
                  unit ? `${rounded} ${unit}`.trim() : String(rounded),
                  'Valore',
                ];
              }}
            />
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
      <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400" aria-hidden>
        <strong>Come leggere:</strong> {config.helpText}
      </p>
    </div>
  );
}
