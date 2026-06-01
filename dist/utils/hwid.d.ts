export declare function normalizeHwid(raw: string | null | undefined): string | null;
export declare function hwidsEqual(a: string | null | undefined, b: string | null | undefined): boolean;
/** HWID vinculado ao cliente (bloqueia login em outra máquina). */
export declare function isHwidBound(stored: string | null | undefined): boolean;
export declare function maskHwid(hwid: string): string;
/** NeverApi / loaders podem enviar nomes de campo diferentes. */
export declare function extractHwidFromBody(body: Record<string, unknown>): string;
