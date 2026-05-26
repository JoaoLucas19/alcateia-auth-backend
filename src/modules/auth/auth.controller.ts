// Essa função foi modificada

import { Request, Response, NextFunction } from "express";
import { loginService } from "./auth.service";
import { logger } from "../../utils/logger";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown";
    const result = await loginService({ ...req.body, ip });
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  logger.info("Logout", { adminId: req.admin?.id });
  res.status(200).json({ message: "Logout realizado com sucesso" });
}

// NOVO: valida o token e retorna os dados do admin autenticado
export async function me(req: Request, res: Response): Promise<void> {
  res.status(200).json({ data: { admin: req.admin } });
}