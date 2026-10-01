@echo off
setlocal enabledelayedexpansion
title Push AWA Perfumes to GitHub
color 0D

cd /d "C:\Users\user\Documents\Default Project"
set "PATH=C:\Users\user\AppData\Local\Programs\nodejs;C:\Users\user\AppData\Local\Programs\GitHub CLI\bin;%PATH%"

echo ============================================================
echo    PUSH AWA PERFUMES TO GITHUB
echo ============================================================
echo.

where gh >nul 2>&1
if errorlevel 1 (
  echo [ERROR] GitHub CLI not found. Please tell your assistant.
  pause
  exit /b 1
)

echo --- Step 1: Your Git identity ---
echo.
set /p GITNAME=Type your full name then press Enter: 
set /p GITEMAIL=Type your GitHub email then press Enter: 
echo.
git config --global user.name "%GITNAME%"
git config --global user.email "%GITEMAIL%"
echo Saved.
echo.

echo --- Step 2: Sign in to GitHub ---
echo.
echo A code will appear below. When it does:
echo   1. Open this link in your browser:  https://github.com/login/device
echo   2. Type the shown code and click Continue
echo   3. Click Authorize
echo.
echo (The window will keep waiting until you finish in the browser.)
echo.
gh auth login --hostname github.com --git-protocol https --web
if errorlevel 1 (
  echo.
  echo [ERROR] Sign-in failed or was cancelled. Run this file again to retry.
  pause
  exit /b 1
)
echo.
echo Signed in successfully.
echo.

for /f "delims=" %%u in ('gh api user --jq .login') do set "GHUSER=%%u"
if "%GHUSER%"=="" set "GHUSER=YOUR-USERNAME"

echo --- Step 3: Saving your code ---
echo.
git add .
git commit -m "Initial commit: AWA Perfumes e-commerce platform with SDLC documentation"
echo.

echo --- Step 4: Create the GitHub repository and upload ---
echo.
set "REPONAME=awa-perfumes"
set /p CUSTOMNAME=Type a repository name, or just press Enter for "awa-perfumes": 
if not "%CUSTOMNAME%"=="" set "REPONAME=%CUSTOMNAME%"

git remote remove origin >nul 2>&1
gh repo create %REPONAME% --public --source=. --remote=origin --push
if errorlevel 1 (
  echo.
  echo [NOTE] Repo may already exist. Trying to push to it now...
  git remote remove origin >nul 2>&1
  git remote add origin https://github.com/%GHUSER%/%REPONAME%.git
  git push -u origin master
)
echo.
echo ============================================================
echo    DONE! Your project is on GitHub.
echo ============================================================
echo.
echo Open this link to see it:
echo    https://github.com/%GHUSER%/%REPONAME%
echo.
echo Copy that link and send it to your lecturer.
echo.
pause
