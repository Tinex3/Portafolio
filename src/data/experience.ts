import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Programador Full Stack',
    period: 'Feb 2024 — Presente',
    location: 'Chile',
    modality: 'Presencial · IoT en producción',
    description:
      'Progresión interna desde Técnico Electrónico a Firmware y luego a Full Stack. Responsable de plataforma IoT en producción: ingesta continua de dispositivos, APIs, frontend en tiempo real e infraestructura AWS.',
    achievements: [
      'Plataforma con 53 dispositivos en campo, ingesta cada 5 min, 100 usuarios y 98% uptime',
      'APIs en Python (Flask, FastAPI) + WebSockets en tiempo real y frontend React/TypeScript',
      'Infraestructura AWS serverless + Docker/Linux: despliegues versionados con rollback',
      'Integración de campo: Raspberry Pi, LoRaWAN, LTE y Modbus RTU (UART/SPI/I2C, RS-485)',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Flask', 'PostgreSQL', 'Docker', 'AWS Lambda'],
  },
  {
    company: 'Tekroy Electrónica LTDA',
    role: 'Desarrollador de Firmware (base de la progresión)',
    period: 'Feb 2024 — Dic 2024',
    location: 'Chile',
    modality: 'Firmware y laboratorio',
    description:
      'Base electrónica que hoy me permite integrar hardware, firmware y cloud sin fricción: del protocolo al dashboard.',
    achievements: [
      'Firmware para STM32, ESP32 y Arduino con comunicaciones UART, SPI, I2C y RS-485/Modbus RTU',
      'Soluciones con FreeRTOS, LoRaWAN y LTE para telemetría en campo',
      'Diagnóstico hardware/software: osciloscopio, lógica de sensores y actuadores',
    ],
    technologies: ['C/C++', 'STM32', 'ESP32', 'FreeRTOS', 'Modbus RTU', 'LoRaWAN', 'LTE', 'PlatformIO'],
  },
];
