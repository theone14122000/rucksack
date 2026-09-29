"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Images, RefreshCw, Trash2, Upload } from "lucide-react";
import { AdminButton, ConfirmDialog, EmptyState, useToast } from "./ui";
import { cmsPost, deleteMedia, uploadFiles } from "./api";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  modifiedAt: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaLibrary() {
  const router = useRouter();
  const { toast } = useToast();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<MediaFile | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/upload");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      toast("Failed to load media", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setBusy(true);
    const result = await uploadFiles(Array.from(list));
    setBusy(false);
    if (result.ok) {
      toast(`${result.files.length} file(s) uploaded`);
      load();
    } else {
      toast(result.error, "error");
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast("URL copied to clipboard");
    } catch {
      toast(url, "info");
    }
  };

  const addToGallery = async (file: MediaFile) => {
    const payload = {
      id: `gal-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      src: file.url,
      alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_0-9]+/g, " ").slice(0, 120) || "Gallery image",
      featured: false,
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await cmsPost("gallery", "upsert", payload);
    if (result.ok) {
      toast("Added to gallery");
      router.refresh();
    } else {
      toast(result.error || "Could not add", "error");
    }
  };

  const remove = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    const result = await deleteMedia(pendingDelete.url);
    setBusy(false);
    setPendingDelete(null);
    if (result.ok) {
      toast("File deleted");
      load();
    } else {
      toast(result.error || "Delete failed", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <label
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider cursor-pointer border border-brand-turquoise bg-brand-turquoise text-white hover:bg-brand-turquoise-light transition-all ${busy ? "opacity-50 pointer-events-none" : ""}`}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          <Upload className="w-4 h-4" /> {busy ? "Uploading…" : "Upload files"}
        </label>
        <AdminButton variant="secondary" onClick={load}>
          <RefreshCw className="w-4 h-4" /> Refresh
        </AdminButton>
      </div>

      {loading ? (
        <div className="text-center py-16 text-brand-taupe text-sm">Loading media…</div>
      ) : files.length === 0 ? (
        <EmptyState
          title="No uploads yet"
          hint="Uploaded images appear here. Images under /gallery and /images are site assets managed at deploy time."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <div key={file.url} className="group bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft overflow-hidden">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="block aspect-square bg-brand-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
              </a>
              <div className="p-3 space-y-2">
                <p className="text-xs font-semibold text-brand-dark truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-[10px] font-mono text-brand-taupe">
                  {formatSize(file.size)} · {new Date(file.modifiedAt).toLocaleDateString("en-IN")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => copyUrl(file.url)}
                    className="inline-flex items-center gap-1 px-2 py-1.5 rounded border border-brand-turquoise/15 text-[10px] font-bold uppercase tracking-wider text-brand-taupe hover:text-brand-turquoise hover:border-brand-turquoise/40 transition-all"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => addToGallery(file)}
                    className="inline-flex items-center gap-1 px-2 py-1.5 rounded border border-brand-turquoise/15 text-[10px] font-bold uppercase tracking-wider text-brand-taupe hover:text-brand-turquoise hover:border-brand-turquoise/40 transition-all"
                  >
                    <Images className="w-3 h-3" /> Gallery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(file)}
                    className="inline-flex items-center gap-1 px-2 py-1.5 rounded border border-brand-turquoise/15 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this file?"
        message={`${pendingDelete?.name} will be permanently removed from disk. If any content still uses this image, deletion will be blocked.`}
        onConfirm={remove}
        onCancel={() => setPendingDelete(null)}
        confirmLabel={busy ? "Deleting…" : "Delete"}
      />
    </div>
  );
}
