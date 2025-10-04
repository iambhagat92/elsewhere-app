@echo off
echo ====================================
echo   Restarting ElseWhere Dev Server
echo ====================================
echo.
echo Step 1: Stopping any running servers...
echo.

REM Kill all node processes
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im cmd.exe /fi "WINDOWTITLE eq *npm*" >nul 2>&1

REM Check if port 3000 is still in use
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process using port 3000: %%a
    taskkill /f /pid %%a >nul 2>&1
)

echo ✅ Old servers stopped!
echo.
echo Step 2: Starting fresh server...
echo.
timeout /t 3 /nobreak >nul

cd /d "%~dp0"
start cmd /k "npm run dev"

echo.
echo ✅ Server is starting in a new window!
echo.
echo Wait 10 seconds, then:
echo 1. Double-click OPEN_APP.html
echo 2. Or go to: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul