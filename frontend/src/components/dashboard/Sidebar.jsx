function Sidebar({ activePage, onNavigate }) {
  const menu = [
    { id: "overview", label: "Overview", icon: "⌂" },
    { id: "tasks", label: "My Tasks", icon: "✓" },
    { id: "today", label: "Today", icon: "◷" },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            T
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-950">
            TaskFlow
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5">
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <div className="space-y-1">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                activePage === item.id
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-8 px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Personal
        </p>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs">
            ⚙
          </span>
          Settings
        </button>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            S
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Syfa
            </p>
            <p className="text-xs text-slate-400">Personal workspace</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
