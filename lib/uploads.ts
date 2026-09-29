import fs from "fs";
import os from "os";
import path from "path";

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
