import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { EntityList } from "@/components/admin/EntityList";
import { getDestinations } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminDestinationsPage() {
  const destinations = await getDestinations({ status: "all" });

  const rows = destinations.map((dest) => ({
    id: dest.id,
    title: dest.name,
    subtitle: `${dest.region} · ${dest.isDomestic ? "Domestic" : "International"}`,
    meta: `/destinations/${dest.slug}${dest.featured ? " · ★ featured" : ""}`,
    status: dest.status,
    thumb: dest.heroImage || (dest.gallery && dest.gallery[0]) || "",
    editHref: `/admin/destinations/${dest.id}`,
    externalHref: `/destinations/${dest.slug}`,
  }));

  return (
    <div>
      <PageHeader
        title="Destinations"
        subtitle={`${destinations.length} destination${destinations.length === 1 ? "" : "s"}`}
      />
      <EntityList
        type="destination"
        rows={rows}
        newHref="/admin/destinations/new"
        newLabel="New destination"
        singular="destination"
        emptyTitle="No destinations yet"
        emptyHint="Add the places you sell trips to — they drive package filters and homepage carousels."
      />
    </div>
  );
}
