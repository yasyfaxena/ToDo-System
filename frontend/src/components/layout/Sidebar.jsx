import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import useAuthStore from "../../stores/auth.store";

function Sidebar({
  active = "dashboard",
  onNavigate,
  mobileOpen = false,
  onClose,
}) {
  const logout = useAuthStore((state) => state.logout);

  const menu = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "tasks",
      label: "My Tasks",
      icon: CheckSquare,
    },
    {
      id: "ai",
      label: "AI Assistant",
      icon: Sparkles,
      badge: "Soon",
    },
  ];

  const handleNavigate = (id) => {
    onNavigate?.(id);
    onClose?.();
  };

  const handleLogout = () => {
    onClose?.();
    logout();
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r
          border-slate-200 bg-white transition-transform duration-200
          lg:static lg:z-auto lg:flex lg:w-64 lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-20 items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
              T
            </div>

            <div>
              <p className="text-sm font-bold text-slate-950">
                TaskFlow
              </p>

              <p className="text-xs text-slate-400">
                Personal workspace
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />

                <span className="flex-1 text-left">
                  {item.label}
                </span>

                {item.badge && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      isActive
                        ? "bg-white/10 text-white/70"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <button
            onClick={() => handleNavigate("settings")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;