@echo off
cls
title Aranya One - Auto Pilot Mode
color 0A

echo.
echo ==========================================
echo     🚀 ARANYA ONE - AUTO PILOT MODE
echo ==========================================
echo.

cd /d "c:\Users\user\aranyaone"

echo ✅ Directory: %CD%
echo.

echo 🔍 Node.js Version:
node --version
echo.

echo 📦 npm Version:  
npm --version
echo.

echo 🧹 Clearing processes...
taskkill /f /im node.exe 2>nul >nul

echo ⚡ Starting Development Server...
echo 🌐 Opening: http://localhost:3000
echo.
echo ==========================================
echo    Server Starting - Please Wait...
echo ==========================================
echo.

start http://localhost:3000

npm run dev
