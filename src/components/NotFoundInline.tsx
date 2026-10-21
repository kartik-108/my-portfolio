import { Link } from 'react-router-dom';

interface NotFoundInlineProps {
  backTo: string;
  backLabel: string;
  subject: string;
}

export default function NotFoundInline({ backTo, backLabel, subject }: NotFoundInlineProps) {
  return (
    <section className="px-5 py-24 text-center md:px-10 md:py-36">
      <p className="display-font text-4xl uppercase md:text-6xl">No such {subject}</p>
      <p className="mono-font mt-4 text-sm text-[var(--color-paper)]/60">
        That {subject} doesn't exist yet — or the link is off.
      </p>
      <Link
        to={backTo}
        data-cursor-grow
        className="brutal-border mono-font mt-8 inline-block px-5 py-3 text-xs font-bold uppercase tracking-wide hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
      >
        ← {backLabel}
      </Link>
    </section>
  );
}
