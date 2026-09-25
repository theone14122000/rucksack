"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Mountain,
} from "lucide-react";
import { EnquiryModal } from "../ui/EnquiryModal";
import { cn } from "@/lib/utils";
import {
  ACTIVITIES,
  ADVENTURE_LEVELS,
  getLevelLabel,
  type AdventureLevelKey,
} from "@/lib/activities";

type Filter = "all" | AdventureLevelKey;

const levelBadge: Record<AdventureLevelKey, string> = {
  basic: "bg-emerald-50 text-emerald-700 border-emerald-200",
  moderate: "bg-brand-yellow-50 text-amber-700 border-amber-200",
  extreme: "bg-rose-50 text-rose-700 border-rose-200",
};

const WHATSAPP_NUMBER = "917018678064";

export const ActivitiesExplorer: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [enquiryActivity, setEnquiryActivity] = useState<string | null>(null);

  const visible =
    filter === "all"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.level === filter);

  return (
    <div>
      {/* Level Filter Pills */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8 sm:mb-10 snap-scroll">
        {(
          [
            { key: "all", label: "All Activities" },
            ...ADVENTURE_LEVELS.map((l) => ({ key: l.key, label: l.label })),
          ] as { key: Filter; label: string }[]
        ).map((opt) => (
          <button
            key={opt.key}
            onClick={() => {
              setFilter(opt.key);
              setExpanded(null);
            }}
            className={cn(
              "snap-center shrink-0 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300",
              filter === opt.key
                ? "bg-brand-turquoise text-white shadow-lg shadow-brand-turquoise/20"
                : "bg-white text-brand-dark/60 border border-brand-turquoise/10 hover:border-brand-turquoise/25 hover:text-brand-dark"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {visible.map((activity) => {
          const isOpen = expanded === activity.slug;
          const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hello Rucksack Adventures! I'm interested in the "${activity.name}" activity (${getLevelLabel(activity.level)}). Please share the details.`
          )}`;
          return (
            <div
              key={activity.slug}
              className="group bg-white rounded-card-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-luxury-hover hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/12"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-brand-dark/10 to-transparent" />
                <div className="absolute top-3 left-3 z-20">
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm",
                      levelBadge[activity.level]
                    )}
                  >
                    {getLevelLabel(activity.level)}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-dark tracking-tight group-hover:text-brand-turquoise transition-colors">
                  {activity.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/55 leading-relaxed mt-2">
                  {activity.tagline}
                </p>
                <p className="text-xs sm:text-sm text-brand-dark/55 line-clamp-2 leading-relaxed mt-1">
                  {activity.paragraphs[0]}
                </p>
                {isOpen && (
                  <div className="space-y-2 mt-2">
                    {activity.paragraphs.slice(1).map((para, i) => (
                      <p
                        key={i}
                        className="text-xs sm:text-sm text-brand-dark/55 leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                <div className="pt-4 mt-auto flex items-center justify-between gap-2">
                  <button
                    onClick={() =>
                      setExpanded(isOpen ? null : activity.slug)
                    }
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light transition-colors"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Show Less" : "View Details"}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#25D366] hover:text-[#1EBE5D] py-2 px-3 rounded-full bg-[#25D366]/8 hover:bg-[#25D366]/15 border border-[#25D366]/20 transition-all duration-300"
                      aria-label={`Ask about ${activity.name} on WhatsApp`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setEnquiryActivity(activity.name)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-brand-turquoise hover:bg-brand-turquoise-light py-2 px-3.5 rounded-full transition-all duration-300"
                    >
                      Enquire <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="text-center py-12 text-sm text-brand-taupe flex flex-col items-center gap-3">
          <Mountain className="w-8 h-8 text-brand-turquoise/30" />
          No activities found for this level yet.
        </div>
      )}

      <EnquiryModal
        isOpen={enquiryActivity !== null}
        onClose={() => setEnquiryActivity(null)}
        defaultDestination={enquiryActivity ?? ""}
        defaultTravelType="Other"
        title={`Enquire: ${enquiryActivity ?? "Adventure Activity"}`}
        subtitle="Tell us when you'd like to go — our mountain team will respond with options."
      />
    </div>
  );
};
