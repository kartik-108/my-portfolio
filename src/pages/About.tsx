import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import SectionLabel from '../components/SectionLabel';
import { profile, identityNodes, stats } from '../data/profile';

export default function About() {
  return (
    <PageWrapper crumb="About">
      <section className="relative px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionLabel index="01" title="About" accentClass="text-[var(--color-green)]" />

          <p className="mb-10 whitespace-pre-line text-xl leading-relaxed text-[var(--color-paper)]/90 md:text-2xl">
            {profile.bio}
          </p>

          <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.id} className="brutal-border bg-[var(--color-ink)] p-5">
                <p className="display-font text-4xl text-[var(--color-green)]">{s.value}</p>
                <p className="mono-font mt-2 text-[10px] uppercase tracking-widest text-[var(--color-paper)]/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mono-font mb-6 text-xs font-bold uppercase tracking-widest text-[var(--color-paper)]/50">
            Who I am, in five parts
          </h2>
          <div className="mb-14 space-y-6">
            {identityNodes.map((node) => (
              <div key={node.id} className="border-l-2 border-[var(--color-paper)]/20 pl-5">
                <h3 className="display-font text-xl uppercase tracking-tight md:text-2xl">{node.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-paper)]/75 md:text-base">
                  {node.description}
                </p>
              </div>
            ))}
          </div>

          <div className="brutal-border brutal-shadow-sm bg-[var(--color-paper)] p-7 text-[var(--color-ink)] md:p-10">
            <h2 className="display-font mb-3 text-2xl uppercase md:text-3xl">Anant Vyuha</h2>
            <p className="mb-5 leading-relaxed text-[var(--color-ink)]/80">
              Anant Vyuha is the creative studio I built around my own writing and art, starting with
              Khwaab — independently led, independently developed, and still growing.
            </p>
            <Link
              to="/anant-vyuha"
              data-cursor-grow
              className="mono-font inline-block border-b-2 border-[var(--color-ink)] pb-1 text-xs font-bold uppercase tracking-wide"
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
