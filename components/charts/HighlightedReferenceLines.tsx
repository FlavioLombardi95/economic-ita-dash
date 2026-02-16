'use client';

import { ReferenceLine } from 'recharts';

const HIGHLIGHT_YEARS = [2008, 2012, 2020, 2022] as const;

const YEAR_LABELS: Record<number, string> = {
  2008: 'Crisi finanziaria',
  2012: 'Crisi debito',
  2020: 'COVID-19',
  2022: 'Shock inflattivo',
};

export function HighlightedReferenceLines(): JSX.Element {
  return (
    <>
      {HIGHLIGHT_YEARS.map((year) => (
        <ReferenceLine
          key={year}
          x={year}
          stroke="#94a3b8"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{
            value: YEAR_LABELS[year] ?? String(year),
            position: 'top',
            fill: '#64748b',
            fontSize: 11,
          }}
        />
      ))}
    </>
  );
}
