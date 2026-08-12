const tasks = [
  {
    title: "Finish API integration",
    category: "Development",
    priority: "High",
    time: "09:00",
    completed: false,
  },
  {
    title: "Review dashboard design",
    category: "Design",
    priority: "Medium",
    time: "11:30",
    completed: false,
  },
  {
    title: "Update project documentation",
    category: "Documentation",
    priority: "Low",
    time: "15:00",
    completed: true,
  },
];

function TodoList() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-950">Today's tasks</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Stay focused on what matters
          </p>
        </div>

        <button className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">
          View all
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50"
          >
            <button
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                task.completed
                  ? "border-slate-900 bg-slate-900 text-[10px] text-white"
                  : "border-slate-300"
              }`}
            >
              {task.completed && "✓"}
            </button>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-medium ${
                  task.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }`}
              >
                {task.title}
              </p>
              <p className="mt-1 text-xs text-slate-400">{task.category}</p>
            </div>

            <span
              className={`hidden rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${
                task.priority === "High"
                  ? "bg-red-50 text-red-600"
                  : task.priority === "Medium"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {task.priority}
            </span>

            <span className="text-xs font-medium text-slate-400">
              {task.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
