"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdminButton, ConfirmDialog, EmptyState, Field, Input, Select, StatusBadge, Textarea, useToast } from "./ui";
import { cmsPost, slugify } from "./api";
import { PublishStatus } from "@/lib/cms/types";

export interface FieldSpec {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox" | "array" | "pairs";
  options?: { value: string; label: string }[];
  placeholder?: string;
  hint?: string;
  required?: boolean;
  min?: number;
  max?: number;
  slugFrom?: string;
  rich?: boolean;
}

export interface ColumnSpec {
  key: string;
  label: string;
  primary?: boolean;
  secondary?: boolean;
}

export interface SimpleItem {
  id: string;
  [key: string]: unknown;
}

function defaultValue(spec: FieldSpec): unknown {
  switch (spec.type) {
    case "array":
    case "pairs":
      return [];
    case "number":
      return spec.min ?? 0;
    case "checkbox":
      return false;
    default:
      return "";
  }
}

function FormField({
  spec,
  value,
  onChange,
}: {
  spec: FieldSpec;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (spec.type === "checkbox") {
    return (
      <label className="flex items-start gap-3 p-3 rounded-card border border-brand-turquoise/10 bg-brand-cream/60 hover:border-brand-turquoise/25 transition-all cursor-pointer">
        <input
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-brand-turquoise/40 text-brand-turquoise focus:ring-brand-turquoise/30"
        />
        <span>
          <span className="block text-sm font-semibold text-brand-dark">{spec.label}</span>
          {spec.hint && <span className="block text-[11px] text-brand-taupe mt-0.5">{spec.hint}</span>}
        </span>
      </label>
    );
  }

  if (spec.type === "array" || spec.type === "pairs") {
    const items = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
    if (spec.type === "array") {
      const strings = items.map((i) => String(i ?? ""));
      return (
        <Field label={spec.label} hint={spec.hint}>
          <div className="space-y-2">
            {strings.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={(e) => { const next = [...strings]; next[i] = e.target.value; onChange(next); }} />
                <button
                  type="button"
                  onClick={() => onChange(strings.filter((_, idx) => idx !== i))}
                  className="px-3 text-red-500 hover:text-red-700"
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <AdminButton variant="secondary" onClick={() => onChange([...strings, ""])}>
              <Plus className="w-4 h-4" /> Add
            </AdminButton>
          </div>
        </Field>
      );
    }
    return (
      <Field label={spec.label} hint={spec.hint}>
        <div className="space-y-3">
          {items.map((pair, i) => (
            <div key={i} className="rounded-card border border-brand-turquoise/10 p-3 bg-brand-cream/40 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={String(pair.name ?? "")}
                  onChange={(e) => { const next = [...items]; next[i] = { ...pair, name: e.target.value }; onChange(next); }}
                  placeholder="Name"
                />
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                  className="px-3 text-red-500 hover:text-red-700"
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Textarea
                value={String(pair.description ?? "")}
                onChange={(e) => { const next = [...items]; next[i] = { ...pair, description: e.target.value }; onChange(next); }}
                placeholder="Description"
                className="min-h-[64px]"
              />
            </div>
          ))}
          <AdminButton variant="secondary" onClick={() => onChange([...items, { name: "", description: "" }])}>
            <Plus className="w-4 h-4" /> Add
          </AdminButton>
        </div>
      </Field>
    );
  }

  return (
    <Field label={spec.label} hint={spec.hint} required={spec.required}>
      {spec.type === "select" ? (
        <Select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {(spec.options || []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      ) : spec.type === "textarea" ? (
        <Textarea value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={spec.placeholder} />
      ) : (
        <Input
          type={spec.type === "number" ? "number" : "text"}
          value={String(value ?? "")}
          min={spec.min}
          max={spec.max}
          onChange={(e) => onChange(spec.type === "number" ? Number(e.target.value) : e.target.value)}
          placeholder={spec.placeholder}
        />
      )}
    </Field>
  );
}

export function SimpleCollection({
  type,
  singular,
  items,
  columns,
  fields,
  defaults,
}: {
  type: string;
  singular: string;
  items: SimpleItem[];
  columns: ColumnSpec[];
  fields: FieldSpec[];
  defaults: Record<string, unknown>;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<SimpleItem | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<SimpleItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      columns.some((c) => String(item[c.key] ?? "").toLowerCase().includes(q))
    );
  }, [items, query, columns]);

  const openNew = () => {
    setForm({ id: `${type}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, status: "published", ...defaults });
    setErrors([]);
    setEditing({ id: "__new__" });
  };

  const openEdit = (item: SimpleItem) => {
    setForm({ ...item });
    setErrors([]);
    setEditing(item);
  };

  const save = async (status?: PublishStatus) => {
    if (busy) return;
    setBusy(true);
    setErrors([]);
    const payload: Record<string, unknown> = { ...form };
    payload.status = status ?? payload.status ?? "published";
    if (fields.some((f) => f.slugFrom) && !payload.slug && typeof payload.name === "string") {
      payload.slug = slugify(String(payload.name));
    }
    const result = await cmsPost(type, "upsert", payload);
    setBusy(false);
    if (result.ok) {
      toast("Saved");
      setEditing(null);
      router.refresh();
    } else {
      setErrors(result.errors?.length ? result.errors : [result.error || "Save failed"]);
      toast(result.error || "Save failed", "error");
    }
  };

  const remove = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    const result = await cmsPost(type, "delete", { id: pendingDelete.id });
    setBusy(false);
    setPendingDelete(null);
    if (result.ok) {
      const label = String(pendingDelete[columns[0].key] ?? singular);
      toast(`Deleted "${label}"`);
      router.refresh();
    } else {
      toast(result.error || "Delete failed", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-taupe" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${type}…`}
            className="w-full rounded-card border border-brand-turquoise/15 bg-white pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/15 transition-all"
          />
        </div>
        <AdminButton onClick={openNew}>
          <Plus className="w-4 h-4" /> New {singular}
        </AdminButton>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={items.length === 0 ? `No ${type} yet` : "No matches"}
          hint={items.length === 0 ? `Add your first ${singular}.` : "Try a different search."}
          action={
            items.length === 0 ? (
              <AdminButton onClick={openNew}>
                <Plus className="w-4 h-4" /> New {singular}
              </AdminButton>
            ) : undefined
          }
        />
      ) : (
        <div className="bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-turquoise/10 bg-brand-cream/50">
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-taupe">
                    {col.label}
                  </th>
                ))}
                <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-taupe">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-turquoise/8">
              {filtered.map((item) => (
                <tr key={String(item.id)} className="hover:bg-brand-cream/40 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 max-w-[280px]">
                      {col.key === "status" ? (
                        <StatusBadge status={item.status as PublishStatus} />
                      ) : (
                        <span className={`${col.primary ? "font-bold text-brand-dark" : "text-brand-dark/70"} block truncate`}>
                          {typeof item[col.key] === "boolean"
                            ? item[col.key]
                              ? "Yes"
                              : "No"
                            : String(item[col.key] ?? "—")}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-card border border-brand-turquoise/15 text-brand-dark hover:text-brand-turquoise hover:border-brand-turquoise/40 transition-all"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(item)}
                        className="p-2 rounded-card border border-brand-turquoise/15 text-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit dialog */}
      {editing && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:p-8 bg-brand-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-card-2xl shadow-luxury w-full max-w-2xl border border-brand-turquoise/10 my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-turquoise/10">
              <h3 className="font-editorial text-xl font-bold text-brand-dark">
                {editing.id === "__new__" ? `New ${singular}` : `Edit ${singular}`}
              </h3>
              <button type="button" onClick={() => setEditing(null)} className="text-brand-taupe hover:text-brand-dark text-xl leading-none" aria-label="Close">
                &times;
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {errors.length > 0 && (
                <div className="rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-0.5">
                    {errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
              {fields.map((spec) => (
                <FormField
                  key={spec.key}
                  spec={spec}
                  value={form[spec.key]}
                  onChange={(v) => setForm((prev) => ({ ...prev, [spec.key]: v }))}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-brand-turquoise/10">
              <div className="flex items-center gap-2">
                <Select
                  value={String(form.status || "published")}
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-auto py-2 text-[11px] font-bold uppercase tracking-wider"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </Select>
              </div>
              <div className="flex gap-2">
                <AdminButton variant="secondary" onClick={() => setEditing(null)}>
                  Cancel
                </AdminButton>
                <AdminButton onClick={() => save()} disabled={busy}>
                  {busy ? "Saving…" : "Save"}
                </AdminButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title={`Delete this ${singular}?`}
        message={`This ${singular} will be permanently removed. This cannot be undone.`}
        onConfirm={remove}
        onCancel={() => setPendingDelete(null)}
        confirmLabel={busy ? "Deleting…" : "Delete"}
      />
    </div>
  );
}
