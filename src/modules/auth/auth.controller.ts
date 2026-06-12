// Essa função foi modificada

import { Request, Response, NextFunction } from "express";
import { loginService } from "./auth.service";
import { logger } from "../../utils/logger";
import { getClientIp } from "../../utils/client-ip";
import { applyAuthFailureDelay } from "../../middlewares/security.middleware";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ip = getClientIp(req);
    const result = await loginService({ ...req.body, ip });
    res.status(200).json({
      success: true,
      data: result,
      token: result.token,
      admin: result.admin,
      expiresIn: result.expiresIn,
    });
  } catch (err) {
    await applyAuthFailureDelay();
    next(err);
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  logger.info("Logout", { adminId: req.admin?.id });
  res.status(200).json({ success: true, message: "Logout realizado com sucesso" });
}

export async function me(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    authenticated: true,
    data: { admin: req.admin },
    admin: req.admin,
  });
}
