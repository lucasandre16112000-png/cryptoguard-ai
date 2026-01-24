@echo off
setlocal enabledelayedexpansion

cls
color 0A

echo.
echo ================================================================================
echo.
echo                    CRYPTOGUARD AI - INSTALADOR AUTOMATICO
echo.
echo ================================================================================
echo.

REM Definir caminhos
set "installPath=%USERPROFILE%\cryptoguard-ai"
set "zipPath=%TEMP%\cryptoguard-ai.zip"
set "extractPath=%TEMP%\cryptoguard-extract"

REM Passo 1: Criar pasta de instalacao
echo [1/6] Criando pasta de instalacao...
if not exist "%installPath%" mkdir "%installPath%"
echo [OK] Pasta criada em: %installPath%
echo.

REM Passo 2: Baixar projeto do GitHub
echo [2/6] Baixando projeto do GitHub...
powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/lucasandre16112000-png/cryptoguard-ai/archive/refs/heads/main.zip', '%zipPath%'); Write-Host '[OK] Projeto baixado' } catch { Write-Host '[ERRO] Falha ao baixar'; exit 1 }"
if errorlevel 1 goto error_download
echo.

REM Passo 3: Extrair arquivos
echo [3/6] Extraindo arquivos...
if exist "%extractPath%" rmdir /s /q "%extractPath%"
mkdir "%extractPath%"
powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('%zipPath%', '%extractPath%')"
if errorlevel 1 goto error_extract
echo [OK] Arquivos extraidos
echo.

REM Passo 4: Copiar arquivos
echo [4/6] Copiando arquivos para pasta de instalacao...
for /d %%d in ("%extractPath%\*") do (
    xcopy "%%d\*" "%installPath%\" /E /Y /Q >nul 2>&1
)
echo [OK] Arquivos copiados
echo.

REM Passo 5: Limpar temporarios
echo [5/6] Limpando arquivos temporarios...
del /q "%zipPath%" >nul 2>&1
rmdir /s /q "%extractPath%" >nul 2>&1
echo [OK] Limpeza concluida
echo.

REM Passo 6: Instalar dependencias
echo [6/6] Instalando dependencias...
cd /d "%installPath%"
call npm install -g pnpm >nul 2>&1
call pnpm install --no-frozen-lockfile
if errorlevel 1 goto error_install

REM Preparar banco de dados
echo.
echo Preparando banco de dados...
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>nul
call pnpm db:push >nul 2>&1

REM Iniciar servidor
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

start http://localhost:3000

call pnpm dev

echo.
echo [INFO] Servidor encerrado
echo.
pause
exit /b 0

:error_download
echo.
echo [ERRO] Falha ao baixar projeto
echo Verifique sua conexao com internet
echo.
pause
exit /b 1

:error_extract
echo.
echo [ERRO] Falha ao extrair arquivos
echo.
pause
exit /b 1

:error_install
echo.
echo [ERRO] Falha ao instalar dependencias
echo Verifique se Node.js esta instalado
echo.
pause
exit /b 1
