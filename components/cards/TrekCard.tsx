"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, MessageCircle, TrendingUp } from "lucide-react";
import { Trek } from "@/lib/cms/types";
import { getTrekImage } from "@/lib/utils/images";

interface TrekCardProps {
  trek: Trek;
}

const WHATSAPP_NUMBER = "917018678064";

export const TrekCard: React.FC<TrekCardProps> = ({ trek }) => {
  const difficultyConfig = {
    Easy: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    Moderate: { bg: "bg-brand-yellow-50", text: "text-amber-700", border: "border-amber-200" },
    Challenging: { bg: "bg-brand-gold-50", text: "text-brand-gold", border: "border-brand-gold/20" },
    Difficult: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  }[trek.difficulty] || { bg: "bg-brand-cream", text: "text-brand-dark", border: "border-brand-turquoise/10" };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Rucksack Adventures! I'm interested in the "${trek.name}" trek. Please share the details and batch dates.`)}`;

  return (
    <div className="group bg-white rounded-card-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-luxury-hover hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/12">
      <div>
        <div className="relative overflow-hidden aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getTrekImage(trek.slug)}
            alt={trek.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-brand-dark/10 to-transparent" />
          <div className="absolute top-3 left-3 z-20">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm ${difficultyConfig.bg} ${difficultyConfig.text} ${difficultyConfig.border}`}>{trek.difficulty}</span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider mb-2">
            <span className="flex items-center gap-1 text-brand-turquoise"><TrendingUp className="w-3.5 h-3.5" />{trek.altitude}</span>
            <span className="flex items-center gap-1 text-brand-taupe"><Clock className="w-3.5 h-3.5" />{trek.duration}</span>
          </div>
          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-dark tracking-tight group-hover:text-brand-turquoise transition-colors">
            <Link href={`/treks/${trek.slug}`}>{trek.name}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-brand-dark/55 line-clamp-2 leading-relaxed mt-2">{trek.shortDescription}</p>
          <div className="pt-3 mt-3 border-t border-brand-turquoise/5 flex items-center justify-between text-[11px] text-brand-taupe">
            <span>Region: <strong className="text-brand-dark/70">{trek.region}</strong></span>
            <span>Season: <strong className="text-brand-gold">{trek.bestSeason.split("&")[0]}</strong></span>
          </div>
        </div>
      </div>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex items-center justify-between">
        <Link href={`/treks/${trek.slug}`} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-turquoise py-1.5 px-3 rounded-full border border-brand-turquoise/15 hover:border-brand-turquoise/30 hover:bg-brand-turquoise-50 transition-all">
          Discover Trek <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#25D366] hover:text-[#1EBE5D] py-1.5 px-3 rounded-full border border-[#25D366]/20 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-300">
          <MessageCircle className="w-3.5 h-3.5" /><span>Ask for Details</span>
        </a>
      </div>
    </div>
  );
};
