import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CustomPackageWizard } from "@/components/custom-package/CustomPackageWizard";
import { INTERNATIONAL_FALLBACKS } from "@/lib/custom-package";
import { getDestinations } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Custom Destination | Request Any Destination in India & Worldwide",
  description:
    "Can't find your destination? Request any custom destination with Rucksack Adventures: regions, dates, travellers, stays, cabs, tickets, and mountain experiences.",
};

export const revalidate = 0;

export default async function CustomDestinationPage() {
  const destinations = await getDestinations();
  const cmsInternational = destinations
    .filter((d) => !d.isDomestic)
    .map((d) => d.name);
  const internationalOptions =
    cmsInternational.length > 0 ? cmsInternational : INTERNATIONAL_FALLBACKS;

  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Destinations", href: "/destinations" },
            { label: "Custom Destination" },
          ]}
        />

        {/* Page Header */}
        <div className="py-8 border-b border-brand-turquoise/30 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise block mb-2">
            Beyond The Listed Map
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Custom <span className="font-hand text-shimmer">Destination</span>
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/80 max-w-2xl leading-relaxed">
            Can&apos;t find your destination? Tell us where your heart points —
            our Shimla atelier will craft the route, stays, transport, and
            experiences around it.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-cream border border-brand-turquoise/5 p-6 sm:p-10 rounded-card-2xl shadow-luxury">
            <CustomPackageWizard
              mode="destination"
              internationalOptions={internationalOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
