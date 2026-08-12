import {
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
      {/* Complete */}
      <button
        onClick={() => onToggle(todo)}
        title={
          todo.completed
            ? "Mark as active"
            : "Mark as completed"
        }
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-300 hover:border-slate-900"
        }`}
      >
        {todo.completed && (
          <Check size={14} strokeWidth={3} />
        )}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-medium ${
            todo.completed
              ? "text-slate-400 line-through"
              : "text-slate-800"
          }`}
        >
          {todo.title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {todo.completed
            ? "Completed"
            : "In progress"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
        <button
          onClick={() => onEdit(todo)}
          title="Edit task"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(todo)}
          title="Delete task"
          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;