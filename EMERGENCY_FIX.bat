@echo off
echo 🚀 ARANYA ONE - EMERGENCY FIX SCRIPT
echo ====================================
echo.

echo 🔧 Step 1: Killing any hanging Node.js processes...
taskkill /f /im node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js processes terminated
) else (
    echo ℹ️  No Node.js processes were running
)
echo.

echo 📁 Step 2: Navigating to project directory...
cd /d "c:\Users\user\aranyaone"
if %errorlevel% neq 0 (
    echo ❌ ERROR: Could not navigate to project directory
    pause
    exit /b 1
)
echo ✅ In project directory: %cd%
echo.

echo 🧹 Step 3: Clearing Next.js cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo ✅ Next.js cache cleared
) else (
    echo ℹ️  No cache to clear
)
echo.

echo 📦 Step 4: Installing/updating dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ ERROR: npm install failed
    echo.
    echo 🔄 Trying to fix npm issues...
    npm cache clean --force
    npm install
)
echo ✅ Dependencies updated
echo.

echo 🚀 Step 5: Starting development server...
echo.
echo 🌟 Opening browser to http://localhost:3000 in 10 seconds...
echo 📝 If you see a white screen, press Ctrl+F5 to hard refresh
echo.
start "" "http://localhost:3000"
npm run dev

pause
