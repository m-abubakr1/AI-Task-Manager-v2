// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
