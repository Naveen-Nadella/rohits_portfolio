export interface Project {
  id: string;
  title: string;
  subtitle: string;
  sealCode: string;
  category: 'Web & Frontend' | 'Web Application' | 'Full-Stack' | 'Frontend' | 'Systems';
  description: string;
  longDescription: string;
  problemSolved: string;
  architecture: string;
  technologies: string[];
  keyFeatures: string[];
  challenges: string[];
  solutions: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  sealCode: string;
  description: string;
  skills: {
    name: string;
    level: string;
    description: string;
    featured?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  year: string;
  sealCode: string;
  title: string;
  organization: string;
  type: 'experience' | 'education';
  grade?: string;
  summary: string;
  highlights: string[];
  technologies?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  sealCode: string;
  skills: string[];
  description: string;
  credentialUrl?: string;
}

export interface PersonalInfo {
  name: string;
  monogram: string;
  title: string;
  subtitle: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  bio: string[];
  cgpa: string;
  university: string;
}
