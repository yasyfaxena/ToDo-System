import api from "./axios";

export const getTodos = async () => {
  const response = await api.get("/todos");

  return response.data.todos || [];
};

export const createTodo = async (data) => {
  const response = await api.post("/todos", data);

  return response.data.todo;
};

export const updateTodo = async ({ id, data }) => {
  const response = await api.patch(`/todos/${id}`, data);

  return response.data.todo;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);

  return response.data;
};