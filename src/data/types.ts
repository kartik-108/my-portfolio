// Centralized content models.
// Edit the files in this folder to change what appears on the site —
// components read from here and render automatically. Add or remove
// an item and the UI adapts; nothing needs to be touched elsewhere.

export interface Stat {
  id: string;
  label: string;
  value: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  handle?: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  stage: string; // short phase label, e.g. "ORIGIN", "BUILD", "NOW"
  title: string;
  description: string;
  tags?: string[];
}

export interface TechnicalProject {
  id: string;
  title: string;
  shortTitle?: string; // used in tight UI like the universe nav
  category: string;
  year?: string;
  status?: string; // e.g. "In development", "Shipped", "Prototype"
  description: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  features?: string[];
  images?: string[];
  links?: {
    github?: string;
    live?: string;
  };
  accent: 'blue' | 'green' | 'orange' | 'red';
  featured?: boolean;
}

export interface CreativeProject {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year?: string;
  status?: string;
  description: string;
  longDescription?: string;
  details?: { label: string; value: string }[];
  tags?: string[];
  images?: string[];
  links?: { read?: string; instagram?: string; external?: string };
  accent: 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  link?: string;
  images?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Web' | 'AI / Data' | 'Tools' | 'Creative Technology';
  relatedProjectIds?: string[];
}

export interface CurrentlyItem {
  id: string;
  kind: 'building' | 'learning' | 'exploring';
  title: string;
  description: string;
}

export interface IdentityNode {
  id: string;
  label: string;
  description: string;
}
