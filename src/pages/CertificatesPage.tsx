import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import SectionLabel from '../components/SectionLabel';
import { certificates } from '../data/certificates';
import type { Certificate } from '../data/types';

function CertCard({ cert, onOpen }: { cert: Certificate; onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      data-cursor-grow
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.3 }}
      className="brutal-border brutal-shadow-sm block w-full bg-[var(--color-paper)] p-6 text-left text-[var(--color-ink)] transition-transform hover:-translate-y-1"
    >
      {cert.images && cert.images[0] && (
        <div className="brutal-border mb-4 aspect-[4/3] overflow-hidden bg-[var(--color-ink)]/5">
          <img src={cert.images[0]} alt={cert.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <h3 className="display-font mb-2 text-lg uppercase leading-tight">{cert.title}</h3>
      <p className="mono-font mb-1 text-xs uppercase tracking-wide text-[var(--color-ink)]/70">{cert.issuer}</p>
      {cert.date && <p className="mono-font text-[11px] text-[var(--color-ink)]/50">{cert.date}</p>}
      {cert.credentialId && (
        <p className="mono-font mt-2 text-[10px] text-[var(--color-ink)]/40">{cert.credentialId}</p>
      )}
      {cert.images && cert.images.length > 1 && (
        <p className="mono-font mt-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-blue)]">
          View all {cert.images.length} →
        </p>
      )}
    </motion.button>
  );
}

function CertGallery({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const images = cert.images ?? [];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--color-ink)]/90 p-4 backdrop-blur-sm md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="brutal-border relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[var(--color-ink)] p-5 md:p-8"
        style={{ boxShadow: '12px 12px 0 var(--color-paper)' }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          data-cursor-grow
          className="brutal-border mono-font absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-[var(--color-ink)] text-xs font-bold text-[var(--color-paper)]"
        >
          X
        </button>
        <h3 className="display-font mb-1 text-2xl uppercase leading-tight md:text-3xl">{cert.title}</h3>
        <p className="mono-font mb-5 text-xs uppercase tracking-widest text-[var(--color-paper)]/60">
          {cert.issuer} {cert.date ? `· ${cert.date}` : ''}
        </p>
        {images[index] && (
          <img src={images[index]} alt={`${cert.title} ${index + 1}`} className="brutal-border w-full" />
        )}
        {images.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setIndex(i)}
                data-cursor-grow
                className={`mono-font h-9 w-9 border-2 text-xs font-bold ${
                  i === index
                    ? 'border-[var(--color-green)] text-[var(--color-green)]'
                    : 'border-[var(--color-paper)]/30 text-[var(--color-paper)]/60'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CertificatesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openCert = certificates.find((c) => c.id === openId) ?? null;

  return (
    <PageWrapper crumb="Certificates">
      <section className="relative px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel index="07" title="Certificates & Credentials" accentClass="text-[var(--color-red)]" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <CertCard key={cert.id} cert={cert} onOpen={() => setOpenId(cert.id)} />
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {openCert && <CertGallery cert={openCert} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </PageWrapper>
  );
}
