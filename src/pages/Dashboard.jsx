// src/pages/Dashboard.jsx
import KanbanBoard from "../components/KanbanBoard.jsx";

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Tasks</h1>
      <KanbanBoard />
    </div>
  );
}

export default Dashboard;
