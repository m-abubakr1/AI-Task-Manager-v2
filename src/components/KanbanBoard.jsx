// src/components/KanbanBoard.jsx
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn.jsx";
import TaskForm from "./TaskForm.jsx";
import { supabase } from "../supabaseClient.js";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // For editing
  const [showForm, setShowForm] = useState(false);

  const columns = ["todo", "in_progress", "done", "notes"];

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setTasks(data);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldTask = tasks.find((t) => t.id === active.id);
    const newStatus = over.data.current?.status;
    if (!newStatus || oldTask.status === newStatus) return;

    const updatedTasks = tasks.map((task) =>
      task.id === active.id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    supabase.from("tasks").update({ status: newStatus }).eq("id", active.id);
  }

  function handleAddOrUpdate(task) {
    const exists = tasks.find((t) => t.id === task.id);
    if (exists) {
      const updatedList = tasks.map((t) => (t.id === task.id ? task : t));
      setTasks(updatedList);
    } else {
      setTasks([task, ...tasks]);
    }
    setShowForm(false);
    setSelectedTask(null);
  }

  function handleEdit(task) {
    setSelectedTask(task);
    setShowForm(true);
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
    supabase.from("tasks").delete().eq("id", id);
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => {
            setSelectedTask(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleAddOrUpdate}
          onCancel={() => {
            setShowForm(false);
            setSelectedTask(null);
          }}
          initialData={selectedTask}
        />
      )}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((status) => (
            <SortableContext
              key={status}
              items={tasks.filter((t) => t.status === status)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                title={status}
                tasks={tasks.filter((t) => t.status === status)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
