import { useEffect, useState } from "react";
import {
  User,
  Palette,
  Shield,
  LogOut,
  X,
  Trash2,
  Lock,
} from "lucide-react";
import useAuthStore from "../../stores/auth.store";
import {
  updateProfile,
  changePassword,
  deleteAccount,
} from "../../api/auth.api";

function SettingsModal({ open, onClose }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [theme, setTheme] = useState(
    localStorage.getItem("taskflow_theme") || "light"
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("taskflow_language") || "English"
  );

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordModal, setPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const [message, setMessage] = useState({
    open: false,
    title: "",
    text: "",
    type: "success",
  });

  useEffect(() => {
    if (open) {
      setName(user?.name || "");
      setEmail(user?.email || "");
    }
  }, [open, user]);

  if (!open) return null;

  const showMessage = (title, text, type = "success") => {
    setMessage({
      open: true,
      title,
      text,
      type,
    });
  };

  const closeMessage = () => {
    setMessage({
      open: false,
      title: "",
      text: "",
      type: "success",
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const result = await updateProfile({
        name,
        email,
      });

      useAuthStore.setState({
        user: result.user,
      });

      localStorage.setItem("taskflow_theme", theme);
      localStorage.setItem("taskflow_language", language);

      setSaved(true);

      showMessage(
        "Changes saved",
        "Your profile and preferences have been updated successfully."
      );

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      showMessage(
        "Unable to save",
        error?.response?.data?.message ||
          "Something went wrong while saving your changes.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage(
        "Incomplete information",
        "Please fill in all password fields.",
        "error"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage(
        "Passwords do not match",
        "New password and confirmation password must match.",
        "error"
      );
      return;
    }

    if (newPassword.length < 8) {
      showMessage(
        "Password too short",
        "Your new password must be at least 8 characters.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordModal(false);

      showMessage(
        "Password changed",
        "Your password has been changed successfully."
      );
    } catch (error) {
      showMessage(
        "Unable to change password",
        error?.response?.data?.message ||
          "Something went wrong while changing your password.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      showMessage(
        "Password required",
        "Enter your password to confirm account deletion.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      await deleteAccount(deletePassword);

      setDeletePassword("");
      setDeleteModal(false);

      onClose?.();

      logout();
    } catch (error) {
      showMessage(
        "Unable to delete account",
        error?.response?.data?.message ||
          "Something went wrong while deleting your account.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onClose?.();
    logout();
  };

  return (
    <>
      {/* Main Settings Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
        <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Settings
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Manage your TaskFlow preferences
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close settings"
            >
              <X size={19} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 py-7">
            <div className="space-y-10">

              {/* Profile */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <User size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Profile
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Your personal information
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Name
                    </label>

                    <input
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>

                    <input
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      type="email"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                    />
                  </div>
                </div>
              </section>

              {/* Preferences */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <Palette size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Preferences
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Customize your workspace
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Theme
                    </label>

                    <select
                      value={theme}
                      onChange={(event) =>
                        setTheme(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Language
                    </label>

                    <select
                      value={language}
                      onChange={(event) =>
                        setLanguage(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                    >
                      <option value="English">English</option>
                      <option value="Indonesian">
                        Indonesian
                      </option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Account */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <Shield size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Account
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Manage your security and account
                    </p>
                  </div>
                </div>

                <div className="space-y-3">

                  {/* Change Password */}
                  <button
                    type="button"
                    onClick={() => setPasswordModal(true)}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 text-left transition hover:bg-slate-50"
                  >
                    <Lock size={17} className="text-slate-500" />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Change password
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Update your account password
                      </p>
                    </div>
                  </button>

                  {/* Delete Account */}
                  <button
                    type="button"
                    onClick={() => setDeleteModal(true)}
                    className="flex w-full items-center gap-3 rounded-xl border border-red-100 px-4 py-3.5 text-left transition hover:bg-red-50"
                  >
                    <Trash2 size={17} className="text-red-500" />

                    <div>
                      <p className="text-sm font-semibold text-red-600">
                        Delete account
                      </p>

                      <p className="mt-1 text-xs text-red-400">
                        Permanently delete your account and tasks
                      </p>
                    </div>
                  </button>

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <LogOut size={17} />
                    Sign out
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="text-xs text-slate-400">
              {saved ? "Changes saved ✓" : "TaskFlow Settings"}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {passwordModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Change password
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Choose a new password for your account.
                </p>
              </div>

              <button
                onClick={() => setPasswordModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPasswordModal(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading ? "Saving..." : "Change password"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <Trash2 size={20} className="text-red-600" />
                </div>

                <h3 className="text-lg font-bold text-slate-950">
                  Delete account?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  This action is permanent. Your account and all
                  your tasks will be deleted and cannot be recovered.
                </p>
              </div>

              <button
                onClick={() => setDeleteModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="password"
              placeholder="Enter your password to confirm"
              value={deletePassword}
              onChange={(e) =>
                setDeletePassword(e.target.value)
              }
              className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-red-500"
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {message.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <h3
              className={`text-lg font-bold ${
                message.type === "error"
                  ? "text-red-600"
                  : "text-slate-950"
              }`}
            >
              {message.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {message.text}
            </p>

            <button
              onClick={closeMessage}
              className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsModal;
