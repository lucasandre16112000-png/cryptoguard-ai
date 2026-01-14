Write-Host "--- CryptoGuard AI Quick Start for Windows ---" -ForegroundColor Green

# Etapa 1: Instalar o pnpm, se necessário
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm não encontrado. Instalando globalmente..." -ForegroundColor Yellow
    npm install -g pnpm
} else {
    Write-Host "pnpm já está instalado."
}

# Etapa 2: Instalar dependências do projeto
Write-Host "Instalando dependências do projeto com pnpm..." -ForegroundColor Cyan
pnpm install

# Etapa 3: Verificar a conexão com o banco de dados e aplicar migrações
Write-Host "Configurando o banco de dados..." -ForegroundColor Cyan
try {
    pnpm db:push
    Write-Host "Banco de dados configurado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Falha ao configurar o banco de dados." -ForegroundColor Red
    Write-Host "Verifique se o MySQL está em execução e se o arquivo .env está correto." -ForegroundColor Yellow
    exit 1
}

# Etapa 4: Iniciar a aplicação
Write-Host "Iniciando a aplicação em modo de desenvolvimento..." -ForegroundColor Cyan
Write-Host "Acesse http://localhost:3000 no seu navegador." -ForegroundColor Green
pnpm dev
