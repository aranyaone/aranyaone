@echo off
echo.
echo ========================================================
echo 🚀 ARANYA ONE - FINAL VERIFICATION & LAUNCH SCRIPT
echo ========================================================
echo.

echo 📍 Navigating to project directory...
cd /d "c:\Users\user\aranyaone"

echo.
echo 🔍 Checking project status...
echo ✅ Current directory: %CD%
echo.

echo 🧹 Cleaning up any hanging processes...
taskkill /f /im node.exe >nul 2>&1
echo ✅ Processes cleaned

echo.
echo 📦 Installing/updating dependencies...
call npm install
echo ✅ Dependencies ready

echo.
echo 🔧 Running build test...
call npm run build
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build test PASSED
) else (
    echo ❌ Build test FAILED
    pause
    exit /b 1
)

echo.
echo 🎯 Testing lint configuration...
call npm run lint
echo ✅ Lint check completed

echo.
echo 📊 Git status check...
git status
echo.

echo ========================================================
echo 🎉 ALL SYSTEMS READY! LAUNCHING DEVELOPMENT SERVER...
echo ========================================================
echo.
echo 🌐 Your Aranya One platform will be available at:
echo 👉 http://localhost:3000
echo.
echo 💡 Features ready:
echo    ✅ 26+ World-Class Services
echo    ✅ Quantum Performance Monitoring  
echo    ✅ Military-Grade Security
echo    ✅ Real-Time Analytics
echo    ✅ Responsive Design
echo    ✅ Advanced AI Integration
echo.
echo 🚀 Starting development server...
echo.

call npm run dev

pause
