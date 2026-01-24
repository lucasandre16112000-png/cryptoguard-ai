@echo off
setlocal enabledelayedexpansion

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

REM Verificar se estamos na pasta correta
if not exist "package.json" (
    echo [ERRO] package.json nao encontrado!
    echo.
    echo Solucao:
    echo 1. Extraia o ZIP em uma pasta permanente (Desktop, Documentos, etc)
    echo 2. Nao deixe em pasta temporaria do Windows
    echo 3. Tente novamente
    echo.
    pause
    exit /b 1
)

echo [1/5] Instalando dependencias...
call npm install -g pnpm >nul 2>&1
call pnpm install --no-frozen-lockfile
if errorlevel 1 goto error_install

echo [2/5] Preparando banco de dados...
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>nul

echo [3/5] Aplicando migrations...
call pnpm db:push >nul 2>&1
if errorlevel 1 echo [AVISO] Falha nas migrations, continuando...

echo.
echo ================================================================================
echo.
echo                    PRONTO! Iniciando servidor...
echo.
echo                    Acesse: http://localhost:3000
echo                    Pressione Ctrl+C para encerrar
echo.
echo ================================================================================
echo.

timeout /t 2 /nobreak >nul

call pnpm dev

echo.
echo [INFO] Servidor encerrado
echo.
pause
exit /b 0

:error_install
echo.
echo [ERRO] Falha ao instalar dependencias
echo.
echo Solucoes:
echo 1. Verifique se Node.js esta instalado
echo 2. Tente extrair o ZIP em outra pasta
echo 3. Tente manualmente: pnpm install
echo.
pause
exit /b 1
