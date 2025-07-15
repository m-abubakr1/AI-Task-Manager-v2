// src/components/Sidebar.jsx
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } h-full`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-bold">{isOpen ? "Filters" : "F"}</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-sm">
          {isOpen ? "⏴" : "⏵"}
        </button>
      </div>

      {/* Future filters like tag/category will go here */}
      <div className="px-4">
        {isOpen && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Coming soon...
          </p>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
