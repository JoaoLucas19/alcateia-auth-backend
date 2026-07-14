import * as Prisma from './internal/prismaNamespaceBrowser';
export { Prisma };
export * as $Enums from './enums';
export * from './enums';
/**
 * Model Admin
 *
 */
export type Admin = Prisma.AdminModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model Reseller
 * Loja / parceiro revendedor no painel admin
 */
export type Reseller = Prisma.ResellerModel;
/**
 * Model ResellerHistory
 *
 */
export type ResellerHistory = Prisma.ResellerHistoryModel;
/**
 * Model Key
 *
 */
export type Key = Prisma.KeyModel;
/**
 * Model Client
 * Usuário final do cheat (cadastro com key no menu interno)
 */
export type Client = Prisma.ClientModel;
/**
 * Model BlockedIp
 * IPs bloqueados por tentativas suspeitas ou bloqueio manual
 */
export type BlockedIp = Prisma.BlockedIpModel;
/**
 * Model BannedHwid
 * HWIDs bloqueados globalmente (login/cadastro do cheat)
 */
export type BannedHwid = Prisma.BannedHwidModel;
/**
 * Model ClientAccessLog
 * Tentativas de login/cadastro do cliente (cheat)
 */
export type ClientAccessLog = Prisma.ClientAccessLogModel;
/**
 * Model KeyUsageLog
 *
 */
export type KeyUsageLog = Prisma.KeyUsageLogModel;
/**
 * Model AccessLog
 *
 */
export type AccessLog = Prisma.AccessLogModel;
/**
 * Model WhitelistedUid
 * Config singleton (painel Alcateia) — sobrescreve variáveis de ambiente quando preenchido
 * UIDs liberados para UID Bypass Free Fire (painel TOXIC)
 */
export type WhitelistedUid = Prisma.WhitelistedUidModel;
/**
 * Model NotificationSettings
 *
 */
export type NotificationSettings = Prisma.NotificationSettingsModel;
