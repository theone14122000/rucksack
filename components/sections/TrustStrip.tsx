"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Star, ShieldCheck, MapPin, Compass, Award, Headset } from "lucide-react";

const AnimatedNumber: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span
      ref={ref}
      className={`font-editorial text-3xl sm:text-4xl font-bold text-brand-black tracking-tight transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </span>
  );
};

export const TrustStrip: React.FC = () => {
  const stats = [
    {
      icon: <Award className="w-5 h-5 text-brand-terracotta" />,
      number: "8+ Years",
      label: "Of Mountain Heritage",
      caption: "Operating from Kasumpti, Shimla since 2018",
    },
    {
      icon: <Star className="w-5 h-5 text-brand-gold fill-brand-gold/20" />,
      number: "4.6 / 5.0",
      label: "Verified Traveler Rating",
      caption: "From 242+ independent reviews",
    },
    {
      icon: <Compass className="w-5 h-5 text-brand-sage" />,
      number: "3,800+",
      label: "Journeys Curated",
      caption: "Across Himalayas & global destinations",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-sage" />,
      number: "100% Local",
      label: "Himachal Chauffeurs & Guides",
      caption: "Vetted mountain-route specialists",
    },
    {
      icon: <Headset className="w-5 h-5 text-brand-terracotta" />,
      number: "24/7",
      label: "Service",
      caption: "Always-on travel concierge",
    },
  ];

  return (
    <section className="bg-brand-cream border-y border-brand-brown/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-brand-brown/10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start pt-6 sm:pt-0 ${
                idx !== 0 ? "sm:pl-8 lg:pl-10" : ""
              }`}
            >
              <div className="mb-3 p-2 rounded-xs bg-brand-gold/8 border border-brand-gold/15">
                {stat.icon}
              </div>
              <AnimatedNumber>{stat.number}</AnimatedNumber>
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
