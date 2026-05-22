import { Request, Response, NextFunction } from "express";
import {
  listClients,
  getClient,
  banClient,
  unbanClient,
  resetClientHwid,
  deleteClient,
} from "./client.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
    const search = (req.query.search as string) || undefined;
    const status = (req.query.status as "active" | "banned" | "expired") || undefined;

    const result = await listClients({ page, limit, search, status });
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const client = await getClient(id);
    res.status(200).json({ data: client });
  } catch (err) {
    next(err);
  }
}

export async function ban(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const result = await banClient(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function unban(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const result = await unbanClient(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function resetHwid(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const result = await resetClientHwid(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const result = await deleteClient(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}