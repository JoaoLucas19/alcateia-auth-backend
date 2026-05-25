import { Request, Response, NextFunction } from "express";
export declare function list(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function ban(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function unban(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function resetHwid(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function remove(req: Request, res: Response, next: NextFunction): Promise<void>;
