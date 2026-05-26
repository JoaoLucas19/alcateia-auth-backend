import { Request, Response, NextFunction } from "express";
export declare function getAccessLogs(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getKeyLogs(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getSecurity(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getFailedLogins(req: Request, res: Response, next: NextFunction): Promise<void>;
