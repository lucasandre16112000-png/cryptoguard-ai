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

cd /d "%~dp0"

echo [1/5] Instalando dependencias...
call npm install -g pnpm
if errorlevel 1 goto error_pnpm

call pnpm install --no-frozen-lockfile
if errorlevel 1 goto error_install

echo [2/5] Preparando banco de dados...
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>nul

echo [3/5] Aplicando migrations...
call pnpm db:push
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

:error_pnpm
echo.
echo [ERRO] Falha ao instalar pnpm
echo Tente instalar manualmente: npm install -g pnpm
echo.
pause
exit /b 1

:error_install
echo.
echo [ERRO] Falha ao instalar dependencias
echo Tente manualmente: pnpm install
echo.
pause
exit /b 1
