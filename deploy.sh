#!/bin/bash

# Script de deployment para Portafolio
# Uso: ./deploy.sh [producción|desarrollo]

set -e  # Exit on error

DEPLOY_ENV=${1:-"producción"}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== Iniciando deployment a $DEPLOY_ENV ==="
echo "Directorio: $PROJECT_DIR"
echo ""

# 1. Fetch latest changes
echo "1️⃣  Descargando cambios de GitHub..."
cd "$PROJECT_DIR"
git fetch origin
git pull origin main

# 2. Build Docker images
echo ""
echo "2️⃣  Construyendo imágenes Docker..."
docker compose build

# 3. Stop and remove old containers
echo ""
echo "3️⃣  Deteniendo contenedores anteriores..."
docker compose down

# 4. Start new containers
echo ""
echo "4️⃣  Iniciando contenedores nuevos..."
docker compose up -d

# 5. Wait for services to be healthy
echo ""
echo "5️⃣  Esperando que los servicios estén listos..."
sleep 5

# 6. Health check
echo ""
echo "6️⃣  Verificando salud de los servicios..."

# Check API
API_HEALTH=$(curl -s http://localhost:3000/api/health | grep -q "ok" && echo "✅ OK" || echo "❌ FAILED")
echo "API Health: $API_HEALTH"

# Check Web
WEB_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5876)
echo "Web Server: HTTP $WEB_STATUS"

# 7. Show logs
echo ""
echo "7️⃣  Ultimos logs:"
docker compose logs --tail=20

echo ""
echo "✅ Deployment completado en $DEPLOY_ENV"
echo ""
echo "URLs disponibles:"
echo "  - Frontend: http://localhost:5876"
echo "  - API Health: http://localhost:3000/api/health"
echo "  - API Stats: http://localhost:3000/api/stats"
