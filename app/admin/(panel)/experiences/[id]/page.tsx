import React from "react";
import { notFound } from "next/navigation";
import { ExperienceEditor } from "@/components/admin/ExperienceEditor";
import { getExperiences } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experiences = await getExperiences({ status: "all" });
  const exp = experiences.find((e) => e.id === id);
  if (!exp) notFound();

  return <ExperienceEditor initial={exp} isNew={false} />;
}
