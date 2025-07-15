// src/components/TaskCard.jsx
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white dark:bg-gray-800 text-sm rounded shadow p-3 cursor-grab"
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <strong>{task.title}</strong>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 dark:text-red-400 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
      {task.description && (
        <p className="mb-1 text-gray-600 dark:text-gray-300">
          {task.description}
        </p>
      )}
      {task.due_date && (
        <p className="text-xs text-gray-500">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: tag.color || "#ddd", color: "#000" }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskCard;
