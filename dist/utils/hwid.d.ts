export type HwidKind = "machine" | "mac" | "invalid";
export interface ParsedHwid {
    kind: HwidKind;
    /** Valor gravado no banco (formato canônico). */
    canonical: string | null;
    /** Texto mascarado para o painel. */
    display: string | null;
}
export declare function maskHwid(hwid: string): string;
/**
 * Normaliza HWID para formato canônico no banco e no painel:
 * - machine:<id>  (explícito ou hash hex legado do loader)
 * - MAC:<endereço>
 */
export declare function parseHwid(raw: string | null | undefined): ParsedHwid;
export declare function normalizeHwid(raw: string | null | undefined): string | null;
export declare function formatHwidDisplay(raw: string | null | undefined): string | null;
export declare function hwidsEqual(a: string | null | undefined, b: string | null | undefined): boolean;
export declare function isHwidBound(stored: string | null | undefined): boolean;
/**
 * Converte o HWID do loader para formato canônico.
 * Hash hex legado vira machine:<hex> — compatível com logins antigos.
 */
export declare function resolveHwidForBinding(raw: string): string | null;
/** NeverApi / loaders podem enviar nomes de campo diferentes. */
export declare function extractHwidFromBody(body: Record<string, unknown>): string;
