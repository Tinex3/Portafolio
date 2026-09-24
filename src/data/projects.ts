import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 5,
    title: 'Dashboard IoT — Parcela (riego + seguridad)',
    context: 'Proyecto destacado | FastAPI + Next.js + LoRaWAN',
    description:
      'Sistema de parcela en producción: riego de precisión (sensor NPK + ET + Open-Meteo) y seguridad exterior (PIR LoRaWAN con bloque horario). Pipeline punta a punta verificado: Heltec LoRaWAN → The Things Stack self-hosted → webhook FastAPI → PostgreSQL → Next.js. Deploy versionado con rollback y backup diario.',
    tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'LoRaWAN', 'TTS', 'Docker'],
    liveUrl: 'https://dashboard.benrigom.site/dashboard/hogar',
    repoUrl: 'https://github.com/Tinex3/Dashaboard-iot',
  },
  {
    id: 1,
    title: 'Chat Privado en Tiempo Real',
    context: 'Proyecto personal',
    description:
      'App de chat full stack con WebSockets, salas de chat, historial persistente con paginación por cursor, indicador de "escribiendo..." y usuarios en línea. Auth con JWT. Desplegable en EC2 con SSL automático vía Traefik.',
    tags: ['FastAPI', 'WebSockets', 'React', 'PostgreSQL', 'Docker', 'Traefik'],
    liveUrl: 'https://chat.benrigom.site/',
    repoUrl: 'https://github.com/Tinex3/chat',
  },
  {
    id: 2,
    title: 'Router LTE y Gateway LoRaWAN para Raspberry Pi',
    context: 'Firmware e infraestructura',
    description:
      'Firmware para Raspberry Pi 4 que utiliza un módulo Quectel EC25 para entregar una red WiFi Access Point y distribuir una red LoRaWAN configurable por el usuario. Automatiza la configuración de conectividad, reduciendo errores y tiempo de puesta en marcha.',
    tags: ['Raspberry Pi 4', 'EC25', 'LTE', 'LoRaWAN', 'Linux', 'Bash'],
    repoUrl: 'https://github.com/Tinex3/RPI_Router_4G',
  },
  {
    id: 3,
    title: 'Control de Invernadero — Expotec 2023',
    context: 'Proyecto académico | Expotec UTFSM 2023',
    description:
      'Prototipo de control de invernadero desarrollado para una actividad académica y presentado durante la Expotec 2023, feria tecnológica de la Universidad Técnica Federico Santa María. Utiliza un ESP32, sensores de temperatura y humedad, una bomba de riego y ventiladores controlados mediante lógica On-Off.',
    tags: ['ESP32', 'C++', 'PlatformIO', 'Control On-Off', 'Sensores', 'Streamlit'],
    repoUrl: 'https://github.com/Tinex3/Contro-de-invernadero-Expotec-2023',
  },
  {
    id: 4,
    title: 'Plataforma IoT para dispositivos de campo',
    context: 'Producto profesional | Tekroy Electrónica',
    description:
      'Producto de Tekroy Electrónica para visualizar y gestionar 53 dispositivos de campo con ingesta cada 5 minutos, 100 usuarios y 98% uptime. APIs en Python (Flask, FastAPI) con WebSockets en tiempo real, frontend en React/TypeScript, PostgreSQL e infraestructura AWS con Docker/Linux.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker'],
  },
];
