import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Admins
  * const admins = await prisma.admin.findMany()
  * ```
  */
    get admin(): Prisma.AdminDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.product`: Exposes CRUD operations for the **Product** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Products
      * const products = await prisma.product.findMany()
      * ```
      */
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.key`: Exposes CRUD operations for the **Key** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Keys
      * const keys = await prisma.key.findMany()
      * ```
      */
    get key(): Prisma.KeyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.client`: Exposes CRUD operations for the **Client** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Clients
      * const clients = await prisma.client.findMany()
      * ```
      */
    get client(): Prisma.ClientDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.blockedIp`: Exposes CRUD operations for the **BlockedIp** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more BlockedIps
      * const blockedIps = await prisma.blockedIp.findMany()
      * ```
      */
    get blockedIp(): Prisma.BlockedIpDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.bannedHwid`: Exposes CRUD operations for the **BannedHwid** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more BannedHwids
      * const bannedHwids = await prisma.bannedHwid.findMany()
      * ```
      */
    get bannedHwid(): Prisma.BannedHwidDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.clientAccessLog`: Exposes CRUD operations for the **ClientAccessLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ClientAccessLogs
      * const clientAccessLogs = await prisma.clientAccessLog.findMany()
      * ```
      */
    get clientAccessLog(): Prisma.ClientAccessLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.keyUsageLog`: Exposes CRUD operations for the **KeyUsageLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more KeyUsageLogs
      * const keyUsageLogs = await prisma.keyUsageLog.findMany()
      * ```
      */
    get keyUsageLog(): Prisma.KeyUsageLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.accessLog`: Exposes CRUD operations for the **AccessLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AccessLogs
      * const accessLogs = await prisma.accessLog.findMany()
      * ```
      */
    get accessLog(): Prisma.AccessLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.whitelistedUid`: Exposes CRUD operations for the **WhitelistedUid** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more WhitelistedUids
      * const whitelistedUids = await prisma.whitelistedUid.findMany()
      * ```
      */
    get whitelistedUid(): Prisma.WhitelistedUidDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notificationSettings`: Exposes CRUD operations for the **NotificationSettings** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NotificationSettings
      * const notificationSettings = await prisma.notificationSettings.findMany()
      * ```
      */
    get notificationSettings(): Prisma.NotificationSettingsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
