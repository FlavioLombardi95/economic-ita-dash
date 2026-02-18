import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChartSection } from '@/components/charts/ChartSection';
import { Sidebar } from '@/components/Sidebar';
import { ThemeMobileNav } from '@/components/ThemeMobileNav';
import { getIndicatorById } from '@/lib/indicators';
import { getThemeBySlug, THEMES } from '@/lib/themes';
import type { DataPoint } from '@/lib/types';
import type { ChartVariant } from '@/components/charts/LineChart';
import incomeData from '@/data/income.json';
import wagesData from '@/data/wages.json';
import inflationData from '@/data/inflation.json';
import employmentData from '@/data/employment.json';
import consumptionData from '@/data/consumption.json';
import povertyData from '@/data/poverty.json';

const DATASETS: Record<string, DataPoint[]> = {
  income: incomeData as DataPoint[],
  wages: wagesData as DataPoint[],
  inflation: inflationData as DataPoint[],
  employment: employmentData as DataPoint[],
  consumption: consumptionData as DataPoint[],
  poverty: povertyData as DataPoint[],
};

const UNITS: Record<string, string> = {
  income: '',
  wages: '',
  inflation: '%',
  employment: '%',
  consumption: '',
  poverty: '%',
};

const INDEX_BASE_YEAR = 2000;
const INDEX_IDS = new Set(['income', 'wages', 'consumption']);

export function generateStaticParams(): { slug: string }[] {
  return THEMES.map((t) => ({ slug: t.slug }));
}

function getChartVariant(id: string): ChartVariant {
  if (id === 'inflation') return 'inflation';
  if (id === 'employment' || id === 'poverty') return 'percent';
  return 'index';
}

export default function ThemePage({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const theme = getThemeBySlug(params.slug);
  if (!theme) notFound();

  const indicator = getIndicatorById(theme.id);
  if (!indicator) notFound();

  const data = DATASETS[theme.id] ?? [];
  const unit = UNITS[theme.id] ?? '';
  const isIndex = INDEX_IDS.has(theme.id);
  const chartVariant = getChartVariant(theme.id);

  const baselineValue =
    chartVariant === 'index'
      ? 100
      : chartVariant === 'inflation'
        ? 0
        : (() => {
            const point = data.find((d) => d.year === 2000);
            return point?.value;
          })();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Sidebar currentSlug={params.slug} />
      <div className="flex min-h-screen flex-col md:pl-64">
        <ThemeMobileNav currentLabel={theme.label} />
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-accent hover:underline">
                ← Tutti i temi
              </Link>
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl md:text-4xl">
              {theme.label}
            </h1>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              {theme.shortDescription}
            </p>

            <ChartSection
              title={indicator.title}
              description={indicator.description}
              takeaway={indicator.takeaway}
              data={data}
              unit={unit}
              indexBaseYear={isIndex ? INDEX_BASE_YEAR : undefined}
              chartVariant={chartVariant}
              baselineValue={baselineValue}
            />

            <footer className="mt-16 rounded-xl border border-slate-200 bg-slate-50 px-5 py-6 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 sm:py-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Fonti
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Dati <strong>ISTAT</strong> e <strong>Eurostat</strong>.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
