import type { Certificate } from './types';

// Real certificates, pulled from the old portfolio's certificates.html.
// MongoDB's 12 modules are grouped under one series entry with images
// shown as a gallery rather than 12 separate cards.
const mongoImages = Array.from({ length: 12 }, (_, i) => `/assets/certificates/mongo${i + 1}.jpg`);

export const certificates: Certificate[] = [
  {
    id: 'nptel-java',
    title: 'Programming in Java',
    issuer: 'NPTEL (IIT Kharagpur)',
    credentialId: 'Elite + Top 1% — Score 100/100',
    images: ['/assets/certificates/NPTEL.jpg'],
  },
  {
    id: 'oracle-dev-gym',
    title: 'Databases for Developers',
    issuer: 'Oracle Dev Gym',
    date: '2025',
    credentialId: 'Score 93%',
    images: ['/assets/certificates/oracle.jpg'],
  },
  {
    id: 'js-bootcamp',
    title: 'JavaScript Bootcamp',
    issuer: 'LetsUpgrade',
    date: 'Jan 2026',
    credentialId: 'LUEJSJAN2631',
    images: ['/assets/certificates/js-bootcamp.jpg'],
  },
  {
    id: 'ai-agents',
    title: '5-Day AI Agents Intensive',
    issuer: 'Google (Kaggle)',
    date: 'Dec 2025',
    credentialId: 'Kaggle Badge',
    images: ['/assets/certificates/ai-agents.jpg'],
  },
  {
    id: 'mongodb-series',
    title: 'MongoDB Certification Series (12 modules)',
    issuer: 'MongoDB (official)',
    date: '2024',
    credentialId: 'CRUD, aggregation pipelines, indexing, data modeling, performance',
    images: mongoImages,
  },
  {
    id: 'hackindia',
    title: 'Hackindian Hackathon',
    issuer: 'Hackindia',
    date: 'Mar 2026',
    images: ['/assets/certificates/hackathon.jpg'],
  },
  {
    id: 'c-programming',
    title: 'C Programming Basics',
    issuer: 'Simplilearn',
    date: 'Jul 2025',
    images: ['/assets/certificates/c-programming.jpeg'],
  },
  {
    id: 'gen-ai',
    title: 'Generative AI Mastermind',
    issuer: 'Outskill',
    date: '2025',
    images: ['/assets/certificates/gen-ai.jpg'],
  },
  {
    id: 'web-workshop',
    title: 'Web Technologies Workshop',
    issuer: 'Softpro India',
    date: 'Feb 2025',
    images: ['/assets/certificates/web-workshop.jpg'],
  },
];
