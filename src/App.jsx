import { useState, useEffect } from "react";
import List from "./components/list";
import "./style/App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskName, setTaskName] = useState("");
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div class="app">
      <h1>Gestión de Tareas</h1>
      <div class="input-group">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      <div class="filters">
        <button onClick={() => setFilter("Todas")}>Todas</button>
        <button onClick={() => setFilter("Pendientes")}>Pendientes</button>
        <button onClick={() => setFilter("Completadas")}>Completadas</button>
      </div>

      <List tasks={tasks} filter={filter} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
