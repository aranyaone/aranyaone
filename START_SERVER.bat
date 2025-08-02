@echo off
title Aranya One Development Server
color 0A
echo.
echo ========================================
echo   🚀 ARANYA ONE DEVELOPMENT SERVER
echo ========================================
echo.

cd /d "c:\Users\user\aranyaone"

echo 📂 Current Directory: %CD%
echo.

echo 🔍 Checking Node.js installation...
node --version
echo.

echo 📦 Checking npm installation...
npm --version
echo.

echo 🧹 Clearing any existing processes...
taskkill /f /im node.exe 2>nul
timeout /t 1 /nobreak >nul

echo.
echo ⚡ Starting Next.js Development Server...
echo 🌐 Your app will be available at: http://localhost:3000
echo.
echo ==========================================
echo   Press Ctrl+C to stop the server
echo ==========================================
echo.

npm run dev

echo.
echo ❌ Server stopped or failed to start
echo.
pause
