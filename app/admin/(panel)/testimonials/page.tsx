import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { SimpleCollection } from "@/components/admin/SimpleCollection";
import { getTestimonials } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials({ status: "all" });
  const items = testimonials.map((t) => ({ ...t }));

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Guest reviews shown in the homepage carousel. Only publish reviews you have permission to use."
      />
      <SimpleCollection
        type="testimonial"
        singular="testimonial"
        items={items}
        columns={[
          { key: "customerName", label: "Guest", primary: true },
          { key: "destination", label: "Destination" },
          { key: "rating", label: "Rating" },
          { key: "date", label: "Date" },
          { key: "status", label: "Status" },
        ]}
        fields={[
          { key: "customerName", label: "Guest name", type: "text", required: true },
          { key: "review", label: "Review", type: "textarea", required: true },
          { key: "rating", label: "Rating (1–5)", type: "number", min: 1, max: 5, required: true },
          { key: "destination", label: "Destination", type: "text", required: true, placeholder: "Ladakh" },
          { key: "tripType", label: "Trip type", type: "text", required: true, placeholder: "Family tour" },
          { key: "date", label: "Date shown", type: "text", required: true, placeholder: "March 2026" },
          { key: "order", label: "Sort order", type: "number", min: 0 },
        ]}
        defaults={{ customerName: "", review: "", rating: 5, destination: "", tripType: "", date: "", order: 0 }}
      />
    </div>
  );
}
