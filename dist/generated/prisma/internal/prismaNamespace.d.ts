import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.8.0
 * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "admin" | "product" | "reseller" | "resellerHistory" | "key" | "client" | "blockedIp" | "bannedHwid" | "clientAccessLog" | "keyUsageLog" | "accessLog" | "whitelistedUid" | "notificationSettings";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Admin: {
            payload: Prisma.$AdminPayload<ExtArgs>;
            fields: Prisma.AdminFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AdminFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                findFirst: {
                    args: Prisma.AdminFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                findMany: {
                    args: Prisma.AdminFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>[];
                };
                create: {
                    args: Prisma.AdminCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                createMany: {
                    args: Prisma.AdminCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AdminDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                update: {
                    args: Prisma.AdminUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                deleteMany: {
                    args: Prisma.AdminDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AdminUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AdminUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                aggregate: {
                    args: Prisma.AdminAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAdmin>;
                };
                groupBy: {
                    args: Prisma.AdminGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AdminCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        Reseller: {
            payload: Prisma.$ResellerPayload<ExtArgs>;
            fields: Prisma.ResellerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ResellerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ResellerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload>;
                };
                findFirst: {
                    args: Prisma.ResellerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ResellerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload>;
                };
                findMany: {
                    args: Prisma.ResellerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload>[];
                };
                create: {
                    args: Prisma.ResellerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload>;
                };
                createMany: {
                    args: Prisma.ResellerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ResellerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload>;
                };
                update: {
                    args: Prisma.ResellerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload>;
                };
                deleteMany: {
                    args: Prisma.ResellerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ResellerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ResellerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerPayload>;
                };
                aggregate: {
                    args: Prisma.ResellerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReseller>;
                };
                groupBy: {
                    args: Prisma.ResellerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResellerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ResellerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResellerCountAggregateOutputType> | number;
                };
            };
        };
        ResellerHistory: {
            payload: Prisma.$ResellerHistoryPayload<ExtArgs>;
            fields: Prisma.ResellerHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ResellerHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ResellerHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.ResellerHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ResellerHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload>;
                };
                findMany: {
                    args: Prisma.ResellerHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload>[];
                };
                create: {
                    args: Prisma.ResellerHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload>;
                };
                createMany: {
                    args: Prisma.ResellerHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ResellerHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload>;
                };
                update: {
                    args: Prisma.ResellerHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.ResellerHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ResellerHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ResellerHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResellerHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.ResellerHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateResellerHistory>;
                };
                groupBy: {
                    args: Prisma.ResellerHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResellerHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ResellerHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResellerHistoryCountAggregateOutputType> | number;
                };
            };
        };
        Key: {
            payload: Prisma.$KeyPayload<ExtArgs>;
            fields: Prisma.KeyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KeyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KeyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload>;
                };
                findFirst: {
                    args: Prisma.KeyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KeyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload>;
                };
                findMany: {
                    args: Prisma.KeyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload>[];
                };
                create: {
                    args: Prisma.KeyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload>;
                };
                createMany: {
                    args: Prisma.KeyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.KeyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload>;
                };
                update: {
                    args: Prisma.KeyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload>;
                };
                deleteMany: {
                    args: Prisma.KeyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KeyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.KeyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyPayload>;
                };
                aggregate: {
                    args: Prisma.KeyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKey>;
                };
                groupBy: {
                    args: Prisma.KeyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KeyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KeyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KeyCountAggregateOutputType> | number;
                };
            };
        };
        Client: {
            payload: Prisma.$ClientPayload<ExtArgs>;
            fields: Prisma.ClientFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ClientFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload>;
                };
                findFirst: {
                    args: Prisma.ClientFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload>;
                };
                findMany: {
                    args: Prisma.ClientFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload>[];
                };
                create: {
                    args: Prisma.ClientCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload>;
                };
                createMany: {
                    args: Prisma.ClientCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ClientDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload>;
                };
                update: {
                    args: Prisma.ClientUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload>;
                };
                deleteMany: {
                    args: Prisma.ClientDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ClientUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ClientUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientPayload>;
                };
                aggregate: {
                    args: Prisma.ClientAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateClient>;
                };
                groupBy: {
                    args: Prisma.ClientGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClientGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ClientCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClientCountAggregateOutputType> | number;
                };
            };
        };
        BlockedIp: {
            payload: Prisma.$BlockedIpPayload<ExtArgs>;
            fields: Prisma.BlockedIpFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BlockedIpFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BlockedIpFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload>;
                };
                findFirst: {
                    args: Prisma.BlockedIpFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BlockedIpFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload>;
                };
                findMany: {
                    args: Prisma.BlockedIpFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload>[];
                };
                create: {
                    args: Prisma.BlockedIpCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload>;
                };
                createMany: {
                    args: Prisma.BlockedIpCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.BlockedIpDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload>;
                };
                update: {
                    args: Prisma.BlockedIpUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload>;
                };
                deleteMany: {
                    args: Prisma.BlockedIpDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BlockedIpUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.BlockedIpUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockedIpPayload>;
                };
                aggregate: {
                    args: Prisma.BlockedIpAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBlockedIp>;
                };
                groupBy: {
                    args: Prisma.BlockedIpGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlockedIpGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BlockedIpCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlockedIpCountAggregateOutputType> | number;
                };
            };
        };
        BannedHwid: {
            payload: Prisma.$BannedHwidPayload<ExtArgs>;
            fields: Prisma.BannedHwidFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BannedHwidFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BannedHwidFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload>;
                };
                findFirst: {
                    args: Prisma.BannedHwidFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BannedHwidFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload>;
                };
                findMany: {
                    args: Prisma.BannedHwidFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload>[];
                };
                create: {
                    args: Prisma.BannedHwidCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload>;
                };
                createMany: {
                    args: Prisma.BannedHwidCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.BannedHwidDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload>;
                };
                update: {
                    args: Prisma.BannedHwidUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload>;
                };
                deleteMany: {
                    args: Prisma.BannedHwidDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BannedHwidUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.BannedHwidUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BannedHwidPayload>;
                };
                aggregate: {
                    args: Prisma.BannedHwidAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBannedHwid>;
                };
                groupBy: {
                    args: Prisma.BannedHwidGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BannedHwidGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BannedHwidCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BannedHwidCountAggregateOutputType> | number;
                };
            };
        };
        ClientAccessLog: {
            payload: Prisma.$ClientAccessLogPayload<ExtArgs>;
            fields: Prisma.ClientAccessLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ClientAccessLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ClientAccessLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload>;
                };
                findFirst: {
                    args: Prisma.ClientAccessLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ClientAccessLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload>;
                };
                findMany: {
                    args: Prisma.ClientAccessLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload>[];
                };
                create: {
                    args: Prisma.ClientAccessLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload>;
                };
                createMany: {
                    args: Prisma.ClientAccessLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.ClientAccessLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload>;
                };
                update: {
                    args: Prisma.ClientAccessLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload>;
                };
                deleteMany: {
                    args: Prisma.ClientAccessLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ClientAccessLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.ClientAccessLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ClientAccessLogPayload>;
                };
                aggregate: {
                    args: Prisma.ClientAccessLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateClientAccessLog>;
                };
                groupBy: {
                    args: Prisma.ClientAccessLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClientAccessLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ClientAccessLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ClientAccessLogCountAggregateOutputType> | number;
                };
            };
        };
        KeyUsageLog: {
            payload: Prisma.$KeyUsageLogPayload<ExtArgs>;
            fields: Prisma.KeyUsageLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.KeyUsageLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.KeyUsageLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload>;
                };
                findFirst: {
                    args: Prisma.KeyUsageLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.KeyUsageLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload>;
                };
                findMany: {
                    args: Prisma.KeyUsageLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload>[];
                };
                create: {
                    args: Prisma.KeyUsageLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload>;
                };
                createMany: {
                    args: Prisma.KeyUsageLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.KeyUsageLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload>;
                };
                update: {
                    args: Prisma.KeyUsageLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload>;
                };
                deleteMany: {
                    args: Prisma.KeyUsageLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.KeyUsageLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.KeyUsageLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$KeyUsageLogPayload>;
                };
                aggregate: {
                    args: Prisma.KeyUsageLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateKeyUsageLog>;
                };
                groupBy: {
                    args: Prisma.KeyUsageLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KeyUsageLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.KeyUsageLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.KeyUsageLogCountAggregateOutputType> | number;
                };
            };
        };
        AccessLog: {
            payload: Prisma.$AccessLogPayload<ExtArgs>;
            fields: Prisma.AccessLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccessLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccessLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload>;
                };
                findFirst: {
                    args: Prisma.AccessLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccessLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload>;
                };
                findMany: {
                    args: Prisma.AccessLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload>[];
                };
                create: {
                    args: Prisma.AccessLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload>;
                };
                createMany: {
                    args: Prisma.AccessLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AccessLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload>;
                };
                update: {
                    args: Prisma.AccessLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AccessLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccessLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AccessLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccessLogPayload>;
                };
                aggregate: {
                    args: Prisma.AccessLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccessLog>;
                };
                groupBy: {
                    args: Prisma.AccessLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccessLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccessLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccessLogCountAggregateOutputType> | number;
                };
            };
        };
        WhitelistedUid: {
            payload: Prisma.$WhitelistedUidPayload<ExtArgs>;
            fields: Prisma.WhitelistedUidFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WhitelistedUidFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WhitelistedUidFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload>;
                };
                findFirst: {
                    args: Prisma.WhitelistedUidFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WhitelistedUidFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload>;
                };
                findMany: {
                    args: Prisma.WhitelistedUidFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload>[];
                };
                create: {
                    args: Prisma.WhitelistedUidCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload>;
                };
                createMany: {
                    args: Prisma.WhitelistedUidCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.WhitelistedUidDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload>;
                };
                update: {
                    args: Prisma.WhitelistedUidUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload>;
                };
                deleteMany: {
                    args: Prisma.WhitelistedUidDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WhitelistedUidUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.WhitelistedUidUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WhitelistedUidPayload>;
                };
                aggregate: {
                    args: Prisma.WhitelistedUidAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWhitelistedUid>;
                };
                groupBy: {
                    args: Prisma.WhitelistedUidGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WhitelistedUidGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WhitelistedUidCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WhitelistedUidCountAggregateOutputType> | number;
                };
            };
        };
        NotificationSettings: {
            payload: Prisma.$NotificationSettingsPayload<ExtArgs>;
            fields: Prisma.NotificationSettingsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationSettingsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationSettingsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationSettingsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationSettingsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>;
                };
                findMany: {
                    args: Prisma.NotificationSettingsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>[];
                };
                create: {
                    args: Prisma.NotificationSettingsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>;
                };
                createMany: {
                    args: Prisma.NotificationSettingsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.NotificationSettingsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>;
                };
                update: {
                    args: Prisma.NotificationSettingsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationSettingsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationSettingsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.NotificationSettingsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationSettingsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationSettings>;
                };
                groupBy: {
                    args: Prisma.NotificationSettingsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationSettingsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationSettingsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationSettingsCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
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
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'ResellerStatus'
 */
export type EnumResellerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResellerStatus'>;
/**
 * Reference to a field of type 'KeyStatus'
 */
export type EnumKeyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KeyStatus'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'ValidationResult'
 */
export type EnumValidationResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ValidationResult'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
    /**
     * Optional maximum size for the query plan cache. If not provided, a default size will be used.
     * A value of `0` can be used to disable the cache entirely. A higher cache size can improve
     * performance for applications that execute a large number of unique queries, while a smaller
     * cache size can reduce memory usage.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   queryPlanCacheMaxSize: 100,
     * })
     * ```
     */
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    admin?: Prisma.AdminOmit;
    product?: Prisma.ProductOmit;
    reseller?: Prisma.ResellerOmit;
    resellerHistory?: Prisma.ResellerHistoryOmit;
    key?: Prisma.KeyOmit;
    client?: Prisma.ClientOmit;
    blockedIp?: Prisma.BlockedIpOmit;
    bannedHwid?: Prisma.BannedHwidOmit;
    clientAccessLog?: Prisma.ClientAccessLogOmit;
    keyUsageLog?: Prisma.KeyUsageLogOmit;
    accessLog?: Prisma.AccessLogOmit;
    whitelistedUid?: Prisma.WhitelistedUidOmit;
    notificationSettings?: Prisma.NotificationSettingsOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
