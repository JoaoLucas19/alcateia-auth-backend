import { Request, Response, NextFunction } from "express";
import { logRepository } from "./log.repository";
import { logService } from "./log.service";
import { buildAdminAccessEntry, buildKeyUsageEntry } from "./log.formatters";
import type { LogFeedCategory, LogFeedStatus } from "./log.types";

function parseHours(value: unknown, fallback = 24): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(n, 24 * 90);
}

export async function getAccessLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const success =
      req.query.success !== undefined ? req.query.success === "true" : undefined;
    const ip = req.query.ip as string | undefined;
    const reason = req.query.reason as string | undefined;
    const hours = req.query.hours ? parseHours(req.query.hours) : undefined;
    const since = hours ? new Date(Date.now() - hours * 60 * 60 * 1000) : undefined;

    const result = await logRepository.findAccessLogs({
      page,
      limit,
      success,
      ip,
      reason,
      since,
    });

    res.status(200).json({
      ...result,
      data: result.data.map((row) => ({
        ...buildAdminAccessEntry(row),
        raw: row,
      })),
    });
  } catch (err) {
    next(err);
  }
}

export async function getKeyLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const result_filter = req.query.result as string | undefined;
    const ip = req.query.ip as string | undefined;
    const hours = req.query.hours ? parseHours(req.query.hours) : undefined;
    const since = hours ? new Date(Date.now() - hours * 60 * 60 * 1000) : undefined;

    const result = await logRepository.findKeyLogs({ page, limit, result: result_filter });

    const filtered = since
      ? result.data.filter((row) => row.attemptedAt >= since && (!ip || row.ipAddress.includes(ip)))
      : ip
        ? result.data.filter((row) => row.ipAddress.includes(ip))
        : result.data;

    res.status(200).json({
      ...result,
      data: filtered.map((row) => ({
        ...buildKeyUsageEntry(row),
        raw: row,
      })),
    });
  } catch (err) {
    next(err);
  }
}

export async function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await logService.getDashboard();
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}

export async function getSecurity(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90);
    const data = await logService.getSecurity(days);
    res.status(200).json({ success: true, data });
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
    const hours = req.query.hours !== undefined ? parseHours(req.query.hours) : 24;
    const search = req.query.search as string | undefined;

    const result = await logService.getFailedLogins({ page, limit, source, ip, hours });

    const data = search?.trim()
      ? result.data.filter((row) => {
          const q = search.trim().toLowerCase();
          return [row.username, row.ip, row.reason, row.reasonLabel, row.event, row.detail]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(q);
        })
      : result.data;

    res.status(200).json({ success: true, ...result, data });
  } catch (err) {
    next(err);
  }
}

export async function getLogOverview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hours = parseHours(req.query.hours, 24);
    const data = await logService.getLogOverview(hours);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getLogFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 25, 100);
    const hours = parseHours(req.query.hours, 24);
    const category = (req.query.category as LogFeedCategory | undefined) ?? "all";
    const status = (req.query.status as LogFeedStatus | undefined) ?? "all";
    const ip = req.query.ip as string | undefined;
    const username = req.query.username as string | undefined;
    const search = req.query.search as string | undefined;

    const result = await logService.getLogFeed({
      page,
      limit,
      hours,
      category,
      status,
      ip,
      username,
      search,
    });

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

export async function investigateIp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ip = (req.query.ip as string)?.trim();
    if (!ip) {
      res.status(400).json({ success: false, code: "VALIDATION_ERROR", message: "Parâmetro ip obrigatório" });
      return;
    }

    const hours = parseHours(req.query.hours, 168);
    const data = await logService.investigateIpAddress(ip, hours);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getClientAudit(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usernameParam = req.params.username;
    const username = (Array.isArray(usernameParam) ? usernameParam[0] : usernameParam)?.trim();
    if (!username) {
      res.status(400).json({ success: false, code: "VALIDATION_ERROR", message: "Username obrigatório" });
      return;
    }

    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 25, 100);
    const hours = req.query.hours ? parseHours(req.query.hours) : undefined;

    const data = await logService.getClientAudit(username, { page, limit, hours });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getClientAccessLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 25, 100);
    const hours = req.query.hours ? parseHours(req.query.hours) : undefined;
    const success =
      req.query.success !== undefined ? req.query.success === "true" : undefined;
    const ip = req.query.ip as string | undefined;
    const username = req.query.username as string | undefined;
    const action = req.query.action as string | undefined;

    const result = await logService.getClientAccessLogs({
      page,
      limit,
      hours,
      success,
      ip,
      username,
      action,
    });

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

export async function exportLogsJson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hours = parseHours(req.query.hours, 24);
    const category = (req.query.category as LogFeedCategory | undefined) ?? "all";
    const status = (req.query.status as LogFeedStatus | undefined) ?? "all";

    const result = await logService.getLogFeed({
      page: 1,
      limit: 500,
      hours,
      category,
      status,
      ip: req.query.ip as string | undefined,
      username: req.query.username as string | undefined,
      search: req.query.search as string | undefined,
    });

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="alcateia-logs-${Date.now()}.json"`);
    res.status(200).json({
      exportedAt: new Date().toISOString(),
      filters: result.filters,
      total: result.total,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
}
