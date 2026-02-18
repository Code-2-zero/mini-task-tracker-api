import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Request logger (dev only) */
if (process.env.NODE_ENV !== "production") {
  app.use((req, _res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
  });
}

/* Health check */
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Server running successfully 🚀" });
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* 404 handler — for unknown routes */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* Global error handler */
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;