const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const container = require("./container");
const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(helmet());
app.use(logger);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Dependency Injection container
app.use((req, res, next) => {
  req.container = container;
  next();
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Todo routes
app.use("/api/todos", todoRoutes);
app.use("/api/ai", aiRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "taskflow-api",
  });
});

// Error handler
app.use((err, req, res, next) => {
  req.log.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;