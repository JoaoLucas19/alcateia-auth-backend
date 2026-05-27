import { Request, Response, NextFunction } from "express";
import * as keyService from "./key.service";
import { KeyStatus } from "@prisma/client";

export async function cleanupExpired(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await keyService.runCleanupExpiredKeys();
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

export async function generate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await keyService.generateKeys({ ...req.body, createdById: req.admin!.id });
    res.status(201).json({ data: result });
  } catch (err) { next(err); }
}

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const status = req.query.status as KeyStatus | undefined;
    const productId = req.query.productId as string | undefined;
    const search = req.query.search as string | undefined;

    const result = await keyService.listKeys({ page, limit, status, productId, search });
    res.status(200).json({ data: result });
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const key = await keyService.getKey(String(req.params.id));
    res.status(200).json({ data: key });
  } catch (err) { next(err); }
}

export async function revoke(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const key = await keyService.revokeKey(String(req.params.id));
    res.status(200).json({ data: key });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const key = await keyService.updateKey(String(req.params.id), req.body);
    res.status(200).json({ data: key });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await keyService.deleteKey(String(req.params.id));
    res.status(200).json({ message: "Key deletada com sucesso" });
  } catch (err) { next(err); }
}