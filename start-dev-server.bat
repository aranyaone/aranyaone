@echo off
echo Starting Aranya One Development Server...
echo.

REM Change to project directory
cd /d "%~dp0"

REM Clear any cached processes
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

REM Start development server using cmd instead of PowerShell
echo Starting Next.js development server...
cmd /c "npm run dev"

pause
