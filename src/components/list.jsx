import Assignment from "./assignment";

function List({ tasks, filter, onToggle, onDelete }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Todas") return true;
    if (filter === "Pendientes") return !task.completed;
    if (filter === "Completadas") return task.completed;
  });

  return (
    <div>
      {filteredTasks.map((task) => (
        <Assignment key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default List;
