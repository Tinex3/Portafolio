import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Desarrollador Web Full Stack',
    period: 'Ago 2025 — Presente',
    description:
      'Desarrollo de plataformas web con React y APIs en FastAPI/Flask. Dashboards de monitoreo, integración con servicios IoT y despliegue en AWS con Docker y Traefik.',
    technologies: ['React', 'Python', 'FastAPI', 'Flask', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Desarrollador de Sistemas Embebidos',
    period: 'Feb 2024 — Ago 2025',
    description:
      'Desarrollo de firmware para dispositivos IoT con ESP32, STM32 y Arduino. Integración de sensores, comunicación LoRaWAN y prototipado con Raspberry Pi.',
    technologies: ['ESP32', 'STM32', 'Arduino', 'C/C++', 'LoRaWAN', 'Raspberry Pi'],
  },
];
