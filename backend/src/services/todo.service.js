const AppError = require("../errors/AppError");

class TodoService {
  constructor({ todoRepository }) {
    this.todoRepository = todoRepository;
  }

  async create(userId, { title }) {
    return this.todoRepository.create({
      title,
      userId,
    });
  }

  async getAll(userId) {
    return this.todoRepository.findByUserId(userId);
  }

  async getOne(userId, todoId) {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    if (todo.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return todo;
  }

  async update(userId, todoId, data) {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    if (todo.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return this.todoRepository.update(todoId, data);
  }

  async delete(userId, todoId) {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    if (todo.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return this.todoRepository.delete(todoId);
  }
}

module.exports = TodoService;
