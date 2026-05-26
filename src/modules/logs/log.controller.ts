import { Request, Response, NextFunction } from "express";
import { logRepository } from "./log.repository";
import { logService } from "./log.service";

export async function getAccessLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const success =
      req.query.success !== undefined ? req.query.success === "true" : undefined;
    const ip = req.query.ip as string | undefined;
    const reason = req.query.reason as string | undefined;
    const hours = req.query.hours ? Number(req.query.hours) : undefined;

    const since = hours ? new Date(Date.now() - hours * 60 * 60 * 1000) : undefined;

    const result = await logRepository.findAccessLogs({
      page,
      limit,
      success,
      ip,
      reason,
      since,
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getKeyLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const result_filter = req.query.result as string | undefined;

    const result = await logRepository.findKeyLogs({ page, limit, result: result_filter });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await logService.getDashboard();
    res.status(200).json({ data: stats });
  } catch (err) {
    next(err);
  }
}

export async function getSecurity(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90);
    const data = await logService.getSecurity(days);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function getFailedLogins(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 25, 100);
    const source = (req.query.source as "admin" | "client" | "all" | undefined) ?? "all";
    const ip = req.query.ip as string | undefined;
    const hours = req.query.hours ? Number(req.query.hours) : undefined;

    const result = await logService.getFailedLogins({ page, limit, source, ip, hours });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
