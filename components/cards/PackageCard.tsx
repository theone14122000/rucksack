"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";
import { Package } from "@/lib/cms/types";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

interface PackageCardProps {
  pkg: Package;
}

const WHATSAPP_NUMBER = "917018678064";

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Rucksack Adventures! I'm interested in the "${pkg.title}" package. Please share the pricing and itinerary details.`
  )}`;

  return (
    <div className="group bg-brand-cream border border-brand-brown/10 rounded-card overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-brand-brown hover:shadow-luxury hover:-translate-y-1 card-3d">
      <div>
        {/* Visual Slot */}
        <div className="relative overflow-hidden">
          <ImagePlaceholder
            src={pkg.heroImage}
            alt={pkg.title}
            aspectRatio="16:9"
            category={pkg.travelStyle}
            label={pkg.destination}
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-brand-cream/95 text-brand-black rounded-xs flex items-center gap-1 shadow-xs backdrop-blur-xs">
              <MapPin className="w-3 h-3 text-brand-brown" />
              {pkg.destination}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-20">
            <span className="text-[10px] uppercase tracking-widest font-mono font-medium px-2 py-0.5 bg-brand-black/85 text-brand-cream rounded-xs flex items-center gap-1">
              <Clock className="w-3 h-3 text-brand-brown" />
              {pkg.duration}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-medium text-brand-taupe uppercase tracking-wider">
            <span className="text-brand-sage">{pkg.travelStyle}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-black tracking-tight group-hover:text-brand-brown transition-colors">
            <Link href={`/packages/${pkg.slug}`}>
              {pkg.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-brand-charcoal/80 line-clamp-2 leading-relaxed">
            {pkg.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-brand-brown/10">
            {pkg.inclusions.slice(0, 2).map((inc, i) => (
              <span
                key={i}
                className="text-[10px] text-brand-taupe bg-brand-sage/8 px-2 py-0.5 rounded-xs"
              >
                &check; {inc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer — No Prices */}
      <div className="p-5 sm:p-6 pt-0 border-t border-brand-brown/10 flex items-center justify-between mt-2">
        <Link
          href={`/packages/${pkg.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-brown group-hover:text-brand-brown-dark transition-colors"
        >
          <span>View Journey</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#25D366] hover:text-[#1EBE5D] py-2 px-3 rounded-sm bg-[#25D366]/8 hover:bg-[#25D366]/15 border border-[#25D366]/20 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Ask for Details</span>
        </a>
      </div>
    </div>
  );
};
