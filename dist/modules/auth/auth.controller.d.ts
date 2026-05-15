import { Request, Response, NextFunction } from "express";
export declare function login(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function logout(req: Request, res: Response): Promise<void>;
export declare function me(req: Request, res: Response): Promise<void>;
