interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  /** Colore icona: blue, green, violet, orange (linee guida) */
  accent?: 'blue' | 'green' | 'violet' | 'orange';
}

const ACCENT_CLASSES: Record<NonNullable<MetricCardProps['accent']>, string> = {
  blue: 'text-accent',
  green: 'text-emerald-600 dark:text-emerald-400',
  violet: 'text-violet-600 dark:text-violet-400',
  orange: 'text-amber-600 dark:text-amber-400',
};

export function MetricCard({
  label,
  value,
  icon,
  accent = 'blue',
}: MetricCardProps): JSX.Element {
  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:shadow-none"
      role="group"
    >
      <div className={`mb-3 ${ACCENT_CLASSES[accent]}`} aria-hidden>
        {icon}
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
      <p className="mt-1.5 break-words text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
}
