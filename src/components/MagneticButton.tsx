import { useRef, type ReactNode, type ButtonHTMLAttributes } from 'react';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

/** A brutalist button with a subtle magnetic hover pull (desktop only; harmless on touch). */
export default function MagneticButton({ children, as = 'button', href, className = '', ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  const classes = `brutal-border brutal-shadow-sm mono-font inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-paper)] transition-[background-color,color] duration-150 hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] ${className}`;

  if (as === 'a') {
    return (
      <a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={classes}
        data-cursor-grow
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={classes}
      data-cursor-grow
      {...rest}
    >
      {children}
    </button>
  );
}
