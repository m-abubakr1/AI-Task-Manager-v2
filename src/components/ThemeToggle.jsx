// src/components/ThemeToggle.jsx
import { useTheme } from "../context/ThemeContext.jsx";

function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-sm border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;
