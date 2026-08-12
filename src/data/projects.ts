import type { Project } from '../types';

export const projects: Project[] = [
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
      'Producto de Tekroy Electrónica para visualizar y gestionar dispositivos de campo desarrollados y comercializados por la empresa. Integra frontend en Next.js, APIs, procesamiento serverless, datos IoT, alertas, reportes y monitoreo con AWS, Prometheus y Grafana.',
    tags: ['Next.js', 'AWS Lambda', 'API Gateway', 'Cognito', 'RDS', 'SQS'],
  },
];
