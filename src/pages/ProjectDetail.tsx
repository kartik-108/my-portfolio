import { useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import MagneticButton from '../components/MagneticButton';
import { projects } from '../data/projects';
import { accent } from '../components/accentClasses';
import NotFoundInline from '../components/NotFoundInline';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <PageWrapper crumb="Projects">
        <NotFoundInline backTo="/projects" backLabel="All projects" subject="project" />
      </PageWrapper>
    );
  }

  const a = accent(project.accent);
  const hasLinks = project.links && (project.links.github || project.links.live);

  return (
    <PageWrapper crumb={`Projects / ${project.shortTitle ?? project.title}`}>
      <section className={`relative px-5 py-16 md:px-10 md:py-24 ${a.text}`}>
        <div className="mx-auto max-w-4xl">
          <span className="mono-font text-xs font-bold uppercase tracking-widest opacity-80">
            {project.category} {project.year ? `· ${project.year}` : ''}
          </span>
          <h1 className="display-font mt-3 mb-6 text-[12vw] uppercase leading-[0.9] text-[var(--color-paper)] sm:text-6xl md:text-7xl">
            {project.title}
          </h1>

          {project.status && (
            <p className="mono-font mb-8 inline-block border border-current px-3 py-1 text-xs uppercase tracking-wider">
              {project.status}
            </p>
          )}

          <p className="mb-8 text-lg leading-relaxed text-[var(--color-paper)]/90 md:text-xl">
            {project.description}
          </p>

          {project.problem && (
            <div className="mb-8">
              <h2 className="mono-font mb-2 text-xs font-bold uppercase tracking-widest">Problem</h2>
              <p className="leading-relaxed text-[var(--color-paper)]/75">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="mb-8">
              <h2 className="mono-font mb-2 text-xs font-bold uppercase tracking-widest">Solution</h2>
              <p className="leading-relaxed text-[var(--color-paper)]/75">{project.solution}</p>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div className="mb-10">
              <h2 className="mono-font mb-3 text-xs font-bold uppercase tracking-widest">Features</h2>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="leading-relaxed text-[var(--color-paper)]/75">
                    — {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-10 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="mono-font border border-[var(--color-paper)]/30 px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-paper)]/80"
              >
                {t}
              </span>
            ))}
          </div>

          {hasLinks && (
            <div className="flex flex-wrap gap-3">
              {project.links?.github && (
                <MagneticButton as="a" href={project.links.github}>
                  GitHub
                </MagneticButton>
              )}
              {project.links?.live && (
                <MagneticButton as="a" href={project.links.live}>
                  Live demo
                </MagneticButton>
              )}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
