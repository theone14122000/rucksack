import React from "react";
import { Metadata } from "next";
import { Mountain, Gauge, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { TrekCard } from "@/components/cards/TrekCard";
import { TopographicContour3D } from "@/components/sections/TopographicContour3D";
import { getTreks } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Himachal Pradesh Treks | Rucksack Adventures",
  description:
    "Explore trekking experiences across Himachal Pradesh including Churdhar, Hampta Pass, Jalori Pass, Prashar Lake, Serolsar Lake, Chanshal Valley and other Himalayan trails with Rucksack Adventures.",
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
              Easy (Lakes & Day Trails)
            </a>
            <a
              href="/treks?difficulty=moderate"
              className={`px-4 py-2 rounded-card text-xs font-mono font-semibold tracking-wider uppercase border transition-colors ${
                diffFilter === "moderate"
                  ? "bg-brand-turquoise text-brand-turquoise-light border-brand-turquoise"
                  : "bg-brand-dark/80 text-brand-cream border-brand-turquoise/30 hover:border-brand-turquoise"
              }`}
            >
              Moderate (Passes & Valleys)
            </a>
            <a
              href="/treks?difficulty=challenging"
              className={`px-4 py-2 rounded-card text-xs font-mono font-semibold tracking-wider uppercase border transition-colors ${
                diffFilter === "challenging"
                  ? "bg-brand-turquoise text-brand-turquoise-light border-brand-turquoise"
                  : "bg-brand-dark/80 text-brand-cream border-brand-turquoise/30 hover:border-brand-turquoise"
              }`}
            >
              Challenging (High Summits)
            </a>
          </div>
        </div>

        {/* 3D Topographic Contour Feature */}
        <div className="mb-14 rounded-card border border-brand-turquoise/30 bg-brand-dark/70 overflow-hidden shadow-2xl">
          <TopographicContour3D />
        </div>

        {/* Shadows of Himachal Intro */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-brand-cream tracking-tight">
            Shadows of <span className="font-hand text-shimmer">Himachal</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/75 leading-relaxed">
            Discover the quieter side of Himachal Pradesh through lesser-known
            trails, peaceful mountain villages and unforgettable journeys away
            from the usual tourist routes.
          </p>
          <p className="text-xs sm:text-sm text-brand-cream/60 leading-relaxed">
            Choose the less-beaten path and experience Himachal through its
            landscapes, culture and hidden mountain trails.
          </p>
        </div>

        {/* Treks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </div>

        {/* Trek Responsibly Note */}
        <div className="mt-14 max-w-3xl mx-auto p-6 sm:p-8 bg-brand-dark/70 border border-brand-turquoise/30 rounded-card text-center space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise-light">
            Trek Responsibly
          </p>
          <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed">
            Mountain trails are fragile environments. Respect local
            communities, avoid littering, follow marked routes and local
            regulations, respect temples and cultural sites, and follow the
            instructions of experienced guides where required.
          </p>
        </div>
      </div>
    </div>
  );
}
