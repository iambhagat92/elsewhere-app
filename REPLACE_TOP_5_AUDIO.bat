@echo off
echo ========================================
echo   Replace Top 5 Cities Audio
echo ========================================
echo.
echo This will replace audio for:
echo 1. Moscow
echo 2. Rome
echo 3. Istanbul
echo 4. Bangkok
echo 5. Cairo
echo.
echo ========================================
echo.
echo STEP 1: Download 5 sounds from Pixabay
echo        (See DOWNLOAD_TOP_5_CITIES.md)
echo.
echo STEP 2: Name them:
echo        - moscow-unique.mp3
echo        - rome-unique.mp3
echo        - istanbul-unique.mp3
echo        - bangkok-unique.mp3
echo        - cairo-unique.mp3
echo.
echo STEP 3: Put them in your Downloads folder
echo.
echo STEP 4: Press any key here to copy them!
echo.
pause

cd /d "%~dp0public\audio"

echo.
echo Copying files...
echo.

copy "%USERPROFILE%\Downloads\moscow-unique.mp3" "moscow-ambient.mp3" /Y
if %errorlevel% equ 0 (echo ✓ Moscow updated!) else (echo ✗ Moscow file not found!)

copy "%USERPROFILE%\Downloads\rome-unique.mp3" "rome-ambient.mp3" /Y
if %errorlevel% equ 0 (echo ✓ Rome updated!) else (echo ✗ Rome file not found!)

copy "%USERPROFILE%\Downloads\istanbul-unique.mp3" "istanbul-ambient.mp3" /Y
if %errorlevel% equ 0 (echo ✓ Istanbul updated!) else (echo ✗ Istanbul file not found!)

copy "%USERPROFILE%\Downloads\bangkok-unique.mp3" "bangkok-ambient.mp3" /Y
if %errorlevel% equ 0 (echo ✓ Bangkok updated!) else (echo ✗ Bangkok file not found!)

copy "%USERPROFILE%\Downloads\cairo-unique.mp3" "cairo-ambient.mp3" /Y
if %errorlevel% equ 0 (echo ✓ Cairo updated!) else (echo ✗ Cairo file not found!)

echo.
echo ========================================
echo   Done! Restart your server now.
echo ========================================
echo.
pause
