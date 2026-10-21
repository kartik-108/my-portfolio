import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PageWrapperProps {
  children: ReactNode;
  crumb?: string; // e.g. "Projects / HealthLens"
}

/** Consistent top offset (clears the fixed Nav) + a back-to-home link for every routed page. */
export default function PageWrapper({ children, crumb }: PageWrapperProps) {
  return (
    <div className="min-h-[100svh] pt-24 md:pt-28">
      <div className="px-5 pt-6 md:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3">
          <Link
            to="/"
            data-cursor-grow
            className="mono-font text-[11px] font-bold uppercase tracking-widest text-[var(--color-paper)]/50 transition-colors hover:text-[var(--color-green)]"
          >
            ← Home
          </Link>
          {crumb && (
            <span className="mono-font text-[11px] uppercase tracking-widest text-[var(--color-paper)]/30">
              / {crumb}
            </span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
