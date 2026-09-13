import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";

import { apiLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

import citiesRoutes from "./routes/cities.routes.js";
import areasRoutes from "./routes/areas.routes.js";
import infrastructureRoutes from "./routes/infrastructure.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import { isAIConfigured } from "./services/gemini.service.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(mongoSanitize());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(apiLimiter);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "PlotWise AI API is running",
    aiConfigured: isAIConfigured(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/cities", citiesRoutes);
app.use("/api/areas", areasRoutes);
app.use("/api/infrastructure", infrastructureRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/ai", aiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
