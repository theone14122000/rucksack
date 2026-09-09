import React from "react";
import { Star, ShieldCheck, MapPin, Compass, Award, Headset } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const stats = [
    {
      icon: <Award className="w-5 h-5 text-brand-sand" />,
      number: "8+ Years",
      label: "Of Mountain Heritage",
      caption: "Operating from Kasumpti, Shimla since 2018",
    },
    {
      icon: <Star className="w-5 h-5 text-brand-sand fill-brand-sand/30" />,
      number: "4.6 / 5.0",
      label: "Verified Traveler Rating",
      caption: "From 242+ independent reviews",
    },
    {
      icon: <Compass className="w-5 h-5 text-brand-sand" />,
      number: "3,800+",
      label: "Journeys Curated",
      caption: "Across Himalayas & global destinations",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-sand" />,
      number: "100% Local",
      label: "Himachal Chauffeurs & Guides",
      caption: "Vetted mountain-route specialists",
    },
    {
      icon: <Headset className="w-5 h-5 text-brand-sand" />,
      number: "24/7",
      label: "Service",
      caption: "Always-on travel concierge",
    },
  ];

  return (
    <section className="bg-brand-cream/40 border-y border-brand-sand/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-brand-sand/20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start pt-6 sm:pt-0 ${
                idx !== 0 ? "sm:pl-8 lg:pl-10" : ""
              }`}
            >
              <div className="mb-3 p-2 rounded-xs bg-brand-offwhite border border-brand-sand/30 shadow-2xs">
                {stat.icon}
              </div>
              <span className="font-editorial text-3xl sm:text-4xl font-bold text-brand-deep tracking-tight">
                {stat.number}
              </span>
              <span className="text-xs uppercase tracking-widest text-brand-charcoal font-semibold mt-1">
                {stat.label}
              </span>
              <p className="text-xs text-brand-taupe mt-1 leading-relaxed">
                {stat.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
