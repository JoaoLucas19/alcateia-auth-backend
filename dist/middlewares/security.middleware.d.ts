import { Request, Response, NextFunction } from "express";
/** Bloqueia IPs com bloqueio ativo no banco antes de processar auth */
export declare function ipBlockMiddleware(req: Request, res: Response, next: NextFunction): Promise<void>;
/** Rejeita payloads JSON suspeitos (injection, honeypot, profundidade excessiva) */
export declare function rejectSuspiciousInput(req: Request, res: Response, next: NextFunction): void;
/** Exige Content-Type application/json em POST/PUT/PATCH */
export declare function requireJsonContentType(req: Request, res: Response, next: NextFunction): void;
/** Bloqueia user-agents vazios ou claramente automatizados em rotas de auth */
export declare function rejectSuspiciousUserAgent(req: Request, res: Response, next: NextFunction): void;
/** Delay artificial em falhas para dificultar brute-force (aplicado no controller) */
export declare function applyAuthFailureDelay(): Promise<void>;
