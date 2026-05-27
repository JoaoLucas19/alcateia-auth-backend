import { Request, Response, NextFunction } from "express";
export declare function list(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function create(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function removeById(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function removeByHwid(req: Request, res: Response, next: NextFunction): Promise<void>;
