"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Mail, MessageSquare, Phone, Trash2, User } from "lucide-react";
import { ConfirmDialog, EmptyState, Select, useToast } from "./ui";
import { cmsPost } from "./api";
import { Enquiry } from "@/lib/cms/types";

const STATUSES: Enquiry["status"][] = ["New", "Contacted", "Quoted", "Booked"];

function digits(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

export function EnquiriesAdmin({ initial }: { initial: Enquiry[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<Enquiry[]>(initial);
  const [filter, setFilter] = useState<"all" | Enquiry["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Enquiry | null>(null);
  const [busy, setBusy] = useState(false);

  React.useEffect(() => setItems(initial), [initial]);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter]
  );

  const setStatus = async (enq: Enquiry, status: Enquiry["status"]) => {
    const result = await cmsPost("enquiry", "status", { id: enq.id, status });
    if (result.ok) {
      setItems(items.map((i) => (i.id === enq.id ? { ...i, status } : i)));
      toast(`Marked as ${status}`);
      router.refresh();
    } else {
      toast(result.error || "Update failed", "error");
    }
  };

  const remove = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    const result = await cmsPost("enquiry", "delete", { id: pendingDelete.id });
    setBusy(false);
    setPendingDelete(null);
    if (result.ok) {
      setItems(items.filter((i) => i.id !== pendingDelete.id));
      toast("Enquiry deleted");
      router.refresh();
    } else {
      toast(result.error || "Delete failed", "error");
    }
  };

  const counts = STATUSES.map((s) => ({ status: s, count: items.filter((i) => i.status === s).length }));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all ${filter === "all" ? "bg-brand-turquoise text-white border-brand-turquoise" : "bg-white text-brand-taupe border-brand-turquoise/15 hover:border-brand-turquoise/40"}`}
        >
          All ({items.length})
        </button>
        {counts.map(({ status, count }) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all ${filter === status ? "bg-brand-turquoise text-white border-brand-turquoise" : "bg-white text-brand-taupe border-brand-turquoise/15 hover:border-brand-turquoise/40"}`}
          >
            {status} ({count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No enquiries" hint="Leads submitted through website forms will land here." />
      ) : (
        <div className="space-y-3">
          {filtered.map((enq) => {
            const open = expanded === enq.id;
            const waPhone = digits(enq.phone).length >= 10 ? digits(enq.phone).slice(-10) : "";
            return (
              <div key={enq.id} className="bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft p-4 sm:p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="w-8 h-8 rounded-full bg-brand-turquoise/10 text-brand-turquoise flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </span>
                      <p className="font-bold text-brand-dark">{enq.name}</p>
                      <span className="text-[11px] font-mono text-brand-taupe">
                        {new Date(enq.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-brand-dark/70">
                      <a href={`tel:${enq.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-turquoise">
                        <Phone className="w-3.5 h-3.5" /> {enq.phone}
                      </a>
                      {enq.email && (
                        <a href={`mailto:${enq.email}`} className="inline-flex items-center gap-1.5 hover:text-brand-turquoise">
                          <Mail className="w-3.5 h-3.5" /> {enq.email}
                        </a>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {enq.travelDate || "Flexible dates"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      {[enq.destination, enq.travelType, enq.travellersCount, enq.budget]
                        .filter(Boolean)
                        .map((tag) => (
                          <span key={String(tag)} className="text-[10px] font-semibold uppercase tracking-wider bg-brand-cream text-brand-taupe px-2.5 py-1 rounded-full border border-brand-turquoise/10">
                            {String(tag)}
                          </span>
                        ))}
                    </div>

                    <p className={`text-sm text-brand-dark/70 leading-relaxed mt-2.5 ${open ? "" : "line-clamp-2"}`}>
                      {enq.message}
                    </p>
                    {enq.message.length > 120 && (
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : enq.id)}
                        className="text-[11px] font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light mt-1"
                      >
                        {open ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>

                  <div className="flex lg:flex-col items-center lg:items-end gap-2 shrink-0">
                    <Select
                      value={enq.status}
                      onChange={(e) => setStatus(enq, e.target.value as Enquiry["status"])}
                      className="w-auto py-2 text-[11px] font-bold uppercase tracking-wider"
                      aria-label="Status"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Select>
                    <div className="flex gap-2">
                      {waPhone && (
                        <a
                          href={`https://wa.me/91${waPhone}?text=${encodeURIComponent(`Hello ${enq.name}, this is Rucksack Adventures regarding your enquiry about ${enq.destination}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-card border border-[#25D366]/30 text-[#25D366] text-[11px] font-bold uppercase tracking-wider hover:bg-[#25D366] hover:text-white transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setPendingDelete(enq)}
                        className="p-2 rounded-card border border-brand-turquoise/15 text-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                        aria-label="Delete enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this enquiry?"
        message={`The enquiry from "${pendingDelete?.name}" will be permanently removed.`}
        onConfirm={remove}
        onCancel={() => setPendingDelete(null)}
        confirmLabel={busy ? "Deleting…" : "Delete"}
      />
    </div>
  );
}
