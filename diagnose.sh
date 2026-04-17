#!/bin/bash

echo "=== DIAGNÓSTICO DE PORTAFOLIO ==="
echo ""

echo "1️⃣  Contenedores activos:"
docker-compose ps
echo ""

echo "2️⃣  Logs del frontend (últimas 20 líneas):"
docker-compose logs web | tail -20
echo ""

echo "3️⃣  Logs de la API (últimas 20 líneas):"
docker-compose logs api | tail -20
echo ""

echo "4️⃣  Health check API:"
docker-compose exec -T api wget --spider http://localhost:3000/api/health 2>&1 && echo "✅ API Healthy" || echo "❌ API Failed"
echo ""

echo "5️⃣  Test de conectividad localhost:"
echo "Frontend en :5876 - $(nc -zv localhost 5876 2>&1 | grep -o 'SUCCESS\|refused')"
echo "API en :3000 - $(nc -zv localhost 3000 2>&1 | grep -o 'SUCCESS\|refused')"
echo ""

echo "6️⃣  IP del servidor:"
hostname -I
echo ""

echo "7️⃣  URLs para acceder:"
echo "  Frontend: http://$(hostname -I | awk '{print $1}'):5876"
echo "  API: http://$(hostname -I | awk '{print $1}'):3000/api/health"
echo ""

echo "✅ Diagnóstico completado"
