import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

const columns = [
  {
    heading: 'Build',
    links: [
      { to: '/projects', label: 'Projects' },
      { to: '/skills', label: 'Skills' },
      { to: '/now', label: 'Now' },
    ],
  },
  {
    heading: 'Create',
    links: [
      { to: '/creative', label: 'Creative Universe' },
      { to: '/anant-vyuha', label: 'Anant Vyuha' },
    ],
  },
  {
    heading: 'About',
    links: [
      { to: '/about', label: 'About' },
      { to: '/journey', label: 'Journey' },
      { to: '/certificates', label: 'Certificates' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-[var(--color-paper)]/15 px-5 py-14 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mono-font mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-paper)]/40">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      data-cursor-grow
                      className="mono-font text-xs uppercase tracking-wide text-[var(--color-paper)]/75 hover:text-[var(--color-green)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-[var(--color-paper)]/10 pt-6 md:flex-row md:items-center">
          <p className="mono-font text-[11px] uppercase tracking-widest text-[var(--color-paper)]/40">
            © {new Date().getFullYear()} {siteConfig.name} — still building.
          </p>
          <p className="mono-font text-[11px] uppercase tracking-widest text-[var(--color-paper)]/40">
            Designed & built by {siteConfig.shortName}
          </p>
        </div>
      </div>
    </footer>
  );
}
