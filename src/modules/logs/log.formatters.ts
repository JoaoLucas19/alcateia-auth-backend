import type { UnifiedLogEntry } from "./log.types";

const REASON_LABELS: Record<string, string> = {
  USER_NOT_FOUND: "Usuário não encontrado",
  WRONG_PASSWORD: "Senha incorreta",
  USER_BANNED: "Conta banida",
  SUBSCRIPTION_EXPIRED: "Assinatura expirada",
  KEY_REVOKED: "Licença revogada",
  KEY_PAUSED: "Key pausada",
  HWID_MISMATCH: "HWID não autorizado",
  HWID_MISSING: "HWID não enviado pelo loader",
  HWID_INVALID: "HWID inválido ou não reconhecido",
  HWID_BANNED: "HWID banido",
  INVALID_KEY: "Key inválida",
  KEY_ALREADY_USED: "Key já utilizada",
  KEY_EXPIRED: "Key expirada",
  USERNAME_TAKEN: "Usuário já cadastrado",
  PRODUCT_INACTIVE: "Produto inativo",
  IP_BLOCKED: "IP bloqueado",
  LOGOUT: "Logout",
  UNKNOWN: "Desconhecido",
};

const KEY_RESULT_LABELS: Record<string, string> = {
  SUCCESS: "Key validada com sucesso",
  INVALID_KEY: "Key inválida",
  REVOKED: "Key revogada",
  EXPIRED: "Key expirada",
  ALREADY_USED: "Key já utilizada",
};

export function reasonLabel(reason: string | null | undefined): string {
  if (!reason) return REASON_LABELS.UNKNOWN;
  return REASON_LABELS[reason] ?? reason;
}

export function keyResultLabel(result: string): string {
  return KEY_RESULT_LABELS[result] ?? result;
}

export function maskKey(value: string | null | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const v = value.trim();
  if (v.length <= 8) return `${v.slice(0, 2)}***`;
  return `${v.slice(0, 4)}…${v.slice(-4)}`;
}

export function maskHwid(value: string | null | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const v = value.trim();
  if (v.length <= 12) return v;
  return `${v.slice(0, 8)}…${v.slice(-4)}`;
}

export function buildAdminAccessEntry(row: {
  id: string;
  adminId: string | null;
  usernameAttempted: string;
  ipAddress: string;
  success: boolean;
  reason: string | null;
  createdAt: Date;
}): UnifiedLogEntry {
  const reasonCode = row.reason ?? (row.success ? undefined : "UNKNOWN");
  return {
    id: row.id,
    category: "admin_access",
    source: "ADMIN",
    event: row.success ? "Login admin bem-sucedido" : "Falha de login admin",
    detail: row.success
      ? `Admin "${row.usernameAttempted}" autenticado`
      : reasonLabel(reasonCode),
    username: row.usernameAttempted,
    ip: row.ipAddress,
    adminId: row.adminId ?? undefined,
    reasonCode,
    reasonLabel: reasonLabel(reasonCode),
    status: row.success ? "success" : "failed",
    createdAt: row.createdAt.toISOString(),
  };
}

export function buildClientAccessEntry(row: {
  id: string;
  clientId: string | null;
  usernameAttempted: string;
  ipAddress: string;
  hwid: string | null;
  action: string;
  success: boolean;
  reason: string | null;
  createdAt: Date;
}): UnifiedLogEntry {
  const reasonCode = row.reason ?? (row.success ? undefined : "UNKNOWN");
  const actionLabel = row.action === "REGISTER" ? "Cadastro" : "Login";
  return {
    id: row.id,
    category: "client_access",
    source: "CLIENT",
    event: row.success ? `${actionLabel} cliente bem-sucedido` : `Falha de ${actionLabel.toLowerCase()} cliente`,
    detail: row.success
      ? `Cliente "${row.usernameAttempted}" — ${actionLabel.toLowerCase()} OK`
      : reasonLabel(reasonCode),
    username: row.usernameAttempted,
    ip: row.ipAddress,
    hwid: row.hwid ?? undefined,
    hwidMasked: maskHwid(row.hwid),
    clientId: row.clientId ?? undefined,
    action: row.action,
    reasonCode,
    reasonLabel: reasonLabel(reasonCode),
    status: row.success ? "success" : "failed",
    createdAt: row.createdAt.toISOString(),
  };
}

export function buildKeyUsageEntry(row: {
  id: string;
  keyId: string;
  ipAddress: string;
  userAgent: string | null;
  result: string;
  attemptedAt: Date;
  key?: { value: string } | null;
}): UnifiedLogEntry {
  const success = row.result === "SUCCESS";
  return {
    id: row.id,
    category: "key_validation",
    source: "KEY",
    event: success ? "Validação de key" : "Tentativa de key inválida",
    detail: keyResultLabel(row.result),
    ip: row.ipAddress,
    userAgent: row.userAgent ?? undefined,
    keyMasked: maskKey(row.key?.value),
    keyId: row.keyId,
    reasonCode: row.result,
    reasonLabel: keyResultLabel(row.result),
    status: success ? "success" : "failed",
    createdAt: row.attemptedAt.toISOString(),
  };
}

export function buildIpBlockEntry(row: {
  id: string;
  ipAddress: string;
  reason: string | null;
  source: string | null;
  blockedAt: Date;
  expiresAt: Date | null;
}): UnifiedLogEntry {
  return {
    id: row.id,
    category: "ip_block",
    source: "SECURITY",
    event: "IP bloqueado",
    detail: row.reason ?? "Bloqueio automático por atividade suspeita",
    ip: row.ipAddress,
    reasonCode: "IP_BLOCKED",
    reasonLabel: reasonLabel("IP_BLOCKED"),
    status: "failed",
    blockedUntil: row.expiresAt?.toISOString() ?? null,
    blockSource: row.source ?? "AUTO",
    createdAt: row.blockedAt.toISOString(),
  };
}

export function matchesLogSearch(entry: UnifiedLogEntry, search: string): boolean {
  const q = search.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    entry.username,
    entry.ip,
    entry.event,
    entry.detail,
    entry.reasonCode,
    entry.reasonLabel,
    entry.hwid,
    entry.hwidMasked,
    entry.userAgent,
    entry.action,
    entry.keyMasked,
    entry.source,
    entry.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}
