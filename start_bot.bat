@echo off

:: Backend
start "" /MIN cmd /c "cd backend && npm run dev"

:: Bot
start "" /MIN cmd /c "cd bot && npm run dev"

:: Overlay
start "" /MIN cmd /c "cd overlay && npm start"
