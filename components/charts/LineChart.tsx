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
}

export function LineChart({
  data,
  dataKey = 'value',
  color = '#2563eb',
  unit = '',
}: LineChartProps): JSX.Element {
  const chartData = data.map((d) => ({ ...d, [dataKey]: d.value }));

  return (
    <div className="h-[320px] w-full">
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
            tick={{ fontSize: 12, fill: '#64748b' }}
            tickLine={{ stroke: '#cbd5e1' }}
            tickFormatter={unit ? (v) => `${v}${unit}` : undefined}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
            }}
            labelFormatter={(year) => `Anno ${year}`}
            formatter={(value: number) => [
              unit ? `${value} ${unit}` : String(value),
              'Valore',
            ]}
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
  );
}
