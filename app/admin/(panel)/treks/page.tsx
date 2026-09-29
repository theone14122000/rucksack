import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { EntityList } from "@/components/admin/EntityList";
import { getTreks } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminTreksPage() {
  const treks = await getTreks({ status: "all" });

  const rows = treks.map((trek) => ({
    id: trek.id,
    title: trek.name,
    subtitle: `${trek.region} · ${trek.duration}`,
    meta: `/treks/${trek.slug} · ${trek.difficulty} · ${trek.altitude}${trek.featured ? " · ★ featured" : ""}`,
    status: trek.status,
    thumb: trek.heroImage || (trek.gallery && trek.gallery[0]) || "",
    editHref: `/admin/treks/${trek.id}`,
    externalHref: `/treks/${trek.slug}`,
  }));

  return (
    <div>
      <PageHeader title="Treks" subtitle={`${treks.length} trek route${treks.length === 1 ? "" : "s"}`} />
      <EntityList
        type="trek"
        rows={rows}
        newHref="/admin/treks/new"
        newLabel="New trek"
        singular="trek"
        emptyTitle="No treks yet"
        emptyHint="Add Himalayan trek routes with itineraries, difficulty, and requirements."
      />
    </div>
  );
}
