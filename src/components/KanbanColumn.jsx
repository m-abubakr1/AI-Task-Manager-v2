import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

function KanbanColumn({ id, title, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="w-full sm:w-1/4 bg-gray-100 p-3 rounded min-h-[300px]"
    >
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default KanbanColumn;
