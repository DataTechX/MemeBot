@ECHO OFF
@ECHO Taking a 5 Second Break for Bot
ECHO ==========================
timeout /T 5 /nobreak
ECHO ==========================
@ECHO Starting BOT
ECHO ==========================
start cmd /k node main.js
exit /s
