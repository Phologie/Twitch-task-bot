import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001"); // backend URL

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const handleTasksLoaded = (data) => setTasks(data);

    const handleTaskAdded = (task) => {
      setTasks((prev) => {
        if (prev.find((t) => t.id === task.id)) return prev;
        return [...prev, task];
      });
    };

    const handleTaskCompleted = (task) =>
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));

    const handleTaskDeleted = (task) =>
      setTasks((prev) => prev.filter((t) => t.id !== task.id));

    socket.on("tasksLoaded", handleTasksLoaded);
    socket.on("taskAdded", handleTaskAdded);
    socket.on("taskCompleted", handleTaskCompleted);
    socket.on("taskDeleted", handleTaskDeleted);

    return () => {
      socket.off("tasksLoaded", handleTasksLoaded);
      socket.off("taskAdded", handleTaskAdded);
      socket.off("taskCompleted", handleTaskCompleted);
      socket.off("taskDeleted", handleTaskDeleted);
    };
  }, []);

  return (
    <div className="overlay">
      <h2></h2>
      <ul className={tasks.length > 6 ? "scrollable" : ""}>
        {tasks.map((task) => (
          <li key={task.id} className={task.status === "done" ? "done" : ""}>
            {task.username} ({task.id}) : {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
