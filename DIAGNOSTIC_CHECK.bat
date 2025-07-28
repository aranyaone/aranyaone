@echo off
echo 🔍 ARANYA ONE - SYSTEM DIAGNOSTIC
echo =================================
echo.

echo 📋 Checking system status...
echo.

echo 🔧 Node.js version:
node --version
echo.

echo 📦 npm version:
npm --version
echo.

echo 📁 Current directory:
echo %cd%
echo.

echo 📂 Project files check:
if exist "package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json missing
)

if exist "next.config.js" (
    echo ✅ next.config.js found
) else (
    echo ❌ next.config.js missing
)

if exist "app\layout.js" (
    echo ✅ app/layout.js found
) else (
    echo ❌ app/layout.js missing
)

if exist "app\page.js" (
    echo ✅ app/page.js found
) else (
    echo ❌ app/page.js missing
)

if exist "components" (
    echo ✅ components folder found
) else (
    echo ❌ components folder missing
)
echo.

echo 🌐 Checking port 3000:
netstat -ano | findstr :3000
if %errorlevel% equ 0 (
    echo ⚠️  Port 3000 is already in use
) else (
    echo ✅ Port 3000 is available
)
echo.

echo 📊 Project size:
dir /s | find "File(s)"
echo.

echo 🎯 Ready to start? Press any key to run development server...
pause >nul

echo.
echo 🚀 Starting development server...
npm run dev
