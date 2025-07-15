// src/components/TaskForm.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient.js";

function TaskForm({ onSubmit, onCancel, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(initialData?.due_date || "");
  const [status, setStatus] = useState(initialData?.status || "todo");

  async function handleSubmit(e) {
    e.preventDefault();

    const taskData = {
      title,
      description,
      due_date: dueDate || null,
      status,
    };

    if (initialData) {
      const { data } = await supabase
        .from("tasks")
        .update(taskData)
        .eq("id", initialData.id)
        .select()
        .single();
      onSubmit(data);
    } else {
      const { data } = await supabase
        .from("tasks")
        .insert(taskData)
        .select()
        .single();
      onSubmit(data);
    }
  }

  useEffect(() => {
    if (!initialData) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("todo");
    }
  }, [initialData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 space-y-3"
    >
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded border mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 rounded border mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 rounded border mt-1"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
          <option value="notes">Notes</option>
        </select>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {initialData ? "Update Task" : "Add Task"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
