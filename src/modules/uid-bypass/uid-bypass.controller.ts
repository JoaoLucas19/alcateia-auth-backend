import { Request, Response } from "express";
import { env } from "../../config/env";
import { AppError } from "../../utils/AppError";
import {
  addWhitelistedUid,
  checkWhitelistedUid,
  removeWhitelistedUid,
} from "./uid-bypass.service";

function assertApiKey(key: string | undefined): void {
  if (!env.UID_BYPASS_API_KEY) {
    throw new AppError("UID bypass desativado no servidor", 503, "UID_BYPASS_DISABLED");
  }
  if (key !== env.UID_BYPASS_API_KEY) {
    throw new AppError("Chave invalida", 403, "INVALID_KEY");
  }
}

function sendError(res: Response, err: unknown): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Erro interno",
    code: "INTERNAL_ERROR",
  });
}

export async function uidAdd(req: Request, res: Response): Promise<void> {
  try {
    assertApiKey(String(req.query.key ?? ""));
    const uid = String(req.query.uid ?? "");
    const validity = Number(req.query.validity ?? 30);
    const result = await addWhitelistedUid(uid, Number.isFinite(validity) ? validity : 30);
    res.status(200).json({ success: true, message: "UID added", ...result });
  } catch (err) {
    sendError(res, err);
  }
}

export async function uidRemove(req: Request, res: Response): Promise<void> {
  try {
    assertApiKey(String(req.query.key ?? ""));
    const uid = String(req.query.uid ?? "");
    const result = await removeWhitelistedUid(uid);
    res.status(200).json({ success: true, message: "UID removed", ...result });
  } catch (err) {
    sendError(res, err);
  }
}

export async function uidCheck(req: Request, res: Response): Promise<void> {
  try {
    assertApiKey(String(req.query.key ?? ""));
    const uid = String(req.query.uid ?? "");
    const result = await checkWhitelistedUid(uid);
    if (!result.whitelisted) {
      res.status(403).json({
        success: false,
        message: "NOT whitelisted",
        uid: result.uid,
        expiresAt: result.expiresAt,
        whitelisted: false,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "OK",
      uid: result.uid,
      expiresAt: result.expiresAt,
      whitelisted: true,
    });
  } catch (err) {
    sendError(res, err);
  }
}
