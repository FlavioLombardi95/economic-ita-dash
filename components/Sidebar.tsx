'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'income', label: 'Reddito', icon: <ChartLineIcon /> },
  { id: 'wages', label: 'Salari', icon: <WalletIcon /> },
  { id: 'inflation', label: 'Inflazione', icon: <TrendIcon /> },
  { id: 'employment', label: 'Lavoro', icon: <BriefcaseIcon /> },
  { id: 'consumption', label: 'Consumi', icon: <CartIcon /> },
  { id: 'poverty', label: 'Povertà', icon: <PeopleIcon /> },
];

function ChartLineIcon(): JSX.Element {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function WalletIcon(): JSX.Element {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a2.25 2.25 0 01-2.25-2.25V9m-1.5 0H3.375a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h14.25a.75.75 0 00.75-.75V15M12 9v6m3-3H9" />
    </svg>
  );
}

function TrendIcon(): JSX.Element {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18l9-11.963 4.5 4.5m0 0l4.5-4.5 4.5 4.5" />
    </svg>
  );
}

function BriefcaseIcon(): JSX.Element {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0v-4.25c0-1.094-.787-2.036-1.872-2.18-2.087-.277-4.216-.42-6.378-.42s-4.291.143-6.378.42c-1.085.144-1.872 1.086-1.872 2.18v4.25" />
    </svg>
  );
}

function CartIcon(): JSX.Element {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function PeopleIcon(): JSX.Element {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

export function Sidebar(): JSX.Element {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const readHash = (): void => {
      const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
      setActiveId(hash || '');
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);

  return (
    <aside
      className="fixed left-0 top-0 z-20 hidden h-screen w-64 flex-col border-r border-slate-200 bg-slate-50 md:flex dark:border-slate-800 dark:bg-slate-900"
      aria-label="Navigazione"
    >
      <div className="flex flex-1 flex-col px-4 py-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Italy Economic Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Dati dal 2000</p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon }) => {
            const isActive = activeId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-accent dark:bg-blue-950/50 dark:text-accent-light'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {icon}
                {label}
              </a>
            );
          })}
        </nav>
      </div>
      <footer className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 · ISTAT, Eurostat</p>
      </footer>
    </aside>
  );
}
