import { Request, Response, NextFunction } from "express";
import { banHwid, listBannedHwids, unbanHwidById, unbanHwidByValue } from "./banned-hwid.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
    const search = (req.query.search as string) || undefined;

    const result = await listBannedHwids({ page, limit, search });
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await banHwid(req.body.hwid, req.body.reason);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function removeById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const result = await unbanHwidById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function removeByHwid(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await unbanHwidByValue(req.body.hwid);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
