import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Modal from "../components/ui/Modal";
import SettingsModal from "../components/settings/SettingsModal";
import TodoForm from "../components/todo/TodoForm";
import TodoItem from "../components/todo/TodoItem";
import { useTodos } from "../hooks/useTodos";
import useAuthStore from "../stores/auth.store";

const DEFAULT_SETTINGS = {
  theme: "light",
  notifications: {
    taskCreated: true,
    taskCompleted: true,
    taskDeleted: true,
  },
  defaultFilter: "all",
};

function getSavedSettings() {
  try {
    const saved = localStorage.getItem("taskflow_settings");

    if (!saved) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(saved);

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(parsed.notifications || {}),
      },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const {
    todos: todosData,
    isLoading,
    isError,
    createTodo,
    updateTodo,
    deleteTodo,
    isCreating,
    isUpdating,
  } = useTodos();

  const todos = Array.isArray(todosData) ? todosData : [];

  const [modalOpen, setModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState(
    getSavedSettings().defaultFilter
  );
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [infoModal, setInfoModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  const tasksRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = currentTime.getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  const formattedDate = currentTime.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedTime = currentTime.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

  const stats = useMemo(() => {
    const completed = todos.filter(
      (todo) => todo.completed
    ).length;

    return {
      total: todos.length,
      completed,
      active: todos.length - completed,
      progress: todos.length
        ? Math.round((completed / todos.length) * 100)
        : 0,
    };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const title = String(todo.title || "");

      const matchesSearch = title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);

      return matchesSearch && matchesFilter;
    });
  }, [todos, filter, search]);

  const openCreate = () => {
    setEditingTodo(null);
    setModalOpen(true);
  };

  const openEdit = (todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const closeTaskModal = () => {
    setModalOpen(false);
    setEditingTodo(null);
  };

  const showInfo = (title, message) => {
    setInfoModal({
      open: true,
      title,
      message,
    });
  };

  const closeInfo = () => {
    setInfoModal({
      open: false,
      title: "",
      message: "",
    });
  };

  const handleNavigation = (id) => {
    setMobileMenuOpen(false);

    if (id === "dashboard") {
      dashboardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    if (id === "tasks") {
      tasksRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    if (id === "ai") {
      showInfo(
        "AI Assistant",
        "AI Assistant is coming soon. This feature will help you organize, prioritize, and manage your tasks with AI."
      );

      return;
    }

    if (id === "settings") {
      setSettingsOpen(true);
    }
  };

  const handleSettingsChange = (settings) => {
    if (settings.defaultFilter) {
      setFilter(settings.defaultFilter);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingTodo) {
        await updateTodo({
          id: editingTodo.id,
          data,
        });

        const settings = getSavedSettings();

        if (settings.notifications.taskCreated) {
          showInfo(
            "Task updated",
            `"${data.title}" has been updated successfully.`
          );
        }
      } else {
        await createTodo(data);

        const settings = getSavedSettings();

        if (settings.notifications.taskCreated) {
          showInfo(
            "Task created",
            `"${data.title}" has been added to your tasks.`
          );
        }
      }

      closeTaskModal();
    } catch (error) {
      console.error("Failed to save todo:", error);

      showInfo(
        "Something went wrong",
        "We couldn't save this task. Please try again."
      );
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo({
        id: todo.id,
        data: {
          completed: !todo.completed,
        },
      });

      const settings = getSavedSettings();

      if (settings.notifications.taskCompleted) {
        showInfo(
          todo.completed
            ? "Task reopened"
            : "Task completed",
          todo.completed
            ? `"${todo.title}" is active again.`
            : `"${todo.title}" has been marked as completed.`
        );
      }
    } catch (error) {
      console.error("Failed to update todo:", error);

      showInfo(
        "Something went wrong",
        "We couldn't update this task. Please try again."
      );
    }
  };

  const handleDelete = async (todo) => {
    try {
      await deleteTodo(todo.id);

      const settings = getSavedSettings();

      if (settings.notifications.taskDeleted) {
        showInfo(
          "Task deleted",
          `"${todo.title}" has been removed.`
        );
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);

      showInfo(
        "Something went wrong",
        "We couldn't delete this task. Please try again."
      );
    }
  };

  return (
    <div
      ref={dashboardRef}
      className="flex min-h-screen bg-slate-50 text-slate-900"
    >
      <Sidebar
        active="dashboard"
        onNavigate={handleNavigation}
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <Topbar
          onAdd={openCreate}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {/* Hero */}
          <section className="mb-6 sm:mb-8">
            <p className="text-sm font-medium text-slate-400">
              {greeting}
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Hey, {user?.name?.split(" ")[0] || "there"} 👋
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Here's what's happening with your tasks today.
            </p>

            <div className="mt-4 flex flex-col gap-1 text-sm text-slate-400 sm:flex-row sm:items-center sm:gap-3">
              <span>{formattedDate}</span>

              <span className="hidden sm:block">•</span>

              <span className="font-medium text-slate-600">
                {formattedTime}
              </span>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <p className="text-xs text-slate-400 sm:text-sm">
                Total tasks
              </p>

              <p className="mt-2 text-2xl font-bold sm:text-3xl">
                {stats.total}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <p className="text-xs text-slate-400 sm:text-sm">
                Active
              </p>

              <p className="mt-2 text-2xl font-bold sm:text-3xl">
                {stats.active}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <p className="text-xs text-slate-400 sm:text-sm">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold sm:text-3xl">
                {stats.completed}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-900 bg-slate-950 p-4 text-white sm:p-5">
              <p className="text-xs text-slate-400 sm:text-sm">
                Progress
              </p>

              <p className="mt-2 text-2xl font-bold sm:text-3xl">
                {stats.progress}%
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10 sm:mt-4">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{
                    width: `${stats.progress}%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* Tasks */}
          <section
            ref={tasksRef}
            className="mt-6 scroll-mt-24 rounded-3xl border border-slate-200 bg-white sm:mt-8"
          >
            <div className="border-b border-slate-100 p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">
                      Your tasks
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Stay on top of what needs to get done.
                    </p>
                  </div>

                  <button
                    onClick={openCreate}
                    className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                  >
                    + Add task
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search tasks..."
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-900"
                  />

                  <div className="flex w-full rounded-xl bg-slate-100 p-1 sm:w-auto">
                    {[
                      ["all", "All"],
                      ["active", "Active"],
                      ["completed", "Done"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition sm:flex-none ${
                          filter === value
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 sm:p-6">
              {isLoading && (
                <>
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-20 animate-pulse rounded-2xl bg-slate-100"
                    />
                  ))}
                </>
              )}

              {isError && (
                <div className="rounded-2xl bg-red-50 p-5 text-sm text-red-600">
                  Failed to load your tasks. Please refresh the page.
                </div>
              )}

              {!isLoading &&
                !isError &&
                filteredTodos.length === 0 && (
                  <div className="py-12 text-center sm:py-16">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                      ✓
                    </div>

                    <h3 className="mt-4 font-bold text-slate-800">
                      {search || filter !== "all"
                        ? "No matching tasks"
                        : "You're all caught up"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {search || filter !== "all"
                        ? "Try another search or filter."
                        : "Create your first task to get started."}
                    </p>

                    {!search && filter === "all" && (
                      <button
                        onClick={openCreate}
                        className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Create task
                      </button>
                    )}
                  </div>
                )}

              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Task modal */}
      <Modal
        open={modalOpen}
        title={editingTodo ? "Edit task" : "Create a task"}
        onClose={closeTaskModal}
      >
        <TodoForm
          todo={editingTodo}
          loading={isCreating || isUpdating}
          onSubmit={handleSubmit}
          onClose={closeTaskModal}
        />
      </Modal>

      {/* Notification modal */}
      <Modal
        open={infoModal.open}
        title={infoModal.title}
        onClose={closeInfo}
      >
        <div className="space-y-5">
          <p className="text-sm leading-6 text-slate-500">
            {infoModal.message}
          </p>

          <button
            onClick={closeInfo}
            className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </Modal>

      {/* Settings */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}

export default Dashboard;