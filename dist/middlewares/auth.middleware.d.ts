import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            admin?: {
                id: string;
                username: string;
            };
        }
    }
}
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): void;
