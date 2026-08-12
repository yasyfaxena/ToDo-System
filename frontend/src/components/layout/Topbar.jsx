import { Plus, Menu } from "lucide-react";
import useAuthStore from "../../stores/auth.store";

function Topbar({ onAdd, onMenuClick }) {
  const user = useAuthStore((state) => state.user);
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        <div>
          <p className="text-sm font-semibold text-slate-900 sm:hidden">
            TaskFlow
          </p>

          <div className="hidden sm:block">
            <p className="text-sm text-slate-400">Workspace</p>
            <p className="text-sm font-semibold text-slate-900">
              Personal tasks
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Add task - ALWAYS VISIBLE */}
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Plus size={17} strokeWidth={2.2} />
          <span className="hidden sm:inline">Add task</span>
        </button>

        <div className="hidden h-6 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {user?.name || "User"}
            </p>

            <p className="max-w-[180px] truncate text-xs text-slate-400">
              {user?.email || "user@example.com"}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;