import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { projects } from '../data/projects';
import { accent } from '../components/accentClasses';
import type { TechnicalProject } from '../data/types';

function ProjectCard({ project }: { project: TechnicalProject }) {
  const a = accent(project.accent);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/projects/${project.id}`}
        data-cursor-grow
        className={`brutal-border group relative flex min-h-[320px] flex-col justify-between bg-[var(--color-ink)] p-7 text-left transition-transform duration-150 hover:-translate-y-1 md:p-9 ${a.text}`}
        style={{ boxShadow: `8px 8px 0 currentColor` }}
      >
        <div>
          <span className="mono-font text-xs font-bold uppercase tracking-widest opacity-80">
            {project.category}
          </span>
          <h3 className="display-font mt-4 text-3xl uppercase leading-[0.95] text-[var(--color-paper)] md:text-4xl">
            {project.shortTitle ?? project.title}
          </h3>
        </div>

        <div>
          <p className="mb-5 text-sm leading-relaxed text-[var(--color-paper)]/75 md:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="mono-font border border-[var(--color-paper)]/25 px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--color-paper)]/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <span className="mono-font absolute right-6 top-6 text-[10px] font-bold uppercase tracking-widest opacity-60 transition-opacity group-hover:opacity-100">
          View →
        </span>
      </Link>
    </motion.div>
  );
}

export default function ProjectUniverse() {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="03" title="Project Universe" accentClass="text-[var(--color-blue)]" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
