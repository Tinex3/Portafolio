import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Chat Privado en Tiempo Real',
    description:
      'App de chat full stack con WebSockets, salas de chat, historial persistente con paginación por cursor, indicador de "escribiendo..." y usuarios en línea. Auth con JWT. Desplegable en EC2 con SSL automático vía Traefik.',
    tags: ['FastAPI', 'WebSockets', 'React', 'PostgreSQL', 'Docker', 'Traefik'],
    liveUrl: 'https://chat.benrigom.site/',
    repoUrl: 'https://github.com/Tinex3/chat',
  },
  {
    id: 2,
    title: 'Router 4G LTE con Raspberry Pi',
    description:
      'Router LTE profesional basado en Quectel EC25 + Raspberry Pi. WAN auto-failover (Ethernet/LTE), WiFi Access Point, panel web con métricas en tiempo real, speedtest integrado, firewall/NAT con iptables, watchdog con auto-recovery e instalación automatizada con systemd.',
    tags: ['Raspberry Pi', 'Python', 'Flask', 'Bash', 'Linux', 'Networking'],
    repoUrl: 'https://github.com/Tinex3/RPI_Router_4G',
  },
  {
    id: 3,
    title: 'Control de Invernadero — Expotec 2023',
    description:
      'Sistema de monitoreo y control de invernadero con ESP32. Sensores de temperatura (LM35, DHT11) y humedad de suelo, actuadores (bomba + ventiladores) con modo automático. API REST/WebSocket embebida y dashboard en Streamlit con gráficas en tiempo real. Presentado en la Expotec UTFSM.',
    tags: ['ESP32', 'C++', 'PlatformIO', 'FastAPI', 'Streamlit', 'Docker'],
    repoUrl: 'https://github.com/Tinex3/Contro-de-invernadero-Expotec-2023',
  },
  {
    id: 4,
    title: 'Dashboard de Gestión',
    description:
      'Panel de administración con React y Tailwind CSS. Backend en Flask con PostgreSQL. Autenticación, roles, gráficos interactivos y exportación de reportes.',
    tags: ['React', 'Flask', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
  },
];
