import { useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { creativeProjects } from '../data/creativeProjects';
import { accent } from '../components/accentClasses';
import NotFoundInline from '../components/NotFoundInline';

export default function CreativeDetail() {
  const { id } = useParams();
  const project = creativeProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <PageWrapper crumb="Creative">
        <NotFoundInline backTo="/creative" backLabel="The other side" subject="universe" />
      </PageWrapper>
    );
  }

  const a = accent(project.accent);

  return (
    <PageWrapper crumb={`Creative / ${project.title}`}>
      <section className={`relative bg-[var(--color-paper)] px-5 py-16 text-[var(--color-ink)] md:px-10 md:py-24 ${a.text}`}>
        <div className="mx-auto max-w-4xl">
          <span className="mono-font text-xs font-bold uppercase tracking-widest opacity-80">
            {project.category} {project.year ? `· ${project.year}` : ''}
          </span>
          <h1 className="display-font mt-3 mb-2 text-[12vw] uppercase leading-[0.9] text-[var(--color-ink)] sm:text-6xl md:text-7xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mb-8 text-lg italic text-[var(--color-ink)]/60">{project.subtitle}</p>
          )}

          {project.status && (
            <p className="mono-font mb-8 inline-block border border-current px-3 py-1 text-xs uppercase tracking-wider">
              {project.status}
            </p>
          )}

          <p className="mb-8 whitespace-pre-line text-lg leading-relaxed text-[var(--color-ink)]/90 md:text-xl">
            {project.longDescription ?? project.description}
          </p>

          {project.details && project.details.length > 0 && (
            <dl className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.details.map((d) => (
                <div key={d.label} className="border-l-2 border-[var(--color-ink)]/20 pl-4">
                  <dt className="mono-font text-[10px] uppercase tracking-widest text-[var(--color-ink)]/50">
                    {d.label}
                  </dt>
                  <dd className="text-[var(--color-ink)]/85">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="mono-font border border-[var(--color-ink)]/30 px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-ink)]/70"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
