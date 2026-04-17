# ✅ Implementación de Backend API - Resumen Completo

## 🎯 Qué se implementó

Se agregó un **servidor Node.js/Express** a tu proyecto Portafolio que actúa como receptor de datos de estabilidad de red desde Raspberry Pi. La solución es:

- ✅ **Producción-ready**: Validación, manejo de errores, logs
- ✅ **Containerizado**: Funciona con Docker y docker-compose
- ✅ **Escalable**: Separado del frontend, fácil de expandir
- ✅ **Persistente**: SQLite con índices optimizados
- ✅ **Monitorable**: Endpoints para consultas y estadísticas
- ✅ **Seguro**: Validación de payload, compatible con Cloudflare

---

## 📁 Archivos creados / modificados

### Nuevo servidor backend (`/server`)

| Archivo | Propósito |
|---------|-----------|
| `server/app.js` | Aplicación Express principal (6.4 KB, 250 líneas) |
| `server/package.json` | Dependencias de Node.js |
| `server/Dockerfile` | Build del contenedor API |
| `server/.dockerignore` | Archivos a ignorar en Docker |
| `server/.gitignore` | Git ignore para Node.js |
| `server/README.md` | Documentación técnica del backend |
| `server/test-api.sh` | Script de testing de endpoints |
| `server/send-data.sh` | Script para enviar datos manualmente |
| `server/example-rpi-config.yaml` | Ejemplo de config para Raspberry Pi |
| `server/install.sh` | Script de instalación |

**Total:** 9 archivos nuevos

### Configuración Docker actualizada

| Archivo | Cambios |
|---------|---------|
| `docker-compose.yml` | ✏️ Agregado servicio `api`, volume `stability_data`, health checks |
| `nginx/nginx.conf` | ✏️ Agregado proxy a `/api/` hacia Express backend |

### Documentación nueva

