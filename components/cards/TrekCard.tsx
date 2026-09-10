"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";
import { Trek } from "@/lib/cms/types";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

interface TrekCardProps {
  trek: Trek;
}

const WHATSAPP_NUMBER = "917018678064";

export const TrekCard: React.FC<TrekCardProps> = ({ trek }) => {
  const difficultyColors = {
    Easy: "bg-emerald-950/80 text-emerald-300 border-emerald-700/50",
    Moderate: "bg-amber-950/80 text-amber-300 border-amber-700/50",
    Challenging: "bg-orange-950/80 text-orange-300 border-orange-700/50",
    Difficult: "bg-rose-950/80 text-rose-300 border-rose-700/50",
  }[trek.difficulty];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Rucksack Adventures! I'm interested in the "${trek.name}" trek. Please share the pricing and batch dates.`
  )}`;

  return (
    <div className="group bg-brand-black border border-white/10 rounded-card overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-brand-sand hover:shadow-2xl hover:-translate-y-1.5 text-brand-cream card-3d">
      <div>
        {/* Mountain Image Slot */}
        <div className="relative overflow-hidden">
          <ImagePlaceholder
            src={trek.heroImage}
            alt={trek.name}
            aspectRatio="16:9"
            category="Himalayan Ascent"
            label={trek.name}
            elevation={trek.altitude}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 left-3 z-20 flex gap-2">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs border backdrop-blur-xs flex items-center gap-1 ${difficultyColors}`}
            >
              {trek.difficulty}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-brand-sand tracking-wider">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-sand" />
              {trek.altitude}
            </span>
            <span className="flex items-center gap-1 text-brand-cream/60">
              <Clock className="w-3.5 h-3.5" />
              {trek.duration}
            </span>
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-cream tracking-tight group-hover:text-brand-sand transition-colors">
            <Link href={`/treks/${trek.slug}`}>
              {trek.name}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-brand-cream/60 line-clamp-2 leading-relaxed">
            {trek.shortDescription}
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-brand-cream/50">
            <span>Region: <strong className="text-brand-cream/80">{trek.region}</strong></span>
            <span>Season: <strong className="text-brand-sand">{trek.bestSeason.split("&")[0]}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-5 sm:p-6 pt-0 border-t border-white/10 mt-2 flex items-center justify-between">
        <Link
          href={`/treks/${trek.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-sand group-hover:text-brand-cream transition-colors py-1.5 px-3 rounded-xs border border-brand-sand/30 hover:border-brand-sand hover:bg-brand-sand/10"
        >
          <span>Discover Trek</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#25D366] hover:text-[#1EBE5D] py-1.5 px-3 rounded-xs border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Ask for Details</span>
        </a>
      </div>
    </div>
  );
};
