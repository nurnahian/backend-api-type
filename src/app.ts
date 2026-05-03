import express from "express";
import cors from "cors";
import logger from "./config/logger";
import "dotenv/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

/**
 * Project Import
 */
import loggingMiddleware from "./middlewares/loggingMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routers";
import apiKeyMiddleware from "./middlewares/apiKeyMiddleware";

const app = express();

/**
 * Security
 */
app.use(helmet());

/**
 * CORS
 */
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = process.env.ALLOWED_ORIGIN?.split(",") || [];
      if (!origin || allowed.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  }),
);

/**
 * Rate Limit
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

/**
 * Body parser
 */
app.use(
  express.json({
    limit: "10kb",
  }),
);

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/**
 * Custom middleware
 */
app.use(apiKeyMiddleware);

// Logging middleware
app.use(loggingMiddleware);

// Routes
app.use("/", router);

app.get("/", (req, res) => {
  logger.info("Root endpoint accessed");
  res.send("API Working!");
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
