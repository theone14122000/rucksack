import React from "react";
import { Metadata } from "next";
import {
  Train,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Ticket,
  Clock,
  Compass,
} from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

export const metadata: Metadata = {
  title: "Railway & Toy Train Booking | Rucksack Adventures",
  description:
    "Book train tickets and the iconic Kalka-Shimla Toy Train with Rucksack Adventures. IRCTC assistance, seat selection, and scenic rail journeys across Himachal Pradesh.",
};

const trainRoutes = [
  {
    name: "Kalka–Shimla Toy Train",
    type: "Heritage",
    duration: "5–6 hrs",
    highlights: "UNESCO World Heritage route through 102 tunnels and 864 bridges",
  },
  {
    name: "New Delhi–Shimla (Kalka Mail)",
    type: "Express",
    duration: "8–10 hrs",
    highlights: "Overnight train to Kalka, connect to Toy Train or taxi to Shimla",
  },
  {
    name: "Chandigarh–Kalka",
    type: "Local",
    duration: "1.5 hrs",
    highlights: "Frequent local service, connects to Toy Train for onward journey",
  },
  {
    name: "Delhi–Kalka (Shatabdi/Vande Bharat)",
    type: "Premium",
    duration: "4–5 hrs",
    highlights: "Fastest rail option to the Toy Train gateway",
  },
];

const services = [
  {
    icon: Ticket,
    title: "IRCTC Ticket Booking",
    description: "We handle online reservations, waitlist management, and tatkal bookings on your behalf.",
  },
  {
    icon: Compass,
    title: "Toy Train Packages",
    description: "Curated Toy Train experiences including coach selection (First Class, AC Chair Car, or Heritage Vistadome).",
  },
  {
    icon: Clock,
    title: "Schedule Alerts",
    description: "Real-time updates on train status, platform changes, and delay notifications.",
  },
  {
    icon: MapPin,
    title: "Station Transfers",
    description: "Seamless pickup and drop at Kalka, Shimla, Chandigarh, and Delhi stations.",
  },
];

export default function RailwayBookingPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Services", href: "#" },
            { label: "Railway Booking" },
          ]}
        />

        <div className="py-12 border-b border-brand-brown/30 mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown block mb-2">
            Rail Travel
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-black tracking-tight mb-4">
            Railway & Toy Train Booking
          </h1>
          <p className="text-sm sm:text-base text-brand-charcoal/80 max-w-3xl leading-relaxed">
            Experience one of the world&apos;s most scenic rail journeys. The UNESCO-listed
            Kalka–Shimla Toy Train climbs 7,000 feet through pine forests, tea gardens,
            and mist-wrapped valleys. We handle everything from IRCTC bookings to
            station transfers.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((feat) => (
            <div
              key={feat.title}
              className="bg-brand-cream/30 border border-brand-brown/30 rounded-sm p-6 hover:border-brand-black hover:shadow-luxury transition-all duration-300"
            >
              <feat.icon className="w-6 h-6 text-brand-brown mb-3" />
              <h3 className="font-editorial text-lg font-bold text-brand-black mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Train Routes */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-brown">
              Scenic Routes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-black mt-2">
              Rail Journeys to the Hills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainRoutes.map((route) => (
              <div
                key={route.name}
                className="bg-brand-cream/30 border border-brand-brown/30 rounded-sm p-7 hover:border-brand-black hover:shadow-luxury transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-editorial text-lg font-bold text-brand-black">
                    {route.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-brown bg-brand-black px-2 py-0.5 rounded-xs">
                    {route.type}
                  </span>
                </div>
                <p className="text-[11px] text-brand-taupe uppercase tracking-wider mb-2">
                  Duration: {route.duration}
                </p>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                  {route.highlights}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Toy Train Note */}
        <div className="bg-brand-cream/60 border border-brand-brown/40 rounded-sm p-6 mb-16 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-brand-brown shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-black mb-1">
              Toy Train Advisory
            </p>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              The Kalka–Shimla Toy Train has limited seats, especially in First Class and Vistadome
              coaches. We recommend booking at least 2–3 weeks in advance during peak season
              (April–June, October–November). Monsoon season (July–September) may see schedule
              disruptions due to landslides.
            </p>
          </div>
        </div>

        {/* Enquiry */}
        <div className="max-w-4xl mx-auto py-12 border-t border-brand-brown/30">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-brown">
              Book Your Journey
            </span>
            <h2 className="font-editorial text-3xl font-bold text-brand-black mt-2">
              Request Railway Booking Assistance
            </h2>
          </div>
          <div className="bg-brand-cream/40 border border-brand-brown/40 p-6 sm:p-10 rounded-sm shadow-luxury">
            <EnquiryForm defaultTravelType="Other" />
          </div>
        </div>
      </div>
    </div>
  );
}
