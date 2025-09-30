@echo off
echo ====================================
echo   Starting ElseWhere Dev Server
echo ====================================
echo.
echo Opening in a new window...
echo.
cd /d "%~dp0"
start cmd /k "npm run dev"
echo.
echo Server is starting in a new window!
echo Wait 10 seconds, then open: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
