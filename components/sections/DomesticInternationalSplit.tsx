"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mountain, Globe2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

export const DomesticInternationalSplit: React.FC = () => {
  const [activeSide, setActiveSide] = useState<"domestic" | "international">("domestic");

  return (
    <section className="py-20 bg-brand-cream border-b border-brand-turquoise/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise">
            Two Spheres of Travel
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            Himalayan Roots. Global Horizons.
          </h2>
          <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed">
            Whether your spirit seeks high trans-Himalayan passes or tropical overseas island retreats, we design both with equal intimacy and personal stewardship.
          </p>
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
          {/* Left: Domestic Journeys */}
          <motion.div
            onMouseEnter={() => setActiveSide("domestic")}
            className="group relative bg-brand-cream border border-brand-turquoise/10 rounded-card overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-brand-turquoise hover:shadow-luxury"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-dark bg-brand-turquoise/5 px-3 py-1 rounded-card border border-brand-turquoise/10">
                  <Mountain className="w-4 h-4 text-brand-turquoise" /> Domestic Journeys
                </span>
                <span className="text-[11px] font-mono text-brand-taupe uppercase">
                  5 Key Himalayan Regions
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-brand-dark mb-3">
                Across Mountain Valleys & Sacred High Passes
              </h3>

              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed mb-6">
                Deep-rooted expeditions across Kashmir, Leh Ladakh, Himachal Pradesh, Uttarakhand, and North East India (Sikkim, Meghalaya, Assam, Arunachal).
              </p>

              {/* Visual Placeholder */}
              <div className="mb-6 rounded-card overflow-hidden border border-brand-turquoise/10">
                <ImagePlaceholder
                  aspectRatio="16:9"
                  category="Himalayan Sanctuary"
                  label="Spiti, Kashmir & Ladakh"
                  elevation="14,000+ ft"
                />
              </div>

              {/* Key Destinations List */}
              <div className="grid grid-cols-2 gap-2 text-xs text-brand-dark/90 mb-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Kashmir & Gulmarg
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Leh Ladakh & Nubra
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Himachal & Spiti
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Uttarakhand Meadows
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> North East Valleys
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Andaman & Nicobar
                </span>
              </div>
            </div>

            <Link
              href="/destinations?region=domestic"
              className="inline-flex items-center justify-between py-3 px-5 rounded-card bg-brand-turquoise text-brand-cream text-xs font-semibold uppercase tracking-wider hover:bg-brand-turquoise-light transition-colors group-hover:shadow-md"
            >
              <span>Explore Domestic Journeys</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right: International Escapes */}
          <motion.div
            onMouseEnter={() => setActiveSide("international")}
            className="group relative bg-brand-cream border border-brand-turquoise/10 rounded-card overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-brand-turquoise hover:shadow-luxury"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-dark bg-brand-turquoise/5 px-3 py-1 rounded-card border border-brand-turquoise/10">
                  <Globe2 className="w-4 h-4 text-brand-turquoise" /> International Escapes
                </span>
                <span className="text-[11px] font-mono text-brand-taupe uppercase">
                  Curated Global Sanctuaries
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-brand-dark mb-3">
                Island Sanctuaries & Metropolitan Luxury
              </h3>

              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed mb-6">
                Tailored international escapes to Bali, Dubai, Thailand, Singapore, Malaysia, Nepal, and Bhutan with boutique villas, verified chauffeurs, and visa coordination.
              </p>

              {/* Visual Placeholder */}
              <div className="mb-6 rounded-card overflow-hidden border border-brand-turquoise/10">
                <ImagePlaceholder
                  aspectRatio="16:9"
                  category="Global Escapes"
                  label="Bali, Dubai & Himalayas"
                />
              </div>

              {/* Key Destinations List */}
              <div className="grid grid-cols-2 gap-2 text-xs text-brand-dark/90 mb-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Bali Jungle Villas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Dubai Luxury Safari
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Thailand Island Charters
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Singapore City Escapes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Malaysia Rainforests
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Nepal Himalayan Heritage
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Bhutan Tiger&apos;s Nest Trails
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" /> Guaranteed Visa Assistance
                </span>
              </div>
            </div>

            <Link
              href="/destinations?region=international"
              className="inline-flex items-center justify-between py-3 px-5 rounded-card bg-brand-cream border border-brand-turquoise text-brand-dark text-xs font-semibold uppercase tracking-wider hover:bg-brand-turquoise/5 transition-colors"
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
