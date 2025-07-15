// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Task Manager</h1>
      <p className="mb-6 text-lg max-w-xl">
        Your smart productivity assistant — organize, track, and enhance your
        workflow with AI.
      </p>
      <Link
        to="/dashboard"
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition"
      >
        Go to Dashboard →
      </Link>
    </div>
  );
}

export default Home;
