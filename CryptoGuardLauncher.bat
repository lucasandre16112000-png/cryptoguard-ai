@echo off
REM ============================================================================
REM CRYPTOGUARD AI LAUNCHER - VERSAO COMPLETA
REM Executavel para Windows - Instala e roda tudo automaticamente
REM ============================================================================

setlocal enabledelayedexpansion

cls
color 0A

echo.
echo ================================================================================
echo.
echo                    CRYPTOGUARD AI LAUNCHER - INICIANDO...
echo.
echo ================================================================================
echo.

REM Ir para a pasta do script
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
    echo 2. Instale normalmente (use versao LTS)
    echo 3. Reinicie o computador
    echo 4. Execute este arquivo novamente
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
    echo [ERRO] MySQL nao foi encontrado!
    echo.
    echo Solucao:
    echo 1. Baixe MySQL em: https://dev.mysql.com/downloads/mysql/
    echo 2. Instale com senha: 161120
    echo 3. Reinicie o computador
    echo 4. Execute este arquivo novamente
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL encontrado
echo.

REM Passo 3: Instalar pnpm
echo [PASSO 3] Verificando/Instalando pnpm...
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo Instalando pnpm globalmente...
    call npm install -g pnpm --quiet
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar pnpm!
        pause
        exit /b 1
    )
)
echo [OK] pnpm pronto
echo.

REM Passo 4: Instalar dependencias
echo [PASSO 4] Instalando dependencias do projeto...
echo Isso pode levar alguns minutos na primeira vez...
echo.
call pnpm install
if errorlevel 1 (
    echo.
    echo [ERRO] Falha ao instalar dependencias!
    pause
    exit /b 1
)
echo.
echo [OK] Dependencias instaladas
echo.

REM Passo 5: Criar banco de dados
echo [PASSO 5] Preparando banco de dados...
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>nul
if errorlevel 1 (
    echo [AVISO] Falha ao criar banco de dados
    echo Verifique se MySQL esta rodando e a senha esta correta (161120)
)
echo [OK] Banco de dados pronto
echo.

REM Passo 6: Aplicar migrations
echo [PASSO 6] Aplicando migrations do banco de dados...
call pnpm db:push
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
echo                    PRONTO! Servidor iniciando...
echo.
echo                    Acesse: http://localhost:3000
echo                    Pressione Ctrl+C para encerrar
echo.
echo ================================================================================
echo.

timeout /t 2 /nobreak >nul

call pnpm dev

pause
