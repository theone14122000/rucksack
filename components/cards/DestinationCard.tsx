"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Destination } from "@/lib/cms/types";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block bg-white rounded-card-2xl overflow-hidden transition-all duration-500 hover:shadow-luxury-hover hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/12"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <ImagePlaceholder
          src={destination.heroImage}
          alt={destination.name}
          aspectRatio="4:3"
          category={destination.isDomestic ? "Himalayan India" : "Global Escapes"}
          label={destination.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 right-3 z-20">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-white/95 text-brand-dark rounded-full shadow-soft backdrop-blur-sm">
            {destination.packagesCount} Tours
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-turquoise flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />{destination.region}
          </span>
          <div className="w-8 h-8 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center text-brand-turquoise group-hover:bg-brand-turquoise group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
        <h3 className="font-editorial text-2xl font-bold text-brand-dark tracking-tight group-hover:text-brand-turquoise transition-colors">{destination.name}</h3>
        <p className="text-xs sm:text-sm text-brand-dark/55 line-clamp-2 leading-relaxed mt-2">{destination.shortDescription}</p>
        <div className="pt-3 mt-3 border-t border-brand-turquoise/5 flex flex-wrap gap-1.5">
          {destination.highlights.slice(0, 3).map((hl, i) => (
            <span key={i} className="text-[10px] text-brand-taupe bg-brand-cream px-2.5 py-1 rounded-full">{hl}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};
