const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/chat", async (req, res, next) => {
  try {
    const aiController = req.container.resolve("aiController");

    await aiController.chat(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
