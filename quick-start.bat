@echo off
echo 🚀 Starting Aranya One Development Server...
echo.

cd /d "c:\Users\user\aranyaone"

echo 🔄 Killing any hanging Node.js processes...
taskkill /f /im node.exe 2>nul

echo ⚡ Starting Next.js development server...
npm run dev

echo.
echo 🌟 Server should be running at: http://localhost:3000
echo.
pause
