import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { env } from "../config/env";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
    });
    return;
  }

  // Erros inesperados: loga stack e nunca expõe detalhes em produção
  logger.error(err.message, { stack: err.stack });

  res.status(500).json({
    code: "INTERNAL_ERROR",
    message: env.NODE_ENV === "production" ? "Erro interno" : err.message,
  });
}