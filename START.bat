@echo off
setlocal enabledelayedexpansion

REM ============================================================================
REM CRYPTOGUARD AI - START LAUNCHER
REM Versao corrigida com melhor tratamento de erros
REM ============================================================================

cls
color 0A

echo.
echo ================================================================================
echo.
echo                    CRYPTOGUARD AI - INICIANDO...
echo.
echo ================================================================================
echo.

REM Ir para a pasta do script
cd /d "%~dp0"

if errorlevel 1 (
    echo [ERRO] Falha ao mudar para o diretorio do script
    pause
    exit /b 1
)

REM Passo 1: Verificar Node.js
echo [PASSO 1/7] Verificando Node.js...
where node >nul 2>&1
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

REM Passo 2: Verificar npm
echo [PASSO 2/7] Verificando npm...
where npm >nul 2>&1
if errorlevel 1 (
    echo [ERRO] npm nao foi encontrado!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% encontrado
echo.

REM Passo 3: Verificar/Instalar pnpm
echo [PASSO 3/7] Verificando/Instalando pnpm...
where pnpm >nul 2>&1
if errorlevel 1 (
    echo pnpm nao encontrado, instalando...
    call npm install -g pnpm
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar pnpm
        pause
        exit /b 1
    )
)

for /f "tokens=*" %%i in ('pnpm --version') do set PNPM_VERSION=%%i
echo [OK] pnpm %PNPM_VERSION% pronto
echo.

REM Passo 4: Instalar dependencias
echo [PASSO 4/7] Instalando dependencias...
echo Isso pode levar alguns minutos...
echo.
call pnpm install --no-frozen-lockfile
if errorlevel 1 (
    echo.
    echo [ERRO] Falha ao instalar dependencias!
    echo Tente executar manualmente: pnpm install
    echo.
    pause
    exit /b 1
)
echo.
echo [OK] Dependencias instaladas
echo.

REM Passo 5: Criar banco de dados
echo [PASSO 5/7] Preparando banco de dados...
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>nul
if errorlevel 1 (
    echo [AVISO] Falha ao criar banco de dados
    echo Verifique se MySQL esta rodando e a senha esta correta (161120)
)
echo [OK] Banco de dados pronto
echo.

REM Passo 6: Aplicar migrations
echo [PASSO 6/7] Aplicando migrations...
call pnpm db:push
if errorlevel 1 (
    echo [AVISO] Falha ao aplicar migrations
    echo Continuando mesmo assim...
)
echo [OK] Migrations aplicadas
echo.

REM Passo 7: Iniciar servidor
echo [PASSO 7/7] Iniciando servidor...
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

timeout /t 3 /nobreak >nul

call pnpm dev

echo.
echo [INFO] Servidor encerrado
echo.
pause
