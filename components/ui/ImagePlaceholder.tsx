"use client";

import React from "react";
import { Compass, Mountain, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  src?: string;
  alt?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "3:2" | "21:9";
  className?: string;
  category?: string;
  label?: string;
  elevation?: string;
  overlayGradient?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt = "Rucksack Adventures Visual",
  aspectRatio = "16:9",
  className,
  category,
  label,
  elevation,
  overlayGradient = true,
}) => {
  const ratioClasses = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
    "3:2": "aspect-[3/2]",
    "21:9": "aspect-[21/9]",
  }[aspectRatio];

  if (src && src.startsWith("http")) {
    return (
      <div className={cn("relative overflow-hidden group bg-brand-cream", ratioClasses, className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {overlayGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden group bg-gradient-to-br from-brand-turquoise via-brand-turquoise-light to-brand-turquoise border border-brand-turquoise/20 flex flex-col justify-between p-5 select-none transition-all duration-500",
        ratioClasses,
        className
      )}
    >
      {/* Topographic Vector Contour Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 text-brand-cream/30 pointer-events-none transition-transform duration-700 group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,150 C100,100 200,200 400,140 L400,300 L0,300 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <path
          d="M0,190 C120,140 240,240 400,180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M0,230 C80,180 280,270 400,220"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M0,100 C150,50 250,150 400,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <circle cx="340" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="340" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs tracking-widest uppercase font-medium text-brand-cream/80">
        <span className="flex items-center gap-1.5 bg-brand-cream/15 px-2.5 py-1 rounded-card border border-brand-cream/15 backdrop-blur-xs">
          <Mountain className="w-3.5 h-3.5 text-brand-gold/60" />
          {category || "Himalayan Sanctuary"}
        </span>
        {elevation && (
          <span className="text-[10px] bg-brand-cream/20 text-brand-cream px-2 py-0.5 rounded-card font-mono tracking-wider">
            {elevation}
          </span>
        )}
      </div>

      {/* Center Watermark Crest */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-4 text-center">
        <div className="w-12 h-12 rounded-full border border-brand-cream/30 bg-brand-cream/10 flex items-center justify-center text-brand-cream shadow-xs mb-2 group-hover:rotate-45 transition-transform duration-700">
          <Compass className="w-6 h-6 text-brand-gold/60" />
        </div>
        <p className="font-editorial text-lg tracking-wide text-brand-cream font-semibold">
          {label || "Rucksack Adventures"}
        </p>
        <span className="text-[11px] text-brand-cream/60 tracking-wider uppercase mt-0.5 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-brand-gold/60" /> Kasumpti, Shimla
        </span>
      </div>

      {/* Bottom Technical Coordinates */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-brand-cream/50 border-t border-brand-cream/15 pt-2">
        <span>31&deg;04&apos;41&quot;N 77&deg;11&apos;08&quot;E</span>
        <span className="tracking-widest uppercase text-[9px] bg-brand-cream/15 px-1.5 py-0.5 rounded-card text-brand-gold/60">
          Verified Journey
        </span>
      </div>
    </div>
  );
};
