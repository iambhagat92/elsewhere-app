@echo off
echo ====================================
echo   Stopping ElseWhere Dev Server
echo ====================================
echo.
echo Killing all Node.js processes...
echo.

REM Kill all node processes
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im cmd.exe /fi "WINDOWTITLE eq *npm*" >nul 2>&1

REM Check if port 3000 is still in use
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process using port 3000: %%a
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo ✅ Server stopped successfully!
echo.
echo You can now:
echo 1. Double-click START_SERVER.bat to restart
echo 2. Or run: npm run dev
echo.
echo Press any key to exit...
pause > nul