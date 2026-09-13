import React from "react";
import { Metadata } from "next";
import {
  Car,
  MapPin,
  Clock,
  Shield,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

export const metadata: Metadata = {
  title: "Shimla Cab Services | Rucksack Adventures",
  description:
    "Reliable cab services in Shimla, Manali, and across Himachal Pradesh. Local sightseeing, airport transfers, and outstation trips with verified drivers.",
};

const routes = [
  { from: "Shimla", to: "Manali", duration: "7–8 hrs", distance: "250 km" },
  { from: "Shimla", to: "Kufri", duration: "45 min", distance: "16 km" },
  { from: "Shimla", to: "Chitkul", duration: "8–9 hrs", distance: "230 km" },
  { from: "Shimla", to: "Spiti (Kaza)", duration: "2 days", distance: "420 km" },
  { from: "Chandigarh", to: "Shimla", duration: "3.5 hrs", distance: "113 km" },
  { from: "Delhi", to: "Shimla", duration: "7–8 hrs", distance: "350 km" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Drivers",
    description: "Every driver is background-checked, licensed, and trained for mountain roads.",
  },
  {
    icon: Car,
    title: "Premium Fleet",
    description: "Innova Crysta, Ertiga, Swift Dzire, Tempo Travellers — well-maintained and insured.",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    description: "We track your schedule. Airport pickups, station drops, and highway transfers — always on time.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description: "Our drivers know every shortcut, viewpoint, and chai stop across the Himalayas.",
  },
];

export default function TaxiServicesPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Services", href: "#" },
            { label: "Cab Services" },
          ]}
        />

        <div className="py-12 border-b border-brand-turquoise/30 mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise block mb-2">
            Transport
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Shimla Cab Services
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/80 max-w-3xl leading-relaxed">
            Navigate the mountains with confidence. Our fleet of verified vehicles and
            experienced local drivers make every road trip safe, comfortable, and
            scenic — from local sightseeing to long-distance outstation travel.
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

        {/* Popular Routes */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise">
              Popular Routes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-dark mt-2">
              Where We Take You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className="bg-brand-cream/40 border border-brand-turquoise/30 rounded-card p-5 flex items-center justify-between hover:border-brand-dark transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    {route.from} → {route.to}
                  </p>
                  <p className="text-[11px] text-brand-taupe mt-0.5">
                    {route.distance} · {route.duration}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-turquoise" />
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry */}
        <div className="max-w-4xl mx-auto py-12 border-t border-brand-turquoise/30">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise">
              Book a Cab
            </span>
            <h2 className="font-editorial text-3xl font-bold text-brand-dark mt-2">
              Request a Quote
            </h2>
          </div>
          <div className="bg-brand-cream/40 border border-brand-turquoise/40 p-6 sm:p-10 rounded-card shadow-luxury">
            <EnquiryForm defaultTravelType="Cab" />
          </div>
        </div>
      </div>
    </div>
  );
}
