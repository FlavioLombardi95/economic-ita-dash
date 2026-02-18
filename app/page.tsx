import { ChartSection } from '@/components/charts/ChartSection';
import { MetricCard } from '@/components/MetricCard';
import { MobileNav } from '@/components/MobileNav';
import { Sidebar } from '@/components/Sidebar';
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

function CalendarIcon(): JSX.Element {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ChartBarIcon(): JSX.Element {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function BoltIcon(): JSX.Element {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function DocumentIcon(): JSX.Element {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Sidebar />
      {/* Area principale: margine a sinistra su desktop per la sidebar fissa */}
      <div className="flex min-h-screen flex-col md:pl-64">
        <MobileNav />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-4xl">
            {/* Hero */}
            <header className="mb-14 md:mb-20">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
                Com&apos;è cambiata la vita economica di un italiano dal 2000?
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Sei grafici con dati ufficiali (ISTAT, Eurostat) per capire redditi, stipendi,
                carovita, lavoro, spese e povertà. Le linee tratteggiate segnano le crisi:
                2008, 2012, 2020, 2022.
              </p>
            </header>

            {/* Metriche chiave */}
            <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MetricCard
              label="Anni coperti"
              value="2000 – 2024"
              icon={<CalendarIcon />}
              accent="blue"
            />
            <MetricCard
              label="Indicatori"
              value="6"
              icon={<ChartBarIcon />}
              accent="green"
            />
            <MetricCard
              label="Anni crisi evidenziati"
              value="2008, 2012, 2020, 2022"
              icon={<BoltIcon />}
              accent="orange"
            />
            <MetricCard
              label="Fonti"
              value="ISTAT, Eurostat"
              icon={<DocumentIcon />}
              accent="violet"
            />
            </div>

            {/* Sezioni grafici */}
            {INDICATORS.map((ind) => (
            <ChartSection
              key={ind.id}
              id={ind.id}
              title={ind.title}
              description={ind.description}
              takeaway={ind.takeaway}
              data={DATASETS[ind.id] ?? []}
              unit={UNITS[ind.id]}
              indexBaseYear={INDEX_INDICATORS.has(ind.id) ? INDEX_BASE_YEAR : undefined}
            />
            ))}

            {/* Footer contenuto */}
            <footer className="mt-20 rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Da dove vengono questi dati?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Tutti i numeri vengono da <strong>ISTAT</strong> e <strong>Eurostat</strong>:
                sono le statistiche ufficiali dello Stato e dell’Unione europea. Nessuna
                elaborazione: qui trovi i dati così come sono, solo messi in grafici per
                leggerli meglio.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
