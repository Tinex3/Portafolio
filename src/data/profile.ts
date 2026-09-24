export const profile = {
  name: 'Benjamin Delfin Riquelme Gomez',
  shortName: 'Benjamin Riquelme',
  role: 'Software Engineer | Python · React · AWS',
  headline: 'Full Stack + IoT: llevo productos a producción (firmware → API → web → cloud)',
  location: 'Viña del Mar, Valparaíso, Chile',
  availability: 'Disponible · remoto / híbrido en Valparaíso y Santiago',
  email: 'b.riquelme.gomez@gmail.com',
  github: 'https://github.com/Tinex3',
  linkedin: 'https://www.linkedin.com/in/benjamin-delfin-r/',
  cvUrl: '/CV_Benjamin_Riquelme.pdf',
  openTo: ['Full Stack Developer', 'Backend Python', 'IoT / Embedded + Cloud'],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio técnico (lectura y documentación)' },
  ],
} as const;

export const education = [
  {
    institution: 'Instituto Profesional San Sebastian',
    program: 'Ingeniería en Informática',
    period: 'Mar 2025 - Dic 2028 (en curso)',
  },
  {
    institution: 'Universidad Técnica Federico Santa María',
    program: 'Técnico Universitario en Electrónica',
    period: 'Mar 2020 - Dic 2023',
  },
] as const;

export const certifications = [
  'Inmersión en Agentes de IA — Alura + Oracle Next Education (ONE), may. 2026',
] as const;
