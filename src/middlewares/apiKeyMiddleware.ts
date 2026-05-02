import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import logger from "../config/logger";

const VALID_API_KEYS = new Set(
  (process.env.API_KEYS || "").split(",").map((key) => key.trim()),
);

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header("x-api-key") || req.header("api-key");
  if (!apiKey) {
    logger.warn("API Key missing", { ip: req.ip, url: req.originalUrl });
    return res.status(401).json({
      success: false,
      message: "API Key is required",
    });
  }

  if (!VALID_API_KEYS.has(apiKey)) {
    logger.warn("Invalid API Key attempt", {
      ip: req.ip,
      url: req.originalUrl,
      apiKey: apiKey.substring(0, 8) + "...",
    });

    return res.status(401).json({
      success: false,
      message: "Invalid API Key",
    });
  }

  (req as any).apiKey = apiKey;

  next();
};

export default apiKeyMiddleware;
