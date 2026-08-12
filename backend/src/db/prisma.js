require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString:
    "postgresql://postgres:postgres@localhost:51214/template1?sslmode=disable",
});

const prisma = new PrismaClient({
  adapter,
});

module.exports = prisma;