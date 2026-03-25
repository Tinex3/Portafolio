import type { Skill } from '../types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },

  // Backend
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'Bash Script', category: 'Backend' },

  // Embedded
  { name: 'Arduino', category: 'Embedded' },
  { name: 'ESP32', category: 'Embedded' },
  { name: 'STM32', category: 'Embedded' },
  { name: 'Raspberry Pi', category: 'Embedded' },
  { name: 'LoRaWAN', category: 'Embedded' },
  { name: 'Firmware', category: 'Embedded' },

  // DevOps / Cloud
  { name: 'Docker', category: 'DevOps / Cloud' },
  { name: 'AWS', category: 'DevOps / Cloud' },
  { name: 'Traefik', category: 'DevOps / Cloud' },
  { name: 'Nginx', category: 'DevOps / Cloud' },
  { name: 'Linux', category: 'DevOps / Cloud' },
  { name: 'Git', category: 'DevOps / Cloud' },
];
