# Foreword:

I created a very simple Twitch bot inspired by SuperSweetBot ([https://supersweetbot.cc/about/](https://supersweetbot.cc/about/)) for OBS ([https://obsproject.com/](https://obsproject.com/) completely free and open access.
This project does not replace the original project, which is much more complete.
I am not a programmer, so it is (very) likely that this project contains errors. Any suggestions for improvement are welcome!

**This project was assisted by:** ChatGPT, GPT-5 mini model, OpenAI, December 2025


![Texte alternatif](/screenshots/screen.PNG)



# Tutorial: Twitch Task Bot with Overlay (Task List)

## 1) Prerequisites

Before starting, make sure you have installed on your computer:

Node.js v16 or higher (npm included with Node.js) → Download Node.js ([https://nodejs.org/en/download](https://nodejs.org/en/download))

A Twitch account to create the bot ([https://www.twitch.tv/](https://www.twitch.tv/))

A Twitch OAuth Token (via Twitch Chat OAuth Generator)

* Log in with your Twitch account on [https://twitchtokengenerator.com/](https://twitchtokengenerator.com/)
* Get the "ACCESS TOKEN"

## 2) Clone the project

Open your terminal and type:

* "git clone [https://github.com/your-account/twitch-task-bot.git](https://github.com/your-account/twitch-task-bot.git)"
* "cd twitch-task-bot"

Or download as Zip

## 3) Project structure

The project contains 3 main folders:

```
twitch-task-bot/
├── backend/       # Node.js server + API + WebSocket
├── bot/           # Twitch Bot in Node.js
├── overlay/       # React Overlay for OBS
└── README.md      # What you are currently reading
└── start_bot.bat  # starts the server  
```

## 4) Twitch Bot Configuration

Go to the /bot folder:

* "cd bot"

Copy the example file .env.example:

* "cp .env.example .env"  # Linux/Mac
* "copy .env.example .env" # or on Windows
* You can also simply copy/paste ".env.example" and rename it to ".env"

Open .env and fill in your Twitch info:

```
BOT_USERNAME=your_bot_username # your Twitch bot name  
BOT_OAUTH_TOKEN=oauth:xxxxxxxxxxxxxx # token generated from Twitch: "ACCESS TOKEN"  
CHANNEL_NAME=your_channel # your Twitch channel !! be careful with uppercase letters !!  
API_BASE_URL=http://localhost:3001/api # backend URL on your machine  
```

## 5) Install dependencies

Backend

* "cd ../backend" # go to backend folder
* "npm install"

Bot

* "cd ../bot" # go to bot folder
* "npm install"

Overlay

* "cd ../overlay" # go to overlay folder
* "npm install"

## 6) Start the services

**In Pomodoro_bot, run "start_bot.bat" (double click)**

Solution for debugging: open 3 different terminals

* Terminal 1 – Backend

  * cd backend
  * npm run dev

* API available at [http://localhost:3001/api](http://localhost:3001/api)

* WebSocket server runs on the same port

* Terminal 2 – Twitch Bot

  * cd bot
  * npm run dev

* The bot connects to your Twitch channel

* You should see: ✅ Bot connected to channel: your_channel

* Terminal 3 – React Overlay

  * cd overlay
  * npm start

* The overlay opens at [http://localhost:3000](http://localhost:3000)

## 7) Using in Twitch

You can add this URL in OBS via Browser Source

* Width: 400px
* Height: 600px
* Transparent background: ✅

In your Twitch chat, your bot supports the following commands:

```
Command	Description
!add <text>	Add a new task
!mytasks	List your tasks
!done <id>	Mark a task as done  

Example:  

!add Test the bot
!mytasks
!done 1
```

Tasks appear in real-time on the OBS overlay.

# Overlay Configuration/Customization (optional)

You can customize the appearance in overlay/src/App.css:

```
Text color: color: #B07E79;  

Font: font-family: Calibri, sans-serif;  

Bold: font-weight: bold;  

Transparent background: background: transparent;  

Zebra striping: every other task in very light gray  

Auto-scroll if more than 6 tasks  
```

Remember to occasionally delete the file "backend/tasks.json" to reset task numbers

---

If you want, I can also make a **slightly cleaner English version** while keeping all commands and structure, so it reads more naturally for English speakers. Do you want me to do that?
