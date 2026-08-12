import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Desarrollador Web Full Stack',
    period: 'Sep 2024 — Presente',
    description:
      'Diseño, desarrollo y mantenimiento de plataformas para gestionar y monitorear dispositivos IoT. Implemento APIs en Python y Java, interfaces en React y Next.js, monitoreo local con Prometheus y Grafana, y arquitecturas AWS serverless.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Python', 'Java', 'FastAPI', 'Flask', 'Prometheus', 'Grafana', 'AWS Lambda'],
  },
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Desarrollador de Sistemas Embebidos',
    period: 'Abr 2024 — 2026',
    description:
      'Diseño e integración de firmware para STM32, ESP32 y Arduino. Desarrollo de controladores y comunicaciones UART, SPI, I2C y RS-485/Modbus RTU, además de soluciones con FreeRTOS, LoRaWAN y LTE.',
    technologies: ['C/C++', 'STM32', 'ESP32', 'FreeRTOS', 'Modbus RTU', 'LoRaWAN', 'LTE', 'PlatformIO'],
  },
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Técnico Electrónico',
    period: 'Feb 2024 — 2026',
    description:
      'Integración y validación de hardware, diagnóstico de fallas, pruebas funcionales y soporte técnico en colaboración con equipos de electrónica y software.',
    technologies: ['Electrónica', 'KiCad', 'STM32CubeIDE', 'Arduino IDE', 'Git'],
  },
];
