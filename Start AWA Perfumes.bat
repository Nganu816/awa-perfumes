@echo off
title AWA Perfumes - Dev Server
color 0D

echo ==========================================
echo    AWA Perfumes - Starting Dev Server
echo ==========================================
echo.

cd /d "C:\Users\user\Documents\Default Project"
if errorlevel 1 (
    echo ERROR: Could not find project directory.
    echo Path: C:\Users\user\Documents\Default Project
    pause
    exit /b 1
)

set "PATH=C:\Users\user\AppData\Local\Programs\nodejs;%PATH%"

where node >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found in PATH.
    echo Expected at: C:\Users\user\AppData\Local\Programs\nodejs
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm not found in PATH.
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ERROR: package.json not found in current directory.
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo Node: 
call node --version
echo NPM:
call npm --version
echo.
echo Starting dev server...
echo Open http://localhost:3000 in your browser when ready.
echo.

call npm run dev

echo.
echo Dev server stopped.
pause
