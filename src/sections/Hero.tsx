import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroCanvas from '../components/HeroCanvas';
import { siteConfig } from '../data/siteConfig';

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollToIdentity = () => {
    document.getElementById('identity')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <HeroCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--color-ink)_92%)]"
      />

      <motion.div style={{ opacity, scale, y }} className="relative z-10 w-full px-5 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mono-font mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-green)] md:mb-6">
            {siteConfig.role}
          </p>

          <h1 className="display-font text-[16vw] uppercase leading-[0.85] sm:text-[13vw] md:text-[9.5vw]">
            <span className="block">KARTHIK</span>
            <span className="block text-outline">VIJAY</span>
          </h1>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 md:mt-12 md:flex-row md:items-end">
            <p className="display-font max-w-xl text-2xl uppercase leading-[0.95] md:text-4xl">
              {siteConfig.tagline}
            </p>
            <button
              onClick={scrollToIdentity}
              data-cursor-grow
              className="brutal-border brutal-shadow mono-font flex shrink-0 items-center gap-3 bg-[var(--color-orange)] px-6 py-4 text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-transform hover:-translate-y-1 hover:-translate-x-1"
            >
              Enter the universe
              <span aria-hidden>↓</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-5 z-10 mono-font text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/50 md:left-10">
        Scroll
      </div>
      <div className="absolute bottom-6 right-5 z-10 mono-font text-[10px] uppercase tracking-[0.3em] text-[var(--color-paper)]/50 md:right-10">
        Est. digital universe
      </div>
    </section>
  );
}
