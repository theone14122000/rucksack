/** Pure contact-link helpers usable from both server and client modules. */

/** Builds a tel: href for any phone format (with or without +91). */
export function telHref(phone: string): string {
  const digits = (phone || "").replace(/[^0-9]/g, "");
  if (!digits) return "tel:";
  if (digits.length > 10 && digits.startsWith("91")) return `tel:+${digits}`;
  return `tel:+91${digits}`;
}

/** Builds a wa.me href with the 91 country code. */
export function waHref(whatsapp: string, text?: string): string {
  const digits = (whatsapp || "").replace(/[^0-9]/g, "");
  const full = digits.length > 10 && digits.startsWith("91") ? digits : `91${digits}`;
  const base = `https://wa.me/${full}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
