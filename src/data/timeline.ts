import type { TimelineEntry } from './types';

// Add, remove, or reorder entries freely — the journey section
// renders whatever is here, in array order.
export const timeline: TimelineEntry[] = [
  {
    id: 'origin',
    year: '2022',
    stage: 'ORIGIN',
    title: 'Where it started',
    description:
      'Picked up programming and drawing around the same time never fully chose one over the other.',
    tags: ['Foundations'],
  },
  {
    id: 'khwaab-start',
    year: '2023',
    stage: 'BUILD',
    title: 'Started Khwaab',
    description:
      'Began writing and drawing Khwaab, a reincarnation/destiny story set across Mathura and Kashi.',
    tags: ['Comics', 'Writing'],
  },
  {
    id: 'schooling',
    year: '2024',
    stage: 'ORIGIN',
    title: 'Finished schooling at Carmel Convent School',
    description:
      'Completed schooling at Carmel Convent School, Sector 7/D, Faridabad a foundation in structured, analytical thinking that carried into technical study.',
    tags: ['Foundations'],
  },
  {
    id: 'btech',
    year: '2024',
    stage: 'BUILD',
    title: 'B.Tech, Computer Science Engineering (Data Science)',
    description:
      'Began a B.Tech in Computer Science Engineering with a specialization in Data Science at Echelon Institute of Technology, Faridabad data structures, ML fundamentals, DBMS, and analytics alongside hands-on project work.',
    tags: ['Education', 'Data Science'],
  },
  {
    id: 'khwaab-p1',
    year: '2025',
    stage: 'SHIP',
    title: 'Khwaab Part 1 complete',
    description:
      'Finished a 45-page comic after roughly a year and a half of work story and concept landed; craft fundamentals became the clear next focus.',
    tags: ['Comics', 'Milestone'],
  },
  {
    id: 'app-builds',
    year: '2026',
    stage: 'BUILD',
    title: 'HealthLens, CareerIQ, TraceCam',
    description:
      'Moved deeper into applied AI/ML and app engineering building HealthLens, CareerIQ, and Anant Vyuha (TraceCam), an AR tracing app for artists.',
    tags: ['AI/ML', 'Apps'],
  },
  {
    id: 'now',
    year: 'NOW',
    stage: 'PRESENT',
    title: 'Professional Development + Khwaab Part 2 + TraceCam V2',
    description:
      'Focusing on professional growth, writing Khwaab Part 2 with sharper technical craft, and layering AR canvas detection onto TraceCam.',
    tags: ['Comics', 'AR', 'Professional Development'],
  },
];
