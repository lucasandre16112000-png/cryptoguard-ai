# ============================================
# CryptoGuard AI - Rodar Tudo (Windows)
# ============================================
# 
# Este script define as variáveis de ambiente
# e roda tudo automaticamente
#
# ============================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CryptoGuard AI - Setup Completo" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Definir variáveis de ambiente
Write-Host "[*] Configurando variáveis de ambiente..." -ForegroundColor Yellow
$env:DB_USER = "root"
$env:DB_PASSWORD = "161120"
$env:DB_HOST = "127.0.0.1"
$env:DB_PORT = "3306"
$env:DB_NAME = "cryptoguard"
$env:DATABASE_URL = "mysql://root:161120@127.0.0.1:3306/cryptoguard"
$env:NODE_ENV = "development"

Write-Host "[✓] Variáveis de ambiente configuradas!" -ForegroundColor Green
Write-Host ""

# Criar banco de dados
Write-Host "[*] Criando banco de dados..." -ForegroundColor Yellow
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>$null
Write-Host "[✓] Banco de dados criado!" -ForegroundColor Green
Write-Host ""

# Instalar dependências
Write-Host "[*] Instalando dependências..." -ForegroundColor Yellow
pnpm install 2>&1 | Out-Null
Write-Host "[✓] Dependências instaladas!" -ForegroundColor Green
Write-Host ""

# Aplicar migrations
Write-Host "[*] Aplicando migrations..." -ForegroundColor Yellow
pnpm db:push 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[✓] Migrations aplicadas!" -ForegroundColor Green
} else {
    Write-Host "[✗] Erro ao aplicar migrations!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Rodar a aplicação
Write-Host "================================================" -ForegroundColor Green
Write-Host "  ✓ Setup concluído com sucesso!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "A aplicação está iniciando..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

pnpm dev
