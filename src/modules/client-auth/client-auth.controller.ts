import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { loginClientService, registerClientService } from "./client-auth.service";

function clientError(res: Response, err: unknown): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    code: "INTERNAL_ERROR",
  });
}

export async function clientRegister(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown";

    const result = await registerClientService({
      username: req.body.username,
      password: req.body.password,
      license: req.body.license,
      hwid: req.body.hwid ?? "",
      ipAddress,
    });

    res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (err) {
    clientError(res, err);
  }
}

export async function clientLogin(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown";

    const result = await loginClientService({
      username: req.body.username,
      password: req.body.password,
      hwid: req.body.hwid ?? "",
      ipAddress,
    });

    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (err) {
    clientError(res, err);
  }
}
