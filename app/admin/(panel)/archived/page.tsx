import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { ArchivedAdmin, ArchivedRow } from "@/components/admin/ArchivedAdmin";
import {
  getDestinations,
  getExperiences,
  getFAQs,
  getGalleryItems,
  getPackages,
  getServices,
  getTestimonials,
  getTreks,
} from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminArchivedPage() {
  const [packages, destinations, treks, experiences, testimonials, faqs, gallery, services] =
    await Promise.all([
      getPackages({ status: "all" }),
      getDestinations({ status: "all" }),
      getTreks({ status: "all" }),
      getExperiences({ status: "all" }),
      getTestimonials({ status: "all" }),
      getFAQs(undefined, { status: "all" }),
      getGalleryItems({ status: "all" }),
      getServices({ status: "all" }),
    ]);

  const rows: ArchivedRow[] = [];

  const add = (
    items: { id: string; status?: string; name?: string; title?: string; slug?: string }[],
    type: string,
    typeLabel: string,
    editBase?: string
  ) => {
    for (const item of items) {
      if (item.status !== "draft" && item.status !== "archived") continue;
      const title = item.name || item.title || item.id;
      rows.push({
        id: item.id,
        type,
        typeLabel,
        title,
        status: item.status === "archived" ? "archived" : "draft",
        editHref: editBase ? `${editBase}/${item.id}` : undefined,
        slug: item.slug,
      });
    }
  };

  add(packages, "package", "Package", "/admin/packages");
  add(destinations, "destination", "Destination", "/admin/destinations");
  add(treks, "trek", "Trek", "/admin/treks");
  add(experiences, "experience", "Experience", "/admin/experiences");
  add(testimonials, "testimonial", "Testimonial");
  add(faqs, "faq", "FAQ");
  add(gallery, "gallery", "Gallery photo");
  add(services, "service", "Service");

  return (
    <div>
      <PageHeader
        title="Drafts & Archived"
        subtitle="Everything hidden from the public website. Publish to bring items back, or open them to edit."
      />
      <ArchivedAdmin initial={rows} />
    </div>
  );
}
