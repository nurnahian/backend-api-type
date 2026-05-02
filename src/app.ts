import express from "express";
import cors from "cors";
import logger from "./config/logger";

import loggingMiddleware from "./middlewares/loggingMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routers";
import apiKeyMiddleware from "./middlewares/apiKeyMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

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
