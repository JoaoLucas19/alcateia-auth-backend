import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Admin: "Admin";
    readonly Product: "Product";
    readonly Reseller: "Reseller";
    readonly ResellerHistory: "ResellerHistory";
    readonly Key: "Key";
    readonly Client: "Client";
    readonly BlockedIp: "BlockedIp";
    readonly BannedHwid: "BannedHwid";
    readonly ClientAccessLog: "ClientAccessLog";
    readonly KeyUsageLog: "KeyUsageLog";
    readonly AccessLog: "AccessLog";
    readonly WhitelistedUid: "WhitelistedUid";
    readonly NotificationSettings: "NotificationSettings";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const AdminScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly passwordHash: "passwordHash";
    readonly createdAt: "createdAt";
    readonly lastLoginAt: "lastLoginAt";
};
export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ResellerScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly owner: "owner";
    readonly discord: "discord";
    readonly email: "email";
    readonly notes: "notes";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ResellerScalarFieldEnum = (typeof ResellerScalarFieldEnum)[keyof typeof ResellerScalarFieldEnum];
export declare const ResellerHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly resellerId: "resellerId";
    readonly type: "type";
    readonly description: "description";
    readonly actor: "actor";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type ResellerHistoryScalarFieldEnum = (typeof ResellerHistoryScalarFieldEnum)[keyof typeof ResellerHistoryScalarFieldEnum];
