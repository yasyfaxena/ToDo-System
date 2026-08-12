const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async register({ name, email, password }) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      const error = new Error("Email is already registered");
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async updateProfile(userId, { name, email }) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (!name || !name.trim()) {
      const error = new Error("Name is required");
      error.statusCode = 400;
      throw error;
    }

    if (!email || !email.trim()) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== user.email) {
      const existingUser =
        await this.userRepository.findByEmail(normalizedEmail);

      if (existingUser && existingUser.id !== userId) {
        const error = new Error("Email is already registered");
        error.statusCode = 409;
        throw error;
      }
    }

    const updatedUser = await this.userRepository.update(userId, {
      name: name.trim(),
      email: normalizedEmail,
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (!currentPassword || !newPassword) {
      const error = new Error(
        "Current password and new password are required"
      );
      error.statusCode = 400;
      throw error;
    }

    if (newPassword.length < 8) {
      const error = new Error(
        "New password must be at least 8 characters"
      );
      error.statusCode = 400;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    if (!passwordMatch) {
      const error = new Error("Current password is incorrect");
      error.statusCode = 401;
      throw error;
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await this.userRepository.update(userId, {
      passwordHash,
    });

    return {
      message: "Password changed successfully",
    };
  }

  async deleteAccount(userId, password) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    await this.userRepository.delete(userId);

    return {
      message: "Account deleted successfully",
    };
  }
}

module.exports = AuthService;
