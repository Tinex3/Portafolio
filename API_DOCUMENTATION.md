# Network Stability API - Technical Documentation

## 📋 Overview

API REST para recopilar y consultar datos de estabilidad de red desde dispositivos embebidos (Raspberry Pi, módems 4G/LTE, etc).

**Base URL:**
- Producción: `https://benrigom.site/api`
- Desarrollo: `http://localhost:3000/api`
- Local: `http://192.168.1.37:3000/api` (red local)

**API Version:** 1.0  
**Protocol:** HTTP/HTTPS  
**Content-Type:** `application/json`

---

## 🔌 Endpoints

### 1. Health Check
Verifica que el servidor API esté funcionando.

```
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-04-17T14:30:45.123Z"
}
```

---

### 2. Enviar Datos de Estabilidad (Principal)
Endpoint para que dispositivos embebidos envíen datos de estabilidad de red.

```
POST /api/stability
Content-Type: application/json
```

**Request Body (Required):**
```json
{
  "device_id": "rpi-salon-001",
  "timestamp": "2026-04-17T14:30:45.123Z",
  "csq": 25,
  "network": "Telcel",
  "network_type": "4G",
  "registered": true,
  "uptime_sec": 86400,
  "attempt": 1
}
```

**Field Specifications:**

| Campo | Tipo | Rango | Descripción |
|-------|------|-------|-------------|
| `device_id` | string | Max 64 chars | ID único del dispositivo (ej: "rpi-salon", "modem-1") |
| `timestamp` | ISO8601 | - | Fecha/hora When data was collected (UTC) |
| `csq` | integer | 0-31, null | Signal Quality (0=weak, 31=excellent, null=unknown) |
| `network` | string | Max 64 chars | Nombre del operador/red (ej: "Telcel", "WiFi", "Movistar") |
| `network_type` | string | Max 32 chars | Tipo de red (ej: "4G", "LTE", "WiFi", "5G", "EDGE") |
| `registered` | boolean | true/false | ¿Dispositivo registrado en red? |
| `uptime_sec` | integer | >= 0 | Segundos de tiempo activo |
| `attempt` | integer | >= 1 | Número de intento de conexión |

**Response (200 OK):**
```json
{
  "status": "ok",
  "id": 42
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing fields
{
  "error": "Missing required fields",
  "missing": ["timestamp", "csq"]
}

// 400 Bad Request - Invalid data
{
  "error": "Invalid csq value (must be 0-31 or null)"
}

// 500 Internal Server Error
{
  "error": "Database error"
}
```

---

### 3. Obtener Últimos Registros de Dispositivo
Recupera los últimos registros de un dispositivo específico.

```
GET /api/stability/{device_id}?limit=100
```

**Parameters:**

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `device_id` | string | Required | ID del dispositivo |
| `limit` | integer | 100 | Máximo número de registros (1-1000) |

**Example:**
```bash
GET /api/stability/rpi-salon-001?limit=50
```

**Response (200 OK):**
```json
[
  {
    "id": 42,
    "device_id": "rpi-salon-001",
    "timestamp": "2026-04-17T14:30:45.123Z",
    "received_at": "2026-04-17T14:30:46.500Z",
    "csq": 25,
    "network": "Telcel",
    "network_type": "4G",
    "registered": true,
    "uptime_sec": 86400,
    "attempt": 1,
    "source_ip": "203.0.113.42"
  },
  {
    "id": 41,
    "device_id": "rpi-salon-001",
    "timestamp": "2026-04-17T14:25:30.456Z",
    "received_at": "2026-04-17T14:25:31.789Z",
    "csq": 24,
    "network": "Telcel",
    "network_type": "4G",
    "registered": true,
    "uptime_sec": 86100,
    "attempt": 1,
    "source_ip": "203.0.113.42"
  }
]
```

---

### 4. Obtener Estadísticas de Todos los Dispositivos
Obtiene resumen estadístico de todos los dispositivos registrados.

```
GET /api/stats
```

