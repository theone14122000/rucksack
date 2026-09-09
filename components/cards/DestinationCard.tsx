"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Compass } from "lucide-react";
import { Destination } from "@/lib/cms/types";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block bg-brand-cream border border-brand-brown/10 rounded-card overflow-hidden transition-all duration-500 hover:border-brand-brown hover:shadow-luxury hover:-translate-y-1"
    >
      {/* Visual Placeholder / Image */}
      <div className="relative overflow-hidden">
        <ImagePlaceholder
          src={destination.heroImage}
          alt={destination.name}
          aspectRatio="4:3"
          category={destination.isDomestic ? "Himalayan India" : "Global Escapes"}
          label={destination.name}
        />
        <div className="absolute top-3 right-3 z-20">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-brand-brown/90 text-brand-cream rounded-xs backdrop-blur-xs">
            {destination.packagesCount} Curated Tours
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-brown flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {destination.region}
          </span>
          <span className="w-7 h-7 rounded-full bg-brand-brown/5 border border-brand-brown/15 flex items-center justify-center text-brand-brown group-hover:bg-brand-brown group-hover:text-brand-cream transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <h3 className="font-editorial text-2xl font-bold text-brand-black tracking-tight group-hover:text-brand-brown transition-colors">
          {destination.name}
        </h3>

        <p className="text-xs sm:text-sm text-brand-charcoal/80 line-clamp-2 leading-relaxed">
          {destination.shortDescription}
        </p>

        {/* Highlights Pills */}
        <div className="pt-2 flex flex-wrap gap-1.5 border-t border-brand-brown/10">
          {destination.highlights.slice(0, 3).map((hl, i) => (
            <span
              key={i}
              className="text-[10px] text-brand-taupe bg-brand-brown/5 px-2 py-0.5 rounded-xs tracking-wider"
            >
              {hl}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
