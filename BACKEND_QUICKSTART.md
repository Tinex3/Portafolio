# API de Estabilidad - Guía de Inicio Rápido

## 📋 Resumen

Se agregó un servidor **Node.js/Express** al proyecto que recibe y persiste datos de estabilidad de red desde Raspberry Pi con módulos SIMCom. La arquitectura es:

```
Raspberry Pi → HTTP POST a /api/stability → Nginx (proxy) → Express API → SQLite
```

## 🚀 Inicio Rápido

### Con Docker (recomendado)

```bash
# Build y start
docker-compose up -d

# Ver logs de la API
docker-compose logs -f api

# Ver logs del web
docker-compose logs -f web

# Probar la API
bash server/test-api.sh
```

La aplicación estará en:
- **Frontend**: http://localhost:5876
- **API Health**: http://localhost:5876/api/health
- **API directo**: http://localhost:3000 (interno, no expuesto)

### Desarrollo local

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd server
npm install
npm run dev
```

## 📡 Configurar la Raspberry Pi

En `config.yaml` de tu Raspberry Pi:

```yaml
device_id: "sim_rpi_001"
api_url: "http://tu-ip-o-dominio:5876/api/stability"  # O https:// si usas TLS
send_interval: 5
api_key: ""  # Si agregaste autenticación
```

## 📊 Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/stability` | Recibir datos (requerido por Raspberry Pi) |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/stability/:device_id` | Historial de un dispositivo |
| `GET` | `/api/stats` | Estadísticas globales |

## 💾 Base de datos

- **Motor**: SQLite
- **Ubicación**: `/data/db/stability.db` (volumen Docker)
- **Tabla**: `stability_records` (se crea automáticamente)

## 🔍 Testing

```bash
# Test manual (requiere curl y jq)
bash server/test-api.sh http://localhost:5876 sim_rpi_001

# O solo health check
curl http://localhost:5876/api/health
```

## 🌐 Desplegar en Cloudflare

Ver [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) para opciones completas.

**Opción recomendada:**
1. Tu dominio → Cloudflare (DNS + SSL)
2. Tu servidor → Docker (API + Frontend)
3. Raspberry Pi → `https://tu-dominio.com/api/stability`

## 📁 Estructura de archivos

```
server/
  ├── app.js                # Express app principal
  ├── package.json          # Dependencias Node.js
  ├── Dockerfile            # Build del servidor
  ├── .dockerignore         # Archivos a ignorar en Docker
  ├── README.md             # Documentación del backend
  ├── test-api.sh           # Script de testing
  └── .gitignore            # Git ignore
```

## ⚙️ Modificar comportamiento

### Agregar autenticación por API Key

En `server/app.js`, descomentar la validación:

```javascript
const API_KEY = process.env.API_KEY || '';

// En el endpoint POST /api/stability
if (API_KEY) {
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${API_KEY}`) {
    return res.status(403).json({ error: 'Forbidden' });
  }
}
```

Luego en `docker-compose.yml`:

```yaml
services:
  api:
    environment:
      - API_KEY=tu-token-secreto
```

### Cambiar puerto

En `docker-compose.yml`:
```yaml
api:
  ports:
    - "3000:3000"  # Cambiar primer número (externo)
```

### Cambiar intervalo de health check

En `docker-compose.yml`:
```yaml
healthcheck:
  interval: 60s  # Cambiar esto
```

## 🔒 Seguridad en Producción

En Cloudflare Dashboard:

1. **Rate Limiting**: `/api/stability` → 60 req/min
2. **WAF**: Requerir `Content-Type: application/json`
3. **Firewall**: Bloquear bots y IPs maliciosas

Ver [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) para detalles.

## 📈 Monitoreo y métricas

Endpoints útiles:

```bash
# Estadísticas por dispositivo
curl http://localhost:5876/api/stats | jq .

# Últimos 100 registros de un dispositivo
curl "http://localhost:5876/api/stability/sim_rpi_001?limit=100" | jq .

# Últimos 10 (default)
curl http://localhost:5876/api/stability/sim_rpi_001 | jq .
```

## ❓ Troubleshooting

### El container no inicia

```bash
docker-compose down
docker-compose up -d --build
docker-compose logs api
```

### Base de datos corrupta

```bash
docker-compose down
docker volume rm portafolio_stability_data
docker-compose up -d
```

### Raspberry Pi no puede conectarse

1. Verifica que `api_url` sea correcto y accesible
2. Prueba manualmente: `curl -X POST http://tu-url/api/stability -H "Content-Type: application/json" -d '{"device_id":"test"...}'`
3. Revisa los logs: `docker-compose logs nginx`

### Rendimiento lento

Si tienes muchos registros, optimiza queries:

```sql
-- En el container
sqlite3 /data/db/stability.db

-- Limpiar registros antiguos
DELETE FROM stability_records WHERE received_at < datetime('now', '-30 days');
VACUUM;

-- Ver tamaño
SELECT COUNT(*) FROM stability_records;
```

## 📚 Más información

- [Backend API Spec](BACKEND_API_SPEC.md) - Especificación completa
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Express.js Guide](https://expressjs.com/)
- [Cloudflare Docs](https://developers.cloudflare.com/)

---

**¿Necesitas ayuda?** Revisa los logs:
```bash
docker-compose logs -f
```
