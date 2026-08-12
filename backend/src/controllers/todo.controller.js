class TodoController {
  constructor({ todoService }) {
    this.todoService = todoService;
  }

  create = async (req, res, next) => {
    try {
      const todo = await this.todoService.create(
        req.user.id,
        req.body
      );

      res.status(201).json({
        message: "Todo created successfully",
        todo,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const todo = await this.todoService.getOne(
        req.user.id,
        req.params.id
      );

      res.status(200).json({
        todo,
      });
    } catch (error) {
      next(error);
    }
  };

getAll = async (req, res, next) => {
    try {
      const todos = await this.todoService.getAll(req.user.id);

      res.status(200).json({
        todos,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const todo = await this.todoService.update(
        req.user.id,
        req.params.id,
        req.body
      );

      res.status(200).json({
        message: "Todo updated successfully",
        todo,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await this.todoService.delete(
        req.user.id,
        req.params.id
      );

      res.status(200).json({
        message: "Todo deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TodoController;