import React from "react";
import { Metadata } from "next";
import {
  Mountain,
  Heart,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

export const metadata: Metadata = {
  title: "Amarnath Yatra 2026 | Helicopter & Trekking Tours | Rucksack Adventures",
  description:
    "Book your Amarnath Yatra with Rucksack Adventures. Helicopter services, trekking routes via Baltal & Pahalgam, full medical support, and end-to-end arrangements from Srinagar.",
};

const routes = [
  {
    name: "Baltal Route (Trek)",
    duration: "1–2 Days",
    distance: "14 km one way",
    difficulty: "Moderate to Challenging",
    description:
      "The shortest trekking route to the Amarnath cave. Steep ascent through beautiful valley. Helicopter option available for the return journey.",
  },
  {
    name: "Pahalgam Route (Traditional)",
    duration: "3–4 Days",
    distance: "36 km one way",
    difficulty: "Challenging",
    description:
      "The traditional and scenic pilgrimage route. Passes through Lidder Valley, Sheshnag Lake, and Panchtarni. Recommended for those who want the full spiritual experience.",
  },
  {
    name: "Helicopter Service",
    duration: "Same Day",
    distance: "N/A",
    difficulty: "Easy",
    description:
      "Fly from Baltal or Pahalgam helipad directly to the cave shrine. Ideal for elderly pilgrims and those with time constraints. Includes darshan assistance.",
  },
];

const inclusions = [
  "Srinagar airport/station pickup & drop",
  "Hotel/camp accommodation at base camp",
  "Yatra registration & permits",
  "Helicopter tickets (if applicable)",
  "Medical kit & first-aid support",
  "Experienced trek guide & porters",
  "All meals during the trek",
  "Emergency communication equipment",
];

const requirements = [
  "Compulsory Yatra registration through official portal",
  "Valid government-issued photo ID",
  "Medical fitness certificate (required for all routes)",
  "Travel insurance recommended",
  "Warm clothing layers, trekking shoes, rain gear",
  "Minimum age: 13 years (with medical certificate)",
];

export default function AmarnathYatraPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Services", href: "#" },
            { label: "Amarnath Yatra" },
          ]}
        />

        <div className="py-12 border-b border-brand-sand/30 mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand block mb-2">
            Sacred Journey
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-deep tracking-tight mb-4">
            Amarnath Yatra 2026
          </h1>
          <p className="text-sm sm:text-base text-brand-charcoal/80 max-w-3xl leading-relaxed">
            Undertake one of India&apos;s most revered pilgrimages with the assurance of
            safety, comfort, and expert guidance. We handle registration, transport,
            accommodation, medical support, and every logistical detail — so you can
            focus entirely on the spiritual experience.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-brand-cream/60 border border-brand-sand/40 rounded-sm p-6 mb-16 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-brand-warm shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-deep mb-1">
              Important: Registration Required
            </p>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              All pilgrims must register through the official Shri Amarnathji Shrine Board (SASB)
              portal before undertaking the yatra. We assist with the complete registration process
              and ensure all documentation is in order.
            </p>
          </div>
        </div>

        {/* Routes */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-sand">
              Choose Your Path
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-deep mt-2">
              Three Ways to the Cave
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div
                key={route.name}
                className="bg-brand-cream/30 border border-brand-sand/30 rounded-sm p-7 hover:border-brand-deep hover:shadow-luxury transition-all duration-300"
              >
                <h3 className="font-editorial text-xl font-bold text-brand-deep mb-3">
                  {route.name}
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-taupe">Duration</p>
                    <p className="text-xs font-semibold text-brand-deep">{route.duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-taupe">Distance</p>
                    <p className="text-xs font-semibold text-brand-deep">{route.distance}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-taupe">Difficulty</p>
                    <p className="text-xs font-semibold text-brand-deep">{route.difficulty}</p>
                  </div>
                </div>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                  {route.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 py-12 border-t border-brand-sand/30">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-brand-deep mb-6">
              What&apos;s Included
            </h2>
            <div className="space-y-3">
              {inclusions.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-sand shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-bold text-brand-deep mb-6">
              Requirements
            </h2>
            <div className="space-y-3">
              {requirements.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-brand-warm shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiry */}
        <div className="max-w-4xl mx-auto py-12 border-t border-brand-sand/30">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-sand">
              Book Your Yatra
            </span>
            <h2 className="font-editorial text-3xl font-bold text-brand-deep mt-2">
              Start Your Sacred Journey
            </h2>
          </div>
          <div className="bg-brand-cream/40 border border-brand-sand/40 p-6 sm:p-10 rounded-sm shadow-luxury">
            <EnquiryForm defaultTravelType="Amarnath" />
          </div>
        </div>
      </div>
    </div>
  );
}
