import React from "react";
import { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getFAQs } from "@/lib/cms/store";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Rucksack Adventures",
  description:
    "Find answers to common questions about treks, packages, bookings, cancellations, and travel with Rucksack Adventures.",
};

export const revalidate = 0;

const categories = [
  { key: "general", label: "General" },
  { key: "booking", label: "Booking & Payments" },
  { key: "treks", label: "Treks & Adventure" },
  { key: "cabs", label: "Taxi & Transport" },
  { key: "cancellation", label: "Cancellation & Refunds" },
];

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="pt-24 pb-20 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "FAQ" }]} />

        <div className="py-12 border-b border-brand-sand/30 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand block mb-2">
            Support
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-deep tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-brand-charcoal/80 max-w-2xl leading-relaxed">
            Everything you need to know before you travel. If your question isn&apos;t listed here,
            reach out — we&apos;re always happy to help.
          </p>
        </div>

        {categories.map((cat) => {
          const catFaqs = faqs.filter((f) => f.category === cat.key);
          if (catFaqs.length === 0) return null;

          return (
            <div key={cat.key} className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-5 h-5 text-brand-sand" />
                <h2 className="font-editorial text-xl font-bold text-brand-deep">
                  {cat.label}
                </h2>
              </div>

              <FAQAccordion faqs={catFaqs} title={undefined} subtitle={undefined} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
