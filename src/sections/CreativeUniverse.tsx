import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { creativeProjects } from '../data/creativeProjects';
import { accent } from '../components/accentClasses';
import type { CreativeProject } from '../data/types';

function CreativeCard({ project }: { project: CreativeProject }) {
  const a = accent(project.accent);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/creative/${project.id}`}
        data-cursor-grow
        className={`brutal-border relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-[var(--color-ink)] p-7 text-left md:p-9 ${a.text}`}
        style={{ boxShadow: '8px 8px 0 currentColor' }}
      >
        <div aria-hidden className={`absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 ${a.bg}`} />
        <div className="relative">
          <span className="mono-font text-xs font-bold uppercase tracking-widest opacity-80">
            {project.category}
          </span>
          <h3 className="display-font mt-4 text-4xl uppercase leading-[0.9] text-[var(--color-paper)] md:text-5xl">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-2 text-sm italic text-[var(--color-paper)]/60 md:text-base">{project.subtitle}</p>
          )}
        </div>

        <div className="relative">
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-paper)]/75 md:text-base">
            {project.description}
          </p>
          {project.status && (
            <p className="mono-font text-[10px] uppercase tracking-widest text-[var(--color-paper)]/50">
              {project.status}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function CreativeUniverse() {
  if (creativeProjects.length === 0) return null;

  return (
    <section
      id="creative"
      className="relative bg-[var(--color-paper)] px-5 py-24 text-[var(--color-ink)] md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 md:mb-16">
          <div className="flex items-baseline gap-4">
            <span className="mono-font text-sm font-bold text-[var(--color-red)]">04</span>
            <h2 className="display-font text-4xl uppercase tracking-tight md:text-7xl">The Other Side</h2>
          </div>
          <p className="mono-font mt-4 text-xs uppercase tracking-[0.3em] text-[var(--color-ink)]/50">
            Beyond code — worlds I write and draw
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {creativeProjects.map((p) => (
            <CreativeCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
