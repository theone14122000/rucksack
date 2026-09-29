"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Trash2 } from "lucide-react";
import { AdminButton, ConfirmDialog, StatusBadge, useToast } from "./ui";
import { cmsPost } from "./api";
import { PublishStatus } from "@/lib/cms/types";

export interface FormErrors {
  banner?: string[];
}

export function useEntityForm<T extends { id: string; status?: PublishStatus }>({
  type,
  initial,
  isNew,
  backHref,
  label,
}: {
  type: string;
  initial: T;
  isNew: boolean;
  backHref: string;
  label: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [item, setItem] = useState<T>(initial);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const patch = (partial: Partial<T>) => setItem((prev) => ({ ...prev, ...partial }));

  const save = async (status?: PublishStatus) => {
    if (busy) return true;
    setBusy(true);
    setErrors([]);
    const payload: Record<string, unknown> = { ...item };
    payload.status = status ?? payload.status ?? "published";
    const result = await cmsPost(type, "upsert", payload);
    setBusy(false);
    if (result.ok) {
      toast(status === "draft" ? `Saved as draft` : "Saved — changes are live");
      router.push(backHref);
      router.refresh();
      return true;
    }
    setErrors(result.errors?.length ? result.errors : [result.error || "Save failed"]);
    toast(result.error || "Save failed", "error");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  };

  const remove = async () => {
    setBusy(true);
    const result = await cmsPost(type, "delete", { id: item.id });
    setBusy(false);
    setConfirmOpen(false);
    if (result.ok) {
      toast(`Deleted "${label}"`);
      router.push(backHref);
      router.refresh();
    } else {
      toast(result.error || "Delete failed", "error");
    }
  };

  return {
    item,
    setItem,
    patch,
    busy,
    errors,
    save,
    remove,
    confirmOpen,
    setConfirmOpen,
  };
}

export function EditorShell({
  title,
  subtitle,
  backHref,
  backLabel,
  badge,
  onSave,
  onSaveDraft,
  onDelete,
  busy,
  errors,
  children,
  sidebar,
}: {
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
  badge?: React.ReactNode;
  onSave: () => void;
  onSaveDraft?: () => void;
  onDelete?: () => void;
  busy?: boolean;
  errors?: string[];
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-turquoise hover:text-brand-turquoise-light w-fit"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> {backLabel}
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-editorial text-3xl font-bold text-brand-dark tracking-tight">{title}</h1>
            {badge}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {onDelete && (
              <AdminButton variant="danger" onClick={() => setConfirmOpen(true)}>
                <Trash2 className="w-4 h-4" /> Delete
              </AdminButton>
            )}
            {onSaveDraft && (
              <AdminButton variant="secondary" onClick={onSaveDraft} disabled={busy}>
                Save as draft
              </AdminButton>
            )}
            <AdminButton onClick={onSave} disabled={busy}>
              <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save changes"}
            </AdminButton>
          </div>
        </div>
        {subtitle && <p className="text-sm text-brand-taupe -mt-2">{subtitle}</p>}
      </div>

      {errors && errors.length > 0 && (
        <div className="mb-6 rounded-card-lg border border-red-200 bg-red-50 px-4 py-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1.5">
            Could not save — fix the following:
          </p>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-0.5">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0 w-full space-y-6">{children}</div>
        <aside className="w-full lg:w-80 shrink-0 space-y-5 lg:sticky lg:top-24">{sidebar}</aside>
      </div>

      {onDelete && (
        <ConfirmDialog
          open={confirmOpen}
          title="Delete permanently?"
          message={`"${title}" will be removed from the website and database. This cannot be undone.`}
          onConfirm={() => {
            setConfirmOpen(false);
            onDelete();
          }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}

// ============ SIDEBAR WIDGETS ============
export function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft p-5">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-dark/70 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function StatusRow({ status, onChange }: { status?: PublishStatus; onChange: (s: PublishStatus) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <StatusBadge status={status} />
      <div className="flex rounded-card border border-brand-turquoise/15 overflow-hidden text-[11px] font-bold uppercase tracking-wider">
        {(["published", "draft", "archived"] as PublishStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`px-2.5 py-1.5 transition-colors ${
              (status || "published") === s
                ? "bg-brand-turquoise text-white"
                : "bg-white text-brand-taupe hover:bg-brand-turquoise/5"
            }`}
          >
            {s === "published" ? "Live" : s === "draft" ? "Draft" : "Hidden"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OrderInput({ value, onChange }: { value?: number; onChange: (v?: number) => void }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark/70 mb-1.5">
        Sort order
      </span>
      <input
        type="number"
        min={0}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
        placeholder="auto"
        className="w-full rounded-card border border-brand-turquoise/15 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/15 transition-all"
      />
      <span className="block text-[11px] text-brand-taupe mt-1">
        Lower numbers appear first. Leave empty to keep the current position.
      </span>
    </label>
  );
}

export function SeoFields({
  seoTitle,
  seoDescription,
  onChange,
}: {
  seoTitle?: string;
  seoDescription?: string;
  onChange: (patch: { seoTitle?: string; seoDescription?: string }) => void;
}) {
  return (
    <div className="bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft p-5">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-dark/70 mb-4">
        Search engine (SEO)
      </h3>
      <div className="space-y-4">
        <label className="block">
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark/70 mb-1.5">
            Meta title
          </span>
          <input
            type="text"
            value={seoTitle || ""}
            maxLength={300}
            onChange={(e) => onChange({ seoTitle: e.target.value })}
            placeholder="Defaults to the item title"
            className="w-full rounded-card border border-brand-turquoise/15 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/15 transition-all"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark/70 mb-1.5">
            Meta description
          </span>
          <textarea
            value={seoDescription || ""}
            maxLength={500}
            onChange={(e) => onChange({ seoDescription: e.target.value })}
            placeholder="Shown in Google results"
            className="w-full min-h-[80px] rounded-card border border-brand-turquoise/15 bg-white px-3.5 py-2.5 text-sm leading-relaxed focus:outline-none focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/15 transition-all"
          />
        </label>
      </div>
    </div>
  );
}