**Response (200 OK):**
```json
[
  {
    "device_id": "rpi-salon-001",
    "total_records": 1442,
    "last_record": "2026-04-17T14:30:45.123Z",
    "avg_csq": 24.5,
    "registered_count": 1420
  },
  {
    "device_id": "rpi-cocina-001",
    "total_records": 892,
    "last_record": "2026-04-17T14:31:02.456Z",
    "avg_csq": 22.3,
    "registered_count": 850
  }
]
```

---

## 📱 Implementation Examples

### Python (Raspberry Pi)
```python
import requests
import json
from datetime import datetime

API_URL = "https://benrigom.site/api/stability"
DEVICE_ID = "rpi-salon-001"

def send_stability_data(csq, network, network_type, registered, uptime_sec):
    payload = {
        "device_id": DEVICE_ID,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "csq": csq,
        "network": network,
        "network_type": network_type,
        "registered": registered,
        "uptime_sec": uptime_sec,
        "attempt": 1
    }
    
    try:
        response = requests.post(API_URL, json=payload, timeout=5)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Data sent: ID {result['id']}")
            return True
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.json())
            return False
    except Exception as e:
        print(f"❌ Connection error: {e}")
        return False

# Usage
if __name__ == "__main__":
    send_stability_data(
        csq=25,
        network="Telcel",
        network_type="4G",
        registered=True,
        uptime_sec=86400
    )
```

### Bash/cURL
```bash
#!/bin/bash

API_URL="https://benrigom.site/api/stability"
DEVICE_ID="rpi-salon-001"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "'$DEVICE_ID'",
    "timestamp": "'$(date -u +'%Y-%m-%dT%H:%M:%SZ')'",
    "csq": 25,
    "network": "Telcel",
    "network_type": "4G",
    "registered": true,
    "uptime_sec": 86400,
    "attempt": 1
  }' \
  -w "\nStatus: %{http_code}\n"
```

### Node.js/JavaScript
```javascript
const fetch = require('node-fetch');

const API_URL = 'https://benrigom.site/api/stability';
const DEVICE_ID = 'rpi-salon-001';

async function sendStabilityData(csq, network, networkType, registered, uptimeSec) {
  const payload = {
    device_id: DEVICE_ID,
    timestamp: new Date().toISOString(),
    csq: csq,
    network: network,
    network_type: networkType,
    registered: registered,
    uptime_sec: uptimeSec,
    attempt: 1
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Data sent: ID ${result.id}`);
      return true;
    } else {
      const error = await response.json();
      console.error(`❌ Error: ${error.error}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Connection error: ${error.message}`);
    return false;
  }
}

// Usage
sendStabilityData(25, 'Telcel', '4G', true, 86400);
```

### C/C++ (ESP32/Arduino)
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <time.h>

const char* API_URL = "https://benrigom.site/api/stability";
const char* DEVICE_ID = "esp32-sensor-001";

void sendStabilityData(int csq, String network, String networkType, bool registered, long uptimeSec) {
  HTTPClient http;
  
  // Create JSON payload
  StaticJsonDocument<256> doc;
  doc["device_id"] = DEVICE_ID;
  doc["timestamp"] = getISO8601Time();
  doc["csq"] = csq;
  doc["network"] = network;
  doc["network_type"] = networkType;
  doc["registered"] = registered;
  doc["uptime_sec"] = uptimeSec;
  doc["attempt"] = 1;
  
  String payload;
  serializeJson(doc, payload);
  
  http.begin(API_URL);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.POST(payload);
  
  if (httpCode == 200) {
    String response = http.getString();
    Serial.println("✅ Data sent successfully");
  } else {
    Serial.printf("❌ Error: %d\n", httpCode);
  }
  
  http.end();
}

String getISO8601Time() {
  time_t t = time(nullptr);
  struct tm* tm_info = gmtime(&t);
  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%SZ", tm_info);
  return String(buffer);
}
```

---

## 🔐 Security & Best Practices

### Authentication
Actualmente la API es **sin autenticación**. Para producción, considerar:
- Agregar API keys
- Usar OAuth2
- Implementar rate limiting

