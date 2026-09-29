import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <div>
      <PageHeader
        title="Media Library"
        subtitle="All uploaded images (JPEG, PNG, WebP, AVIF — up to 5MB). Files in use by content cannot be deleted."
      />
      <MediaLibrary />
    </div>
  );
}
