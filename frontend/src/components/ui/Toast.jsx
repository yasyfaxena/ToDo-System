import { CheckCircle2, XCircle, Info, X } from "lucide-react";

function Toast({ notification, onClose }) {
  if (!notification) return null;

  const styles = {
    success: {
      icon: CheckCircle2,
      wrapper: "border-emerald-200 bg-white",
      iconWrapper: "bg-emerald-50 text-emerald-600",
      title: "text-slate-900",
    },
    error: {
      icon: XCircle,
      wrapper: "border-red-200 bg-white",
      iconWrapper: "bg-red-50 text-red-600",
      title: "text-slate-900",
    },
    info: {
      icon: Info,
      wrapper: "border-slate-200 bg-white",
      iconWrapper: "bg-slate-100 text-slate-600",
      title: "text-slate-900",
    },
  };

  const style = styles[notification.type] || styles.info;
  const Icon = style.icon;

  return (
    <div className="fixed right-5 top-5 z-[100] w-[calc(100%-40px)] max-w-sm animate-[slideIn_.25s_ease-out]">
      <div
        className={`flex items-start gap-3 rounded-2xl border p-4 shadow-xl ${style.wrapper}`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconWrapper}`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${style.title}`}>
            {notification.title}
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {notification.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
