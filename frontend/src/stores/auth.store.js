import { create } from "zustand";

const savedToken = localStorage.getItem("taskflow_token");
const savedUser = localStorage.getItem("taskflow_user");

const useAuthStore = create((set) => ({
  token: savedToken,
  user: savedUser ? JSON.parse(savedUser) : null,

  login: ({ token, user }) => {
    localStorage.setItem("taskflow_token", token);
    localStorage.setItem("taskflow_user", JSON.stringify(user));

    set({
      token,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("taskflow_token");
    localStorage.removeItem("taskflow_user");

    set({
      token: null,
      user: null,
    });
  },
}));

export default useAuthStore;
