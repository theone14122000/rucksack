import { NextRequest, NextResponse } from "next/server";
import { mediaContentType, serveMediaFile } from "@/lib/uploads";

/**
 * Durable public image endpoint.
 *
 * New CMS uploads get URLs under /api/media/… — API routes are guaranteed to
 * reach the Next server on every hosting setup (unlike static asset paths),
 * and the handler serves from the local disk cache or the cms_media table in
 * MySQL, so images keep rendering after restarts and across instances.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const fileName = decodeURIComponent(name).split("/").pop() || "";
  if (!mediaContentType(fileName)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }

  const res = await serveMediaFile(fileName);
  if (!res) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }
  return res;
}
