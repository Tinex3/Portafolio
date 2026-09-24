#!/usr/bin/env bash
# update.sh — actualiza http://benrigom.site/ con el código local.
# Uso: ./update.sh [tag]   (tag por defecto: latest)
# Requiere en este PC: docker, ssh/scp, llave ~/.ssh/dashboard-prod.
# Hace todo: build → save → scp → load → recreate :5876 → verifica local y público.
set -euo pipefail

TAG="${1:-latest}"
DEST="root@192.168.1.147"
KEY="$HOME/.ssh/dashboard-prod"
IMAGE="portafolio:$TAG"
REMOTE_TAR="/opt/portafolio.tar"
LOCAL_TAR=".update-portafolio.tar"

die() { echo "ERROR: $*" >&2; exit 1; }

[[ -f "$KEY" ]] || die "no existe la llave $KEY"
command -v docker >/dev/null 2>&1 || die "docker no disponible (abrí Docker Desktop / Git Bash con PATH)"
command -v scp >/dev/null 2>&1 || die "scp no disponible"
command -v ssh >/dev/null 2>&1 || die "ssh no disponible"

echo "== 1/5 build $IMAGE =="
docker build -t "$IMAGE" . || die "falló docker build"

echo "== 2/5 save + scp =="
docker save "$IMAGE" -o "$LOCAL_TAR" || die "falló docker save"
scp -i "$KEY" -o StrictHostKeyChecking=no "$LOCAL_TAR" "$DEST:$REMOTE_TAR" || die "falló scp"
rm -f "$LOCAL_TAR"

echo "== 3/5 load + recreate en server =="
ssh -i "$KEY" -o StrictHostKeyChecking=no "$DEST" 'bash -s' <<EOF
set -euo pipefail
docker load -i $REMOTE_TAR | tail -1
docker rm -f portafolio 2>/dev/null || true
docker run -d --name portafolio --restart unless-stopped -p 5876:80 $IMAGE
sleep 3
curl -s -o /dev/null -w 'local :5876 -> %{http_code}\n' http://localhost:5876/
EOF

echo "== 4/5 verificación pública =="
sleep 5
CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 25 http://benrigom.site/)
echo "benrigom.site -> $CODE"
[[ "$CODE" == "200" ]] || die "el sitio no responde 200 (revisar túnel/cloudflared)"

echo "== 5/5 OK: benrigom.site actualizado ($IMAGE) =="
