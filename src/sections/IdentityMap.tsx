import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { identityNodes, profile } from '../data/profile';

export default function IdentityMap() {
  const [activeId, setActiveId] = useState(identityNodes[0].id);
  const active = identityNodes.find((n) => n.id === activeId) ?? identityNodes[0];

  return (
    <section id="identity" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="01" title="Who Am I" accentClass="text-[var(--color-blue)]" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          {/* Nodes */}
          <div className="order-2 md:order-1 md:col-span-5">
            <div className="flex flex-wrap gap-3 md:flex-col md:items-start">
              {identityNodes.map((node) => {
                const isActive = node.id === activeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveId(node.id)}
                    data-cursor-grow
                    className={`brutal-border mono-font px-5 py-3 text-left text-sm font-bold uppercase tracking-wider transition-colors duration-150 md:w-full md:text-base ${
                      isActive
                        ? 'bg-[var(--color-green)] text-[var(--color-ink)]'
                        : 'bg-transparent text-[var(--color-paper)] hover:bg-[var(--color-paper)]/10'
                    }`}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center explanation */}
          <div className="order-1 md:order-2 md:col-span-7">
            <div className="brutal-border brutal-shadow relative min-h-[260px] bg-[var(--color-ink)] p-8 md:p-12">
              <span className="mono-font absolute right-4 top-4 text-xs text-[var(--color-paper)]/40">
                {profile.shortName.toUpperCase()}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="display-font mb-4 text-4xl uppercase text-[var(--color-green)] md:text-5xl">
                    {active.label}
                  </h3>
                  <p className="max-w-xl text-lg leading-relaxed text-[var(--color-paper)]/90 md:text-xl">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-8 max-w-2xl whitespace-pre-line text-base leading-relaxed text-[var(--color-paper)]/70 md:text-lg">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
