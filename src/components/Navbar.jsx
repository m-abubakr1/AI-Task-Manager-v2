// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <div className="text-xl font-bold">
        <Link to="/dashboard">AI Task Manager</Link>
      </div>
      <nav className="flex items-center gap-6">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Navbar;
