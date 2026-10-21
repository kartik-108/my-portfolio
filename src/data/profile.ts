import type { IdentityNode, Stat } from './types';

// Replace placeholder values (marked below) with your real details.
export const profile = {
  fullName: 'Karthik Vijay',
  shortName: 'Karthik',
  headline: 'Engineer. Creator. Storyteller.',
  bio: `I work on two sides of the same instinct: building technology AI/ML,
data science, software and web applications and building worlds graphic
novels and reincarnation/destiny-driven stories. Most of what I make starts
as "what if this existed" and ends as something you can actually use or read.`,
};

export const identityNodes: IdentityNode[] = [
  {
    id: 'engineer',
    label: 'ENGINEER',
    description:
      'Software engineering across AI/ML, data science, and full-stack applications from prototype to shipped product.',
  },
  {
    id: 'creator',
    label: 'CREATOR',
    description:
      'Independent creative work end-to-end writing, art direction, and production, mostly solo.',
  },
  {
    id: 'storyteller',
    label: 'STORYTELLER',
    description:
      'Reincarnation and destiny-driven narratives with emotional, character-first storytelling currently told through comics.',
  },
  {
    id: 'builder',
    label: 'BUILDER',
    description:
      'Comfortable owning a project from a blank repo to a working app architecture, UI, and the unglamorous plumbing in between.',
  },
  {
    id: 'student',
    label: 'STUDENT',
    description:
      'Always mid-upgrade picking up new technical craft and story craft project by project, feedback by feedback.',
  },
];

// Placeholder — replace with real numbers once you have them you want public.
export const stats: Stat[] = [
  { id: 'projects', label: 'PROJECTS SHIPPED', value: '3+' },
  { id: 'comic-pages', label: 'COMIC PAGES WRITTEN & DRAWN', value: '45+' },
  { id: 'worlds', label: 'CREATIVE UNIVERSES', value: '3' },
];
