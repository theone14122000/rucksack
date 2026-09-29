"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil, Star, Trash2, Upload } from "lucide-react";
import { AdminButton, Checkbox, ConfirmDialog, Field, Input, Select, StatusBadge, Textarea, useToast } from "./ui";
import { cmsPost, uploadFiles } from "./api";
import { GalleryItem, PublishStatus } from "@/lib/cms/types";

function altFromFileName(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "Gallery image"
  );
}

export function GalleryAdmin({ initial }: { initial: GalleryItem[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>(initial);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [pendingDelete, setPendingDelete] = useState<GalleryItem | null>(null);

  React.useEffect(() => setItems(initial), [initial]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    const result = await uploadFiles(Array.from(files));
    if (!result.ok) {
      setBusy(false);
      toast(result.error, "error");
      return;
    }
    let created = 0;
    for (const file of result.files) {
      const payload: GalleryItem = {
        id: `gal-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
        src: file.url,
        alt: altFromFileName(file.name),
        caption: "",
        featured: false,
        status: "published",
        order: items.length + created,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const saved = await cmsPost("gallery", "upsert", payload);
      if (saved.ok) created++;
      else toast(saved.error || "Could not add to gallery", "error");
    }
    setBusy(false);
    toast(`${created} photo(s) added to the gallery`);
    router.refresh();
  };

  const saveEdit = async () => {
    if (!editing || busy) return;
    setBusy(true);
    setErrors([]);
    const result = await cmsPost("gallery", "upsert", { ...editing, ...form });
    setBusy(false);
    if (result.ok) {
      toast("Photo updated");
      setEditing(null);
      router.refresh();
    } else {
      setErrors(result.errors?.length ? result.errors : [result.error || "Save failed"]);
      toast(result.error || "Save failed", "error");
    }
  };

  const quickStatus = async (item: GalleryItem, status: PublishStatus) => {
    const result = await cmsPost("gallery", "status", { id: item.id, status });
    if (result.ok) {
      setItems(items.map((i) => (i.id === item.id ? { ...i, status } : i)));
      toast(`Photo → ${status}`);
      router.refresh();
    } else {
      toast(result.error || "Update failed", "error");
    }
  };

  const quickFeature = async (item: GalleryItem) => {
    const featured = !item.featured;
    const result = await cmsPost("gallery", "upsert", { ...item, featured });
    if (result.ok) {
      setItems(items.map((i) => (i.id === item.id ? { ...i, featured } : i)));
      toast(featured ? "Added to homepage carousel" : "Removed from homepage carousel");
      router.refresh();
    } else {
      toast(result.error || "Update failed", "error");
    }
  };

  const remove = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    const result = await cmsPost("gallery", "delete", { id: pendingDelete.id });
    setBusy(false);
    setPendingDelete(null);
    if (result.ok) {
      setItems(items.filter((i) => i.id !== pendingDelete.id));
      toast("Photo removed from gallery");
      router.refresh();
    } else {
      toast(result.error || "Delete failed", "error");
    }
  };

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({
      alt: item.alt,
      caption: item.caption || "",
      credit: item.credit || "",
      featured: item.featured,
      status: item.status || "published",
      order: item.order,
    });
    setErrors([]);
  };

  const featuredCount = items.filter((i) => i.featured).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-taupe">
          {items.length} photos · {featuredCount} on homepage
        </span>
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
          <Upload className="w-4 h-4" /> {busy ? "Uploading…" : "Upload photos"}
        </label>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-card-xl border border-dashed border-brand-turquoise/20">
          <p className="font-editorial text-xl font-bold text-brand-dark">No photos yet</p>
          <p className="text-sm text-brand-taupe mt-1.5">
            Upload photos to build your gallery and homepage carousel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft overflow-hidden">
              <div className="relative aspect-[4/5] bg-brand-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                  <StatusBadge status={item.status} />
                  {item.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-brand-yellow text-brand-dark text-[9px] font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-current" /> Home
                    </span>
                  )}
                </div>
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Open full image"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="absolute inset-x-0 bottom-0 p-2 flex justify-end gap-1.5 bg-gradient-to-t from-brand-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => quickFeature(item)}
                    className={`p-2 rounded-card border transition-all ${item.featured ? "bg-brand-yellow border-brand-yellow text-brand-dark" : "bg-white/90 border-white text-brand-dark hover:bg-brand-yellow"}`}
                    aria-label={item.featured ? "Remove from homepage" : "Feature on homepage"}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="p-2 rounded-card bg-white/90 border border-white text-brand-dark hover:bg-white"
                    aria-label="Edit photo"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(item)}
                    className="p-2 rounded-card bg-red-500 border border-red-500 text-white hover:bg-red-600"
                    aria-label="Delete photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-brand-dark truncate">{item.alt}</p>
                <div className="flex items-center justify-between mt-2 gap-2">
                  <Select
                    value={item.status || "published"}
                    onChange={(e) => quickStatus(item, e.target.value as PublishStatus)}
                    className="w-auto py-1.5 text-[10px] font-bold uppercase tracking-wider"
                    aria-label="Status"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </Select>
                  <span className="text-[10px] font-mono text-brand-taupe">#{item.order ?? "—"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:p-8 bg-brand-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-card-2xl shadow-luxury w-full max-w-lg border border-brand-turquoise/10 my-auto">
            <div className="px-6 py-4 border-b border-brand-turquoise/10 flex items-center justify-between">
              <h3 className="font-editorial text-xl font-bold text-brand-dark">Edit photo</h3>
              <button type="button" onClick={() => setEditing(null)} className="text-brand-taupe hover:text-brand-dark text-xl leading-none" aria-label="Close">
                &times;
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="rounded-card overflow-hidden border border-brand-turquoise/10 bg-brand-cream aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={editing.src} alt="" className="w-full h-full object-cover" />
              </div>
              {errors.length > 0 && (
                <div className="rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-0.5">
                    {errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Field label="Alt text" required hint="Describes the photo for accessibility & SEO">
                <Input value={String(form.alt ?? "")} onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))} />
              </Field>
              <Field label="Caption" hint="Optional caption">
                <Textarea value={String(form.caption ?? "")} onChange={(e) => setForm((p) => ({ ...p, caption: e.target.value }))} className="min-h-[64px]" />
              </Field>
              <Field label="Credit" hint="Optional photographer credit">
                <Input value={String(form.credit ?? "")} onChange={(e) => setForm((p) => ({ ...p, credit: e.target.value }))} />
              </Field>
              <Field label="Sort order">
                <Input
                  type="number"
                  min={0}
                  value={form.order === undefined ? "" : String(form.order)}
                  onChange={(e) => setForm((p) => ({ ...p, order: e.target.value === "" ? undefined : Number(e.target.value) }))}
                />
              </Field>
              <Checkbox
                label="Feature on homepage"
                hint="Include in the Client Memories carousel"
                checked={form.featured === true}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
              />
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-brand-turquoise/10">
              <AdminButton variant="secondary" onClick={() => setEditing(null)}>Cancel</AdminButton>
              <AdminButton onClick={saveEdit} disabled={busy}>{busy ? "Saving…" : "Save"}</AdminButton>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Remove this photo?"
        message="The photo will be removed from the gallery and homepage carousel. The uploaded file itself stays in the media library."
        onConfirm={remove}
        onCancel={() => setPendingDelete(null)}
        confirmLabel={busy ? "Removing…" : "Remove"}
      />
    </div>
  );
}
