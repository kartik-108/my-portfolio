import type { CreativeProject } from './types';

// Creative / storytelling universe. Add a new entry here and it
// automatically appears in "THE OTHER SIDE" — no component edits needed.
export const creativeProjects: CreativeProject[] = [
  {
    id: 'khwaab',
    title: 'KHWAAB',
    subtitle: 'A reincarnation story across two cities',
    category: 'Graphic Novel',
    status: 'Part 1 complete — Part 2 in progress',
    description:
      'A reincarnation/destiny-driven story set across Mathura and Kashi.',
    longDescription:
      'Khwaab follows a story of destiny and reincarnation unfolding across Mathura and Kashi. Part 1 a 45-page comic took about a year and a half to write and draw. Part 2 picks the story up with Avnish and Kanishka reuniting at a school in Vrindavan: an unspoken-love, friendship-over-romance arc told through everyday moments a school trip, a debate competition, exams, a diary accidentally read, Raksha Bandhan, the annual function, and a farewell that ends at a banyan tree. No confession, no cliffhanger the restraint is the point.',
    details: [
      { label: 'Format', value: '46-page comic (Part 1)' },
      { label: 'Setting', value: 'Mathura & Kashi' },
      { label: 'Status', value: 'Part 2 in progress' },
    ],
    tags: ['Reincarnation', 'Destiny', 'Slice-of-life'],
    accent: 'orange',
    links: {},
  },
  {
    id: 'dashavatar',
    title: 'DASHAVATAR',
    subtitle: 'Mythology-rooted creative universe',
    category: 'Creative Mythology / Comic',
    status: 'In development',
    // Placeholder — replace with real details in src/data/creativeProjects.ts.
    description:
      'Dashavatar is a graphic novel series retelling the ten avatars of Lord Vishnu through modern storytelling and cinematic illustration, beginning with Volume 01: Matsya Avatar — The Age of Knowledge.',
    details: [{ label: 'Status', value: 'In development' }],
    tags: ['Mythology'],
    accent: 'purple',
    links: {},
  },
  {
    id: 'panchtatva',
    title: 'PANCHTATVA',
    subtitle: 'PanchTatva Protocol',
    category: 'World-building',
    status: 'In development',
    // Placeholder — replace with real details in src/data/creativeProjects.ts.
    description:
      'A futuristic world-building project built around the five elements — placeholder, replace with real synopsis.',
    details: [{ label: 'Status', value: 'In development' }],
    tags: ['World-building'],
    accent: 'blue',
    links: {},
  },
];
