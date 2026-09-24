import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 5,
    title: 'Dashboard IoT — Parcela (riego + seguridad)',
    context: 'Proyecto destacado · en producción',
    description:
      'Sistema de parcela en producción: riego de precisión (sensor NPK + ET + Open-Meteo) y seguridad exterior (PIR LoRaWAN con bloque horario). Pipeline punta a punta: Heltec LoRaWAN → The Things Stack self-hosted → webhook FastAPI → PostgreSQL → Next.js.',
    tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'LoRaWAN', 'TTS', 'Docker'],
    liveUrl: 'https://dashboard.benrigom.site/dashboard/hogar',
    repoUrl: 'https://github.com/Tinex3/Dashaboard-iot',
    featured: true,
    metrics: ['En producción', 'Riego + seguridad', 'Deploy con rollback'],
    highlights: [
      'Problema: riego manual y sin visibilidad del campo',
      'Solución: telemetría LoRaWAN + modelo ET + dashboard Next.js',
      'Resultado: decisiones de riego con datos y alertas de seguridad por horario',
    ],
  },
  {
    id: 1,
    title: 'Chat Privado en Tiempo Real',
    context: 'Full Stack · WebSockets',
    description:
      'App de chat full stack con salas, historial persistente con paginación por cursor, indicador de "escribiendo..." y usuarios en línea. Auth con JWT. Desplegable en EC2 con SSL automático vía Traefik.',
    tags: ['FastAPI', 'WebSockets', 'React', 'PostgreSQL', 'Docker', 'Traefik'],
    liveUrl: 'https://chat.benrigom.site/',
    repoUrl: 'https://github.com/Tinex3/chat',
    metrics: ['Demo en vivo', 'Tiempo real', 'Auth JWT'],
    highlights: [
      'WebSockets con presencia y paginación por cursor',
      'Backend FastAPI + PostgreSQL contenerizado',
      'Deploy reproducible con Traefik + SSL',
    ],
  },
  {
    id: 4,
    title: 'Plataforma IoT para dispositivos de campo',
    context: 'Producto profesional · Tekroy Electrónica',
    description:
      'Producto para visualizar y gestionar 53 dispositivos de campo con ingesta cada 5 minutos, 100 usuarios y 98% uptime. APIs en Python con WebSockets en tiempo real, frontend React/TypeScript, PostgreSQL e infraestructura AWS.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker'],
    metrics: ['53 dispositivos', '100 usuarios', '98% uptime'],
    highlights: [
      'Ingesta cada 5 minutos con colas y procesamiento ordenado',
      'Dashboards en tiempo real + alertas por email/SMS',
      'AWS serverless: Lambda, API Gateway, RDS, SQS/SNS, CloudWatch',
    ],
  },
  {
    id: 2,
    title: 'Router LTE y Gateway LoRaWAN para Raspberry Pi',
    context: 'Firmware e infraestructura',
    description:
      'Firmware para Raspberry Pi 4 con módulo Quectel EC25: red WiFi Access Point + gateway LoRaWAN configurable por el usuario. Automatiza conectividad y reduce errores y tiempo de puesta en marcha.',
    tags: ['Raspberry Pi 4', 'EC25', 'LTE', 'LoRaWAN', 'Linux', 'Bash'],
    repoUrl: 'https://github.com/Tinex3/RPI_Router_4G',
    metrics: ['Hardware real', 'LTE + LoRaWAN', 'Setup automatizado'],
    highlights: [
      'AP WiFi + gateway LoRaWAN en un solo equipo',
      'Scripts de aprovisionamiento que evitan configuración manual',
      'Pensado para despliegues de campo repetibles',
    ],
  },
  {
    id: 3,
    title: 'Control de Invernadero — Expotec 2023',
    context: 'Proyecto académico · Expotec UTFSM 2023',
    description:
      'Prototipo presentado en la Expotec 2023 (UTFSM): ESP32 con sensores de temperatura y humedad, bomba de riego y ventiladores con lógica On-Off, más visualización de datos.',
    tags: ['ESP32', 'C++', 'PlatformIO', 'Control On-Off', 'Sensores', 'Streamlit'],
    repoUrl: 'https://github.com/Tinex3/Contro-de-invernadero-Expotec-2023',
    metrics: ['Presentado en feria', 'ESP32', 'Control On-Off'],
    highlights: [
      'Sensado y actuación con ESP32 + PlatformIO',
      'Lógica de control clara y demostrable en vivo',
      'Puente a software: visualización con Streamlit',
    ],
  },
];
