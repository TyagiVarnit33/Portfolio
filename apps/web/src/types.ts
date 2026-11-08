export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  hasCaseStudy: boolean;
  featured: boolean;
  overview: string;
  problem: string;
  role: string;
  techStack: {
    category: string;
    items: string[];
  }[];
  features: string[];
  challengesAndSolutions: {
    challenge: string;
    solution: string;
  }[];
  notes?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    inProjects?: boolean;
  }[];
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  serviceType: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  highlights: string[];
}

export interface ExperienceItem {
  title: string;
  type: string;
  organization: string;
  duration: string;
  description: string;
  skills: string[];
  note?: string;
}
