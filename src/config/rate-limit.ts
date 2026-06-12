import { Request, Response, NextFunction } from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { env } from "../config/env";
import { getClientIp } from "../utils/client-ip";

function rateLimitHandler(_req: Request, res: Response): void {
  res.status(429).json({
    success: false,
    code: "RATE_LIMIT",
    message: "Muitas requisições. Aguarde e tente novamente.",
  });
}

function ipKeyGenerator(req: Request): string {
  return getClientIp(req);
}

/** Rate limit global da API */
export function createGlobalRateLimiter(): RateLimitRequestHandler {
  return rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: ipKeyGenerator,
    handler: rateLimitHandler,
  });
}

/** Login admin — máximo de tentativas por IP */
export function createAdminLoginLimiter(): RateLimitRequestHandler {
  return rateLimit({
    windowMs: env.ADMIN_LOGIN_RATE_WINDOW_MS,
    max: env.ADMIN_LOGIN_RATE_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: ipKeyGenerator,
    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        code: "RATE_LIMIT",
        message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
      });
    },
  });
}

/** Login/cadastro cliente (cheat) */
export function createClientAuthLimiter(): RateLimitRequestHandler {
  return rateLimit({
    windowMs: env.CLIENT_AUTH_RATE_WINDOW_MS,
    max: env.CLIENT_AUTH_RATE_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: ipKeyGenerator,
    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        code: "RATE_LIMIT",
        message: "Muitas tentativas. Aguarde 15 minutos.",
      });
    },
  });
}

/** Rotas autenticadas do painel — evita abuso de token roubado */
export function createAuthenticatedApiLimiter(): RateLimitRequestHandler {
  return rateLimit({
    windowMs: env.AUTH_API_RATE_WINDOW_MS,
    max: env.AUTH_API_RATE_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      const adminId = req.admin?.id;
      return adminId ? `admin:${adminId}` : ipKeyGenerator(req);
    },
    handler: rateLimitHandler,
  });
}
