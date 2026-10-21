interface SectionLabelProps {
  index: string; // e.g. "01"
  title: string;
  accentClass?: string;
}

export default function SectionLabel({ index, title, accentClass = 'text-[var(--color-green)]' }: SectionLabelProps) {
  return (
    <div className="mb-10 flex items-baseline gap-4 md:mb-16">
      <span className={`mono-font text-sm font-bold ${accentClass}`}>{index}</span>
      <h2 className="display-font text-4xl uppercase tracking-tight md:text-6xl">{title}</h2>
      <div className="h-[3px] flex-1 bg-[var(--color-paper)] opacity-20" />
    </div>
  );
}
