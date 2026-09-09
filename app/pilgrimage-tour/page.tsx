import React from "react";
import { Metadata } from "next";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

export const metadata: Metadata = {
  title: "Pilgrimage Tour Packages | Char Dham, Temples & Sacred Circuits",
  description:
    "Book your Pilgrimage Tour with Rucksack Adventures. Helicopter services, Char Dham circuits, temple tours, full medical support, and end-to-end arrangements from Kasumpti, Shimla.",
};

const circuits = [
  {
    name: "Char Dham Circuit",
    duration: "9–11 Days",
    difficulty: "Moderate to Challenging",
    description:
      "The sacred Uttarakhand circuit of Yamunotri, Gangotri, Kedarnath, and Badrinath. Helicopter options available for Kedarnath. Complete registration, medical, and stay support included.",
  },
  {
    name: "Vaishno Devi & Kashmir Temples",
    duration: "3–4 Days",
    difficulty: "Easy to Moderate",
    description:
      "Trek to the holy Vaishno Devi shrine at Katra with helicopter and ropeway options, combined with Srinagar temple heritage trails. Ideal for families and senior citizens.",
  },
  {
    name: "Monastic & Temple Trails",
    duration: "5–7 Days",
    difficulty: "Easy",
    description:
      "Buddhist monastic circuits across Ladakh and Spiti, Varanasi and Rishikesh Ganga Aarti experiences, and Himalayan temple towns — peaceful journeys with VIP access where available.",
  },
];

const inclusions = [
  "Nearest airport / station pickup & drop",
  "Hotel / camp accommodation at base locations",
  "Yatra registration & permits assistance",
  "Helicopter tickets (if applicable)",
  "Medical kit & first-aid support",
  "Experienced tour escort & porters",
  "All meals during the circuit",
  "Emergency communication equipment",
];

const requirements = [
  "Compulsory yatra registration through official portals where applicable",
  "Valid government-issued photo ID",
  "Medical fitness certificate (required for high-altitude circuits)",
  "Travel insurance recommended",
  "Warm clothing layers, trekking shoes, rain gear",
  "Minimum age as per respective shrine board guidelines",
];

export default function PilgrimageTourPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Services", href: "#" },
            { label: "Pilgrimage Tour" },
          ]}
        />

        <div className="py-12 border-b border-brand-brown/30 mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown block mb-2">
            Sacred Journey
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-black tracking-tight mb-4">
            Pilgrimage Tour Packages
          </h1>
          <p className="text-sm sm:text-base text-brand-charcoal/80 max-w-3xl leading-relaxed">
            Undertake India&apos;s most revered sacred journeys with the assurance of
            safety, comfort, and expert guidance. We handle registration, transport,
            accommodation, medical support, and every logistical detail — so you can
            focus entirely on the spiritual experience.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-brand-cream/60 border border-brand-brown/40 rounded-sm p-6 mb-16 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-brand-brown shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-black mb-1">
              Important: Registration Required
            </p>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              Most major pilgrimages require registration through official shrine board
              portals before undertaking the journey. We assist with the complete registration process
              and ensure all documentation is in order.
            </p>
          </div>
        </div>

        {/* Circuits */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-brown">
              Choose Your Path
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-black mt-2">
              Sacred Circuits We Operate
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {circuits.map((circuit) => (
              <div
                key={circuit.name}
                className="bg-brand-cream/30 border border-brand-brown/30 rounded-sm p-7 hover:border-brand-black hover:shadow-luxury transition-all duration-300"
              >
                <h3 className="font-editorial text-xl font-bold text-brand-black mb-3">
                  {circuit.name}
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-taupe">Duration</p>
                    <p className="text-xs font-semibold text-brand-black">{circuit.duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-taupe">Difficulty</p>
                    <p className="text-xs font-semibold text-brand-black">{circuit.difficulty}</p>
                  </div>
                </div>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                  {circuit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 py-12 border-t border-brand-brown/30">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-brand-black mb-6">
              What&apos;s Included
            </h2>
            <div className="space-y-3">
              {inclusions.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-brown shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-brand-black mb-6">
              Requirements
            </h2>
            <div className="space-y-3">
              {requirements.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-brand-brown shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiry */}
        <div className="max-w-4xl mx-auto py-12 border-t border-brand-brown/30">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-brown">
              Book Your Yatra
            </span>
            <h2 className="font-editorial text-3xl font-bold text-brand-black mt-2">
              Start Your Sacred Journey
            </h2>
          </div>
          <div className="bg-brand-cream/40 border border-brand-brown/40 p-6 sm:p-10 rounded-sm shadow-luxury">
            <EnquiryForm defaultTravelType="Pilgrimage" />
          </div>
        </div>
      </div>
    </div>
  );
}
