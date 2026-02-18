'use client';

import Link from 'next/link';
import { THEMES } from '@/lib/themes';

interface ThemeMobileNavProps {
  currentLabel: string;
}

export function ThemeMobileNav({ currentLabel }: ThemeMobileNavProps): JSX.Element {
  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white dark:border-slate-950 md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Torna alla home"
        >
          <span className="text-lg">←</span>
        </Link>
        <span className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
          {currentLabel}
        </span>
      </div>
      <nav
        className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none]"
        aria-label="Altri temi"
      >
        {THEMES.map((theme) => (
          <Link
            key={theme.slug}
            href={`/${theme.slug}`}
            className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {theme.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
