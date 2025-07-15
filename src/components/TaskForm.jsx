import { useState, useEffect } from "react";

const presetColors = ["red", "blue", "green", "yellow", "purple", "gray"];

// Tailwind-safe color map (use bg-[color]-500 class manually)
const colorClasses = {
  red: "bg-red-500 border-red-700",
  blue: "bg-blue-500 border-blue-700",
  green: "bg-green-500 border-green-700",
  yellow: "bg-yellow-500 border-yellow-700",
  purple: "bg-purple-500 border-purple-700",
  gray: "bg-gray-500 border-gray-700",
};

const tagBgTextMap = {
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  purple: "bg-purple-100 text-purple-800",
  gray: "bg-gray-100 text-gray-800",
};

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setStatus(editingTask.status || "todo");
      setDescription(editingTask.description || "");
      setDueDate(editingTask.due_date || "");
      setTags(editingTask.tags || []);
    } else {
      setTitle("");
      setStatus("todo");
      setDescription("");
      setDueDate("");
      setTags([]);
    }
  }, [editingTask]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.some((tag) => tag.name === trimmed)) return;

    setTags([...tags, { name: trimmed, color: selectedColor }]);
    setTagInput("");
  };

  const handleRemoveTag = (name) => {
    setTags(tags.filter((tag) => tag.name !== name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      ...editingTask,
      title,
      status,
      description,
      due_date: dueDate || null,
      tags,
    });

    if (!editingTask) {
      setTitle("");
      setStatus("todo");
      setDescription("");
      setDueDate("");
      setTags([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white p-4 rounded shadow mb-6"
    >
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
      />

      <textarea
        placeholder="Optional description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded"
        rows={2}
      />

      <div className="flex gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
          <option value="notes">Notes</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Tags Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="p-2 border rounded w-full"
          />

          {/* Color Swatches */}
          <div className="flex gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 focus:outline-none ${
                  colorClasses[color]
                } ${selectedColor === color ? "ring-2 ring-black" : ""}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddTag}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Add Tag
          </button>
        </div>

        {/* Show selected tags */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className={`text-sm px-2 py-1 rounded flex items-center gap-1 ${
                tagBgTextMap[tag.color] || "bg-gray-100 text-gray-800"
              }`}
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.name)}
                className="ml-1 text-xs text-gray-600 hover:text-black"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          {editingTask ? "Update" : "Add"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
