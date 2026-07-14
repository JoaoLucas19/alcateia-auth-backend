import { Request, Response, NextFunction } from "express";
import * as resellerService from "./reseller.service";
import { ResellerStatus } from "../../prisma/enums";

function actorOf(req: Request): string {
  return req.admin?.username ?? "admin";
}

export async function overview(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await resellerService.getOverview();
    res.status(200).json({
      success: true,
      data,
      // atalhos para o frontend (evita tabela vazia se o parser errar nested)
      metrics: data.metrics,
      ranking: data.ranking,
      stores: data.stores,
    });
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const rawStatus = typeof req.query.status === "string" ? req.query.status.trim().toLowerCase() : "all";
    const status = (["all", "active", "paused", "banned"].includes(rawStatus)
      ? rawStatus
      : "all") as "all" | "active" | "paused" | "banned";
    const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;

    const result = await resellerService.listResellers({ page, limit, status, search });

    // data = array de lojas (compatível com o painel)
    // também envia stores/items para parsers alternativos
    res.status(200).json({
      success: true,
      data: result.data,
      stores: result.data,
      items: result.data,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await resellerService.getReseller(String(req.params.id));
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await resellerService.createReseller(req.body, actorOf(req));
    res.status(201).json({ success: true, data, message: "Loja criada com sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = { ...req.body };
    if (typeof body.status === "string") {
      body.status = body.status.toUpperCase() as ResellerStatus;
    }
    const data = await resellerService.updateReseller(String(req.params.id), body, actorOf(req));
    res.status(200).json({ success: true, data, message: "Loja atualizada com sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function ban(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await resellerService.banReseller(String(req.params.id), actorOf(req));
    res.status(200).json({
      success: true,
      data,
      message: data.message ?? "Loja e todos os dados vinculados foram excluídos",
    });
  } catch (err) {
    next(err);
  }
}

export async function unban(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await resellerService.unbanReseller(String(req.params.id), actorOf(req));
    res.status(200).json({ success: true, data, message: "Loja reativada com sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function pause(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await resellerService.pauseReseller(String(req.params.id), actorOf(req));
    res.status(200).json({ success: true, data, message: "Loja pausada com sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function unpause(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await resellerService.unpauseReseller(String(req.params.id), actorOf(req));
    res.status(200).json({ success: true, data, message: "Loja despausada com sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function listKeys(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const result = await resellerService.listResellerKeys(String(req.params.id), page, limit);
    const keys = result.data;

    /**
     * Formato maximamente compatível com o parser do painel:
     * - json.keys / json.items / json.list → array
     * - json.data → objeto com .keys / .data / .list (após unwrap de authFetch)
     * - json.data.keys funciona quando fazem const payload = json.data
     */
    res.status(200).json({
      success: true,
      keys,
      items: keys,
      list: keys,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      data: {
        keys,
        data: keys,
        list: keys,
        items: keys,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function bulkKeys(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { action, keyIds } = req.body as {
      action: "pause" | "ban" | "unpause" | "reactivate" | "delete";
      keyIds: string[];
    };
    const result = await resellerService.bulkUpdateResellerKeys(
      String(req.params.id),
      action,
      keyIds,
      actorOf(req)
    );

    const keys = result.data;
    res.status(200).json({
      success: true,
      message:
        action === "delete"
          ? "Key(s) excluída(s) com sucesso"
          : "Ação em massa concluída",
      keys,
      items: keys,
      list: keys,
      data: {
        keys,
        data: keys,
        list: keys,
        items: keys,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (err) {
    next(err);
  }
}

export async function history(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const result = await resellerService.listResellerHistory(String(req.params.id), page, limit);

    res.status(200).json({
      success: true,
      data: result.data,
      history: result.data,
      items: result.data,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (err) {
    next(err);
  }
}
