import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";
import { getGalleryItems } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const gallery = await getGalleryItems({ status: "all" });

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Photos appear on /gallery. Featured photos also drive the homepage Client Memories carousel."
      />
      <GalleryAdmin initial={gallery} />
    </div>
  );
}
