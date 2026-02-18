import { NarrativeBlock } from '@/components/NarrativeBlock';
import { LineChart, type ChartVariant } from './LineChart';
import type { DataPoint } from '@/lib/types';

interface ChartSectionProps {
  id?: string;
  title: string;
  description: React.ReactNode;
  data: DataPoint[];
  unit?: string;
  color?: string;
  /** Frase "In pratica..." in linguaggio semplice */
  takeaway?: string;
  /** Per grafici a indice (es. reddito, salari): anno base per legenda comprensibile */
  indexBaseYear?: number;
  /** Tipo asse Y: index (100=2000), percent (%), inflation (variazione % anno su anno) */
  chartVariant?: ChartVariant;
  /** Linea orizzontale "punto di partenza" (es. 100 per indice, 0 per inflazione, valore 2000 per %) */
  baselineValue?: number;
}

export function ChartSection({
  id,
  title,
  description,
  data,
  unit = '',
  color,
  takeaway,
  indexBaseYear,
  chartVariant,
  baselineValue,
}: ChartSectionProps): JSX.Element {
  return (
    <section id={id} className="scroll-mt-28 space-y-6 py-10 md:py-14">
      <NarrativeBlock title={title} takeaway={takeaway}>
        {description}
      </NarrativeBlock>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:shadow-none md:p-6">
        <LineChart
          data={data}
          unit={unit}
          color={color}
          indexBaseYear={indexBaseYear}
          chartVariant={chartVariant}
          baselineValue={baselineValue}
        />
      </div>
    </section>
  );
}
