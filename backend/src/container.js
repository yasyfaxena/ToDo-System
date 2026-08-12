const { createContainer, asClass, asValue } = require("awilix");

const prisma = require("./db/prisma");

const UserRepository = require("./repositories/user.repository");
const AuthService = require("./services/auth.service");
const AuthController = require("./controllers/auth.controller");

const container = createContainer();

const TodoRepository = require("./repositories/todo.repository");
const TodoService = require("./services/todo.service");
const TodoController = require("./controllers/todo.controller");

container.register({
  prisma: asValue(prisma),

  userRepository: asClass(UserRepository).singleton(),

  authService: asClass(AuthService).singleton(),

  authController: asClass(AuthController).singleton(),

  todoRepository: asClass(TodoRepository).singleton(),

  todoService: asClass(TodoService).singleton(),

  todoController: asClass(TodoController).singleton(),
});

module.exports = container;