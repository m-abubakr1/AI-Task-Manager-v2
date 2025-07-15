// src/components/Sidebar.jsx

function Sidebar({ allTags, activeTag, onSelectTag, onClearFilter }) {
  return (
    <aside className="w-full sm:w-60 p-4 bg-gray-50 border-r mb-4 sm:mb-0 sm:mr-4 rounded shadow-sm">
      <h2 className="font-semibold text-lg mb-4">🎯 Filter by Tag</h2>

      <ul className="flex sm:flex-col flex-wrap gap-2">
        {allTags.map((tag) => {
          const isActive = activeTag === tag.name;
          return (
            <li key={tag.name}>
              <button
                onClick={() => {
                  onSelectTag(tag.name);
                  window.scrollTo({ top: 0, behavior: "smooth" }); // UX polish
                }}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full transition-all duration-150 border shadow-sm
                  ${
                    isActive
                      ? "bg-black text-white border-black"
                      : `bg-white text-${tag.color}-700 border-${tag.color}-300 hover:bg-${tag.color}-50`
                  }
                `}
              >
                <span
                  className={`w-3 h-3 rounded-full bg-${tag.color}-500`}
                ></span>
                {tag.name}
              </button>
            </li>
          );
        })}
      </ul>

      {activeTag && (
        <button
          onClick={onClearFilter}
          className="mt-4 text-sm text-gray-600 hover:underline"
        >
          ❌ Clear Filter
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
