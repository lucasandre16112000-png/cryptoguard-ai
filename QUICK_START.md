# 🚀 CryptoGuard AI - Quick Start Guide

**No configuration needed! Everything works out of the box.**

## Windows Users

### Option 1: Automatic Setup (Recommended)

1. Open PowerShell as Administrator
2. Navigate to the project folder:
   ```powershell
   cd C:\path\to\cryptoguard-ai
   ```
3. Run the setup script:
   ```powershell
   .\setup.ps1
   ```

That's it! The script will:
- ✅ Check Node.js and pnpm
- ✅ Install MySQL (if needed)
- ✅ Create the database
- ✅ Install dependencies
- ✅ Start the server

### Option 2: Manual Setup

1. **Install MySQL** from https://dev.mysql.com/downloads/mysql/
   - Use default settings
   - Password: `root`

2. **Start MySQL Service**
   - Open Services (Win + R → `services.msc`)
   - Find "MySQL95" or "MySQL80"
   - Right-click → Start

3. **Run the project**
   ```powershell
   cd C:\path\to\cryptoguard-ai
   pnpm install
   pnpm db:push
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## Linux / macOS Users

### Automatic Setup (Recommended)

```bash
cd /path/to/cryptoguard-ai
chmod +x setup.sh
./setup.sh
```

The script will:
- ✅ Check Node.js and pnpm
- ✅ Install MySQL
- ✅ Create the database
- ✅ Install dependencies
- ✅ Start the server

### Manual Setup

```bash
# Install MySQL
# Ubuntu/Debian:
sudo apt-get install mysql-server

# macOS:
brew install mysql

# Start MySQL
sudo systemctl start mysql  # Linux
brew services start mysql   # macOS

# Run the project
cd /path/to/cryptoguard-ai
pnpm install
pnpm db:push
pnpm dev
```

---

## 🎯 Default Configuration

**Database:**
- Host: `127.0.0.1`
- Port: `3306`
- User: `root`
- Password: `root`
- Database: `cryptoguard`

**Server:**
- URL: `http://localhost:3000`
- API: `http://localhost:3000/api/trpc`

---

## 📝 Available Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Initialize/update database
pnpm db:push

# Check TypeScript errors
pnpm check

# Format code
pnpm format

# Run tests
pnpm test
```

---

## 🔧 Troubleshooting

### MySQL Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solution:**
1. Make sure MySQL is running
2. Windows: Open Services (Win + R → `services.msc`) and start MySQL
3. Linux/macOS: `sudo systemctl start mysql` or `brew services start mysql`

### Port Already in Use

**Problem:** `Port 3000 already in use`

**Solution:**
The server will automatically use the next available port (3001, 3002, etc.)

### pnpm Not Found

**Problem:** `pnpm: command not found`

**Solution:**
```bash
npm install -g pnpm
```

---

## 📊 What is CryptoGuard AI?

CryptoGuard AI is a blockchain transaction monitoring system that:

- 🔍 **Monitors** transactions on Ethereum, BSC, and Polygon
- 🤖 **Detects** suspicious transactions using AI
- 🚨 **Alerts** users about potential fraud
- 📄 **Generates** detailed PDF reports
- 📊 **Displays** analytics and statistics

---

## 🚀 Next Steps

1. Open http://localhost:3000 in your browser
2. Explore the dashboard
3. Check out the API at http://localhost:3000/api/trpc
4. Read the main README.md for more details

---

**Enjoy using CryptoGuard AI! 🎉**
