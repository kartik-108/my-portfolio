import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { timeline } from '../data/timeline';

export default function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="02" title="My Journey" accentClass="text-[var(--color-orange)]" />
        <p className="mono-font mb-10 text-xs uppercase tracking-[0.3em] text-[var(--color-paper)]/50">
          Past → Present → Future
        </p>
      </div>

      {/* Horizontal-scroll corridor on all breakpoints: simplest reliable
          implementation of a "path through time" without pinned-scroll
          3D camera rigging, which would cost far more than it adds here. */}
      <div className="scrollbar-none flex gap-6 overflow-x-auto px-5 pb-6 md:gap-8 md:px-10">
        {timeline.map((entry, i) => (
          <motion.article
            key={entry.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="brutal-border brutal-shadow-sm relative flex w-[280px] shrink-0 flex-col justify-between bg-[var(--color-ink)] p-6 md:w-[340px] md:p-8"
          >
            <div>
              <div className="mb-6 flex items-baseline justify-between">
                <span className="display-font text-5xl text-[var(--color-green)] md:text-6xl">{entry.year}</span>
                <span className="mono-font text-[10px] font-bold uppercase tracking-widest text-[var(--color-paper)]/50">
                  {entry.stage}
                </span>
              </div>
              <h3 className="display-font mb-3 text-xl uppercase leading-tight md:text-2xl">{entry.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-paper)]/75 md:text-base">
                {entry.description}
              </p>
            </div>

            {entry.tags && entry.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono-font border border-[var(--color-paper)]/30 px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--color-paper)]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <span className="mono-font absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-orange)] text-xs font-bold text-[var(--color-ink)]">
              {i + 1}
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
