import { NarrativeBlock } from '@/components/NarrativeBlock';
import { LineChart } from './LineChart';
import type { DataPoint } from '@/lib/types';

interface ChartSectionProps {
  title: string;
  description: React.ReactNode;
  data: DataPoint[];
  unit?: string;
  color?: string;
  /** Frase "In pratica..." in linguaggio semplice */
  takeaway?: string;
  /** Per grafici a indice (es. reddito, salari): anno base per legenda comprensibile */
  indexBaseYear?: number;
}

export function ChartSection({
  title,
  description,
  data,
  unit = '',
  color,
  takeaway,
  indexBaseYear,
}: ChartSectionProps): JSX.Element {
  return (
    <section className="space-y-6 py-10 md:py-14">
      <NarrativeBlock title={title} takeaway={takeaway}>
        {description}
      </NarrativeBlock>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-4 md:p-6">
        <LineChart
          data={data}
          unit={unit}
          color={color}
          indexBaseYear={indexBaseYear}
        />
      </div>
    </section>
  );
}
