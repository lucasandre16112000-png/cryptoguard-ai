Write-Host "CryptoGuard AI - Setup" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Instalando dependencias..." -ForegroundColor Yellow
pnpm install

Write-Host ""
Write-Host "Configurando banco de dados..." -ForegroundColor Yellow
pnpm db:push

Write-Host ""
Write-Host "Iniciando servidor..." -ForegroundColor Green
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Green
Write-Host ""

pnpm dev
