import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { SimpleCollection } from "@/components/admin/SimpleCollection";
import { getFAQs } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await getFAQs(undefined, { status: "all" });
  const items = faqs.map((f) => ({ ...f }));

  return (
    <div>
      <PageHeader title="FAQs" subtitle="Questions shown on /faq and the homepage FAQ section." />
      <SimpleCollection
        type="faq"
        singular="FAQ"
        items={items}
        columns={[
          { key: "question", label: "Question", primary: true },
          { key: "category", label: "Category" },
          { key: "status", label: "Status" },
        ]}
        fields={[
          { key: "question", label: "Question", type: "text", required: true },
          { key: "answer", label: "Answer", type: "textarea", required: true },
          {
            key: "category",
            label: "Category",
            type: "select",
            options: [
              { value: "general", label: "General" },
              { value: "booking", label: "Booking" },
              { value: "treks", label: "Treks" },
              { value: "cabs", label: "Cabs" },
              { value: "cancellation", label: "Cancellation" },
            ],
          },
          { key: "order", label: "Sort order", type: "number", min: 0 },
        ]}
        defaults={{ question: "", answer: "", category: "general", order: 0 }}
      />
    </div>
  );
}
