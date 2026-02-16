interface NarrativeBlockProps {
  title: string;
  children: React.ReactNode;
}

export function NarrativeBlock({ title, children }: NarrativeBlockProps): JSX.Element {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">
        {title}
      </h2>
      <p className="max-w-3xl text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </p>
    </div>
  );
}
