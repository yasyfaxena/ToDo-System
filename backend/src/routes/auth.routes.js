const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  registerSchema,
  loginSchema,
  profileSchema,
  passwordSchema,
  deleteAccountSchema,
} = require("../validators/auth.validator");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  async (req, res, next) => {
    try {
      const authController = req.container.resolve("authController");
      await authController.register(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  validate(loginSchema),
  async (req, res, next) => {
    try {
      const authController = req.container.resolve("authController");
      await authController.login(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/profile",
  authMiddleware,
  validate(profileSchema),
  async (req, res, next) => {
    try {
      const authController = req.container.resolve("authController");
      await authController.updateProfile(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/password",
  authMiddleware,
  validate(passwordSchema),
  async (req, res, next) => {
    try {
      const authController = req.container.resolve("authController");
      await authController.changePassword(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/account",
  authMiddleware,
  validate(deleteAccountSchema),
  async (req, res, next) => {
    try {
      const authController = req.container.resolve("authController");
      await authController.deleteAccount(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
