# update.ps1 — actualiza http://benrigom.site/ con el código local (Windows PowerShell).
# Equivalente a update.sh para usar en PowerShell nativo (sin Git Bash/WSL).
# Uso: .\update.ps1          # tag latest
#        .\update.ps1 1.2.0    # con tag
# Requiere: Docker Desktop, OpenSSH (ssh/scp), llave $HOME\.ssh\dashboard-prod.
# Si falla por política de ejecución: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
param(
  [string]$Tag = "latest"
)
$ErrorActionPreference = "Stop"

# Sobrescribibles por entorno: $env:DEPLOY_DEST="root@mi-servidor"; $env:DEPLOY_KEY="C:\ruta\llave"
$Dest = if ($env:DEPLOY_DEST) { $env:DEPLOY_DEST } else { "root@192.168.1.147" }
$Key  = if ($env:DEPLOY_KEY) { $env:DEPLOY_KEY } else { Join-Path $HOME ".ssh\dashboard-prod" }
$Image = "portafolio:$Tag"
$RemoteTar = "/opt/portafolio.tar"
$LocalTar = ".update-portafolio.tar"

function Die([string]$Message) { Write-Error "ERROR: $Message"; exit 1 }
function Exec([string]$Step, [scriptblock]$Cmd) {
  Write-Output "== $Step =="
  & $Cmd
  if ($LASTEXITCODE -ne 0) { Die "falló: $Step" }
}

if (-not (Test-Path -LiteralPath $Key)) { Die "no existe la llave $Key" }
foreach ($cmd in @("docker", "scp", "ssh", "curl.exe")) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { Die "$cmd no disponible" }
}
# NOTA: se usa curl.exe (no curl) porque en Windows PowerShell 5.1 'curl' es alias de Invoke-WebRequest.

Exec "1/5 build $Image" { docker build -t $Image . }

Write-Output "== 2/5 save + scp =="
docker save $Image -o $LocalTar
if ($LASTEXITCODE -ne 0) { Die "falló docker save" }
scp -i $Key -o StrictHostKeyChecking=no $LocalTar "$($Dest):$($RemoteTar)"
if ($LASTEXITCODE -ne 0) { Remove-Item -Force $LocalTar -ErrorAction SilentlyContinue; Die "falló scp" }
Remove-Item -Force $LocalTar

Write-Output "== 3/5 load + recreate en server =="
$RemoteScript = @'
set -euo pipefail
docker load -i "$REMOTE_TAR" | tail -1
docker rm -f portafolio 2>/dev/null || true
docker run -d --name portafolio --restart unless-stopped -p 5876:80 "$IMAGE"
rm -f "$REMOTE_TAR"
CODE=000
for i in $(seq 1 10); do
  CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://localhost:5876/ || true)
  echo "local :5876 intento $i -> $CODE"
  [ "$CODE" = "200" ] && break
  sleep 3
done
if [ "$CODE" != "200" ]; then
  echo "ERROR: el contenedor no responde 200 en local" >&2
  exit 1
fi
'@
# NOTA: no se entuba el script por stdin porque PowerShell trunca stdin largos
# hacia ssh.exe. Se envía en base64 como argumento (sin stdin local).
$RemoteB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($RemoteScript))
ssh -i $Key -o StrictHostKeyChecking=no $Dest "IMAGE='$Image' REMOTE_TAR='$RemoteTar' bash -c 'echo $RemoteB64 | base64 -d | bash -s'"
if ($LASTEXITCODE -ne 0) { Die "falló load + recreate en server" }

Write-Output "== 4/5 verificación pública =="
Start-Sleep -Seconds 5
$Code = curl.exe -s -o NUL -w '%{http_code}' --max-time 25 http://benrigom.site/
Write-Output "benrigom.site -> $Code"
if ($Code -ne "200") { Die "el sitio no responde 200 (revisar túnel/cloudflared)" }

Write-Output "== 5/5 OK: benrigom.site actualizado ($Image) =="