| Archivo | Contenido |
|---------|----------|
| `BACKEND_QUICKSTART.md` | Guía rápida de inicio (este archivo) |
| `CLOUDFLARE_SETUP.md` | Deployment en Cloudflare con opciones avanzadas |
| `BACKEND_API_SPEC.md` | (Proporcionado por ti) Especificación completa |

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    Raspberry Pi + SIMCom                     │
│                   (config.yaml apunta a)                    │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP POST /api/stability
                           │ (JSON con datos de red)
                           ▼
        ┌──────────────────────────────────────┐
        │     Tu servidor en internet           │
        │  (Cloudflare DNS o directo)           │
        │                                       │
        │  puerto 5876 → Nginx (reverse proxy)  │
        │                 ↓                     │
        │              /api/* → Express API     │
        │              /* → React SPA            │
        └──────────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
        ┌─────────────────┐   ┌──────────────────┐
        │ /data/db/       │   │ /usr/share/nginx │
        │ stability.db    │   │ /html (React)    │
        │ (SQLite)        │   │                  │
        └─────────────────┘   └──────────────────┘
```

### Componentes

1. **Express API** (puerto 3000, interno)
   - Recibe POST en `/api/stability`
   - Valida payload JSON
   - Inserta en SQLite
   - Responde 200 OK en < 30s

2. **Nginx** (puerto 80, público)
   - Sirve React frontend
   - Proxy `/api/*` al Express
   - Cache de assets estáticos
   - Headers de seguridad

3. **SQLite** (volumen Docker)
   - Tabla `stability_records`
   - Índices en device_id + timestamp
   - Backups recomendados cada 24h

4. **React SPA** (frontend existente)
   - Sin cambios
   - Se sirve a través de Nginx

---

## ✨ Características implementadas

### Endpoint principal
```
POST /api/stability
Content-Type: application/json
```

**Campos validados:**
- `device_id`: string (1-64 caracteres)
- `timestamp`: ISO 8601 UTC
- `csq`: integer 0-31 o null
- `network`: string (1-64 caracteres)
- `network_type`: string (1-32 caracteres)
- `registered`: boolean
- `uptime_sec`: integer ≥ 0
- `attempt`: integer ≥ 1

**Respuesta exitosa:** `200 OK { "status": "ok", "id": 123 }`

### Endpoints adicionales

```
GET /api/health
├─ Respuesta: { "status": "ok", "timestamp": "..." }
└─ Propósito: Health check para Docker

GET /api/stability/:device_id
├─ Parámetros: ?limit=100 (default 100)
├─ Respuesta: Array de registros ordenados por timestamp DESC
└─ Propósito: Historial de un dispositivo

GET /api/stats
├─ Respuesta: Array con agrupación por device_id
├─ Campos: total_records, last_record, avg_csq, registered_count
└─ Propósito: Dashboard y monitoreo
```

---

## 🚀 Cómo correr

### 1. Con Docker (recomendado)

```bash
cd /home/benjamin/Documentos/Github/Personal/Portafolio

# Build y start
docker-compose up -d

# Ver estado
docker-compose ps

# Logs en tiempo real
docker-compose logs -f
```

**Acceso:**
- Frontend: http://localhost:5876
- API: http://localhost:5876/api/...
- API directo (si necesitas): http://localhost:3000

### 2. Desarrollo local

```bash
# Terminal 1: Frontend
npm run dev                # Corre en http://localhost:5173

# Terminal 2: Backend
cd server
npm install
npm run dev              # Corre en http://localhost:3000
```

**Nota:** En desarrollo local, la Raspberry Pi debe apuntar a `http://your-machine-ip:3000` o ambos:3000.

### 3. Testing

```bash
# Script automático (requiere curl + jq)
bash server/test-api.sh http://localhost:5876 sim_rpi_001

# O manual
curl -X POST http://localhost:5876/api/stability \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "sim_rpi_test",
    "timestamp": "2026-04-16T14:23:07.412Z",
    "csq": 22,
    "network": "registrado",
    "network_type": "LTE",
    "registered": true,
    "uptime_sec": 7200,
    "attempt": 1
  }'
```

---

## 📡 Configurar Raspberry Pi

Edita `config.yaml` en tu Raspberry Pi:

```yaml
device_id: "sim_rpi_001"
api_url: "http://tu-ip-o-dominio:5876/api/stability"
send_interval: 5
max_retries: 3
at_http_timeout: 30
```

O ve el archivo de ejemplo: `server/example-rpi-config.yaml`

---

## 🌐 Desplegar en Cloudflare

Ver [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) para opciones:

1. **Self-hosted + Cloudflare DNS**: Tu servidor actúa como backend
2. **Cloudflare Workers**: Serverless (sin código o mínimo)
3. **Cloudflare Tunnel**: Privacidad de IP completa

**Recomendación:** Opción 3 para máxima seguridad.

---

## 🔒 Seguridad

### Backend valida automáticamente:
- ✅ Content-Type debe ser `application/json`
- ✅ Todos los campos obligatorios deben existir
- ✅ Tipos de datos correctos
- ✅ Rangos de valores (ej: csq 0-31)

### Recomendaciones en Cloudflare:
- Rate limiting: 60 req/min por IP
- WAF: Requerir Content-Type válido
- Firewall: Bloquear bots
- Optional: API Key en header `Authorization`

---

## 💾 Base de datos

### Tabla `stability_records`

```sql
id:          INTEGER PRIMARY KEY (autoincrement)
device_id:   VARCHAR(64) NOT NULL
timestamp:   DATETIME (del payload, hora del dispositivo)
received_at: DATETIME (hora del servidor, DEFAULT NOW())
csq:         SMALLINT (puede ser NULL)
network:     VARCHAR(64)
network_type: VARCHAR(32)
registered:  BOOLEAN
uptime_sec:  INTEGER
attempt:     SMALLINT
source_ip:   VARCHAR(45) (IP del cliente)
```

### Índices

```sql
CREATE INDEX idx_device_id_timestamp ON stability_records (device_id, timestamp DESC);
CREATE INDEX idx_timestamp ON stability_records (timestamp DESC);
```

**Ubicación:** `/data/db/stability.db` (volumen Docker)

**Backup recomendado:** Diario con retención de 30 días

---

## 📊 Ejemplos de uso

### Consultar últimos registros

```bash
curl "http://localhost:5876/api/stability/sim_rpi_001?limit=50" | jq '.[] | {timestamp, csq, network_type}'
```

### Ver estadísticas

```bash
curl http://localhost:5876/api/stats | jq '.[] | {device_id, total_records, avg_csq, last_record}'
```

### Insertar datos manualmente

```bash
bash server/send-data.sh http://localhost:5876 sim_rpi_lab01 25 true
```

---

## 🐛 Troubleshooting

### El container API no inicia

```bash
docker-compose logs api
docker-compose down
docker-compose up -d --build
```

### Error de conexión desde Raspberry Pi

1. ¿La URL es correcta? `curl -v http://tu-url/api/health`
2. ¿El firewall permite? `sudo ufw allow 5876/tcp`
3. ¿El backend está corriendo? `docker-compose ps`

### Base de datos corrupta

```bash
docker-compose down
docker volume rm portafolio_stability_data
docker-compose up -d
```

### Rendimiento lento

Si tienes 100k+ registros:

```bash
# Limpiar registros antiguos
docker exec portafolio-api sqlite3 /data/db/stability.db
> DELETE FROM stability_records WHERE received_at < datetime('now', '-90 days');
> VACUUM;
> .exit

# O ver tamaño
docker exec portafolio-api sqlite3 /data/db/stability.db "SELECT COUNT(*) FROM stability_records;"
```

---

## 📚 Archivos de referencia

- **[BACKEND_QUICKSTART.md](BACKEND_QUICKSTART.md)** - Esta guía
- **[CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)** - Deployment opciones
- **[server/README.md](server/README.md)** - Documentación técnica del servidor
- **[server/example-rpi-config.yaml](server/example-rpi-config.yaml)** - Config ejemplo RPi
- **[docker-compose.yml](docker-compose.yml)** - Configuración de contenedores
- **[nginx/nginx.conf](nginx/nginx.conf)** - Configuración de reverse proxy

---

## ✅ Checklist de setup

- [ ] Ejecutar `docker-compose up -d`
- [ ] Verificar que ambos contenedores initien (`docker-compose ps`)
- [ ] Probar API: `curl http://localhost:5876/api/health`
- [ ] Configurar Raspberry Pi con la URL correcta
- [ ] Enviar primer payload de prueba
- [ ] Verificar que aparece en `/api/stats`
- [ ] Configurar Cloudflare (si usas)
- [ ] Configurar rate limiting en Cloudflare
- [ ] Agendar backups automáticos de base de datos

---

## 💬 Preguntas frecuentes

**¿Puedo cambiar el puerto?**
Sí, en `docker-compose.yml`: `ports: - "8080:80"` (cambia 8080)

**¿Puedo usar PostgreSQL en vez de SQLite?**
Sí, reemplaza sqlite3 por `pg` en `package.json` y actualiza `app.js`

**¿Soporta HTTPS?**
Cloudflare maneja HTTPS. Internamente es HTTP (suficiente en Docker)

**¿Puedo agregar autenticación?**
Sí, agregar validación de API Key en `app.js` (ver comments)

**¿Cuántos datos puedo guardar?**
SQLite soporta hasta TB si lo configurar bien. 1 dispositivo cada 5s ≈ 0.5GB/año

**¿Puedo acceder a la base de datos?**
Sí: `docker exec portafolio-api sqlite3 /data/db/stability.db`

---

## 🎓 Próximos pasos opcionales

1. **Dashboard web:** Agregar página React para visualizar datos
2. **Alertas:** Webhook a Slack si un dispositivo no reporta en 10 min
3. **API Key:** Agregar autenticación por token
4. **Métricas:** Integrar con Prometheus/Grafana
5. **Histórico:** Script que archive registros > 90 días
6. **Análisis:** ML para detectar anomalías en señal

---

**Versión:** 1.0  
**Fecha:** 16 de abril de 2026  
**Estado:** ✅ Lista para producción
