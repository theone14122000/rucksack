import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Rucksack Adventures",
  description:
    "Read the privacy policy of Rucksack Adventures. Understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-offwhite">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="py-12 border-b border-brand-sand/30 mb-12">
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-brand-deep tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-brand-taupe">
            Last updated: September 2026
          </p>
        </div>

        <div className="prose-brand space-y-8 text-sm text-brand-charcoal/85 leading-relaxed">
          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you submit an enquiry, make a booking, or contact us, we may collect:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full name, phone number, and email address</li>
              <li>Travel preferences, destination, dates, and group size</li>
              <li>Payment information (processed through secure third-party gateways)</li>
              <li>Communication records (emails, WhatsApp messages, call notes)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Process and confirm your travel bookings</li>
              <li>Communicate itinerary details, updates, and travel advisories</li>
              <li>Provide customer support during and after your trip</li>
              <li>Improve our services and personalise future recommendations</li>
              <li>Send promotional communications (only with your explicit consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              3. Data Protection
            </h2>
            <p>
              We implement appropriate security measures to protect your personal data against
              unauthorised access, alteration, disclosure, or destruction. Your information is
              stored on secure servers and is accessible only to authorised team members who
              need it to provide our services.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              4. Third-Party Sharing
            </h2>
            <p>
              We may share your information with trusted third parties only as necessary to
              fulfil your booking — including hotels, transport providers, tour guides, and
              activity operators. These parties are contractually obligated to protect your data
              and use it solely for the purpose of delivering the booked service.
            </p>
            <p className="mt-2">
              We do not sell, rent, or trade your personal information to any third party for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              5. Cookies & Tracking
            </h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your
              browsing experience, analyse site traffic, and understand user behaviour. You can
              control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain your personal information only for as long as necessary to fulfil the
              purposes for which it was collected, or as required by applicable law. Booking
              records are retained for a minimum of 5 years for accounting and legal compliance.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl font-bold text-brand-deep mb-3">
              8. Contact
            </h2>
            <p>
              For any questions about this privacy policy or your personal data, contact us at:
            </p>
            <p className="mt-2">
              <strong className="text-brand-deep">Rucksack Adventures</strong><br />
              Near Mehli Chowk, Shimla, Himachal Pradesh — 171013<br />
              Email: info@rucksackadventures.com<br />
              Phone: +91 98765 43210
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
