// src/pages/Dashboard.jsx
import KanbanBoard from "../components/KanbanBoard";

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 🟦 Left: Kanban Board */}
      <div className="md:col-span-2">
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">🗂️ Kanban Board</h2>
          <KanbanBoard />
        </div>
      </div>

      {/* 🟨 Right: Stats Area (Chart/Clock coming next) */}
      <div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded shadow h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">📊 Insights</h2>
          <p className="text-sm">
            Productivity analytics and digital clock will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
