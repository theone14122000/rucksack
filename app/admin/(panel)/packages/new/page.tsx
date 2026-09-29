import React from "react";
import { PackageEditor } from "@/components/admin/PackageEditor";
import { getDestinations } from "@/lib/cms/store";
import { Package } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function blankPackage(): Package {
  return {
    id: `pkg-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    title: "",
    slug: "",
    destination: "",
    destinationSlug: "",
    duration: "",
    travelStyle: "",
    price: 0,
    shortDescription: "",
    overview: "",
    heroImage: "",
    gallery: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    faqs: [],
    featured: false,
    isInternational: false,
    seoTitle: "",
    seoDescription: "",
  };
}

export default async function NewPackagePage() {
  const destinations = await getDestinations();
  return (
    <PackageEditor
      initial={blankPackage()}
      isNew
      destinations={destinations.map((d) => ({ name: d.name, slug: d.slug }))}
    />
  );
}
