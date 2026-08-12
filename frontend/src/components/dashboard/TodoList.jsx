import { Check } from "lucide-react";

function TodoList({ tasks = [], onToggle, onViewAll }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-950">
            Today's tasks
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Stay focused on what matters
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="rounded-lg px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-50"
        >
          View all
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
            <Check size={20} />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-700">
            No tasks for today
          </p>

          <p className="mt-1 text-xs text-slate-400">
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 px-5 py-4 transition hover:bg-violet-50/40"
            >
              <button
                type="button"
                onClick={() => onToggle?.(task)}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  task.completed
                    ? "border-violet-600 bg-violet-600 text-[10px] text-white"
                    : "border-slate-300 hover:border-violet-400"
                }`}
              >
                {task.completed && "✓"}
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-800"
                  }`}
                >
                  {task.title}
                </p>

                {task.category && (
                  <p className="mt-1 text-xs text-slate-400">
                    {task.category}
                  </p>
                )}
              </div>

              {task.priority && (
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
              )}

              {task.time && (
                <span className="text-xs font-medium text-slate-400">
                  {task.time}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
