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
      const error = new Error("Todo not found");
      error.statusCode = 404;
      throw error;
    }

    if (todo.userId !== userId) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    return todo;
  }

  async update(userId, todoId, data) {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      throw error;
    }

    if (todo.userId !== userId) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    return this.todoRepository.update(todoId, data);
  }

  async delete(userId, todoId) {
    const todo = await this.todoRepository.findById(todoId);

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      throw error;
    }

    if (todo.userId !== userId) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    return this.todoRepository.delete(todoId);
  }
}

module.exports = TodoService;
