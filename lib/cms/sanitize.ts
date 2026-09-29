const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s",
  "h2", "h3", "h4", "ul", "ol", "li", "a", "blockquote",
]);
const VOID_TAGS = new Set(["br"]);

const ALLOWED_URL = /^(https?:\/\/|mailto:|tel:|\/|\.\/|\.\.\/|#)/i;

function sanitizeHref(rawAttrs: string): string {
  const match = rawAttrs.match(/href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/i);
  if (!match) return "";
  const value = (match[1] ?? match[2] ?? match[3] ?? "").trim().replace(/&amp;/g, "&");
  if (!value) return "";
  if (!ALLOWED_URL.test(value)) return "";
  if (/^(javascript|data|vbscript):/i.test(value)) return "";
  return value;
}

/**
 * Allowlist HTML sanitizer for CMS rich-text fields. Keeps basic formatting
 * tags only; strips every other tag (with its attributes) and escapes stray
 * angle brackets. Output is safe for dangerouslySetInnerHTML.
 */
export function sanitizeRichText(input: unknown): string {
  if (typeof input !== "string" || !input) return "";
  const parts = input.split(/(<[^>]*>)/g);
  let out = "";

  for (const part of parts) {
    if (part.startsWith("<")) {
      const m = part.match(/^<\s*(\/?)\s*([a-zA-Z0-9]+)([^>]*)>$/);
      if (!m) {
        out += part.replace(/</g, "&lt;");
        continue;
      }
      const closing = m[1];
      const tag = m[2].toLowerCase();
      const attrs = m[3] || "";
      if (!ALLOWED_TAGS.has(tag)) continue;
      if (VOID_TAGS.has(tag)) {
        out += "<br />";
        continue;
      }
      if (closing) {
        out += `</${tag}>`;
        continue;
      }
      if (tag === "a") {
        const href = sanitizeHref(attrs);
        if (!href) {
          continue;
        }
        const external = /^https?:\/\//i.test(href);
        out += external
          ? `<a href="${href}" target="_blank" rel="noopener noreferrer">`
          : `<a href="${href}">`;
      } else {
        out += `<${tag}>`;
      }
    } else {
      out += part.replace(/</g, "&lt;");
    }
  }

  return out.trim();
}

/** True when the string contains rich-text markup (vs plain text). */
export function hasRichMarkup(value: string): boolean {
  return /<\s*(\/?)\s*(p|strong|b|em|i|u|s|h[2-4]|ul|ol|li|a|blockquote|br)\b/i.test(value);
}
