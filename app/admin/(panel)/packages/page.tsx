import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { EntityList } from "@/components/admin/EntityList";
import { getPackages } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await getPackages({ status: "all" });

  const rows = packages.map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    subtitle: `${pkg.destination} · ${pkg.duration}`,
    meta: `/packages/${pkg.slug} · ₹${pkg.price.toLocaleString("en-IN")}${pkg.featured ? " · ★ featured" : ""}`,
    status: pkg.status,
    editHref: `/admin/packages/${pkg.id}`,
    externalHref: `/packages/${pkg.slug}`,
  }));

  return (
    <div>
      <PageHeader
        title="Packages"
        subtitle={`${packages.length} tour package${packages.length === 1 ? "" : "s"} in the catalogue`}
      />
      <EntityList
        type="package"
        rows={rows}
        newHref="/admin/packages/new"
        newLabel="New package"
        singular="package"
        emptyTitle="No packages yet"
        emptyHint="Create your first tour package — add itinerary, inclusions, photos, pricing, then publish."
      />
    </div>
  );
}
