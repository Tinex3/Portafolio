#!/bin/bash

# Script de ejemplo para enviar datos manualmente a la API
# Uso: bash send-data.sh <url> <device_id> [csq] [registered]

set -e

URL="${1:-http://localhost:5876/api/stability}"
DEVICE_ID="${2:-sim_rpi_001}"
CSQ="${3:-22}"
REGISTERED="${4:-true}"

TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%S.000Z)
UPTIME=$((RANDOM % 10000))

# Construir payload
echo "Enviando datos a $URL"
echo "Device ID: $DEVICE_ID"
echo "CSQ: $CSQ"
echo "Timestamp: $TIMESTAMP"
echo ""

RESPONSE=$(curl -s -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "'${DEVICE_ID}'",
    "timestamp": "'${TIMESTAMP}'",
    "csq": '${CSQ}',
    "network": "registrado, red doméstica",
    "network_type": "LTE",
    "registered": '${REGISTERED}',
    "uptime_sec": '${UPTIME}',
    "attempt": 1
  }')

echo "Respuesta:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
