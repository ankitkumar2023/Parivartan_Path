import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/**
 * Trust proxy is helpful for deployments behind reverse proxies (Nginx, Render, etc.)
 * so req.ip and secure cookies behave correctly.
 */
app.set("trust proxy", 1);

// Security + observability
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      // allow all if "*"
      if (allowedOrigins.includes("*")) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Basic routes
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "rehab-center-api",
    env: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);

// 404 + error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    // Fail fast on misconfig
    throw new Error("MONGO_URI is missing in environment variables.");
  }

  // Recommended Mongoose defaults
  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err.message);
  process.exit(1);
});

