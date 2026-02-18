'use client';

const LINKS: { id: string; label: string }[] = [
  { id: 'income', label: 'Reddito' },
  { id: 'wages', label: 'Salari' },
  { id: 'inflation', label: 'Inflazione' },
  { id: 'employment', label: 'Lavoro' },
  { id: 'consumption', label: 'Consumi' },
  { id: 'poverty', label: 'Povertà' },
];

export function MobileNav(): JSX.Element {
  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
      <div className="px-4 pt-4 pb-2 sm:px-6">
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Italy Economic Dashboard</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Dati dal 2000</p>
      </div>
      <nav
        className="flex gap-2 overflow-x-auto px-4 pb-3 sm:px-6 [scrollbar-width:none]"
        aria-label="Navigazione sezioni"
      >
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
