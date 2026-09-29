import React from "react";
import { notFound } from "next/navigation";
import { PackageEditor } from "@/components/admin/PackageEditor";
import { getDestinations, getPackages } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [packages, destinations] = await Promise.all([
    getPackages({ status: "all" }),
    getDestinations(),
  ]);
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) notFound();

  return (
    <PackageEditor
      initial={pkg}
      isNew={false}
      destinations={destinations.map((d) => ({ name: d.name, slug: d.slug }))}
    />
  );
}
