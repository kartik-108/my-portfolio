import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { skills } from '../data/skills';
import { projects } from '../data/projects';
import { creativeProjects } from '../data/creativeProjects';
import type { SkillItem } from '../data/types';

const categories: SkillItem['category'][] = ['Programming', 'Web', 'AI / Data', 'Tools', 'Creative Technology'];

function projectTitle(id: string): string | undefined {
  return projects.find((p) => p.id === id)?.shortTitle ?? projects.find((p) => p.id === id)?.title
    ?? creativeProjects.find((p) => p.id === id)?.title;
}

export default function SkillMap() {
  const [hovered, setHovered] = useState<SkillItem | null>(null);
  const grouped = useMemo(
    () => categories.map((cat) => ({ cat, items: skills.filter((s) => s.category === cat) })).filter((g) => g.items.length > 0),
    []
  );

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="05" title="Capability Map" accentClass="text-[var(--color-green)]" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            {grouped.map((group) => (
              <div key={group.cat} className="mb-8">
                <h3 className="mono-font mb-3 text-xs font-bold uppercase tracking-widest text-[var(--color-paper)]/50">
                  {group.cat}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <button
                      key={skill.id}
                      data-cursor-grow
                      onMouseEnter={() => setHovered(skill)}
                      onFocus={() => setHovered(skill)}
                      onClick={() => setHovered(skill)}
                      className="brutal-border mono-font px-4 py-2 text-xs font-bold uppercase tracking-wide text-[var(--color-paper)] transition-colors duration-150 hover:bg-[var(--color-green)] hover:text-[var(--color-ink)]"
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-4">
            <div className="brutal-border brutal-shadow-sm sticky top-24 min-h-[180px] bg-[var(--color-ink)] p-6">
              {hovered ? (
                <motion.div key={hovered.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <p className="mono-font mb-2 text-[10px] uppercase tracking-widest text-[var(--color-paper)]/50">
                    {hovered.category}
                  </p>
                  <h4 className="display-font mb-4 text-2xl uppercase text-[var(--color-green)]">{hovered.name}</h4>
                  {hovered.relatedProjectIds && hovered.relatedProjectIds.length > 0 ? (
                    <>
                      <p className="mono-font mb-2 text-[10px] uppercase tracking-widest text-[var(--color-paper)]/50">
                        Used in
                      </p>
                      <ul className="space-y-1">
                        {hovered.relatedProjectIds.map((id) => (
                          <li key={id} className="text-sm text-[var(--color-paper)]/80">
                            — {projectTitle(id) ?? id}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-sm text-[var(--color-paper)]/60">Core tool across my work.</p>
                  )}
                </motion.div>
              ) : (
                <p className="mono-font text-xs uppercase tracking-widest text-[var(--color-paper)]/40">
                  Hover or tap a skill
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
