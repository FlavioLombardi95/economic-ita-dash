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
  income: ' (2000=100)',
  wages: ' (2000=100)',
  inflation: '%',
  employment: '%',
  consumption: ' (2000=100)',
  poverty: '%',
};

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
            Una lettura per indicatori: reddito, salari, inflazione, occupazione,
            consumi e rischio di povertà. Gli anni 2008, 2012, 2020 e 2022 sono
            evidenziati come riferimenti alle crisi recenti.
          </p>
        </header>

        {/* Sections */}
        {INDICATORS.map((ind) => (
          <ChartSection
            key={ind.id}
            title={ind.title}
            description={ind.description}
            data={DATASETS[ind.id] ?? []}
            unit={UNITS[ind.id]}
          />
        ))}

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-10 pb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Fonti e metodologia
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Dati: <strong>ISTAT</strong>, <strong>Eurostat</strong>. Le serie
            sono state estratte tramite script da fonti ufficiali, normalizzate
            in formato anno-valore e versionate nel repository. Nessuna elaborazione
            statistica oltre alla presentazione grafica. Per aggiornare i dati:
            <code className="mx-1 rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-xs">
              npm run update-data
            </code>
          </p>
        </footer>
      </main>
    </div>
  );
}
