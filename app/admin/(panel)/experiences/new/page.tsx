import React from "react";
import { ExperienceEditor } from "@/components/admin/ExperienceEditor";
import { Experience } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function blankExperience(): Experience {
  return {
    id: `exp-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    image: "",
    highlights: [],
    featured: false,
  };
}

export default function NewExperiencePage() {
  return <ExperienceEditor initial={blankExperience()} isNew />;
}
