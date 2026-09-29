import React from "react";
import { DestinationEditor } from "@/components/admin/DestinationEditor";
import { Destination } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function blankDestination(): Destination {
  return {
    id: `dest-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: "",
    slug: "",
    region: "",
    isDomestic: true,
    shortDescription: "",
    fullDescription: "",
    heroImage: "",
    gallery: [],
    bestTimeToVisit: "",
    highlights: [],
    attractions: [],
    packagesCount: 0,
    treksCount: 0,
    featured: false,
    seoTitle: "",
    seoDescription: "",
  };
}

export default function NewDestinationPage() {
  return <DestinationEditor initial={blankDestination()} isNew />;
}
