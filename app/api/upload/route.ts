import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { findMediaUsage } from "@/lib/cms/store";
import { uploadDir } from "@/lib/uploads";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};
const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 15 * 1024 * 1024);

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
    const files = fs
      .readdirSync(uploadDir())
      .filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name))
      .map((name) => {
        const stat = fs.statSync(path.join(uploadDir(), name));
        return {
          name,
          url: `/uploads/${name}`,
          size: stat.size,
          modifiedAt: stat.mtime.toISOString(),
        };
      })
      .sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
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
      fs.writeFileSync(finalPath, buffer);
      saved.push({ url: `/uploads/${fileName}`, name: fileName, size: file.size });
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
    if (typeof url !== "string" || !url.startsWith("/uploads/")) {
      return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
    }
    const fileName = path.basename(url);
    const filePath = path.join(uploadDir(), fileName);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    const usedIn = await findMediaUsage(`/uploads/${fileName}`);
    if (usedIn) {
      return NextResponse.json(
        { error: `This image is still used in ${usedIn}. Remove it there before deleting.` },
        { status: 409 }
      );
    }

    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Media delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
