class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const user = await this.authService.register(req.body);

      res.status(201).json({
        message: "Registration successful",
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const result = await this.authService.login(req.body);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      const user = await this.authService.updateProfile(
        req.user.id,
        req.body
      );

      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const result = await this.authService.changePassword(
        req.user.id,
        req.body
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  deleteAccount = async (req, res, next) => {
    try {
      const result = await this.authService.deleteAccount(
        req.user.id,
        req.body.password
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
