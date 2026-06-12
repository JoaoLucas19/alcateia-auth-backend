"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reasonLabel = reasonLabel;
exports.keyResultLabel = keyResultLabel;
exports.maskKey = maskKey;
exports.maskHwid = maskHwid;
exports.buildAdminAccessEntry = buildAdminAccessEntry;
exports.buildClientAccessEntry = buildClientAccessEntry;
exports.buildKeyUsageEntry = buildKeyUsageEntry;
exports.buildIpBlockEntry = buildIpBlockEntry;
exports.matchesLogSearch = matchesLogSearch;
const REASON_LABELS = {
    USER_NOT_FOUND: "Usuário não encontrado",
    WRONG_PASSWORD: "Senha incorreta",
    USER_BANNED: "Conta banida",
    SUBSCRIPTION_EXPIRED: "Assinatura expirada",
    KEY_REVOKED: "Licença revogada",
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
const KEY_RESULT_LABELS = {
    SUCCESS: "Key validada com sucesso",
    INVALID_KEY: "Key inválida",
    REVOKED: "Key revogada",
    EXPIRED: "Key expirada",
    ALREADY_USED: "Key já utilizada",
};
function reasonLabel(reason) {
    if (!reason)
        return REASON_LABELS.UNKNOWN;
    return REASON_LABELS[reason] ?? reason;
}
function keyResultLabel(result) {
    return KEY_RESULT_LABELS[result] ?? result;
}
function maskKey(value) {
    if (!value?.trim())
        return undefined;
    const v = value.trim();
    if (v.length <= 8)
        return `${v.slice(0, 2)}***`;
    return `${v.slice(0, 4)}…${v.slice(-4)}`;
}
function maskHwid(value) {
    if (!value?.trim())
        return undefined;
    const v = value.trim();
    if (v.length <= 12)
        return v;
    return `${v.slice(0, 8)}…${v.slice(-4)}`;
}
function buildAdminAccessEntry(row) {
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
function buildClientAccessEntry(row) {
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
function buildKeyUsageEntry(row) {
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
function buildIpBlockEntry(row) {
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
function matchesLogSearch(entry, search) {
    const q = search.trim().toLowerCase();
    if (!q)
        return true;
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
//# sourceMappingURL=log.formatters.js.map