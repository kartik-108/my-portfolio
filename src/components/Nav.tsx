import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

const links = [
  { to: '/about', label: 'About' },
  { to: '/journey', label: 'Journey' },
  { to: '/projects', label: 'Build' },
  { to: '/creative', label: 'Create' },
  { to: '/anant-vyuha', label: 'Anant Vyuha' },
  { to: '/skills', label: 'Skills' },
  { to: '/certificates', label: 'Certs' },
  { to: '/now', label: 'Now' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--color-ink)]/90 backdrop-blur-sm' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0 })}
          className="mono-font text-sm font-bold uppercase tracking-widest"
          data-cursor-grow
        >
          {siteConfig.shortName}
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={() => window.scrollTo({ top: 0 })}
                className={({ isActive }) =>
                  `mono-font text-xs font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-green)] ${
                    isActive ? 'text-[var(--color-green)]' : 'text-[var(--color-paper)]/80'
                  }`
                }
                data-cursor-grow
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="brutal-border mono-font flex h-10 w-10 items-center justify-center text-xs font-bold lg:hidden"
          data-cursor-grow
        >
          {open ? 'X' : '≡'}
        </button>
      </nav>

      {open && (
        <div className="brutal-border mx-5 mb-4 bg-[var(--color-ink)] lg:hidden">
          <ul className="flex flex-col divide-y-2 divide-[var(--color-paper)]/20">
            {links.map((l) => (
              <li key={l.to}>
                <button
                  onClick={() => go(l.to)}
                  className="mono-font w-full px-5 py-4 text-left text-sm font-bold uppercase tracking-wider"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
