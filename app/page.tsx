import Link from 'next/link';
import { THEMES } from '@/lib/themes';

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="border-b border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-lg font-bold text-slate-900 dark:text-slate-100"
          >
            Italy Economic Dashboard
          </Link>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Dati dal 2000 · ISTAT, Eurostat
          </p>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl md:text-4xl">
            Com&apos;è cambiata la vita economica in Italia?
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            Scegli un tema per esplorare i dati ufficiali e capire redditi, stipendi,
            prezzi, lavoro, consumi e povertà.
          </p>

          <nav
            className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
            aria-label="Temi disponibili"
          >
            {THEMES.map((theme) => (
              <Link
                key={theme.slug}
                href={`/${theme.slug}`}
                className="flex min-h-[88px] items-start rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-accent hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-accent dark:hover:bg-slate-800 sm:min-h-[100px] sm:p-6"
              >
                <span className="block">
                  <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
                    {theme.label}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">
                    {theme.shortDescription}
                  </span>
                </span>
              </Link>
            ))}
          </nav>

          <footer className="mt-16 rounded-xl border border-slate-200 bg-slate-50 px-5 py-6 dark:border-slate-800 dark:bg-slate-900/50 sm:mt-20 sm:px-6 sm:py-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Fonti
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Tutti i numeri vengono da <strong>ISTAT</strong> e <strong>Eurostat</strong>:
              statistiche ufficiali, messe in grafici per leggerle meglio.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
