import { DndContext } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";

function KanbanBoard({ tasks, onEdit, onDelete, onMove }) {
  const columns = ["todo", "in_progress", "done", "notes"];
  const columnTitles = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
    notes: "Notes",
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    onMove(taskId, newStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 gap-4 overflow-x-auto">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            id={status}
            title={columnTitles[status]}
            tasks={tasks.filter((task) => task.status === status)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;
