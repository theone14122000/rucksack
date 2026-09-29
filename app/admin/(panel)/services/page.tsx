import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { SimpleCollection } from "@/components/admin/SimpleCollection";
import { getServices } from "@/lib/cms/store";
import { Service } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function sortByOrder<T extends { order?: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
}

export default async function AdminServicesPage() {
  const services = sortByOrder(await getServices({ status: "all" }));
  const items = services.map((s) => ({ ...s }));

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Specialized transport & pilgrimage cards on the homepage — reorder with the sort order field."
      />
      <SimpleCollection
        type="service"
        singular="service"
        items={items}
        columns={[
          { key: "title", label: "Title", primary: true },
          { key: "icon", label: "Icon" },
          { key: "href", label: "Link" },
          { key: "order", label: "Order" },
          { key: "status", label: "Status" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "text", required: true, placeholder: "Premium Cab Services" },
          { key: "icon", label: "Icon (emoji)", type: "text", required: true, placeholder: "🚗" },
          { key: "description", label: "Description", type: "textarea", required: true },
          { key: "href", label: "Link", type: "text", required: true, placeholder: "/taxi-services" },
          { key: "items", label: "Bullet points", type: "array", hint: "Shown as the card's checklist" },
          { key: "order", label: "Sort order", type: "number", min: 0, hint: "Lower numbers appear first" },
        ]}
        defaults={{ icon: "🚗", title: "", description: "", href: "/taxi-services", items: [], order: 0 }}
      />
    </div>
  );
}
