import React from "react";
import { notFound } from "next/navigation";
import { TrekEditor } from "@/components/admin/TrekEditor";
import { getTreks } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function EditTrekPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const treks = await getTreks({ status: "all" });
  const trek = treks.find((t) => t.id === id);
  if (!trek) notFound();

  return <TrekEditor initial={trek} isNew={false} />;
}
