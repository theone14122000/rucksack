"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Package } from "@/lib/cms/types";
import { getPackageImage } from "@/lib/utils/images";

interface PackageCardProps {
  pkg: Package;
}

const WHATSAPP_NUMBER = "917018678064";

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Rucksack Adventures! I'm interested in the "${pkg.title}" adventure. Please share the details and itinerary.`)}`;

  return (
    <div className="group bg-white rounded-card-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-luxury-hover hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/12">
      <div>
        <div className="relative overflow-hidden aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getPackageImage(pkg.slug)}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-brand-dark/10 to-transparent" />
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-white/95 text-brand-dark rounded-full flex items-center gap-1 shadow-soft backdrop-blur-sm">
              <MapPin className="w-3 h-3 text-brand-turquoise" />{pkg.destination}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-20">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-brand-dark/70 text-brand-yellow rounded-full flex items-center gap-1 backdrop-blur-sm">
              <Clock className="w-3 h-3" />{pkg.duration}
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            <span className="text-brand-turquoise">{pkg.travelStyle}</span>
            <div className="flex-1 h-px bg-brand-turquoise/10" />
          </div>
          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-dark tracking-tight group-hover:text-brand-turquoise transition-colors">
            <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-brand-dark/55 line-clamp-2 leading-relaxed mt-2">{pkg.shortDescription}</p>
          <div className="pt-3 mt-3 border-t border-brand-turquoise/5 flex flex-wrap gap-1.5">
            {pkg.inclusions.slice(0, 2).map((inc, i) => (
              <span key={i} className="text-[10px] text-brand-taupe bg-brand-cream px-2.5 py-1 rounded-full">&check; {inc}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex items-center justify-between">
        <Link href={`/packages/${pkg.slug}`} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-turquoise group-hover:text-brand-turquoise-light transition-colors">
          View Adventure <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#25D366] hover:text-[#1EBE5D] py-2 px-3 rounded-full bg-[#25D366]/8 hover:bg-[#25D366]/15 border border-[#25D366]/20 transition-all duration-300">
          <MessageCircle className="w-3.5 h-3.5" /><span>Ask for Details</span>
        </a>
      </div>
    </div>
  );
};
