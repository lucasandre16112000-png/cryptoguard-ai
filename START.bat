@echo off
cls
color 0A

echo.
echo ================================================================================
echo                    CRYPTOGUARD AI - INICIANDO...
echo ================================================================================
echo.

cd /d "%~dp0"

REM Passo 1: Verificar Node.js
echo [PASSO 1] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERRO] Node.js nao foi encontrado!
    echo.
    echo Solucao:
    echo 1. Baixe Node.js em: https://nodejs.org/
    echo 2. Instale normalmente
    echo 3. Reinicie o computador
    echo 4. Tente novamente
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] %NODE_VERSION% encontrado
echo.

REM Passo 2: Verificar MySQL
echo [PASSO 2] Verificando MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [AVISO] MySQL nao foi encontrado!
    echo.
    echo Solucao:
    echo 1. Baixe MySQL em: https://dev.mysql.com/downloads/mysql/
    echo 2. Instale com senha: 161120
    echo 3. Reinicie o computador
    echo 4. Tente novamente
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL encontrado
echo.

REM Passo 3: Instalar pnpm globalmente
echo [PASSO 3] Verificando/Instalando pnpm...
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo Instalando pnpm...
    npm install -g pnpm --quiet
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar pnpm!
        pause
        exit /b 1
    )
)
echo [OK] pnpm pronto
echo.

REM Passo 4: Instalar dependências
echo [PASSO 4] Instalando dependencias...
echo Isso pode levar alguns minutos...
pnpm install
if errorlevel 1 (
    echo [ERRO] Falha ao instalar dependencias!
    pause
    exit /b 1
)
echo [OK] Dependencias instaladas
echo.

REM Passo 5: Criar banco de dados
echo [PASSO 5] Preparando banco de dados...
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>nul
if errorlevel 1 (
    echo [AVISO] Falha ao criar banco de dados
    echo Verifique se MySQL esta rodando e a senha esta correta
)
echo [OK] Banco de dados pronto
echo.

REM Passo 6: Aplicar migrations
echo [PASSO 6] Aplicando migrations...
pnpm db:push
if errorlevel 1 (
    echo [AVISO] Falha ao aplicar migrations
)
echo [OK] Migrations aplicadas
echo.

REM Passo 7: Iniciar servidor
echo [PASSO 7] Iniciando servidor...
echo.
echo ================================================================================
echo.
echo Acesse: http://localhost:3000
echo Pressione Ctrl+C para encerrar
echo.
echo ================================================================================
echo.

timeout /t 2 /nobreak >nul

pnpm dev

pause
