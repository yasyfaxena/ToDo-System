class AIController {
  constructor({ aiService }) {
    this.aiService = aiService;
  }

  chat = async (req, res, next) => {
    try {
      const result = await this.aiService.chat(
        req.user.id,
        req.body.message
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AIController;
