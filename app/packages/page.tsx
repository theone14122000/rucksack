import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PackageCard } from "@/components/cards/PackageCard";
import { getPackages } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Tour Packages | Handcrafted Journeys Across India & Beyond",
  description:
    "Discover handcrafted tour packages for Spiti Valley, Kashmir, Leh Ladakh, Bali, and Dubai curated by Rucksack Adventures in Kasumpti, Shimla.",
};

export const revalidate = 0;

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const typeFilter = params?.type;
  const allPackages = await getPackages();

  const filtered = typeFilter
    ? allPackages.filter((p) =>
        typeFilter === "international" ? p.isInternational : !p.isInternational
      )
    : allPackages;

  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Tour Packages" }]} />

        {/* Page Header */}
          <div className="py-8 border-b border-brand-turquoise/30 mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise block mb-2">
            Curated Itineraries
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Tour Packages & Expeditions
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/80 max-w-2xl leading-relaxed">
            Every itinerary has been vetted over eight years of mountain operations. Private transfers, verified boutique retreats, and dedicated 24/7 concierge support.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <a
              href="/packages"
              className={`px-4 py-2 rounded-card text-xs font-semibold tracking-wider uppercase border transition-colors ${
                !typeFilter
                  ? "bg-brand-dark text-brand-cream border-brand-dark"
                  : "bg-brand-cream/60 text-brand-dark border-brand-turquoise/30 hover:border-brand-dark"
              }`}
            >
              All Packages ({allPackages.length})
            </a>
            <a
              href="/packages?type=domestic"
              className={`px-4 py-2 rounded-card text-xs font-semibold tracking-wider uppercase border transition-colors ${
                typeFilter === "domestic"
                  ? "bg-brand-dark text-brand-cream border-brand-dark"
                  : "bg-brand-cream/60 text-brand-dark border-brand-turquoise/30 hover:border-brand-dark"
              }`}
            >
              Domestic Himalayan Packages
            </a>
            <a
              href="/packages?type=international"
              className={`px-4 py-2 rounded-card text-xs font-semibold tracking-wider uppercase border transition-colors ${
                typeFilter === "international"
                  ? "bg-brand-dark text-brand-cream border-brand-dark"
                  : "bg-brand-cream/60 text-brand-dark border-brand-turquoise/30 hover:border-brand-dark"
              }`}
            >
              International Escapes
            </a>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
