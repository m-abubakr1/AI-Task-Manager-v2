// src/pages/About.jsx
function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-4">About AI Task Manager</h2>
      <p className="mb-4">
        This app helps you manage tasks using modern web technology and smart
        suggestions. It evolves beyond a simple to-do list — it's designed to
        help you become more productive with minimal effort.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Create, edit, and categorize your tasks in a Kanban-style board.
        </li>
        <li>Track your progress with insights and deadlines.</li>
        <li>Customize your experience with tags and filters.</li>
        <li>
          In the future: AI-powered suggestions, productivity stats, and voice
          assistant.
        </li>
      </ul>
    </div>
  );
}

export default About;
