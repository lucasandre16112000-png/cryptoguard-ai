# CryptoGuard AI - Setup Script Corrigido para Windows
# Este script instala todas as dependências e inicia a aplicação

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CryptoGuard AI - Setup para Windows" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Cores para output
$GREEN = "Green"
$RED = "Red"
$YELLOW = "Yellow"
$CYAN = "Cyan"

# ============================================================
# PASSO 1: Verificar Node.js
# ============================================================
Write-Host "[1/5] Verificando Node.js..." -ForegroundColor $CYAN
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js $nodeVersion encontrado" -ForegroundColor $GREEN
} else {
    Write-Host "✗ Node.js não encontrado!" -ForegroundColor $RED
    Write-Host "Baixe em: https://nodejs.org/" -ForegroundColor $YELLOW
    exit 1
}

# ============================================================
# PASSO 2: Verificar/Instalar pnpm
# ============================================================
Write-Host "[2/5] Verificando pnpm..." -ForegroundColor $CYAN
$pnpmVersion = pnpm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ pnpm $pnpmVersion encontrado" -ForegroundColor $GREEN
} else {
    Write-Host "Installing pnpm..." -ForegroundColor $YELLOW
    npm install -g pnpm
    $pnpmVersion = pnpm --version
    Write-Host "✓ pnpm $pnpmVersion instalado" -ForegroundColor $GREEN
}

# ============================================================
# PASSO 3: Instalar dependências
# ============================================================
Write-Host "[3/5] Instalando dependências..." -ForegroundColor $CYAN
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Erro ao instalar dependências" -ForegroundColor $RED
    exit 1
}
Write-Host "✓ Dependências instaladas" -ForegroundColor $GREEN

# ============================================================
# PASSO 4: Configurar banco de dados
# ============================================================
Write-Host "[4/5] Configurando banco de dados..." -ForegroundColor $CYAN
Write-Host "Executando: pnpm db:push" -ForegroundColor $CYAN
pnpm db:push
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Aviso: Verifique se MySQL está rodando" -ForegroundColor $YELLOW
    Write-Host "Para iniciar MySQL no Windows:" -ForegroundColor $YELLOW
    Write-Host "  1. Abra Services (Win+R -> services.msc)" -ForegroundColor $YELLOW
    Write-Host "  2. Procure por 'MySQL80' ou 'MySQL95'" -ForegroundColor $YELLOW
    Write-Host "  3. Clique com botão direito -> Start" -ForegroundColor $YELLOW
}
Write-Host "✓ Banco de dados configurado" -ForegroundColor $GREEN

# ============================================================
# PASSO 5: Iniciar servidor
# ============================================================
Write-Host "[5/5] Iniciando servidor..." -ForegroundColor $CYAN
Write-Host ""
Write-Host "========================================" -ForegroundColor $GREEN
Write-Host "  CryptoGuard AI está iniciando!" -ForegroundColor $GREEN
Write-Host "========================================" -ForegroundColor $GREEN
Write-Host ""
Write-Host "Acesse em: http://localhost:3000" -ForegroundColor $GREEN
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor $YELLOW
Write-Host ""

pnpm dev
