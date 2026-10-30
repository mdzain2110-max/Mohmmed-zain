export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'cv' | 'nlp' | 'systems';
  categoryLabel: string;
  image: string;
  summary: string;
  architecture: string;
  keyMetrics: { label: string; value: string }[];
  tags: string[];
  dataset: string;
  paperOrRef?: string;
  codeSnippet: string;
  highlights: string[];
  liveDemoUrl?: string;
  githubUrl: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; context: string; level: 'Advanced' | 'Proficient' | 'Working Knowledge' }[];
}

export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  bulletPoints: string[];
  type: 'education' | 'research' | 'leadership';
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  skills: string;
}
