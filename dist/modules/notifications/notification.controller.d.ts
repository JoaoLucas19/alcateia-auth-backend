import { Request, Response, NextFunction } from "express";
export declare function getNotificationSettings(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function putNotificationSettings(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function testDiscord(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function sendTestAlert(req: Request, res: Response, next: NextFunction): Promise<void>;
