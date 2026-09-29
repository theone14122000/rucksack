import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { ContentAdmin } from "@/components/admin/ContentAdmin";
import { getContentBlocks } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const blocks = await getContentBlocks();

  return (
    <div>
      <PageHeader
        title="Website Content"
        subtitle="Edit the marketing copy on the homepage, section headings and footer — changes go live on save."
      />
      <ContentAdmin initial={blocks} />
    </div>
  );
}
