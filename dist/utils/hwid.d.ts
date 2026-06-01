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
 * Aceita apenas formatos de hardware reais usados pelo cheat:
 * - machine:<id>  (padrão NeverApi / loader atual do white)
 * - MAC:<endereço> (12 hex, com ou sem : ou -)
 *
 * Rejeita hash cru (32+ hex sem prefixo), UUIDs e lixo genérico.
 */
export declare function parseHwid(raw: string | null | undefined): ParsedHwid;
export declare function normalizeHwid(raw: string | null | undefined): string | null;
export declare function formatHwidDisplay(raw: string | null | undefined): string | null;
export declare function hwidsEqual(a: string | null | undefined, b: string | null | undefined): boolean;
export declare function isHwidBound(stored: string | null | undefined): boolean;
/** Exige formato válido quando o loader envia HWID (cadastro ou vínculo). */
export declare function resolveHwidForBinding(raw: string): string | null;
/** NeverApi / loaders podem enviar nomes de campo diferentes. */
export declare function extractHwidFromBody(body: Record<string, unknown>): string;
