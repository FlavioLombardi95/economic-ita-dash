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
          className="max-w-3xl rounded-lg border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-500 px-4 py-3"
          role="complementary"
          aria-label="In sintesi"
        >
          <p className="text-slate-800 dark:text-slate-200 font-medium leading-snug">
            {takeaway}
          </p>
        </div>
      )}
    </div>
  );
}
