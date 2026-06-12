"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsSuspiciousInput = containsSuspiciousInput;
const SUSPICIOUS_PATTERNS = [
    /(\bunion\b.+\bselect\b)/i,
    /(\bselect\b.+\bfrom\b)/i,
    /(\bdrop\b.+\btable\b)/i,
    /(\binsert\b.+\binto\b)/i,
    /(\bdelete\b.+\bfrom\b)/i,
    /(<script\b)/i,
    /(javascript:)/i,
    /(\bon\w+\s*=)/i,
    /(\.\.\/|\.\.\\)/,
    /(\$\{|\$\()/,
    /(\x00|%00)/,
];
const HONEYPOT_FIELDS = ["_hp", "website", "url", "company", "fax"];
function containsSuspiciousInput(value, depth = 0) {
    if (depth > 6)
        return true;
    if (typeof value === "string") {
        if (value.length > 512)
            return true;
        return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(value));
    }
    if (Array.isArray(value)) {
        if (value.length > 32)
            return true;
        return value.some((item) => containsSuspiciousInput(item, depth + 1));
    }
    if (value && typeof value === "object") {
        const entries = Object.entries(value);
        if (entries.length > 24)
            return true;
        return entries.some(([key, nested]) => {
            if (HONEYPOT_FIELDS.includes(key.toLowerCase()) && nested)
                return true;
            return containsSuspiciousInput(nested, depth + 1);
        });
    }
    return false;
}
//# sourceMappingURL=input-safety.js.map