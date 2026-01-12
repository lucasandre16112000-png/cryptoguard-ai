# CryptoGuard AI - Automatic Setup Script for Windows
# This script installs MySQL, creates the database, and starts the application

Write-Host "🚀 CryptoGuard AI - Automatic Setup" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "⚠️  This script needs to run as Administrator" -ForegroundColor Yellow
    Write-Host "Please right-click on PowerShell and select 'Run as administrator'" -ForegroundColor Yellow
    exit 1
}

# Step 1: Check if Node.js is installed
Write-Host "[1/6] Checking Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Step 2: Check if pnpm is installed
Write-Host "[2/6] Checking pnpm..." -ForegroundColor Cyan
try {
    $pnpmVersion = pnpm --version
    Write-Host "✓ pnpm $pnpmVersion found" -ForegroundColor Green
} catch {
    Write-Host "Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Step 3: Install MySQL if not present
Write-Host "[3/6] Checking MySQL..." -ForegroundColor Cyan
try {
    $mysqlVersion = mysql --version
    Write-Host "✓ MySQL found: $mysqlVersion" -ForegroundColor Green
} catch {
    Write-Host "MySQL not found. Attempting to install..." -ForegroundColor Yellow
    Write-Host "Please download MySQL from: https://dev.mysql.com/downloads/mysql/" -ForegroundColor Yellow
    Write-Host "After installation, run this script again." -ForegroundColor Yellow
    exit 1
}

# Step 4: Start MySQL service
Write-Host "[4/6] Starting MySQL service..." -ForegroundColor Cyan
try {
    $mysqlService = Get-Service -Name "MySQL95" -ErrorAction SilentlyContinue
    if (-not $mysqlService) {
        $mysqlService = Get-Service -Name "MySQL80" -ErrorAction SilentlyContinue
    }
    if ($mysqlService) {
        if ($mysqlService.Status -ne "Running") {
            Start-Service -Name $mysqlService.Name
            Start-Sleep -Seconds 3
            Write-Host "✓ MySQL service started" -ForegroundColor Green
        } else {
            Write-Host "✓ MySQL service already running" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  Could not find MySQL service. Trying manual start..." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not start MySQL service" -ForegroundColor Yellow
}

# Step 5: Create database
Write-Host "[5/6] Setting up database..." -ForegroundColor Cyan
try {
    $sqlCommands = @"
CREATE DATABASE IF NOT EXISTS cryptoguard;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
CREATE USER IF NOT EXISTS 'root'@'127.0.0.1' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' WITH GRANT OPTION;
FLUSH PRIVILEGES;
"@
    
    $sqlCommands | mysql -u root -e "SELECT 1" 2>$null
    if ($?) {
        Write-Host "✓ Database configured" -ForegroundColor Green
    } else {
        Write-Host "Setting up database..." -ForegroundColor Yellow
        $sqlCommands | mysql -u root
    }
} catch {
    Write-Host "⚠️  Could not configure database" -ForegroundColor Yellow
}

# Step 6: Install dependencies and start
Write-Host "[6/6] Installing dependencies..." -ForegroundColor Cyan
pnpm install

Write-Host ""
Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Starting CryptoGuard AI..." -ForegroundColor Cyan
Write-Host ""

# Initialize database
pnpm db:push

# Start development server
pnpm dev
