import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import KanbanBoard from "./components/KanbanBoard";
import Sidebar from "./components/Sidebar";
import { supabase } from "./supabaseClient";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTag, setActiveTag] = useState(null);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) console.error("Error fetching tasks:", error);
    else setTasks(data);
  };

  const addTask = async (task) => {
    const { error } = await supabase.from("tasks").insert([task]);
    if (error) console.error("Error adding task:", error);
    else fetchTasks();
  };

  const updateTask = async (task) => {
    const { error } = await supabase
      .from("tasks")
      .update(task)
      .eq("id", task.id);
    if (error) console.error("Error updating task:", error);
    else {
      setEditingTask(null);
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.error("Error deleting task:", error);
    else fetchTasks();
  };

  const moveTask = async (id, newStatus) => {
    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) console.error("Error moving task:", error);
    else fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const allTags = Array.from(
    new Map(
      tasks.flatMap((task) => task.tags || []).map((tag) => [tag.name, tag])
    ).values()
  );

  const filteredTasks = activeTag
    ? tasks.filter((task) =>
        (task.tags || []).some((tag) => tag.name === activeTag)
      )
    : tasks;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Task Manager</h1>

      <TaskForm
        onSubmit={editingTask ? updateTask : addTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <div className="flex flex-col sm:flex-row">
        <Sidebar
          allTags={allTags}
          activeTag={activeTag}
          onSelectTag={setActiveTag}
          onClearFilter={() => setActiveTag(null)}
        />

        <KanbanBoard
          tasks={filteredTasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={deleteTask}
          onMove={moveTask}
        />
      </div>
    </div>
  );
}

export default App;
