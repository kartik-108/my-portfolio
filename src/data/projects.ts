import type { TechnicalProject } from './types';

// Technical / engineering projects. Fields left empty (e.g. links.live)
// are simply hidden by the UI instead of rendering a dead button.
export const projects: TechnicalProject[] = [
  {
    id: 'healthlens',
    title: 'HealthLens',
    category: 'AI / Data Science',
    status: 'In development',
    description:
      'A privacy-first AI healthcare assistant powered by a locally deployed LLM (LLaMA 3.1 via Ollama) early-stage symptom insight without sending health data to the cloud.',
    problem:
      'People often ignore early symptoms due to lack of awareness or limited access to healthcare professionals, and existing digital health tools usually depend on cloud APIs adding latency and raising privacy concerns around sharing sensitive health data with third parties.',
    solution:
      'HealthLens runs LLaMA 3.1 locally through Ollama instead of calling an external API. A user enters symptoms in the frontend, the backend server formats and forwards that input to the local model, and the model\u2019s natural-language response is sent back and displayed all without the data leaving the machine.',
    technologies: ['Python', 'LLaMA 3.1', 'Ollama', 'Machine Learning'],
    features: [
      'Locally deployed LLM no external API calls, offline-capable',
      'Backend server bridges the UI and the model',
      'Natural-language symptom input, structured insight output',
      'Built around low latency and data privacy over raw model scale',
    ],
    accent: 'blue',
    featured: true,
    links: {},
  },
  {
    id: 'careeriq',
    title: 'CareerIQ',
    category: 'AI / Applications',
    status: 'Early concept',
    description:
      'An early-stage idea for an AI-driven resume and career analysis tool Resume Studio, ATS analysis, OCR and an interview-practice studio, planned on top of OCR/vision and RAG.',
    technologies: ['AI / RAG', 'OCR'],
    accent: 'orange',
    featured: true,
    links: {},
  },
  {
    id: 'tracecam',
    title: 'Anant Vyuha — TraceCam',
    shortTitle: 'TraceCam',
    category: 'Creative Technology',
    status: 'V1 live tracing camera built V2 AR canvas detection in progress',
    description:
      'A Flutter app that lets artists trace a reference image onto a physical canvas through a live camera overlay.',
    problem:
      'Tracing references onto paper or canvas by hand is slow and imprecise without a lightbox or projector.',
    solution:
      'A live camera overlay shows the reference artwork directly on top of the physical surface, letting an artist trace naturally.',
    technologies: ['Flutter', 'Riverpod', 'GoRouter', 'OpenCV (planned, V2)'],
    features: [
      'V1 — live tracing camera overlay',
      'V2 — AR canvas detection (OpenCV-based), in progress',
      'V3 — offline AI artist tools: line art, outlines, guides (planned)',
      'Clean repository-pattern architecture, premium dark-theme UI',
    ],
    accent: 'green',
    featured: true,
    links: {},
  },
];
