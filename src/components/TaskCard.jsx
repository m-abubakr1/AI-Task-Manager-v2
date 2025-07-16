import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

function TaskCard({ task, onEdit, onDelete }) {
  // Make this card draggable using its unique ID
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  // CSS transform for smooth dragging
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  // 🛠 Stop clicks from interfering with drag
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-zinc-800 p-3 rounded mb-2 shadow relative"
    >
      <div className="flex justify-between items-center mb-1">
        <strong className="text-sm text-zinc-800 dark:text-white">
          {task.title}
        </strong>

        {/* 🟢 Drag Icon — only this is draggable */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <GripVertical size={18} />
        </div>
      </div>

      {/* Optional Description */}
      {task.description && (
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
          {task.description}
        </p>
      )}

      {/* Due Date */}
      {task.due_date && (
        <p className="text-[11px] text-blue-600 dark:text-blue-400 italic mb-1">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}

      {/* Tags (if exist) */}
      <div className="flex flex-wrap gap-1 mb-2">
        {task.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: tag.color || "#3b82f6" }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 text-sm">
        <button
          onClick={handleEdit}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline dark:text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
