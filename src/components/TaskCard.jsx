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
      className="bg-white p-3 rounded mb-2 shadow cursor-grab"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <GripVertical className="text-gray-400" size={16} />
            <strong>{task.title}</strong>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 mb-1">{task.description}</p>
          )}
          {task.due_date && (
            <p className="text-xs text-gray-400">Due: {task.due_date}</p>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {(task.tags || []).map((tag) => (
              <span
                key={tag.name}
                className={`text-xs px-2 py-1 rounded ${
                  {
                    red: "bg-red-100 text-red-800",
                    blue: "bg-blue-100 text-blue-800",
                    green: "bg-green-100 text-green-800",
                    yellow: "bg-yellow-100 text-yellow-800",
                    purple: "bg-purple-100 text-purple-800",
                    gray: "bg-gray-100 text-gray-800",
                  }[tag.color] || "bg-gray-100 text-gray-800"
                }`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 text-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
