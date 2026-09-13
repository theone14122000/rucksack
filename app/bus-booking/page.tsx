import React from "react";
import { Metadata } from "next";
import {
  Bus,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Wifi,
  Plug,
} from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

export const metadata: Metadata = {
  title: "Volvo & Bus Booking | Rucksack Adventures",
  description:
    "Book Volvo, semi-sleeper, and luxury buses to Shimla, Manali, and across Himachal Pradesh. Comfortable hill-station travel with Rucksack Adventures.",
};

const routes = [
  { from: "Delhi", to: "Shimla", operators: "HRTC Volvo, Himachal Tourist", duration: "8–9 hrs" },
  { from: "Delhi", to: "Manali", operators: "HRTC Volvo, Private Luxury", duration: "12–14 hrs" },
  { from: "Chandigarh", to: "Shimla", operators: "HRTC Ordinary & Volvo", duration: "3.5 hrs" },
  { from: "Chandigarh", to: "Manali", operators: "HRTC Volvo, Private AC", duration: "8–9 hrs" },
  { from: "Delhi", to: "Kullu", operators: "HRTC Volvo", duration: "12 hrs" },
  { from: "Shimla", to: "Manali", operators: "HRTC Local & Volvo", duration: "7–8 hrs" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Operators",
    description: "We partner only with HRTC and licensed private operators with proven safety records.",
  },
  {
    icon: Bus,
    title: "Multiple Classes",
    description: "Volvo AC, semi-sleeper, deluxe, and ordinary buses to match your comfort preference and budget.",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Live departure alerts, boarding point confirmation, and driver contact details before your trip.",
  },
  {
    icon: Plug,
    title: "Onboard Comfort",
    description: "Volvo buses include charging points, pushback seats, blankets, and WiFi on select services.",
  },
];

export default function BusBookingPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Services", href: "#" },
            { label: "Bus Booking" },
          ]}
        />

        <div className="py-12 border-b border-brand-turquoise/30 mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise block mb-2">
            Ground Transport
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Volvo & Bus Booking
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/80 max-w-3xl leading-relaxed">
            Travel to the Himalayas in comfort. We handle seat selection, boarding-point
            coordination, and last-minute rescheduling — so your journey starts smooth,
            even before you reach the mountains.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-brand-cream/30 border border-brand-turquoise/30 rounded-card p-6 hover:border-brand-dark hover:shadow-luxury transition-all duration-300"
            >
              <feat.icon className="w-6 h-6 text-brand-turquoise mb-3" />
              <h3 className="font-editorial text-lg font-bold text-brand-dark mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-brand-dark/80 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Routes */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise">
              Popular Routes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-dark mt-2">
              Highway Connections
            </h2>
          </div>

          <div className="bg-brand-cream/30 border border-brand-turquoise/30 rounded-card overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-brand-dark text-brand-cream text-[10px] font-semibold uppercase tracking-widest">
              <span>From</span>
              <span>To</span>
              <span className="hidden sm:block">Operators</span>
              <span>Duration</span>
            </div>
            {routes.map((route, i) => (
              <div
                key={`${route.from}-${route.to}`}
                className={`grid grid-cols-4 gap-4 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-brand-cream" : "bg-brand-cream/20"} hover:bg-brand-cream/50 transition-colors`}
              >
                <span className="font-semibold text-brand-dark">{route.from}</span>
                <span className="text-brand-dark">{route.to}</span>
                <span className="hidden sm:block text-xs text-brand-taupe">{route.operators}</span>
                <span className="text-xs text-brand-taupe">{route.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry */}
        <div className="max-w-4xl mx-auto py-12 border-t border-brand-turquoise/30">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise">
              Book Your Seat
            </span>
            <h2 className="font-editorial text-3xl font-bold text-brand-dark mt-2">
              Request Bus Booking Assistance
            </h2>
          </div>
          <div className="bg-brand-cream/40 border border-brand-turquoise/40 p-6 sm:p-10 rounded-card shadow-luxury">
            <EnquiryForm defaultTravelType="Other" />
          </div>
        </div>
      </div>
    </div>
  );
}
