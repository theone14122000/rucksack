import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | Rucksack Adventures",
  description:
    "Read the terms and conditions governing bookings, cancellations, and travel services provided by Rucksack Adventures.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-offwhite">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

        <div className="py-12 border-b border-brand-sand/30 mb-12">
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-brand-deep tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xs text-brand-taupe">
            Last updated: September 2026
          </p>
        </div>

        <div className="prose-brand space-y-8 text-sm text-brand-charcoal/85 leading-relaxed">
          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              1. Booking & Payment
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>A booking is confirmed only upon receipt of the advance payment and written confirmation from Rucksack Adventures.</li>
              <li>Advance payment of 30% of the total trip cost is required at the time of booking.</li>
              <li>Full payment must be received at least 7 days before the travel date.</li>
              <li>Payment can be made via bank transfer, UPI, or other approved methods.</li>
              <li>All prices are in Indian Rupees (INR) unless otherwise stated.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              2. Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>30+ days before travel:</strong> Full refund minus ₹2,000 processing fee.</li>
              <li><strong>15–29 days before travel:</strong> 50% of the total trip cost.</li>
              <li><strong>7–14 days before travel:</strong> 25% of the total trip cost.</li>
              <li><strong>Less than 7 days:</strong> No refund.</li>
              <li>No-show: No refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              3. Changes & Rescheduling
            </h2>
            <p>
              We understand that plans change. Date changes are subject to availability and may
              incur additional costs. We will communicate any price differences before confirming
              the change. Changes requested within 7 days of the original travel date are treated
              as cancellations and re-bookings.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              4. Travel Insurance
            </h2>
            <p>
              We strongly recommend comprehensive travel insurance covering trip cancellation,
              medical emergencies, altitude sickness, evacuation, and adventure activity
              coverage. Rucksack Adventures is not liable for losses not covered by insurance.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              5. Health & Fitness
            </h2>
            <p>
              Certain treks and activities require a minimum level of physical fitness. It is
              your responsibility to disclose any medical conditions at the time of booking. We
              reserve the right to refuse or modify activities if a participant&apos;s health or
              fitness poses a safety risk.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              6. Itinerary Changes
            </h2>
            <p>
              We reserve the right to modify itineraries due to weather conditions, road closures,
              natural disasters, government regulations, or safety concerns. Alternative arrangements
              of comparable quality will be provided where possible. No refund is applicable for
              itinerary changes caused by force majeure.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              7. Liability
            </h2>
            <p>
              Rucksack Adventures acts as a facilitator for travel services including transport,
              accommodation, and guided activities. While we partner with verified providers, we
              are not liable for the acts, omissions, or services of third-party suppliers. Our
              total liability shall not exceed the total trip cost paid by the traveller.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              8. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of courts in Shimla, Himachal Pradesh.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              9. Contact
            </h2>
            <p>
              For questions regarding these terms:
            </p>
            <p className="mt-2">
              <strong className="text-brand-deep">Rucksack Adventures</strong><br />
              Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti, Shimla, Himachal Pradesh 171009<br />
              Email: info@rucksackadventures.com<br />
              Phone: 7018678064
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
