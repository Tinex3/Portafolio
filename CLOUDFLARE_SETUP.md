# Configuración para Producción en Cloudflare

## Opción 1: Self-Hosted en tu servidor

Si tu servidor está bajo Cloudflare (DNS apuntando a tu IP), simplemente:

1. **Asegúrate de que el puerto 3000 esté abierto** o que Nginx lo rute correctamente
2. **Configurar en el `config.yaml` de la Raspberry Pi:**

```yaml
api_url: "https://tu-dominio.ejemplo.com/api/stability"
```

El tráfico irá:
```
Raspberry Pi → Cloudflare (DNS) → Tu IP → Nginx (puerto 80/443) → API (puerto 3000)
```

## Opción 2: Cloudflare Workers (Serverless)

Si prefieres una solución sin servidor dentro de Cloudflare:

1. Crea un Worker en Cloudflare Dashboard
2. Connéctalo a tu dominio en la ruta `/api/stability`
3. El Worker puede forwardear a tu backend o directamente a una base de datos

**Ejemplo mínimo de Worker:**

```javascript
export default {
  async fetch(request, env) {
    if (request.method === 'POST' && request.url.includes('/api/stability')) {
      // Forward a tu backend
      return fetch('http://tu-ip-privada:3000/api/stability', {
        method: 'POST',
        headers: request.headers,
        body: request.body
      });
    }
    return new Response('Not Found', { status: 404 });
  }
};
```

## Opción 3: Cloudflare + Túnel (Recomendado)

Para máxima seguridad sin exponer tu IP:

1. Instala `cloudflared` en tu servidor
2. Crea un Cloudflare Tunnel
3. Ruta privado del backend a través del túnel
4. Tu dominio apunta al túnel (no a tu IP)

```bash
# En tu servidor
cloudflared tunnel --url http://localhost:3000 --hostname api.tu-dominio.com
```

Benefit: Tu IP nunca aparece en público, todo va encriptado.

## Seguridad Recomendada

### En Cloudflare Dashboard

1. **Rate Limiting Rule:**
   - Path: `/api/stability`
   - Limit: 60 req/min por IP
   - Action: Challenge o block

2. **WAF Rules:**
   - Requerir `Content-Type: application/json`
   - Bloquear si payload > 1KB

3. **Firewall Rules:**
   ```
   (cf.threat_score > 50) or (cf.bot_management.score < 30)
   → Block
   ```

### En tu backend (servidor/app.js)

Se incluye validación básica. Para producción, agregar:

```javascript
// Agregar a app.js
const API_KEY = process.env.API_KEY || '';

app.post('/api/stability', (req, res, next) => {
  // Validar API Key si existe
  if (API_KEY) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${API_KEY}`) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }
  
  // Rate limiting por device_id
  // ... implementar aquí
  
  next();
});
```

## Monitoreo y Alertas

### Uptime Monitoring

Configura un health check externo:

1. **Upptime.js** (gratis, open-source)
2. **Betterstack** (freemium)
3. **Cloudflare Loadbalancer** (con health checks nativos)

Monitor de ejemplo:
```
curl https://tu-dominio.com/api/health
```

### Alertas en caso de fallo

Si no llegan datos en 5+ minutos desde un dispositivo:

```sql
-- Query para alertar
SELECT device_id, MAX(received_at) as last_record
FROM stability_records
WHERE received_at < NOW() - INTERVAL '5 minutes'
GROUP BY device_id;
```

Integrar con webhooks (Slack, Telegram, etc.)

## HTTPS en producción

Cloudflare automáticamente proporciona SSL/TLS, pero para máxima seguridad:

1. **Flexible SSL** (default): Cloudflare ↔ Usuario (tu servidor HTTP)
2. **Full SSL**: Cloudflare ↔ Usuario (HTTPS), Usuario ↔ Servidor (HTTP)
3. **Full SSL (Strict)**: Ambos HTTPS (requiere certificado válido en tu servidor)

Si usas **Túnel de Cloudflare**, recomienda Strict.

## Backup de Base de Datos

La base de datos está en `/data/db/stability.db`

**Script de backup diario:**

```bash
#!/bin/bash
BACKUP_DIR="/backups/stability"
mkdir -p "$BACKUP_DIR"
DATE=$(date +%Y%m%d_%H%M%S)

docker exec portafolio-api cp /data/db/stability.db /tmp/stability_${DATE}.db
docker cp portafolio-api:/tmp/stability_${DATE}.db "$BACKUP_DIR/stability_${DATE}.db"

# Retener solo últimos 30 días
find "$BACKUP_DIR" -name "stability_*.db" -mtime +30 -delete
```

Agregar a crontab:
```
0 2 * * * /path/to/backup_script.sh
```

## Configuración en Raspberry Pi (config.yaml)

```yaml
# API Backend
api_url: "https://tu-dominio.com/api/stability"
send_interval: 5  # segundos
max_retries: 3
at_http_timeout: 30  # segundos

# Opcional: API Key si lo agregaste
api_key: "tu-token-secreto"
```

---

**Resumen:**
- ✅ Tu servidor + Docker: Totalmente autohospedado
- ✅ Cloudflare como DNS/CDN: Caching y DDoS protection
- ✅ Opcional: Túnel Cloudflare para privacidad de IP
- ✅ Rate limiting en Cloudflare
- ✅ Backups automáticos
