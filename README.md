# 🔐 CryptoGuard AI

**Real-time Cryptocurrency Fraud Detection System with AI-Powered Analytics**

A comprehensive full-stack application for detecting and preventing cryptocurrency fraud through advanced machine learning algorithms and real-time transaction monitoring.

---

## 📋 Table of Contents

1. [Quick Start (For Everyone)](#quick-start-for-everyone)
2. [What You Need to Install](#what-you-need-to-install)
3. [Step-by-Step Installation Guide](#step-by-step-installation-guide)
4. [Running the Application](#running-the-application)
5. [Features](#features)
6. [Technology Stack](#technology-stack)
7. [Project Structure](#project-structure)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start (For Everyone)

### The Easiest Way - 2 Clicks!

If you just want to run the application without any technical knowledge:

1. **Download** `INSTALL.bat` from this repository
2. **Double-click** the file
3. **Wait** for everything to install automatically
4. **Done!** The application opens in your browser

That's it! No terminal, no commands needed. Everything is automatic.

---

## 📦 What You Need to Install

Before running CryptoGuard AI, you need to have these programs installed on your Windows computer:

### 1. **Node.js** (Required)
- **What is it?** A runtime environment for running JavaScript applications
- **Why do you need it?** CryptoGuard AI is built with Node.js
- **Download:** https://nodejs.org/
- **Version:** v18 or higher (LTS recommended)
- **Installation:** Click "Next" through all the installation steps
- **Important:** Check the box "Add Node.js to PATH" during installation

### 2. **MySQL** (Required)
- **What is it?** A database system that stores all application data
- **Why do you need it?** CryptoGuard AI stores user accounts, transactions, and alerts in MySQL
- **Download:** https://dev.mysql.com/downloads/mysql/
- **Version:** 8.0 or higher
- **Installation:** Follow the installer steps
- **Important:** Remember the password you set (default: `161120`)

### 3. **Git** (Optional but Recommended)
- **What is it?** A version control system
- **Why do you need it?** To download the project from GitHub
- **Download:** https://git-scm.com/
- **Installation:** Click "Next" through all steps

---

## 📝 Step-by-Step Installation Guide

### For Complete Beginners

#### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Click the **LTS** button (Long Term Support)
3. Download the installer for Windows
4. Run the installer (`.msi` file)
5. Click "Next" for each step
6. **IMPORTANT:** When you see "Add Node.js to PATH", make sure it's checked ✓
7. Click "Install"
8. Wait for installation to complete
9. Click "Finish"

**Verify it worked:**
- Open Command Prompt (search for "cmd" in Windows)
- Type: `node --version`
- You should see a version number like `v20.11.0`

#### Step 2: Install MySQL

1. Go to https://dev.mysql.com/downloads/mysql/
2. Download the **MySQL Community Server** (latest version)
3. Run the installer
4. Click "Next" for each step
5. When asked for a password, use: `161120` (or remember your own)
6. Click "Next" to complete
7. Wait for installation to finish

**Verify it worked:**
- Open Command Prompt
- Type: `mysql --version`
- You should see a version number

#### Step 3: Download CryptoGuard AI

**Option A: Using INSTALL.bat (Recommended)**
1. Go to https://github.com/lucasandre16112000-png/cryptoguard-ai
2. Click the green **Code** button
3. Click **Download ZIP**
4. Extract the ZIP file to a folder (e.g., Desktop or Documents)
5. Find and **double-click** `INSTALL.bat`
6. Wait for everything to install (this may take 5-10 minutes)
7. Your browser will open automatically with the application

**Option B: Using Git (For Advanced Users)**
1. Open Command Prompt
2. Navigate to where you want to install:
   ```
   cd Desktop
   ```
3. Clone the repository:
   ```
   git clone https://github.com/lucasandre16112000-png/cryptoguard-ai.git
   ```
4. Navigate to the project:
   ```
   cd cryptoguard-ai
   ```
5. Double-click `INSTALL.bat`

---

## ▶️ Running the Application

### Using INSTALL.bat (Recommended)

1. Navigate to the CryptoGuard AI folder
2. **Double-click** `INSTALL.bat`
3. A window will open showing the installation progress
4. Wait for it to complete
5. Your browser will automatically open to http://localhost:3000
6. You're ready to use CryptoGuard AI!

### Manual Running (For Developers)

If you want to run it manually:

1. Open Command Prompt
2. Navigate to the project folder:
   ```
   cd path\to\cryptoguard-ai
   ```
3. Install dependencies:
   ```
   pnpm install
   ```
4. Build the project:
   ```
   pnpm build
   ```
5. Set up the database:
   ```
   pnpm db:push
   ```
6. Start the development server:
   ```
   pnpm dev
   ```
7. Open your browser and go to: http://localhost:3000

---

## ✨ Features

### 🔍 Real-Time Fraud Detection
- Monitor cryptocurrency transactions in real-time
- AI-powered anomaly detection
- Instant fraud alerts and notifications

### 📊 Advanced Analytics Dashboard
- Transaction statistics and trends
- Risk assessment scores
- Historical data analysis
- Visual charts and reports

### 👥 User Management
- Secure user authentication
- Role-based access control
- User activity tracking

### 📧 Alert System
- Automatic fraud alerts
- Email notifications
- Customizable alert thresholds

### 📄 Report Generation
- Generate detailed fraud reports
- Export data in multiple formats
- Audit trail tracking

### 🎮 Admin Panel
- Manage users and permissions
- Generate test data
- System configuration
- Activity monitoring

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **tRPC** - Type-safe API
- **TypeScript** - Type safety

### Database
- **MySQL 8.0** - Database system
- **Drizzle ORM** - Database management

### Tools
- **pnpm** - Package manager
- **Docker** - Containerization (optional)

---

## 📁 Project Structure

```
cryptoguard-ai/
├── src/
│   ├── client/          # Frontend React code
│   ├── server/          # Backend Express code
│   ├── db/              # Database schema
│   └── shared/          # Shared types
├── public/              # Static files
├── drizzle/             # Database migrations
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── INSTALL.bat          # Automatic installer
└── README.md            # This file
```

---

## 🐛 Troubleshooting

### Problem: "Node.js not found"
**Solution:**
1. Make sure Node.js is installed
2. Restart your computer
3. Open Command Prompt and type: `node --version`
4. If it still doesn't work, reinstall Node.js
5. Make sure you checked "Add Node.js to PATH" during installation

### Problem: "MySQL not found"
**Solution:**
1. Make sure MySQL is installed
2. Restart your computer
3. Open Command Prompt and type: `mysql --version`
4. If it still doesn't work, reinstall MySQL
5. Make sure MySQL service is running

### Problem: "Port 3000 is already in use"
**Solution:**
1. Close any other applications using port 3000
2. Or change the PORT in `.env` file to a different number (e.g., 3001)
3. Restart the application

### Problem: "Database connection failed"
**Solution:**
1. Make sure MySQL is running
2. Check that the password is correct (default: `161120`)
3. Make sure the database `cryptoguard` exists
4. Restart MySQL service

### Problem: "INSTALL.bat closes immediately"
**Solution:**
1. Make sure Node.js and MySQL are installed
2. Check your internet connection
3. Try running as Administrator
4. Check the error messages in the console

### Problem: "Application won't start"
**Solution:**
1. Open Command Prompt in the project folder
2. Run: `pnpm install`
3. Run: `pnpm build`
4. Run: `pnpm dev`
5. Check for error messages

### Problem: "Cannot create account"
**Solution:**
1. Make sure the database is set up correctly
2. Run: `pnpm db:push` to apply migrations
3. Restart the application
4. Try creating the account again

---

## 🎮 How to Use the Application

### 1. Create an Account
- Click on "Create Account" button
- Fill in your name, email, and password
- Click "Create Account"
- You'll be logged in automatically

### 2. Login
- Enter your email and password
- Click "Sign In"
- You'll see the main dashboard

### 3. View Dashboard
- See real-time statistics
- Monitor transaction trends
- Check fraud detection alerts

### 4. Generate Test Data (Admin)
- Go to the Admin panel
- Enter a number (e.g., 50) for test transactions
- Click "Generate Data"
- The system will create sample transactions

### 5. View Transactions
- Go to "Transactions" section
- See all analyzed transactions
- Check risk scores and details

### 6. Check Alerts
- Go to "Alerts" section
- View all fraud detection alerts
- See transaction details and risk factors

### 7. Generate Reports
- Go to "Reports" section
- Select date range
- Click "Generate Report"
- Download as PDF

---

## 📊 Risk Analysis

The system analyzes the following factors:

| Factor | Description | Impact |
|--------|-------------|--------|
| **Transaction Value** | Very high transactions | +25 points |
| **Gas Price** | Abnormal gas prices | +20 points |
| **Time** | Unusual transaction times | +8 points |
| **New Address** | Address less than 24 hours old | +15 points |
| **Fast Pattern** | Multiple rapid transactions | +10 points |
| **Contract** | Complex contract interaction | +10 points |

**Risk Score:** 0-100 (higher = more suspicious)

---

## 🔧 Development Commands

### Install Dependencies
```bash
pnpm install
```

### Run in Development
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Apply Database Migrations
```bash
pnpm db:push
```

### Generate Database Migrations
```bash
pnpm db:generate
```

---

## 📝 Environment Variables

The `.env` file is created automatically by INSTALL.bat with these values:

```env
DATABASE_URL=mysql://root:161120@127.0.0.1:3306/cryptoguard
NODE_ENV=development
JWT_SECRET=jwt-secret-key-change-in-production-87654321
COOKIE_SECRET=cryptoguard-secret-key-change-in-production-12345678
PORT=3000
```

---

## 🚀 Next Steps

After successful installation:

1. **Explore the Dashboard** - See real-time statistics
2. **Generate Test Data** - Create sample transactions
3. **Analyze Alerts** - Understand fraud detection
4. **Generate Reports** - Create PDF reports
5. **Customize Settings** - Adjust alert thresholds

---

## 📞 Support

If you encounter any issues:

1. Check the Troubleshooting section above
2. Make sure all prerequisites are installed
3. Try running INSTALL.bat again
4. Check your internet connection
5. Restart your computer if something doesn't work

---

## 📄 License

This project is provided as-is for cryptocurrency fraud detection purposes.

---

## 🎯 Getting Started Now

### The Fastest Way:
1. Download `INSTALL.bat`
2. Double-click it
3. Done! ✅

### Questions?
- Check the Troubleshooting section
- Make sure Node.js and MySQL are installed
- Restart your computer if something doesn't work

---

**Happy fraud detection! 🔐**

For more information, visit: https://github.com/lucasandre16112000-png/cryptoguard-ai
