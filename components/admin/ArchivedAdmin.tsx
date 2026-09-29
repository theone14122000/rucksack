"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, Pencil } from "lucide-react";
import { EmptyState, StatusBadge, useToast } from "./ui";
import { cmsPost } from "./api";
import { PublishStatus } from "@/lib/cms/types";

export interface ArchivedRow {
  id: string;
  type: string;
  typeLabel: string;
  title: string;
  status: PublishStatus;
  editHref?: string;
  slug?: string;
}

export function ArchivedAdmin({ initial }: { initial: ArchivedRow[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [rows, setRows] = useState<ArchivedRow[]>(initial);
  const [busyId, setBusyId] = useState("");

  React.useEffect(() => setRows(initial), [initial]);

  const publish = async (row: ArchivedRow) => {
    setBusyId(row.id);
    const result = await cmsPost(row.type, "status", { id: row.id, status: "published" });
    setBusyId("");
    if (result.ok) {
      setRows(rows.filter((r) => !(r.type === row.type && r.id === row.id)));
      toast(`"${row.title}" is now live`);
      router.refresh();
    } else {
      toast(result.error || "Update failed", "error");
    }
  };

  if (rows.length === 0) {
    return (
      <EmptyState
        title="Nothing hidden"
        hint="Drafts and archived items will appear here. Published items live in their own sections."
      />
    );
  }

  return (
    <div className="bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft overflow-hidden">
      <ul className="divide-y divide-brand-turquoise/8">
        {rows.map((row) => (
          <li key={`${row.type}-${row.id}`} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-5 py-3.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-taupe bg-brand-cream px-2 py-0.5 rounded-full border border-brand-turquoise/10">
                  {row.typeLabel}
                </span>
                <p className="text-sm font-bold text-brand-dark truncate">{row.title}</p>
                <StatusBadge status={row.status} />
              </div>
              {row.slug && <p className="text-[11px] font-mono text-brand-taupe mt-0.5">{row.slug}</p>}
            </div>
            <div className="flex items-center gap-2">
              {row.editHref && (
                <Link
                  href={row.editHref}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-card border border-brand-turquoise/15 text-[11px] font-bold uppercase tracking-wider text-brand-dark hover:text-brand-turquoise hover:border-brand-turquoise/40 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Link>
              )}
              <button
                type="button"
                onClick={() => publish(row)}
                disabled={busyId === row.id}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-card bg-brand-turquoise text-white text-[11px] font-bold uppercase tracking-wider border border-brand-turquoise hover:bg-brand-turquoise-light transition-all disabled:opacity-50"
              >
                <Globe className="w-3.5 h-3.5" /> {busyId === row.id ? "Publishing…" : "Publish"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
