import { bannedHwidRepository } from "./banned-hwid.repository";
import { AppError } from "../../utils/AppError";

export async function isHwidBanned(hwid: string): Promise<boolean> {
  if (!hwid?.trim()) return false;
  const row = await bannedHwidRepository.findByHwid(hwid);
  return Boolean(row);
}

export async function listBannedHwids(filters: { page: number; limit: number; search?: string }) {
  return bannedHwidRepository.findPaginated(filters);
}

export async function banHwid(hwid: string, reason?: string) {
  const normalized = hwid.trim();
  if (!normalized) {
    throw new AppError("HWID obrigatório", 400, "VALIDATION_ERROR");
  }

  const existing = await bannedHwidRepository.findByHwid(normalized);
  if (existing) {
    throw new AppError("HWID já está banido", 409, "HWID_ALREADY_BANNED");
  }

  const row = await bannedHwidRepository.create(normalized, reason);
  return { message: "HWID banido com sucesso", data: row };
}

export async function unbanHwidById(id: string) {
  try {
    await bannedHwidRepository.deleteById(id);
    return { message: "HWID removido da lista de banidos" };
  } catch {
    throw new AppError("Registro não encontrado", 404, "BANNED_HWID_NOT_FOUND");
  }
}

export async function unbanHwidByValue(hwid: string) {
  try {
    await bannedHwidRepository.deleteByHwid(hwid);
    return { message: "HWID removido da lista de banidos" };
  } catch {
    throw new AppError("HWID não encontrado na lista", 404, "BANNED_HWID_NOT_FOUND");
  }
}
