export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Embedded' | 'DevOps / Cloud';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}
