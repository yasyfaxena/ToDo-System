import { Search, Plus, Menu, Bell } from "lucide-react";
import useAuthStore from "../../stores/auth.store";

function Topbar({ onAdd, onMenuClick, search = "", onSearchChange }) {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.name || "Syfa";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search tasks..."
            className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50 lg:w-72"
          />
        </div>

        {/* Mobile title */}
        <div className="lg:hidden">
          <p className="text-sm font-bold text-slate-950">
            TaskFlow
          </p>
          <p className="text-[10px] font-medium text-violet-500">
            Productivity
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Add task */}
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg sm:px-4"
        >
          <Plus size={17} strokeWidth={2.5} />
          <span className="hidden sm:inline">Add task</span>
        </button>

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-slate-900">
              {displayName}
            </p>

            <p className="text-xs text-slate-400">
              Personal workspace
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white shadow-md shadow-violet-200">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;