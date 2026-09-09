"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mountain, Globe2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

export const DomesticInternationalSplit: React.FC = () => {
  const [activeSide, setActiveSide] = useState<"domestic" | "international">("domestic");

  return (
    <section className="py-20 bg-brand-cream border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown">
            Two Spheres of Travel
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-black tracking-tight">
            Himalayan Roots. Global Horizons.
          </h2>
          <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
            Whether your spirit seeks high trans-Himalayan passes or tropical overseas island retreats, we design both with equal intimacy and personal stewardship.
          </p>
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
          {/* Left: Domestic Journeys */}
          <motion.div
            onMouseEnter={() => setActiveSide("domestic")}
            className="group relative bg-brand-cream border border-brand-brown/10 rounded-card overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-brand-brown hover:shadow-luxury"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-black bg-brand-brown/5 px-3 py-1 rounded-xs border border-brand-brown/10">
                  <Mountain className="w-4 h-4 text-brand-brown" /> Domestic Journeys
                </span>
                <span className="text-[11px] font-mono text-brand-taupe uppercase">
                  5 Key Himalayan Regions
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-brand-black mb-3">
                Across Mountain Valleys & Sacred High Passes
              </h3>

              <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed mb-6">
                Deep-rooted expeditions across Kashmir, Leh Ladakh, Himachal Pradesh, Uttarakhand, and North East India (Sikkim, Meghalaya, Assam, Arunachal).
              </p>

              {/* Visual Placeholder */}
              <div className="mb-6 rounded-card overflow-hidden border border-brand-brown/10">
                <ImagePlaceholder
                  aspectRatio="16:9"
                  category="Himalayan Sanctuary"
                  label="Spiti, Kashmir & Ladakh"
                  elevation="14,000+ ft"
                />
              </div>

              {/* Key Destinations List */}
              <div className="grid grid-cols-2 gap-2 text-xs text-brand-charcoal/90 mb-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Kashmir & Gulmarg
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Leh Ladakh & Nubra
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Himachal & Spiti
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Uttarakhand Meadows
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> North East Valleys
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Andaman & Nicobar
                </span>
              </div>
            </div>

            <Link
              href="/destinations?region=domestic"
              className="inline-flex items-center justify-between py-3 px-5 rounded-sm bg-brand-brown text-brand-cream text-xs font-semibold uppercase tracking-wider hover:bg-brand-brown-dark transition-colors group-hover:shadow-md"
            >
              <span>Explore Domestic Journeys</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right: International Escapes */}
          <motion.div
            onMouseEnter={() => setActiveSide("international")}
            className="group relative bg-brand-cream border border-brand-brown/10 rounded-card overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-brand-brown hover:shadow-luxury"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-black bg-brand-brown/5 px-3 py-1 rounded-xs border border-brand-brown/10">
                  <Globe2 className="w-4 h-4 text-brand-brown" /> International Escapes
                </span>
                <span className="text-[11px] font-mono text-brand-taupe uppercase">
                  Curated Global Sanctuaries
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-brand-black mb-3">
                Island Sanctuaries & Metropolitan Luxury
              </h3>

              <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed mb-6">
                Tailored international escapes to Bali, Dubai, Thailand, Singapore, Malaysia, Nepal, and Bhutan with boutique villas, verified chauffeurs, and visa coordination.
              </p>

              {/* Visual Placeholder */}
              <div className="mb-6 rounded-card overflow-hidden border border-brand-brown/10">
                <ImagePlaceholder
                  aspectRatio="16:9"
                  category="Global Escapes"
                  label="Bali, Dubai & Himalayas"
                />
              </div>

              {/* Key Destinations List */}
              <div className="grid grid-cols-2 gap-2 text-xs text-brand-charcoal/90 mb-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Bali Jungle Villas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Dubai Luxury Safari
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Thailand Island Charters
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Singapore City Escapes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Malaysia Rainforests
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Nepal Himalayan Heritage
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Bhutan Tiger&apos;s Nest Trails
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-brown" /> Guaranteed Visa Assistance
                </span>
              </div>
            </div>

            <Link
              href="/destinations?region=international"
              className="inline-flex items-center justify-between py-3 px-5 rounded-sm bg-brand-cream border border-brand-brown text-brand-black text-xs font-semibold uppercase tracking-wider hover:bg-brand-brown/5 transition-colors"
            >
              <span>Explore International Escapes</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
