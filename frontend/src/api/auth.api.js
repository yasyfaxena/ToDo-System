import api from "./axios";

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/auth/profile", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.patch("/auth/password", data);
  return response.data;
};

export const deleteAccount = async (password) => {
  const response = await api.delete("/auth/account", {
    data: { password },
  });

  return response.data;
};
