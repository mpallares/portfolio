// TypeScript types for portfolio data

export type ProjectCategory = 'Full Stack' | 'Frontend' | 'Backend';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  /** Headline technologies surfaced in the hero. */
  coreStack: string[];
  email: string;
  location: string;
  yearsOfExperience: number;
  resumeUrl?: string;
}
