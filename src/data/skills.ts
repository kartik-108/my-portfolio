import type { SkillItem } from './types';

export const skills: SkillItem[] = [
  { id: 'python', name: 'Python', category: 'Programming', relatedProjectIds: ['healthlens', 'careeriq'] },
  { id: 'typescript', name: 'TypeScript', category: 'Programming' },
  { id: 'dart', name: 'Dart', category: 'Programming', relatedProjectIds: ['tracecam'] },
  { id: 'react', name: 'React', category: 'Web' },
  { id: 'flutter', name: 'Flutter', category: 'Web', relatedProjectIds: ['tracecam'] },
  { id: 'ml', name: 'Machine Learning', category: 'AI / Data', relatedProjectIds: ['healthlens'] },
  { id: 'rag', name: 'RAG / LLM pipelines', category: 'AI / Data', relatedProjectIds: ['careeriq'] },
  { id: 'ocr', name: 'OCR', category: 'AI / Data', relatedProjectIds: ['careeriq'] },
  { id: 'opencv', name: 'OpenCV', category: 'AI / Data', relatedProjectIds: ['tracecam'] },
  { id: 'git', name: 'Git / GitHub', category: 'Tools' },
  { id: 'riverpod', name: 'Riverpod', category: 'Tools', relatedProjectIds: ['tracecam'] },
  { id: 'illustration', name: 'Illustration', category: 'Creative Technology', relatedProjectIds: ['khwaab', 'dashavatar', 'panchtatva'] },
  { id: 'comics', name: 'Comic storytelling & paneling', category: 'Creative Technology', relatedProjectIds: ['khwaab'] },
  { id: 'worldbuilding', name: 'World-building', category: 'Creative Technology', relatedProjectIds: ['dashavatar', 'panchtatva'] },
];
