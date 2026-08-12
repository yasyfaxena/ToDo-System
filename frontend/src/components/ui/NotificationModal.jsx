import { Bell, Check, X } from "lucide-react";

function NotificationModal({
  open,
  notifications = [],
  onClose,
  onMarkAllRead,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-end bg-slate-950/20 p-4 pt-20 backdrop-blur-[2px]">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Bell size={18} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Notifications
              </h2>
              <p className="text-xs text-slate-400">
                Recent activity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Bell size={22} className="text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                No notifications
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Your task activity will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 px-5 py-4 transition hover:bg-slate-50"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Check size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {notification.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="border-t border-slate-100 p-4">
            <button
              onClick={onMarkAllRead}
              className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationModal;
