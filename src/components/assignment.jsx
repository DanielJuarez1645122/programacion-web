function Assignment({ task, onToggle, onDelete }) {
  return (
    <div class={`task ${task.completed ? "completed" : ""}`}>
      <span>{task.name}</span>
      <div>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Pendiente" : "Completada"}
        </button>
        <button onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default Assignment;