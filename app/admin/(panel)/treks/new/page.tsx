import React from "react";
import { TrekEditor } from "@/components/admin/TrekEditor";
import { Trek } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function blankTrek(): Trek {
  return {
    id: `trek-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: "",
    slug: "",
    region: "",
    duration: "",
    difficulty: "Moderate",
    altitude: "",
    bestSeason: "",
    shortDescription: "",
    overview: "",
    heroImage: "",
    gallery: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    requirements: [],
    faqs: [],
    featured: false,
    seoTitle: "",
    seoDescription: "",
  };
}

export default function NewTrekPage() {
  return <TrekEditor initial={blankTrek()} isNew />;
}
