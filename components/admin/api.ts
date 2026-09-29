"use client";

export interface CmsResult<T = unknown> {
  ok: boolean;
  error?: string;
  errors?: string[];
  item?: T;
}

export async function cmsPost(
  type: string,
  action: string,
  payload: unknown
): Promise<CmsResult> {
  try {
    const res = await fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, action, payload }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data.error || "The request failed.", errors: data.errors };
    }
    if (data.success === false) {
      return { ok: false, error: data.error || "The change was not saved." };
    }
    return { ok: true, item: data.item };
  } catch {
    return { ok: false, error: "Network error — please try again." };
  }
}

export async function uploadFiles(files: File[]): Promise<
  { ok: true; files: { url: string; name: string; size: number }[] } | { ok: false; error: string }
> {
  try {
    const form = new FormData();
    for (const file of files) form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data.error || "Upload failed." };
    }
    return { ok: true, files: data.files };
  } catch {
    return { ok: false, error: "Network error — upload failed." };
  }
}

export async function deleteMedia(url: string): Promise<CmsResult> {
  try {
    const res = await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error || "Delete failed." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please try again." };
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
