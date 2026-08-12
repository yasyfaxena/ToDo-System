function StatsCard({
  label,
  value,
  description,
  icon,
  variant = "default",
}) {
  const variants = {
    blue: {
      border: "border-blue-100",
      background: "from-white to-blue-50",
      icon: "bg-blue-100 text-blue-600",
    },

    amber: {
      border: "border-amber-100",
      background: "from-white to-amber-50",
      icon: "bg-amber-100 text-amber-600",
    },

    emerald: {
      border: "border-emerald-100",
      background: "from-white to-emerald-50",
      icon: "bg-emerald-100 text-emerald-600",
    },

    violet: {
      border: "border-violet-100",
      background: "from-white to-violet-50",
      icon: "bg-violet-100 text-violet-600",
    },

    default: {
      border: "border-slate-200",
      background: "from-white to-slate-50",
      icon: "bg-slate-100 text-slate-600",
    },
  };

  const style = variants[variant] || variants.default;

  return (
    <div
      className={`group rounded-2xl border bg-gradient-to-br p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${style.border} ${style.background}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.icon}`}
        >
          {icon}
        </div>
      </div>

      {description && (
        <p className="mt-4 text-xs text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default StatsCard;