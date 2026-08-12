const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  todoCreateSchema,
  todoUpdateSchema,
  todoIdSchema,
} = require("../validators/todo.validator");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(todoCreateSchema),
  async (req, res, next) => {
    try {
      const todoController = req.container.resolve("todoController");
      await todoController.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const todoController = req.container.resolve("todoController");
    await todoController.getAll(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validate(todoIdSchema),
  async (req, res, next) => {
    try {
      const todoController = req.container.resolve("todoController");
      await todoController.getOne(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validate(todoUpdateSchema),
  async (req, res, next) => {
    try {
      const todoController = req.container.resolve("todoController");
      await todoController.update(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validate(todoIdSchema),
  async (req, res, next) => {
    try {
      const todoController = req.container.resolve("todoController");
      await todoController.delete(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
