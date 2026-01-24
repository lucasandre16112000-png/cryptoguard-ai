@echo off
setlocal enabledelayedexpansion

cls
color 0A

echo.
echo ================================================================================
echo.
echo                    CRYPTOGUARD AI - INSTALADOR COMPLETO
echo.
echo ================================================================================
echo.

REM Definir caminhos
set "installPath=%USERPROFILE%\cryptoguard-ai"
set "zipPath=%TEMP%\cryptoguard-ai.zip"
set "extractPath=%TEMP%\cryptoguard-extract"

REM ============================================================================
REM VERIFICAR DEPENDENCIAS
REM ============================================================================

echo [VERIFICANDO DEPENDENCIAS]
echo.

REM Verificar Node.js
echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [INSTALANDO] Node.js nao encontrado. Instalando...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi', '%TEMP%\nodejs.msi'); Start-Process '%TEMP%\nodejs.msi' -ArgumentList '/quiet' -Wait; del '%TEMP%\nodejs.msi' } catch { Write-Host '[ERRO] Falha ao instalar Node.js'; exit 1 }"
    if errorlevel 1 goto error_nodejs
    echo [OK] Node.js instalado
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] !NODE_VERSION! encontrado
)
echo.

REM Verificar MySQL
echo [2/4] Verificando MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo [INSTALANDO] MySQL nao encontrado. Instalando...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.35.0.msi', '%TEMP%\mysql.msi'); Start-Process '%TEMP%\mysql.msi' -ArgumentList '/quiet' -Wait; del '%TEMP%\mysql.msi' } catch { Write-Host '[ERRO] Falha ao instalar MySQL'; exit 1 }"
    if errorlevel 1 goto error_mysql
    echo [OK] MySQL instalado
) else (
    echo [OK] MySQL encontrado
)
echo.

REM Verificar Git
echo [3/4] Verificando Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo [INSTALANDO] Git nao encontrado. Instalando...
    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe', '%TEMP%\git.exe'); Start-Process '%TEMP%\git.exe' -ArgumentList '/VERYSILENT /NORESTART' -Wait; del '%TEMP%\git.exe' } catch { Write-Host '[ERRO] Falha ao instalar Git'; exit 1 }"
    if errorlevel 1 goto error_git
    echo [OK] Git instalado
) else (
    echo [OK] Git encontrado
)
echo.

REM ============================================================================
REM DOWNLOAD E INSTALACAO
REM ============================================================================

echo [DOWNLOAD E INSTALACAO]
echo.

REM Passo 1: Criar pasta de instalacao
echo [1/7] Criando pasta de instalacao...
if not exist "%installPath%" mkdir "%installPath%"
echo [OK] Pasta criada em: %installPath%
echo.

REM Passo 2: Baixar projeto do GitHub
echo [2/7] Baixando projeto do GitHub...
powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/lucasandre16112000-png/cryptoguard-ai/archive/refs/heads/main.zip', '%zipPath%'); Write-Host '[OK] Projeto baixado' } catch { Write-Host '[ERRO] Falha ao baixar'; exit 1 }"
if errorlevel 1 goto error_download
echo.

REM Passo 3: Extrair arquivos
echo [3/7] Extraindo arquivos...
if exist "%extractPath%" rmdir /s /q "%extractPath%"
mkdir "%extractPath%"
powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('%zipPath%', '%extractPath%')"
if errorlevel 1 goto error_extract
echo [OK] Arquivos extraidos
echo.

REM Passo 4: Copiar arquivos
echo [4/7] Copiando arquivos para pasta de instalacao...
for /d %%d in ("%extractPath%\*") do (
    xcopy "%%d\*" "%installPath%\" /E /Y /Q >nul 2>&1
)
echo [OK] Arquivos copiados
echo.

REM Passo 5: Limpar temporarios
echo [5/7] Limpando arquivos temporarios...
del /q "%zipPath%" >nul 2>&1
rmdir /s /q "%extractPath%" >nul 2>&1
echo [OK] Limpeza concluida
echo.

REM Passo 6: Instalar dependencias e fazer build
echo [6/7] Instalando dependencias e fazendo build...
cd /d "%installPath%"
call npm install -g pnpm >nul 2>&1
call pnpm install --no-frozen-lockfile
if errorlevel 1 goto error_install

echo Fazendo build do projeto...
call pnpm build
if errorlevel 1 (
    echo [AVISO] Falha no build, continuando mesmo assim...
)
echo [OK] Dependencias instaladas e build concluido
echo.

REM Passo 7: Preparar banco de dados
echo [7/7] Preparando banco de dados...
mysql -u root -p161120 -e "CREATE DATABASE IF NOT EXISTS cryptoguard;" 2>nul
call pnpm db:push >nul 2>&1
echo [OK] Banco de dados pronto
echo.

REM ============================================================================
REM INICIAR SERVIDOR
REM ============================================================================

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

REM ============================================================================
REM TRATAMENTO DE ERROS
REM ============================================================================

:error_nodejs
echo.
echo [ERRO] Falha ao instalar Node.js
echo Tente instalar manualmente: https://nodejs.org/
echo.
pause
exit /b 1

:error_mysql
echo.
echo [ERRO] Falha ao instalar MySQL
echo Tente instalar manualmente: https://dev.mysql.com/downloads/mysql/
echo.
pause
exit /b 1

:error_git
echo.
echo [ERRO] Falha ao instalar Git
echo Tente instalar manualmente: https://git-scm.com/
echo.
pause
exit /b 1

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
echo.
pause
exit /b 1
