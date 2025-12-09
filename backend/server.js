const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*", methods: ["GET","POST"] } });

app.use(cors());
app.use(express.json());

let tasks = [];
let taskIdCounter = 1;
const TASKS_FILE = path.join(__dirname, "tasks.json");

// Charger les tâches depuis fichier
async function loadTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, "utf8");
    const saved = JSON.parse(data);
    tasks = saved.tasks || [];
    taskIdCounter = saved.counter || 1;
    console.log(`Loaded ${tasks.length} tasks from file`);
  } catch {
    console.log("No existing tasks file, starting fresh");
  }
}

// Sauvegarder les tâches
async function saveTasks() {
  await fs.writeFile(TASKS_FILE, JSON.stringify({ tasks, counter: taskIdCounter }, null, 2));
}

// Routes API
app.get("/api/tasks", (req, res) => res.json(tasks));

app.post("/api/tasks", async (req, res) => {
  const { text, username } = req.body;
  if (!text || !username) return res.status(400).json({ error: "Text and username are required" });

  const newTask = {
    id: taskIdCounter++,
    text: text.trim(),
    username: username.toLowerCase(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await saveTasks();
  io.emit("taskAdded", newTask);
  res.json(newTask);
});

// Marquer une tâche comme done
app.put("/api/tasks/:id/done", async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { username } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (task.username !== username.toLowerCase()) return res.status(403).json({ error: "You can only mark your own tasks" });

  task.status = "done";
  task.updatedAt = new Date().toISOString();
  await saveTasks();
  io.emit("taskCompleted", task);
  res.json(task);
});

// Démarrer serveur
loadTasks();
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
