const SUSPICIOUS_PATTERNS: RegExp[] = [
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

export function containsSuspiciousInput(value: unknown, depth = 0): boolean {
  if (depth > 6) return true;

  if (typeof value === "string") {
    if (value.length > 512) return true;
    return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(value));
  }

  if (Array.isArray(value)) {
    if (value.length > 32) return true;
    return value.some((item) => containsSuspiciousInput(item, depth + 1));
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length > 24) return true;
    return entries.some(([key, nested]) => {
      if (HONEYPOT_FIELDS.includes(key.toLowerCase()) && nested) return true;
      return containsSuspiciousInput(nested, depth + 1);
    });
  }

  return false;
}
