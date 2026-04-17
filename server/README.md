# Backend - API de Estabilidad de Red

## Descripción

Servidor Express.js que recibe y persiste registros de estabilidad de red desde dispositivos Raspberry Pi con módulos SIMCom.

## Endpoints

- `POST /api/stability` - Recibir datos de estabilidad (requerido por Raspberry Pi)
- `GET /api/health` - Health check
- `GET /api/stability/:device_id` - Obtener últimos registros de un dispositivo
- `GET /api/stats` - Obtener estadísticas de todos los dispositivos

## Variables de Entorno

- `PORT` - Puerto de escucha (default: 3000)

## Base de Datos

- SQLite en `/data/db/stability.db`
- Tabla: `stability_records`
- Índices en `device_id, timestamp` y `timestamp`

## Validación

El servidor valida automáticamente:
- Campos obligatorios
- Tipos de datos
- Rangos de valores (ej: csq 0-31 o null)

## Docker

```bash
# Build
docker build -t stability-backend ./server

# Run
docker run -p 3000:3000 -v stability_data:/data/db stability-backend
```

## Ejemplo de Request

```bash
curl -X POST http://localhost:5876/api/stability \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "sim_rpi_001",
    "timestamp": "2026-04-16T14:23:07.412Z",
    "csq": 22,
    "network": "registrado, red doméstica",
    "network_type": "LTE",
    "registered": true,
    "uptime_sec": 7200,
    "attempt": 1
  }'
```

## Logs

```bash
docker-compose logs api
```
