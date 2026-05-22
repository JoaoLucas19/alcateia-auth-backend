import { clientRepository } from "./client.repository";
import { AppError } from "../../utils/AppError";

const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");

function formatClient(client: any) {
  const isLifetime =
    client.key.isPermanent ||
    !client.expiresAt ||
    client.expiresAt >= LIFETIME_EXPIRY;

  const daysRemaining = isLifetime
    ? 99999
    : Math.max(
        0,
        Math.ceil(
          (new Date(client.expiresAt).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      );

  return {
    id: client.id,
    username: client.username,
    hwid: client.hwid ?? null,
    isBanned: client.isBanned,
    loginCount: client.loginCount,
    lastLoginAt: client.lastLoginAt,
    createdAt: client.createdAt,
    expiresAt: client.expiresAt,
    isLifetime,
    daysRemaining,
    status: client.isBanned
      ? "banned"
      : isLifetime
      ? "active"
      : daysRemaining > 0
      ? "active"
      : "expired",
    key: {
      id: client.key.id,
      value: client.key.value,
      isPermanent: client.key.isPermanent,
      status: client.key.status,
    },
    product: {
      id: client.key.product.id,
      name: client.key.product.name,
    },
  };
}

export async function listClients(filters: {
  page: number;
  limit: number;
  search?: string;
  status?: "active" | "banned" | "expired";
}) {
  const result = await clientRepository.findPaginated(filters);
  return {
    ...result,
    clients: result.clients.map(formatClient),
  };
}

export async function getClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  return formatClient(client);
}

export async function banClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  if (client.isBanned) throw new AppError("Cliente já está banido", 400, "ALREADY_BANNED");
  await clientRepository.ban(id);
  return { message: "Cliente banido com sucesso" };
}

export async function unbanClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  if (!client.isBanned) throw new AppError("Cliente não está banido", 400, "NOT_BANNED");
  await clientRepository.unban(id);
  return { message: "Cliente desbanido com sucesso" };
}

export async function resetClientHwid(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  await clientRepository.resetHwid(id);
  return { message: "HWID resetado com sucesso" };
}

export async function deleteClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  await clientRepository.delete(id);
  return { message: "Cliente deletado com sucesso" };
}