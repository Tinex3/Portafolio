export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  context?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  highlights?: string[];
  metrics?: string[];
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend & APIs' | 'Datos' | 'Embedded' | 'DevOps / Cloud';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  modality?: string;
  description: string;
  achievements?: string[];
  technologies: string[];
}
