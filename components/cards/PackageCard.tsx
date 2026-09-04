"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Package } from "@/lib/cms/types";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { formatPrice } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <div className="group bg-brand-offwhite border border-brand-sand/30 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-brand-deep hover:shadow-luxury hover:-translate-y-1">
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
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-brand-cream/95 text-brand-deep rounded-xs border border-brand-sand/40 flex items-center gap-1 shadow-xs">
              <MapPin className="w-3 h-3 text-brand-sand" />
              {pkg.destination}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-20">
            <span className="text-[10px] uppercase tracking-widest font-mono font-medium px-2 py-0.5 bg-brand-espresso/90 text-brand-cream rounded-xs border border-brand-sand/30 flex items-center gap-1">
              <Clock className="w-3 h-3 text-brand-sand" />
              {pkg.duration}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-medium text-brand-taupe uppercase tracking-wider">
            <span>{pkg.travelStyle}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-deep tracking-tight group-hover:text-brand-warm transition-colors">
            <Link href={`/packages/${pkg.slug}`}>
              {pkg.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-brand-charcoal/80 line-clamp-2 leading-relaxed">
            {pkg.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-brand-sand/15">
            {pkg.inclusions.slice(0, 2).map((inc, i) => (
              <span
                key={i}
                className="text-[10px] text-brand-taupe bg-brand-cream/50 px-2 py-0.5 rounded-xs"
              >
                ✓ {inc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & CTA Footer */}
      <div className="p-5 sm:p-6 pt-0 border-t border-brand-sand/15 flex items-center justify-between mt-2">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-brand-taupe">
            Starting from
          </span>
          <span className="font-editorial text-2xl font-bold text-brand-deep">
            {formatPrice(pkg.price)}
          </span>
          <span className="text-[10px] text-brand-taupe font-sans ml-1">/ person</span>
        </div>

        <Link
          href={`/packages/${pkg.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-deep group-hover:text-brand-warm py-2 px-3 rounded-sm bg-brand-cream/70 hover:bg-brand-sand/30 border border-brand-sand/40 transition-colors"
        >
          <span>View Journey</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
