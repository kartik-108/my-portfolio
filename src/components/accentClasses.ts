export type Accent = 'blue' | 'green' | 'orange' | 'red' | 'purple';

const map: Record<Accent, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-[var(--color-blue)]', bg: 'bg-[var(--color-blue)]', border: 'border-[var(--color-blue)]' },
  green: { text: 'text-[var(--color-green)]', bg: 'bg-[var(--color-green)]', border: 'border-[var(--color-green)]' },
  orange: { text: 'text-[var(--color-orange)]', bg: 'bg-[var(--color-orange)]', border: 'border-[var(--color-orange)]' },
  red: { text: 'text-[var(--color-red)]', bg: 'bg-[var(--color-red)]', border: 'border-[var(--color-red)]' },
  purple: { text: 'text-[var(--color-purple)]', bg: 'bg-[var(--color-purple)]', border: 'border-[var(--color-purple)]' },
};

export function accent(a: Accent) {
  return map[a];
}
