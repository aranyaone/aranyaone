Write-Host "🚀 Starting Aranya One Development Server..." -ForegroundColor Green
Write-Host ""

# Change to project directory
Set-Location "c:\Users\user\aranyaone"

Write-Host "📂 Current Directory: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Check Node.js and npm
Write-Host "🔍 Node.js Version:" -ForegroundColor Yellow
node --version
Write-Host "📦 npm Version:" -ForegroundColor Yellow  
npm --version
Write-Host ""

# Kill any existing Node processes
Write-Host "🧹 Clearing any existing Node.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# Start the development server
Write-Host "⚡ Starting Next.js Development Server..." -ForegroundColor Green
Write-Host "🌐 Your app will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor Magenta  
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

npm run dev
