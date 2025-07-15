// src/components/KanbanColumn.jsx
import TaskCard from "./TaskCard.jsx";
import { useDroppable } from "@dnd-kit/core";

function KanbanColumn({ title, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({
    id: title,
    data: {
      status: title,
    },
  });

  const titleMap = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
    notes: "Notes",
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 dark:bg-gray-700 p-4 rounded h-full min-h-[400px]"
    >
      <h2 className="text-lg font-semibold mb-2">{titleMap[title] || title}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
