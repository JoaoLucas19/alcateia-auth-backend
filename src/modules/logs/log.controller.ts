import { Request, Response, NextFunction } from "express";
import { logRepository } from "./log.repository";

export async function getAccessLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page  = Number(req.query.page)  || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const success = req.query.success !== undefined
      ? req.query.success === "true"
      : undefined;

    const result = await logRepository.findAccessLogs({ page, limit, success });
    res.status(200).json(result);
  } catch (err) { next(err); }
}

export async function getKeyLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page   = Number(req.query.page)  || 1;
    const limit  = Math.min(Number(req.query.limit) || 20, 100);
    const result_filter = req.query.result as string | undefined;

    const result = await logRepository.findKeyLogs({ page, limit, result: result_filter });
    res.status(200).json(result);
  } catch (err) { next(err); }
}

export async function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await logRepository.getDashboardStats();
    res.status(200).json({ data: stats });
  } catch (err) { next(err); }
}