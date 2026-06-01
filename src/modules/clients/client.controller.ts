import { Request, Response, NextFunction } from "express";
import {
  listClients,
  getClient,
  getClientByDiscordId,
  getClientByKeyValue,
  getClientByUsername,
  banClient,
  unbanClient,
  resetClientHwid,
  resetClientHwidByLookup,
  changeClientPassword,
  changeClientPasswordByLookup,
  linkClientDiscord,
  linkClientDiscordByLookup,
  unlinkClientDiscord,
  deleteClient,
  getClientsSummary,
  repairInvalidClientHwids,
} from "./client.service";

export async function summary(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await getClientsSummary();
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function repairHwids(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await repairInvalidClientHwids();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
    const search = (req.query.search as string) || undefined;
    const status = (req.query.status as "active" | "banned" | "expired") || undefined;
    const discordId = (req.query.discordId as string) || undefined;

    const result = await listClients({ page, limit, search, status, discordId });
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

export async function getByDiscord(req: Request, res: Response, next: NextFunction) {
  try {
    const discordId = req.params["discordId"] as string;
    const client = await getClientByDiscordId(discordId);
    res.status(200).json({ data: client });
  } catch (err) {
    next(err);
  }
}

export async function getByKey(req: Request, res: Response, next: NextFunction) {
  try {
    const keyValue = decodeURIComponent(req.params["keyValue"] as string);
    const client = await getClientByKeyValue(keyValue);
    res.status(200).json({ data: client });
  } catch (err) {
    next(err);
  }
}

export async function getByUsername(req: Request, res: Response, next: NextFunction) {
  try {
    const username = decodeURIComponent(req.params["username"] as string);
    const client = await getClientByUsername(username);
    res.status(200).json({ data: client });
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

export async function resetHwidLookup(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await resetClientHwidByLookup(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const result = await changeClientPassword(id, req.body.password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function changePasswordLookup(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await changeClientPasswordByLookup(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function patchDiscord(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    if (req.body.discordId === null) {
      const result = await unlinkClientDiscord(id);
      res.status(200).json(result);
      return;
    }
    const result = await linkClientDiscord(id, req.body.discordId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function linkDiscordLookup(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await linkClientDiscordByLookup(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function unlinkDiscord(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params["id"] as string;
    const result = await unlinkClientDiscord(id);
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
