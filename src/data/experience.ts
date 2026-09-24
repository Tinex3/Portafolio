import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Programador Full Stack',
    period: 'Feb 2024 — Presente',
    description:
      'Progresión interna desde Técnico Electrónico a Firmware a Full Stack. Desarrollo y mantenimiento de plataforma IoT en producción con 53 dispositivos, ingesta cada 5 minutos, 100 usuarios y 98% uptime. APIs en Python (Flask, FastAPI) con WebSockets en tiempo real, frontend en React/TypeScript con PostgreSQL, e infraestructura AWS con Docker/Linux. Integración de Raspberry Pi, LoRaWAN, LTE y Modbus RTU.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Python', '.NET', 'FastAPI', 'Flask', 'PostgreSQL', 'Docker', 'AWS Lambda'],
  },
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Desarrollador de Firmware',
    period: 'Feb 2024 — Presente',
    description:
      'Diseño e integración de firmware para STM32, ESP32 y Arduino. Desarrollo de controladores y comunicaciones UART, SPI, I2C y RS-485/Modbus RTU, además de soluciones con FreeRTOS, LoRaWAN y LTE.',
    technologies: ['C/C++', 'STM32', 'ESP32', 'FreeRTOS', 'Modbus RTU', 'LoRaWAN', 'LTE', 'PlatformIO'],
  },
];
