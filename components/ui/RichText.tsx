import React from "react";
import { sanitizeRichText, hasRichMarkup } from "@/lib/cms/sanitize";

/**
 * Renders CMS long-text fields. Plain text is preserved with newline support;
 * markup is sanitized through the allowlist sanitizer before rendering.
 */
export function RichText({
  value,
  className = "",
}: {
  value?: string;
  className?: string;
}) {
  if (!value) return null;

  if (!hasRichMarkup(value)) {
    return <div className={`whitespace-pre-line ${className}`}>{value}</div>;
  }

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(value) }}
    />
  );
}
