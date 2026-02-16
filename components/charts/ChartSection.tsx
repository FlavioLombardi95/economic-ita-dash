import { NarrativeBlock } from '@/components/NarrativeBlock';
import { LineChart } from './LineChart';
import type { DataPoint } from '@/lib/types';

interface ChartSectionProps {
  title: string;
  description: React.ReactNode;
  data: DataPoint[];
  unit?: string;
  color?: string;
}

export function ChartSection({
  title,
  description,
  data,
  unit = '',
  color,
}: ChartSectionProps): JSX.Element {
  return (
    <section className="space-y-6 py-10 md:py-14">
      <NarrativeBlock title={title}>{description}</NarrativeBlock>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-4 md:p-6">
        <LineChart data={data} unit={unit} color={color} />
      </div>
    </section>
  );
}
