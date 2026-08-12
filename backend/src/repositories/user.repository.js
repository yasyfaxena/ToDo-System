class UserRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data) {
    return this.prisma.user.create({
      data,
    });
  }

  async findById(id) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

module.exports = UserRepository;
