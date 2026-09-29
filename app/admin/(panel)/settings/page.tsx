import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { SettingsAdmin } from "@/components/admin/SettingsAdmin";
import { getSiteSettings } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Contact details, social links, footer and default SEO — used across the whole website."
      />
      <SettingsAdmin initial={settings} />
    </div>
  );
}
