# ============================================
# CryptoGuard AI - Setup Automático para Windows
# ============================================
# 
# Este script faz TUDO automaticamente!
# 
# Como usar:
# 1. Abra PowerShell como ADMIN
# 2. Cole isto: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# 3. Cole isto: .\SETUP_AUTOMATICO.ps1
#
# ============================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CryptoGuard AI - Setup Automático" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Cores para output
$Success = "Green"
$Error = "Red"
$Info = "Yellow"

# Função para imprimir mensagens
function Print-Step {
    param([string]$message)
    Write-Host "[*] $message" -ForegroundColor $Info
}

function Print-Success {
    param([string]$message)
    Write-Host "[✓] $message" -ForegroundColor $Success
}

function Print-Error {
    param([string]$message)
    Write-Host "[✗] $message" -ForegroundColor $Error
}

# Passo 1: Verificar se Node.js está instalado
Print-Step "Verificando Node.js..."
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Print-Success "Node.js encontrado: $nodeVersion"
} else {
    Print-Error "Node.js não está instalado!"
    Print-Error "Baixe em: https://nodejs.org/"
    exit 1
}

# Passo 2: Verificar se MySQL está instalado
Print-Step "Verificando MySQL..."
$mysqlVersion = mysql --version 2>$null
if ($mysqlVersion) {
    Print-Success "MySQL encontrado: $mysqlVersion"
} else {
    Print-Error "MySQL não está instalado!"
    Print-Error "Baixe em: https://dev.mysql.com/downloads/mysql/"
    exit 1
}

# Passo 3: Instalar pnpm globalmente
Print-Step "Instalando pnpm globalmente..."
npm install -g pnpm 2>&1 | Out-Null
Print-Success "pnpm instalado!"

# Passo 4: Instalar dependências
Print-Step "Instalando dependências do projeto..."
pnpm install 2>&1 | Out-Null
Print-Success "Dependências instaladas!"

# Passo 5: Criar banco de dados
Print-Step "Criando banco de dados..."
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>$null
if ($LASTEXITCODE -eq 0) {
    Print-Success "Banco de dados criado!"
} else {
    Print-Error "Erro ao criar banco de dados!"
    Print-Error "Verifique se a senha do MySQL está correta (161120)"
    exit 1
}

# Passo 6: Aplicar migrations
Print-Step "Aplicando migrations do banco de dados..."
pnpm db:push 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Print-Success "Migrations aplicadas!"
} else {
    Print-Error "Erro ao aplicar migrations!"
    exit 1
}

# Passo 7: Rodar a aplicação
Print-Step "Iniciando a aplicação..."
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  ✓ Setup concluído com sucesso!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "A aplicação está iniciando..." -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

pnpm dev
