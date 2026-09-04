import React from "react";
import { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Rucksack Adventures | Get in Touch",
  description:
    "Reach out to Rucksack Adventures for travel enquiries, bookings, and custom itineraries. Located in Mehli, Shimla. Call, email, or WhatsApp us.",
};

export const revalidate = 0;

const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@rucksackadventures.com",
    href: "mailto:info@rucksackadventures.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Near Mehli Chowk, Shimla, Himachal Pradesh — 171013",
    href: "https://maps.google.com/?q=Mehli+Shimla+Himachal+Pradesh",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "8:00 AM – 8:00 PM, All Days",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="py-12 border-b border-brand-sand/30 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand block mb-2">
            Get in Touch
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-deep tracking-tight mb-4">
            Let&apos;s Plan Your Journey
          </h1>
          <p className="text-sm sm:text-base text-brand-charcoal/80 max-w-2xl leading-relaxed">
            Whether it&apos;s a weekend trek in the Himalayas, a family holiday across India, or a
            custom international escape — we&apos;re here to make it effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactMethods.map((method) => (
              <div key={method.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand-cream border border-brand-sand/30 flex items-center justify-center shrink-0">
                  <method.icon className="w-4 h-4 text-brand-sand" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-taupe mb-0.5">
                    {method.label}
                  </p>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-brand-deep hover:text-brand-warm transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-sm text-brand-deep">{method.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-3">
            <div className="bg-brand-cream/40 border border-brand-sand/40 p-6 sm:p-10 rounded-sm shadow-luxury">
              <div className="mb-6">
                <h2 className="font-editorial text-2xl font-bold text-brand-deep">
                  Send Us an Enquiry
                </h2>
                <p className="text-xs text-brand-taupe mt-1">
                  Fill in the details below. We typically respond within 2 hours.
                </p>
              </div>
              <EnquiryForm defaultTravelType="Domestic" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
