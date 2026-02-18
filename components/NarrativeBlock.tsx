interface NarrativeBlockProps {
  title: string;
  children: React.ReactNode;
  /** Frase "In pratica..." per chi non mastica numeri */
  takeaway?: string;
}

export function NarrativeBlock({
  title,
  children,
  takeaway,
}: NarrativeBlockProps): JSX.Element {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">
        {title}
      </h2>
      <p className="max-w-3xl text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </p>
      {takeaway && (
        <div
          className="max-w-3xl rounded-xl border-l-4 border-accent bg-blue-50/80 px-4 py-3 dark:bg-blue-950/30 dark:border-accent-light"
          role="complementary"
          aria-label="In sintesi"
        >
          <p className="font-medium leading-snug text-slate-800 dark:text-slate-100">
            {takeaway}
          </p>
        </div>
      )}
    </div>
  );
}
