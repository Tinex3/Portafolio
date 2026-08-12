export interface CloudService {
  service: string;
  use: string;
  category: 'Cómputo' | 'Datos' | 'Seguridad' | 'Integración' | 'Observabilidad';
}

export const cloudServices: CloudService[] = [
  {
    service: 'AWS Lambda',
    use: 'Backend basado en funciones serverless que ejecutan APIs, alertas, procesamiento de datos y recordatorios sin depender de un único servidor.',
    category: 'Cómputo',
  },
  {
    service: 'Amazon API Gateway',
    use: 'Capa de entrada para las APIs REST, con reglas de acceso, validación de solicitudes e integración con los servicios internos de la plataforma.',
    category: 'Integración',
  },
  {
    service: 'Amazon Cognito',
    use: 'Gestión segura de usuarios, inicio de sesión, recuperación de acceso y permisos diferenciados para administradores, supervisores y usuarios.',
    category: 'Seguridad',
  },
  {
    service: 'Amazon RDS',
    use: 'Base de datos PostgreSQL administrada para guardar usuarios, dispositivos, mediciones, alertas y reportes con respaldos automáticos.',
    category: 'Datos',
  },
  {
    service: 'AWS Secrets Manager',
    use: 'Protección y rotación de credenciales para que los servicios accedan a la información sin exponer secretos en el código.',
    category: 'Seguridad',
  },
  {
    service: 'Amazon ECR',
    use: 'Almacenamiento y distribución de las imágenes Docker utilizadas para publicar y actualizar los servicios de la plataforma.',
    category: 'Cómputo',
  },
  {
    service: 'Amazon SQS',
    use: 'Colas que reciben temporalmente los datos IoT y permiten procesarlos de forma ordenada, incluso cuando aumenta el volumen de información.',
    category: 'Integración',
  },
  {
    service: 'Amazon SNS + SES',
    use: 'Envío de alertas por email y SMS, junto con reportes y recordatorios automáticos para mantener informados a los usuarios.',
    category: 'Integración',
  },
  {
    service: 'Amazon EventBridge',
    use: 'Automatización de tareas programadas, como recordatorios periódicos y generación de reportes diarios.',
    category: 'Integración',
  },
  {
    service: 'AWS Step Functions',
    use: 'Coordinación del procesamiento de datos desde su recepción hasta la validación, transformación y almacenamiento final.',
    category: 'Integración',
  },
  {
    service: 'Amazon CloudWatch',
    use: 'Monitoreo y métricas centralizadas para detectar errores, revisar el estado de los servicios y visualizar el comportamiento de la plataforma con Prometheus y Grafana.',
    category: 'Observabilidad',
  },
];
