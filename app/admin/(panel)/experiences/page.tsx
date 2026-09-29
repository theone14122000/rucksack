import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { EntityList } from "@/components/admin/EntityList";
import { getExperiences } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminExperiencesPage() {
  const experiences = await getExperiences({ status: "all" });

  const rows = experiences.map((exp) => ({
    id: exp.id,
    title: exp.name,
    subtitle: exp.category,
    meta: exp.slug,
    status: exp.status,
    thumb: exp.image || "",
    editHref: `/admin/experiences/${exp.id}`,
    externalHref: `/experiences`,
  }));

  return (
    <div>
      <PageHeader
        title="Experiences"
        subtitle={`${experiences.length} signature experience${experiences.length === 1 ? "" : "s"}`}
      />
      <EntityList
        type="experience"
        rows={rows}
        newHref="/admin/experiences/new"
        newLabel="New experience"
        singular="experience"
        emptyTitle="No experiences yet"
        emptyHint="Add the signature activities and experiences you sell to travellers."
      />
    </div>
  );
}