### Data Validation
- El server valida tipos de datos automáticamente
- `csq` debe estar entre 0-31 o null
- Los timestamps deben ser ISO8601
- Máximo 64 caracteres en `device_id`

### Retry Logic
Para conexiones no confiables (4G), implementa:
```python
import time

def send_with_retry(payload, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.post(API_URL, json=payload, timeout=5)
            if response.status_code == 200:
                return True
        except:
            pass
        
        if attempt < max_retries - 1:
            time.sleep(2 ** attempt)  # Exponential backoff
    
    return False
```

### Timestamp Format
Siempre usar UTC en formato ISO8601:
```
✅ Correcto: 2026-04-17T14:30:45.123Z
❌ Incorrecto: 2026-04-17 14:30:45
```

---

## 📊 Database Schema

```sql
CREATE TABLE stability_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id VARCHAR(64) NOT NULL,
  timestamp DATETIME NOT NULL,
  received_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  csq INTEGER,
  network VARCHAR(64),
  network_type VARCHAR(32),
  registered BOOLEAN,
  uptime_sec INTEGER,
  attempt INTEGER,
  source_ip VARCHAR(45)
);

-- Indexes para performance
CREATE INDEX idx_device_id_timestamp ON stability_records (device_id, timestamp DESC);
CREATE INDEX idx_timestamp ON stability_records (timestamp DESC);
```

**Retention Policy:**
- Sin límite actualmente
- Recomendación: Archivar registros > 90 días

---

## 🧪 Testing

### Health Check
```bash
curl https://benrigom.site/api/health
```

### Enviar dato de prueba
```bash
curl -X POST https://benrigom.site/api/stability \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "test-device-001",
    "timestamp": "2026-04-17T14:30:45Z",
    "csq": 25,
    "network": "TestNet",
    "network_type": "4G",
    "registered": true,
    "uptime_sec": 3600,
    "attempt": 1
  }'
```

### Consultar estadísticas
```bash
curl https://benrigom.site/api/stats | jq .
```

### Obtener registros de dispositivo
```bash
curl 'https://benrigom.site/api/stability/test-device-001?limit=10' | jq .
```

---

## 🚀 Rate Limiting & Quotas

**Limits:**
- No hay límite de rate actualmente
- Recomendación: Máximo 1 request por 30 segundos por dispositivo

**Optimization:**
- Agrupa múltiples lecturas en un solo request si es posible
- Ajusta el intervalo de envío según la estabilidad de red

---

## 📈 CSQ Signal Strength Reference

| CSQ | Signal Strength | Descripción |
|-----|-----------------|-------------|
| 0-5 | Muy débil (-111 dBm) | Conexión crítica, considera reintentar |
| 6-10 | Débil (-105 a -100 dBm) | Conexión pobre, posibles desconexiones |
| 11-15 | Regular (-95 dBm) | Conexión inestable |
| 16-20 | Buena (-85 dBm) | Conexión estable |
| 21-26 | Muy buena (-75 dBm) | Conexión excelente |
| 27-31 | Excelente (-51 dBm) | Conexión óptima |
| null | Desconocido | No se puede determinar |

---

## 🐛 Troubleshooting

### "Missing required fields"
Verifique que incluya todos estos campos:
- device_id
- timestamp
- csq
- network
- network_type
- registered
- uptime_sec
- attempt

### "Invalid timestamp format"
Use ISO8601 con Z de timezone:
```
Correcto: 2026-04-17T14:30:45.123Z
```

### "Connection timeout"
En redes 4G inestables, implementar reintentos con backoff exponencial.

### "Invalid csq value"
CSQ debe estar entre 0-31 o ser null.

---

## 📞 Support & Monitoring

**Dashboard:** https://benrigom.site/dashboard

**Logs del servidor:**
```bash
ssh root@192.168.1.37
cd ~/Portafolio
docker-compose logs api -f
```

---

**Last Updated:** 17 de Abril 2026  
**API Version:** 1.0
