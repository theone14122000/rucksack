import fs from "fs";
import os from "os";
import path from "path";
import { NextResponse } from "next/server";
import { fetchMedia } from "./cms/mysql";

/**
 * Writable directory for CMS uploads.
 *
 * Deployments like AWS Lambda mount the code directory (/var/task) read-only,
 * so `public/uploads` cannot be created or written there. Resolution order:
 *   1. UPLOAD_DIR env var, when set
 *   2. <cwd>/public/uploads, when actually writable (probed with a real write)
 *   3. <os tmp>/rucksack-uploads — writable on Lambda/containers
 * The first working candidate is cached for the process lifetime so every
 * consumer (upload API, media list, public serving route) shares one answer.
 */

let resolved: string | null = null;

function tryCreate(dir: string): boolean {
  try {
    fs.mkdirSync(dir, { recursive: true });
    const probe = path.join(dir, `.write-probe-${process.pid}`);
    fs.writeFileSync(probe, "ok");
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

export function uploadDir(): string {
  if (resolved) return resolved;

  const candidates: string[] = [];
  if (process.env.UPLOAD_DIR) candidates.push(path.resolve(process.env.UPLOAD_DIR));
  candidates.push(path.join(process.cwd(), "public", "uploads"));
  candidates.push(path.join(os.tmpdir(), "rucksack-uploads"));

  for (const dir of candidates) {
    if (tryCreate(dir)) {
      if (resolved === null && dir !== candidates[candidates.length - 1] && candidates.length > 1) {
        console.log(`[uploads] using writable directory: ${dir}`);
      }
      resolved = dir;
      return dir;
    }
  }

  // Should not happen (tmp is writable almost everywhere) — keep a sane default.
  resolved = candidates[candidates.length - 1];
  console.error(
    `[uploads] no writable upload directory found; tried: ${candidates.join(", ")}. Set UPLOAD_DIR env var.`
  );
  return resolved;
}

/* ---------------------------------------------------------------------------
 * Media serving — disk cache first, MySQL second.
 *
 * The local upload dir is only a per-instance cache (serverless /tmp is wiped
 * on restart and not shared between instances). Every uploaded image also
 * lives in cms_media, so a disk miss falls back to the database and the image
 * still renders. Responses are immutable because file names are unique.
 * ------------------------------------------------------------------------- */

const MEDIA_CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

export function mediaContentType(fileName: string): string | null {
  return MEDIA_CONTENT_TYPES[path.extname(fileName).toLowerCase()] || null;
}

/** Serve an uploaded image from disk (fast path) or MySQL (durable path).
 *  Returns null when the file does not exist anywhere. */
export async function serveMediaFile(fileName: string): Promise<Response | null> {
  const fallbackType = mediaContentType(fileName);
  if (!fallbackType) return null;
  const headers = (type: string) => ({
    "Content-Type": type,
    "Cache-Control": "public, max-age=31536000, immutable",
  });

  try {
    const diskPath = path.join(uploadDir(), fileName);
    if (fs.existsSync(diskPath)) {
      const buffer = fs.readFileSync(diskPath);
      return new NextResponse(new Uint8Array(buffer), { headers: headers(fallbackType) });
    }
  } catch (err) {
    console.error(`[media] disk read failed for ${fileName}:`, err);
  }

  try {
    const row = await fetchMedia(fileName);
    if (row && row.data) {
      return new NextResponse(new Uint8Array(row.data), {
        headers: headers(row.mime || fallbackType),
      });
    }
  } catch (err) {
    console.error(`[media] database read failed for ${fileName}:`, err);
  }

  return null;
}