export declare const KeyScalarFieldEnum: {
    readonly id: "id";
    readonly value: "value";
    readonly productId: "productId";
    readonly createdById: "createdById";
    readonly resellerId: "resellerId";
    readonly customerEmail: "customerEmail";
    readonly customerName: "customerName";
    readonly status: "status";
    readonly isPermanent: "isPermanent";
    readonly activatedAt: "activatedAt";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type KeyScalarFieldEnum = (typeof KeyScalarFieldEnum)[keyof typeof KeyScalarFieldEnum];
export declare const ClientScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly passwordHash: "passwordHash";
    readonly hwid: "hwid";
    readonly discordId: "discordId";
    readonly isBanned: "isBanned";
    readonly expiresAt: "expiresAt";
    readonly loginCount: "loginCount";
    readonly lastLoginAt: "lastLoginAt";
    readonly createdAt: "createdAt";
    readonly keyId: "keyId";
};
export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum];
export declare const BlockedIpScalarFieldEnum: {
    readonly id: "id";
    readonly ipAddress: "ipAddress";
    readonly reason: "reason";
    readonly source: "source";
    readonly blockedAt: "blockedAt";
    readonly expiresAt: "expiresAt";
};
export type BlockedIpScalarFieldEnum = (typeof BlockedIpScalarFieldEnum)[keyof typeof BlockedIpScalarFieldEnum];
export declare const BannedHwidScalarFieldEnum: {
    readonly id: "id";
    readonly hwid: "hwid";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type BannedHwidScalarFieldEnum = (typeof BannedHwidScalarFieldEnum)[keyof typeof BannedHwidScalarFieldEnum];
export declare const ClientAccessLogScalarFieldEnum: {
    readonly id: "id";
    readonly clientId: "clientId";
    readonly usernameAttempted: "usernameAttempted";
    readonly ipAddress: "ipAddress";
    readonly hwid: "hwid";
    readonly action: "action";
    readonly success: "success";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type ClientAccessLogScalarFieldEnum = (typeof ClientAccessLogScalarFieldEnum)[keyof typeof ClientAccessLogScalarFieldEnum];
export declare const KeyUsageLogScalarFieldEnum: {
    readonly id: "id";
    readonly keyId: "keyId";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly result: "result";
    readonly attemptedAt: "attemptedAt";
};
export type KeyUsageLogScalarFieldEnum = (typeof KeyUsageLogScalarFieldEnum)[keyof typeof KeyUsageLogScalarFieldEnum];
export declare const AccessLogScalarFieldEnum: {
    readonly id: "id";
    readonly adminId: "adminId";
    readonly usernameAttempted: "usernameAttempted";
    readonly ipAddress: "ipAddress";
    readonly success: "success";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type AccessLogScalarFieldEnum = (typeof AccessLogScalarFieldEnum)[keyof typeof AccessLogScalarFieldEnum];
export declare const WhitelistedUidScalarFieldEnum: {
    readonly id: "id";
    readonly uid: "uid";
    readonly validityDays: "validityDays";
    readonly expiresAt: "expiresAt";
    readonly isActive: "isActive";
    readonly note: "note";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WhitelistedUidScalarFieldEnum = (typeof WhitelistedUidScalarFieldEnum)[keyof typeof WhitelistedUidScalarFieldEnum];
export declare const NotificationSettingsScalarFieldEnum: {
    readonly id: "id";
    readonly discordWebhookUrl: "discordWebhookUrl";
    readonly discordAlertsEnabled: "discordAlertsEnabled";
    readonly discordNotifyBruteForce: "discordNotifyBruteForce";
    readonly discordNotifyKeyScanning: "discordNotifyKeyScanning";
    readonly discordNotifyHighThreat: "discordNotifyHighThreat";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationSettingsScalarFieldEnum = (typeof NotificationSettingsScalarFieldEnum)[keyof typeof NotificationSettingsScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const AdminOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly passwordHash: "passwordHash";
};
export type AdminOrderByRelevanceFieldEnum = (typeof AdminOrderByRelevanceFieldEnum)[keyof typeof AdminOrderByRelevanceFieldEnum];
export declare const ProductOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
};
export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum];
export declare const ResellerOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly owner: "owner";
    readonly discord: "discord";
    readonly email: "email";
    readonly notes: "notes";
};
export type ResellerOrderByRelevanceFieldEnum = (typeof ResellerOrderByRelevanceFieldEnum)[keyof typeof ResellerOrderByRelevanceFieldEnum];
export declare const ResellerHistoryOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly resellerId: "resellerId";
    readonly type: "type";
    readonly description: "description";
    readonly actor: "actor";
    readonly metadata: "metadata";
};
export type ResellerHistoryOrderByRelevanceFieldEnum = (typeof ResellerHistoryOrderByRelevanceFieldEnum)[keyof typeof ResellerHistoryOrderByRelevanceFieldEnum];
export declare const KeyOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly value: "value";
    readonly productId: "productId";
    readonly createdById: "createdById";
    readonly resellerId: "resellerId";
    readonly customerEmail: "customerEmail";
    readonly customerName: "customerName";
};
export type KeyOrderByRelevanceFieldEnum = (typeof KeyOrderByRelevanceFieldEnum)[keyof typeof KeyOrderByRelevanceFieldEnum];
export declare const ClientOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly passwordHash: "passwordHash";
    readonly hwid: "hwid";
    readonly discordId: "discordId";
    readonly keyId: "keyId";
};
export type ClientOrderByRelevanceFieldEnum = (typeof ClientOrderByRelevanceFieldEnum)[keyof typeof ClientOrderByRelevanceFieldEnum];
export declare const BlockedIpOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly ipAddress: "ipAddress";
    readonly reason: "reason";
    readonly source: "source";
};
export type BlockedIpOrderByRelevanceFieldEnum = (typeof BlockedIpOrderByRelevanceFieldEnum)[keyof typeof BlockedIpOrderByRelevanceFieldEnum];
export declare const BannedHwidOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly hwid: "hwid";
    readonly reason: "reason";
};
export type BannedHwidOrderByRelevanceFieldEnum = (typeof BannedHwidOrderByRelevanceFieldEnum)[keyof typeof BannedHwidOrderByRelevanceFieldEnum];
export declare const ClientAccessLogOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly clientId: "clientId";
    readonly usernameAttempted: "usernameAttempted";
    readonly ipAddress: "ipAddress";
    readonly hwid: "hwid";
    readonly action: "action";
    readonly reason: "reason";
};
export type ClientAccessLogOrderByRelevanceFieldEnum = (typeof ClientAccessLogOrderByRelevanceFieldEnum)[keyof typeof ClientAccessLogOrderByRelevanceFieldEnum];
export declare const KeyUsageLogOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly keyId: "keyId";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
};
export type KeyUsageLogOrderByRelevanceFieldEnum = (typeof KeyUsageLogOrderByRelevanceFieldEnum)[keyof typeof KeyUsageLogOrderByRelevanceFieldEnum];
export declare const AccessLogOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly adminId: "adminId";
    readonly usernameAttempted: "usernameAttempted";
    readonly ipAddress: "ipAddress";
    readonly reason: "reason";
};
export type AccessLogOrderByRelevanceFieldEnum = (typeof AccessLogOrderByRelevanceFieldEnum)[keyof typeof AccessLogOrderByRelevanceFieldEnum];
export declare const WhitelistedUidOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly uid: "uid";
    readonly note: "note";
};
export type WhitelistedUidOrderByRelevanceFieldEnum = (typeof WhitelistedUidOrderByRelevanceFieldEnum)[keyof typeof WhitelistedUidOrderByRelevanceFieldEnum];
export declare const NotificationSettingsOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly discordWebhookUrl: "discordWebhookUrl";
};
export type NotificationSettingsOrderByRelevanceFieldEnum = (typeof NotificationSettingsOrderByRelevanceFieldEnum)[keyof typeof NotificationSettingsOrderByRelevanceFieldEnum];
