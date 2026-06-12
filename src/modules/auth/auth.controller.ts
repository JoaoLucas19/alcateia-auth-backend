// Essa função foi modificada

import { Request, Response, NextFunction } from "express";
import { loginService, logoutService } from "./auth.service";
import { logger } from "../../utils/logger";
import { getClientIp } from "../../utils/client-ip";
import { applyAuthFailureDelay } from "../../middlewares/security.middleware";
import { buildLoginNotification, buildLogoutNotification } from "./auth-notifications";
import { notifyAdminLogout } from "../logs/log-alerts.service";

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
      notification: buildLoginNotification(result.admin.username),
    });
  } catch (err) {
    await applyAuthFailureDelay();
    next(err);
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  const ip = getClientIp(req);
  const admin = req.admin;
  const username = admin?.username ?? "Admin";

  if (admin) {
    await logoutService({ adminId: admin.id, username: admin.username, ip });
    void notifyAdminLogout({ username: admin.username, ip });
  }

  logger.info("Logout", { adminId: admin?.id, ip });

  res.status(200).json({
    success: true,
    message: "Logout realizado com sucesso",
    notification: buildLogoutNotification(username),
  });
}

export async function me(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    authenticated: true,
    data: { admin: req.admin },
    admin: req.admin,
  });
}
