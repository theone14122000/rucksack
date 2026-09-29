import React from "react";
import { notFound } from "next/navigation";
import { DestinationEditor } from "@/components/admin/DestinationEditor";
import { getDestinations } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destinations = await getDestinations({ status: "all" });
  const dest = destinations.find((d) => d.id === id);
  if (!dest) notFound();

  return <DestinationEditor initial={dest} isNew={false} />;
}
