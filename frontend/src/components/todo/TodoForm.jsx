import { useEffect, useState } from "react";

function TodoForm({
  todo,
  loading,
  onSubmit,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(todo?.title || "");
    setError("");
  }, [todo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      return;
    }

    if (trimmedTitle.length < 2) {
      setError(
        "Task title must be at least 2 characters."
      );
      return;
    }

    setError("");

    await onSubmit({
      title: trimmedTitle,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Task title
        </label>

        <input
          autoFocus
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          placeholder="What needs to be done?"
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 disabled:bg-slate-50"
        />

        {error && (
          <p className="mt-2 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            loading || !title.trim()
          }
          className="flex-1 rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : todo
            ? "Save changes"
            : "Add task"}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;