import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("Unhandled error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
