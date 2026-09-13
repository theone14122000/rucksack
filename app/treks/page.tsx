import React from "react";
import { Metadata } from "next";
import { Mountain, Gauge, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { TrekCard } from "@/components/cards/TrekCard";
import { TopographicContour3D } from "@/components/sections/TopographicContour3D";
import { getTreks } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Himalayan Treks | Chopta, Bhaba Pass, Indrahar & Triund",
  description:
    "Curated Himalayan trekking expeditions led by certified wilderness guides. High altitude pass crossings and alpine ridge treks in Himachal Pradesh and Uttarakhand.",
};

export const revalidate = 0;

export default async function TreksPage({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string }>;
}) {
  const params = await searchParams;
  const diffFilter = params?.difficulty;
  const allTreks = await getTreks();

  const filtered = diffFilter
    ? allTreks.filter((t) => t.difficulty.toLowerCase() === diffFilter.toLowerCase())
    : allTreks;

  return (
    <div className="pt-24 pb-20 bg-brand-turquoise-light text-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="opacity-90">
          <Breadcrumbs items={[{ label: "Himalayan Treks" }]} />
        </div>

        {/* Page Header */}
        <div className="py-8 border-b border-brand-turquoise/30 mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-brand-turquoise block mb-2">
            Alpine Wilderness Expeditions
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-cream tracking-tight mb-4">
            Into the Mountains
          </h1>
          <p className="text-sm sm:text-base text-brand-cream/80 max-w-2xl leading-relaxed">
            Curated Himalayan trekking experiences for explorers seeking something beyond conventional travel. Certified mountaineering leaders, 4-season alpine gear, portable medical oxygen, and ethical porter welfare.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <a
              href="/treks"
              className={`px-4 py-2 rounded-card text-xs font-mono font-semibold tracking-wider uppercase border transition-colors ${
                !diffFilter
                  ? "bg-brand-turquoise text-brand-turquoise-light border-brand-turquoise"
                  : "bg-brand-dark/80 text-brand-cream border-brand-turquoise/30 hover:border-brand-turquoise"
              }`}
            >
              All Treks ({allTreks.length})
            </a>
            <a
              href="/treks?difficulty=easy"
              className={`px-4 py-2 rounded-card text-xs font-mono font-semibold tracking-wider uppercase border transition-colors ${
                diffFilter === "easy"
                  ? "bg-brand-turquoise text-brand-turquoise-light border-brand-turquoise"
                  : "bg-brand-dark/80 text-brand-cream border-brand-turquoise/30 hover:border-brand-turquoise"
              }`}
            >
              Easy (Triund)
            </a>
            <a
              href="/treks?difficulty=moderate"
              className={`px-4 py-2 rounded-card text-xs font-mono font-semibold tracking-wider uppercase border transition-colors ${
                diffFilter === "moderate"
                  ? "bg-brand-turquoise text-brand-turquoise-light border-brand-turquoise"
                  : "bg-brand-dark/80 text-brand-cream border-brand-turquoise/30 hover:border-brand-turquoise"
              }`}
            >
              Moderate (Chopta Chandrashila)
            </a>
            <a
              href="/treks?difficulty=challenging"
              className={`px-4 py-2 rounded-card text-xs font-mono font-semibold tracking-wider uppercase border transition-colors ${
                diffFilter === "challenging"
                  ? "bg-brand-turquoise text-brand-turquoise-light border-brand-turquoise"
                  : "bg-brand-dark/80 text-brand-cream border-brand-turquoise/30 hover:border-brand-turquoise"
              }`}
            >
              Challenging (Bhaba Pass & Indrahar)
            </a>
          </div>
        </div>

        {/* 3D Topographic Contour Feature */}
        <div className="mb-14 rounded-card border border-brand-turquoise/30 bg-brand-dark/70 overflow-hidden shadow-2xl">
          <TopographicContour3D />
        </div>

        {/* Treks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </div>
      </div>
    </div>
  );
}
