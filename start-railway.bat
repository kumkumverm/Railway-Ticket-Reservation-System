@echo off
title Railway Reservation System Launcher
echo Starting Frontend...
start "Railway Frontend" cmd /k "cd /d "D:\kUMKUM\Railway Reservation System\Frontend" && npm run dev"
timeout /t 5 /nobreak >nul
echo Starting Backend...
start "Railway Backend" cmd /k "cd /d "D:\kUMKUM\Railway Reservation System\Backend" && mvn spring-boot:run"
echo Both servers started!
pause
