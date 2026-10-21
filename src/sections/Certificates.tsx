import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { certificates } from '../data/certificates';

export default function Certificates() {
  // Hides itself automatically when src/data/certificates.ts is empty.
  if (certificates.length === 0) return null;

  return (
    <section className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="05" title="Certificates" accentClass="text-[var(--color-red)]" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.link ?? undefined}
              target={cert.link ? '_blank' : undefined}
              rel={cert.link ? 'noreferrer' : undefined}
              initial={{ opacity: 0, rotate: -1, y: 16 }}
              whileInView={{ opacity: 1, rotate: i % 2 === 0 ? -1 : 1, y: 0 }}
              whileHover={{ rotate: 0, y: -4 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3 }}
              data-cursor-grow
              className="brutal-border brutal-shadow-sm block bg-[var(--color-paper)] p-6 text-[var(--color-ink)]"
            >
              <h3 className="display-font mb-2 text-lg uppercase leading-tight">{cert.title}</h3>
              <p className="mono-font mb-1 text-xs uppercase tracking-wide text-[var(--color-ink)]/70">
                {cert.issuer}
              </p>
              {cert.date && <p className="mono-font text-[11px] text-[var(--color-ink)]/50">{cert.date}</p>}
              {cert.credentialId && (
                <p className="mono-font mt-2 text-[10px] text-[var(--color-ink)]/40">ID: {cert.credentialId}</p>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
