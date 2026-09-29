import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { findMediaUsage } from "@/lib/cms/store";
import { deleteMediaRow, listMediaRows, saveMedia } from "@/lib/cms/mysql";
import { uploadDir } from "@/lib/uploads";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};
const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 15 * 1024 * 1024);

/** URL prefix for stored media — /api/media guarantees the request reaches
 *  the Next server on every host (static /uploads paths can be swallowed by
 *  CDNs/read-only bundles); the handler falls back to MySQL when the local
 *  disk copy is gone. */
function mediaUrl(name: string): string {
  return `/api/media/${name}`;
}

function ensureDir() {
  uploadDir();
}

function sanitizeBaseName(name: string): string {
  const withoutExt = name.replace(/\.[^.]+$/, "");
  const slug = withoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || "image";
}

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }
  try {
    ensureDir();
    // MySQL is the source of truth (survives restarts/instances); the local
    // dir is a fast cache. Merge both so the library is complete either way.
    const fromDb = await listMediaRows();
    const seen = new Set(fromDb.map((m) => m.name));
    const files = fromDb.map((m) => ({
      name: m.name,
      url: mediaUrl(m.name),
      size: m.size,
      modifiedAt: m.createdAt,
    }));
    const diskOnly = fs
      .readdirSync(uploadDir())
      .filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name) && !seen.has(name))
      .map((name) => {
        const stat = fs.statSync(path.join(uploadDir(), name));
        return {
          name,
          url: mediaUrl(name),
          size: stat.size,
          modifiedAt: stat.mtime.toISOString(),
        };
      });
    files.push(...diskOnly);
    files.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
    return NextResponse.json({ files });
  } catch (err) {
    console.error("Media list failed:", err);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const entries = formData.getAll("file");
    const files = entries.filter((e): e is File => e instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }
    if (files.length > 20) {
      return NextResponse.json({ error: "Upload up to 20 files at a time." }, { status: 400 });
    }

    ensureDir();
    const saved: { url: string; name: string; size: number }[] = [];

    for (const file of files) {
      const ext = ALLOWED_TYPES[file.type];
      if (!ext) {
        return NextResponse.json(
          { error: `"${file.name}": only JPEG, PNG, WebP or AVIF images are allowed.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json(
          { error: `"${file.name}" exceeds the ${Math.round(MAX_BYTES / 1024 / 1024)}MB limit.` },
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      let fileName = `${Date.now()}-${saved.length}-${sanitizeBaseName(file.name)}${ext}`;
      let finalPath = path.join(uploadDir(), fileName);
      let counter = 1;
      while (fs.existsSync(finalPath)) {
        fileName = `${Date.now()}-${saved.length}-${sanitizeBaseName(file.name)}-${counter}${ext}`;
        finalPath = path.join(uploadDir(), fileName);
        counter++;
      }
      try {
        fs.writeFileSync(finalPath, buffer);
      } catch (diskErr) {
        console.error(
          "[upload] local disk write failed (read-only host?) — storing in MySQL only:",
          diskErr instanceof Error ? diskErr.message : diskErr
        );
      }
      // Durable copy in MySQL — this is what keeps the image rendering after
      // restarts and on other instances of the deployment.
      const stored = await saveMedia(fileName, file.type, buffer);
      if (!stored) {
        console.error(
          `[upload] MySQL media save failed for ${fileName} — image will only work on this instance.`
        );
      }
      saved.push({ url: mediaUrl(fileName), name: fileName, size: file.size });
    }

    return NextResponse.json({ success: true, files: saved });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { url } = await req.json();
    if (typeof url !== "string" || !/^\/(?:uploads|api\/media)\//.test(url)) {
      return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
    }
    const fileName = path.basename(url);
    const usedIn =
      (await findMediaUsage(`/uploads/${fileName}`)) ||
      (await findMediaUsage(`/api/media/${fileName}`));
    if (usedIn) {
      return NextResponse.json(
        { error: `This image is still used in ${usedIn}. Remove it there before deleting.` },
        { status: 409 }
      );
    }

    const removedFromDb = await deleteMediaRow(fileName);
    let removedFromDisk = false;
    try {
      const filePath = path.join(uploadDir(), fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        removedFromDisk = true;
      }
    } catch (diskErr) {
      console.error("[upload] disk delete failed:", diskErr);
    }
    if (!removedFromDb && !removedFromDisk) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Media delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
