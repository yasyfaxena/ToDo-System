import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  Sparkles,
  Settings,
  X,
} from "lucide-react";

import useAuthStore from "../../stores/auth.store";

function Sidebar({
  active = "dashboard",
  onNavigate,
  mobileOpen = false,
  onClose,
}) {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.name || "Syfa";
  const initial = displayName.charAt(0).toUpperCase();

  const menu = [
    {
      id: "dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "tasks",
      label: "My Tasks",
      icon: ListTodo,
    },
    {
      id: "today",
      label: "Today",
      icon: CalendarDays,
    },
    {
      id: "ai",
      label: "AI Assistant",
      icon: Sparkles,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6">
          <button
            type="button"
            onClick={() => onNavigate?.("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-violet-200">
              <span className="relative z-10">T</span>
            </div>

            <div className="text-left">
              <span className="block text-lg font-bold tracking-tight text-slate-950">
                TaskFlow
              </span>

              <span className="block text-[10px] font-semibold uppercase tracking-widest text-violet-500">
                Productivity
              </span>
            </div>
          </button>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Workspace
          </p>

          <div className="space-y-1.5">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-50 to-fuchsia-50 text-violet-700 shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                      isActive
                        ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-200"
                        : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700"
                    }`}
                  >
                    <Icon size={17} strokeWidth={2.2} />
                  </span>

                  <span>{item.label}</span>

                  {item.id === "ai" && !isActive && (
                    <span className="ml-auto rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold text-violet-600">
                      AI
                    </span>
                  )}

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-violet-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Personal */}
          <p className="mt-9 px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Personal
          </p>

          <button
            type="button"
            onClick={() => onNavigate?.("settings")}
            className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
              active === "settings"
                ? "bg-violet-50 text-violet-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                active === "settings"
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700"
              }`}
            >
              <Settings size={17} />
            </span>

            Settings
          </button>
        </nav>

        {/* User card */}
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-2xl bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white shadow-md shadow-violet-200">
                {initial}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {displayName}
                </p>

                <p className="truncate text-xs text-slate-400">
                  Personal workspace
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;