#!/bin/bash

# CryptoGuard AI - Automatic Setup Script for Linux/macOS
# This script installs MySQL, creates the database, and starts the application

echo "🚀 CryptoGuard AI - Automatic Setup"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Step 1: Check if Node.js is installed
echo -e "${CYAN}[1/6] Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install from https://nodejs.org/${NC}"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js $NODE_VERSION found${NC}"

# Step 2: Check if pnpm is installed
echo -e "${CYAN}[2/6] Checking pnpm...${NC}"
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}Installing pnpm...${NC}"
    npm install -g pnpm
fi
PNPM_VERSION=$(pnpm --version)
echo -e "${GREEN}✓ pnpm $PNPM_VERSION found${NC}"

# Step 3: Check if MySQL is installed
echo -e "${CYAN}[3/6] Checking MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}MySQL not found. Installing...${NC}"
    
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y mysql-server
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if ! command -v brew &> /dev/null; then
            echo -e "${RED}Homebrew not found. Please install from https://brew.sh/${NC}"
            exit 1
        fi
        brew install mysql
    fi
fi
MYSQL_VERSION=$(mysql --version)
echo -e "${GREEN}✓ MySQL found: $MYSQL_VERSION${NC}"

# Step 4: Start MySQL service
echo -e "${CYAN}[4/6] Starting MySQL service...${NC}"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo systemctl start mysql
    echo -e "${GREEN}✓ MySQL service started${NC}"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start mysql
    echo -e "${GREEN}✓ MySQL service started${NC}"
fi

sleep 2

# Step 5: Create database
echo -e "${CYAN}[5/6] Setting up database...${NC}"
mysql -u root << EOF
CREATE DATABASE IF NOT EXISTS cryptoguard;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
CREATE USER IF NOT EXISTS 'root'@'127.0.0.1' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF
echo -e "${GREEN}✓ Database configured${NC}"

# Step 6: Install dependencies
echo -e "${CYAN}[6/6] Installing dependencies...${NC}"
pnpm install

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${CYAN}Starting CryptoGuard AI...${NC}"
echo ""

# Initialize database
pnpm db:push

# Start development server
pnpm dev
