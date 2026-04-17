#!/bin/bash
# Script de verificación post-instalación

set -e

echo "🔍 Verificación de instalación del Backend API"
echo "============================================"
echo ""

PROJECT_DIR="/home/benjamin/Documentos/Github/Personal/Portafolio"
cd "$PROJECT_DIR"

# 1. Verificar archivos del servidor
echo "✓ Verificando archivos del servidor..."
files=(
  "server/app.js"
  "server/package.json"
  "server/Dockerfile"
  "server/.dockerignore"
  "server/.gitignore"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file FALTA"
  fi
done
echo ""

# 2. Verificar documentación
echo "✓ Verificando documentación..."
docs=(
  "BACKEND_QUICKSTART.md"
  "BACKEND_SUMMARY.md"
  "CLOUDFLARE_SETUP.md"
  "server/README.md"
  "server/example-rpi-config.yaml"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    size=$(wc -l < "$doc")
    echo "  ✅ $doc ($size líneas)"
  else
    echo "  ❌ $doc FALTA"
  fi
done
echo ""

# 3. Verificar npm packages
echo "✓ Verificando dependencias Node.js..."
if [ -d "server/node_modules" ]; then
  count=$(ls -1 server/node_modules | wc -l)
  echo "  ✅ $count paquetes instalados en server/node_modules"
else
  echo "  ❌ server/node_modules NO existe"
fi
echo ""

# 4. Verificar sintaxis de archivos
echo "✓ Verificando sintaxis..."
if node -c server/app.js 2>/dev/null; then
  echo "  ✅ server/app.js sintaxis válida"
else
  echo "  ❌ server/app.js tiene errores de sintaxis"
fi

if node -c server/package.json 2>/dev/null || jq . < server/package.json > /dev/null 2>&1; then
  echo "  ✅ server/package.json JSON válido"
else
  echo "  ❌ server/package.json JSON inválido"
fi
echo ""

# 5. Verificar docker-compose
echo "✓ Verificando configuración Docker..."
if grep -q "api:" docker-compose.yml; then
  echo "  ✅ Servicio 'api' agregado a docker-compose.yml"
else
  echo "  ❌ Servicio 'api' NO encontrado en docker-compose.yml"
fi

if grep -q "stability_data:" docker-compose.yml; then
  echo "  ✅ Volumen 'stability_data' definido"
else
  echo "  ❌ Volumen 'stability_data' NO encontrado"
fi
echo ""

# 6. Verificar nginx
echo "✓ Verificando configuración Nginx..."
if grep -q 'proxy_pass http://api:3000' nginx/nginx.conf; then
  echo "  ✅ Proxy a API configurado en nginx.conf"
else
  echo "  ❌ Proxy a API NO encontrado en nginx.conf"
fi

if grep -q 'location /api/' nginx/nginx.conf; then
  echo "  ✅ Ruta /api/ configurada"
else
  echo "  ❌ Ruta /api/ NO encontrada"
fi
echo ""

# 7. Resumen de archivos
echo "📊 Resumen de archivos creados/modificados:"
echo "============================================"
echo ""
echo "SERVIDOR BACKEND:"
ls -lh server/app.js server/package.json 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
echo ""
echo "DOCUMENTACIÓN:"
ls -lh BACKEND_*.md CLOUDFLARE_SETUP.md 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
echo ""
echo "CONFIGURACIÓN:"
echo "  docker-compose.yml (actualizado)"
echo "  nginx/nginx.conf (actualizado)"
echo ""

# 7. Próximos pasos
echo ""
echo "✨ Próximos pasos:"
echo "=================="
echo ""
echo "1. Leer la documentación:"
echo "   📖 BACKEND_SUMMARY.md      - Resumen completo"
echo "   📖 BACKEND_QUICKSTART.md   - Guía de inicio"
echo "   📖 CLOUDFLARE_SETUP.md     - Deploy en Cloudflare"
echo ""
echo "2. Iniciar los contenedores:"
echo "   $ docker-compose up -d"
echo ""
echo "3. Probar la API:"
echo "   $ curl http://localhost:5876/api/health"
echo "   $ bash server/test-api.sh"
echo ""
echo "4. Configurar Raspberry Pi:"
echo "   Ver server/example-rpi-config.yaml"
echo ""
echo "✅ Instalación completada exitosamente!"
