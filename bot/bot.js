require("dotenv").config();
const tmi = require("tmi.js");
const axios = require("axios");

const BOT_USERNAME = process.env.BOT_USERNAME;
const BOT_OAUTH_TOKEN = process.env.BOT_OAUTH_TOKEN;
const CHANNEL_NAME = process.env.CHANNEL_NAME;
const API_BASE_URL = process.env.API_BASE_URL;

const client = new tmi.Client({
  identity: { username: BOT_USERNAME, password: BOT_OAUTH_TOKEN },
  channels: [CHANNEL_NAME],
});

client.connect().catch(console.error);

client.on("message", async (channel, tags, message, self) => {
  if (self) return;

  const [command, ...args] = message.split(" ");

  // Ajouter une tâche
  if (command === "!add") {
    const text = args.join(" ");
    if (!text) return client.say(channel, "❌ Usage: !add <task>");
    try {
      await axios.post(`${API_BASE_URL}/tasks`, { text, username: tags.username });
      client.say(channel, `✅ Task added: ${text}`);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      client.say(channel, "❌ Impossible d'ajouter la task");
    }
  }

  // Lister ses tâches
  if (command === "!mytasks") {
    try {
      const res = await axios.get(`${API_BASE_URL}/tasks`);
      const userTasks = res.data.filter(t => t.username === tags.username.toLowerCase());
      const msg = userTasks.length ? userTasks.map(t => `${t.id}:${t.text} [${t.status}]`).join(", ") : "No tasks";
      client.say(channel, msg);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      client.say(channel, "❌ Impossible de récupérer vos tasks");
    }
  }

  // Marquer une tâche comme done
  if (command === "!done") {
    const taskId = parseInt(args[0]);
    if (!taskId) return client.say(channel, "❌ Usage: !done <taskId>");
    try {
      await axios.put(`${API_BASE_URL}/tasks/${taskId}/done`, { username: tags.username });
      client.say(channel, `✅ Task ${taskId} marked as done`);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      client.say(channel, "❌ Impossible de marquer la task comme done");
    }
  }
});
