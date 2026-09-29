"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Search, Trash2 } from "lucide-react";
import { AdminButton, ConfirmDialog, EmptyState, Select, StatusBadge, useToast } from "./ui";
import { cmsPost } from "./api";
import { PublishStatus } from "@/lib/cms/types";

export interface EntityRow {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  status?: PublishStatus;
  editHref?: string;
  externalHref?: string;
  thumb?: string;
}

const STATUSES: (PublishStatus | "all")[] = ["all", "published", "draft", "archived"];

export function EntityList({
  type,
  rows,
  newHref,
  newLabel = "New item",
  emptyTitle = "Nothing here yet",
  emptyHint,
  canReorder = true,
  singular = "item",
}: {
  type: string;
  rows: EntityRow[];
  newHref?: string;
  newLabel?: string;
  emptyTitle?: string;
  emptyHint?: string;
  canReorder?: boolean;
  singular?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PublishStatus | "all">("all");
  const [reorderMode, setReorderMode] = useState(false);
  const [ordered, setOrdered] = useState<EntityRow[]>(rows);
  const [pendingDelete, setPendingDelete] = useState<EntityRow | null>(null);
  const [busy, setBusy] = useState(false);

  React.useEffect(() => {
    setOrdered(rows);
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ordered.filter((row) => {
      if (statusFilter !== "all" && (row.status || "published") !== statusFilter) return false;
      if (!q) return true;
      return `${row.title} ${row.subtitle || ""} ${row.meta || ""}`.toLowerCase().includes(q);
    });
  }, [ordered, query, statusFilter]);

  const setStatus = async (row: EntityRow, status: PublishStatus) => {
    const result = await cmsPost(type, "status", { id: row.id, status });
    if (result.ok) {
      toast(`${row.title} → ${status}`);
      router.refresh();
    } else {
      toast(result.error || "Update failed", "error");
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    const result = await cmsPost(type, "delete", { id: pendingDelete.id });
    setBusy(false);
    setPendingDelete(null);
    if (result.ok) {
      toast(`Deleted "${pendingDelete.title}"`);
      router.refresh();
    } else {
      toast(result.error || "Delete failed", "error");
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= ordered.length) return;
    const next = [...ordered];
    [next[index], next[target]] = [next[target], next[index]];
    setOrdered(next);
    const payload = { items: next.map((row, i) => ({ id: row.id, order: i })) };
    const result = await cmsPost(type, "reorder", payload);
    if (!result.ok) {
      toast(result.error || "Reorder failed", "error");
      setOrdered(rows);
    } else {
      router.refresh();
    }
  };

  const visible = reorderMode ? ordered : filtered;

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
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PublishStatus | "all")}
            className="w-auto py-2.5"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </Select>
          {canReorder && rows.length > 1 && (
            <AdminButton variant={reorderMode ? "primary" : "secondary"} onClick={() => setReorderMode((v) => !v)}>
              {reorderMode ? "Done reordering" : "Reorder"}
            </AdminButton>
          )}
          {newHref && (
            <Link
              href={newHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider bg-brand-turquoise text-white border border-brand-turquoise hover:bg-brand-turquoise-light transition-all"
            >
              + {newLabel}
            </Link>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title={rows.length === 0 ? emptyTitle : "No matches"}
          hint={rows.length === 0 ? emptyHint : "Try a different search or status filter."}
          action={
            rows.length === 0 && newHref ? (
              <Link
                href={newHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider bg-brand-turquoise text-white border border-brand-turquoise"
              >
                + {newLabel}
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft overflow-hidden">
          <ul className="divide-y divide-brand-turquoise/8">
            {visible.map((row, index) => {
              const extHref = row.externalHref
                ? row.status && row.status !== "published"
                  ? `${row.externalHref}${row.externalHref.includes("?") ? "&" : "?"}preview=1`
                  : row.externalHref
                : undefined;
              return (
              <li
                key={row.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-5 py-3.5 hover:bg-brand-cream/50 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {reorderMode && (
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        className="p-1 text-brand-taupe hover:text-brand-turquoise disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === visible.length - 1}
                        className="p-1 text-brand-taupe hover:text-brand-turquoise disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {row.thumb && (
                    <div className="w-12 h-12 rounded-card overflow-hidden border border-brand-turquoise/10 bg-brand-cream shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={row.thumb} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <p className="text-sm font-bold text-brand-dark truncate">{row.title}</p>
                      <StatusBadge status={row.status} />
                    </div>
                    {row.subtitle && <p className="text-xs text-brand-taupe truncate mt-0.5">{row.subtitle}</p>}
                    {row.meta && <p className="text-[11px] font-mono text-brand-taupe/80 mt-0.5">{row.meta}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <Select
                    value={row.status || "published"}
                    onChange={(e) => setStatus(row, e.target.value as PublishStatus)}
                    className="w-auto py-2 text-[11px] font-bold uppercase tracking-wider"
                    aria-label={`Status for ${row.title}`}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </Select>
                  {extHref && (
                    <a
                      href={extHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-card border border-brand-turquoise/15 text-brand-taupe hover:text-brand-turquoise hover:border-brand-turquoise/40 transition-all"
                      aria-label="Open on site"
                      title="Open on site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {row.editHref && (
                    <Link
                      href={row.editHref}
                      className="p-2.5 rounded-card border border-brand-turquoise/15 text-brand-dark hover:text-brand-turquoise hover:border-brand-turquoise/40 transition-all"
                      aria-label={`Edit ${row.title}`}
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setPendingDelete(row)}
                    className="p-2.5 rounded-card border border-brand-turquoise/15 text-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                    aria-label={`Delete ${row.title}`}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
              );
            })}
          </ul>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title={`Delete this ${singular}?`}
        message={`"${pendingDelete?.title}" will be permanently removed from the website and the database. This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
        confirmLabel={busy ? "Deleting…" : "Delete"}
      />
    </div>
  );
}
