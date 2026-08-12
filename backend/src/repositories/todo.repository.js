class TodoRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async create(data) {
    return this.prisma.todo.create({
      data,
    });
  }

  async findByUserId(userId) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}

module.exports = TodoRepository;