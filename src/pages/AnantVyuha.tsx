import PageWrapper from '../components/PageWrapper';
import { anantVyuha } from '../data/anantVyuha';

export default function AnantVyuhaPage() {
  return (
    <PageWrapper crumb="Anant Vyuha">
      <section className="relative px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <span className="mono-font text-xs font-bold uppercase tracking-widest text-[var(--color-purple)]">
            Brand / Universe
          </span>
          <h1 className="display-font mt-3 mb-4 text-[14vw] uppercase leading-[0.85] sm:text-7xl md:text-8xl">
            {anantVyuha.title}
          </h1>
          <p className="mb-14 text-lg italic leading-relaxed text-[var(--color-paper)]/70 md:text-xl">
            {anantVyuha.tagline}
          </p>

          <div className="space-y-12">
            {anantVyuha.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="display-font mb-4 text-2xl uppercase tracking-tight text-[var(--color-purple)] md:text-3xl">
                  {s.heading}
                </h2>
                <p className="whitespace-pre-line text-base leading-relaxed text-[var(--color-paper)]/85 md:text-lg">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
