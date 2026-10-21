import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { currentlyItems } from '../data/currentlyBuilding';

const kindLabel: Record<string, string> = {
  building: 'BUILDING',
  learning: 'LEARNING',
  exploring: 'EXPLORING',
};

const kindAccent: Record<string, string> = {
  building: 'text-[var(--color-orange)]',
  learning: 'text-[var(--color-blue)]',
  exploring: 'text-[var(--color-green)]',
};

export default function NowSection() {
  if (currentlyItems.length === 0) return null;

  return (
    <section className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="06" title="Currently" accentClass="text-[var(--color-orange)]" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {currentlyItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="brutal-border bg-[var(--color-ink)] p-6"
            >
              <span className={`mono-font text-[10px] font-bold uppercase tracking-[0.25em] ${kindAccent[item.kind]}`}>
                {kindLabel[item.kind]}
              </span>
              <h3 className="display-font mt-3 mb-2 text-xl uppercase leading-tight">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-paper)]/75">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
