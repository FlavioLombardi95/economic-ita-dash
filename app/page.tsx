import { ChartSection } from '@/components/charts/ChartSection';
import { INDICATORS } from '@/lib/indicators';
import type { DataPoint } from '@/lib/types';
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

/** Indicatori espressi come indice (anno base 2000): mostrano legenda "100 = livello 2000" */
const INDEX_BASE_YEAR = 2000;
const INDEX_INDICATORS: Set<string> = new Set(['income', 'wages', 'consumption']);

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mb-16 md:mb-20">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
            Com&apos;è cambiata la vita economica di un italiano dal 2000?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Sei grafici con dati ufficiali (ISTAT, Eurostat) per capire redditi, stipendi,
            carovita, lavoro, spese e povertà. Le linee tratteggiate segnano le crisi:
            2008, 2012, 2020, 2022.
          </p>
        </header>

        {/* Sections */}
        {INDICATORS.map((ind) => (
          <ChartSection
            key={ind.id}
            title={ind.title}
            description={ind.description}
            takeaway={ind.takeaway}
            data={DATASETS[ind.id] ?? []}
            unit={UNITS[ind.id]}
            indexBaseYear={INDEX_INDICATORS.has(ind.id) ? INDEX_BASE_YEAR : undefined}
          />
        ))}

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-10 pb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Da dove vengono questi dati?
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Tutti i numeri vengono da <strong>ISTAT</strong> e <strong>Eurostat</strong>:
            sono le statistiche ufficiali dello Stato e dell’Unione europea. Nessuna
            elaborazione: qui trovi i dati così come sono, solo messi in grafici per
            leggerli meglio.
          </p>
        </footer>
      </main>
    </div>
  );
}
