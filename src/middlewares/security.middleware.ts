import { Request, Response, NextFunction } from "express";
import { getClientIp } from "../utils/client-ip";
import { containsSuspiciousInput } from "../utils/input-safety";
import { assertIpNotBlocked } from "../modules/security/ip-block.service";
import { logger } from "../utils/logger";

/** Bloqueia IPs com bloqueio ativo no banco antes de processar auth */
export async function ipBlockMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ip = getClientIp(req);
    await assertIpNotBlocked(ip);
    next();
  } catch (err) {
    next(err);
  }
}

/** Rejeita payloads JSON suspeitos (injection, honeypot, profundidade excessiva) */
export function rejectSuspiciousInput(req: Request, res: Response, next: NextFunction): void {
  if (containsSuspiciousInput(req.body)) {
    logger.warn("Payload suspeito bloqueado", { ip: getClientIp(req), path: req.path });
    res.status(400).json({
      success: false,
      code: "INVALID_INPUT",
      message: "Requisição inválida",
    });
    return;
  }

  next();
}

/** Exige Content-Type application/json em POST/PUT/PATCH */
export function requireJsonContentType(req: Request, res: Response, next: NextFunction): void {
  if (!["POST", "PUT", "PATCH"].includes(req.method)) {
    next();
    return;
  }

  const contentType = req.headers["content-type"] ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    res.status(415).json({
      success: false,
      code: "UNSUPPORTED_MEDIA_TYPE",
      message: "Content-Type application/json obrigatório",
    });
    return;
  }

  next();
}

/** Bloqueia user-agents vazios ou claramente automatizados em rotas de auth */
export function rejectSuspiciousUserAgent(req: Request, res: Response, next: NextFunction): void {
  const ua = (req.headers["user-agent"] ?? "").trim();

  if (!ua || ua.length < 3) {
    res.status(403).json({
      success: false,
      code: "FORBIDDEN",
      message: "Requisição não permitida",
    });
    return;
  }

  const botPatterns = [/sqlmap/i, /nikto/i, /nmap/i, /masscan/i, /dirbuster/i, /gobuster/i];
  if (botPatterns.some((pattern) => pattern.test(ua))) {
    logger.warn("User-Agent de scanner bloqueado", { ip: getClientIp(req), ua });
    res.status(403).json({
      success: false,
      code: "FORBIDDEN",
      message: "Requisição não permitida",
    });
    return;
  }

  next();
}

/** Delay artificial em falhas para dificultar brute-force (aplicado no controller) */
export async function applyAuthFailureDelay(): Promise<void> {
  const baseMs = 350;
  const jitterMs = Math.floor(Math.random() * 250);
  await new Promise((resolve) => setTimeout(resolve, baseMs + jitterMs));
}
