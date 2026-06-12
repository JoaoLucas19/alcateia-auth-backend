import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

// Injeta dados do admin autenticado no objeto req
declare global {
  namespace Express {
    interface Request {
      admin?: { id: string; username: string };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ code: "INVALID_TOKEN", message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; username: string };
    req.admin = { id: payload.id, username: payload.username };
    next();
  } catch {
    res.status(401).json({ code: "INVALID_TOKEN", message: "Token inválido ou expirado" });
  }
}
