import React from "react";
import { Metadata } from "next";
import { Mountain, Globe2, Compass } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { getDestinations } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Destinations | Shimla, Manali, Dharamshala, Spiti & Ladakh",
  description:
    "Explore curated Himalayan destinations with Rucksack Adventures: Shimla, Manali, Dharamshala, Dalhousie, Kinnaur, Lahaul & Spiti, and Leh Ladakh.",
};

export const revalidate = 0;

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const params = await searchParams;
  const regionFilter = params?.region;
  const allDestinations = await getDestinations();

  const filtered = regionFilter
    ? allDestinations.filter((d) =>
        regionFilter === "domestic" ? d.isDomestic : !d.isDomestic
      )
    : allDestinations;

  const domesticCount = allDestinations.filter((d) => d.isDomestic).length;
  const internationalCount = allDestinations.filter((d) => !d.isDomestic).length;

  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Destinations" }]} />

        {/* Page Header */}
        <div className="py-8 border-b border-brand-turquoise/30 mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise block mb-2">
            Sanctuaries of Wonder
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Curated Destinations
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/80 max-w-2xl leading-relaxed">
            From the colonial heritage of Shimla and the meadows of Dalhousie to the high passes of Spiti and Ladakh. Every destination is anchored in our philosophy of mindful, refined travel.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <a
              href="/destinations"
              className={`px-4 py-2 rounded-card text-xs font-semibold tracking-wider uppercase border transition-colors ${
                !regionFilter
                  ? "bg-brand-dark text-brand-cream border-brand-dark"
                  : "bg-brand-cream/60 text-brand-dark border-brand-turquoise/30 hover:border-brand-dark"
              }`}
            >
              All Destinations ({allDestinations.length})
            </a>
            <a
              href="/destinations?region=domestic"
              className={`px-4 py-2 rounded-card text-xs font-semibold tracking-wider uppercase border flex items-center gap-1.5 transition-colors ${
                regionFilter === "domestic"
                  ? "bg-brand-dark text-brand-cream border-brand-dark"
                  : "bg-brand-cream/60 text-brand-dark border-brand-turquoise/30 hover:border-brand-dark"
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-brand-turquoise" />
              Domestic Himalayas & India ({domesticCount})
            </a>
            <a
              href="/destinations?region=international"
              className={`px-4 py-2 rounded-card text-xs font-semibold tracking-wider uppercase border flex items-center gap-1.5 transition-colors ${
                regionFilter === "international"
                  ? "bg-brand-dark text-brand-cream border-brand-dark"
                  : "bg-brand-cream/60 text-brand-dark border-brand-turquoise/30 hover:border-brand-dark"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-brand-turquoise" />
              International Escapes ({internationalCount})
            </a>
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </div>
  );
}
