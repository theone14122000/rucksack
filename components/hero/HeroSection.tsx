"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, MapPin, Star, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { FloatingCompass } from "./FloatingCompass";
import { EnquiryModal } from "../ui/EnquiryModal";

export const HeroSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-brand-cream/60 via-brand-offwhite to-brand-offwhite">
        {/* Subtle Topographic Background Grid */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-60" />
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-brand-sand/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-48 w-96 h-96 rounded-full bg-brand-beige/25 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Overline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-brand-cream border border-brand-sand/40 text-brand-deep text-xs font-semibold uppercase tracking-[0.18em]">
                <Sparkles className="w-3.5 h-3.5 text-brand-sand" />
                <span>Premier Himalayan Travel Operator</span>
                <span className="text-brand-taupe">•</span>
                <span className="text-brand-taupe font-normal">Kasumpti, Shimla</span>
              </div>

              {/* Editorial Display Heading */}
              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-deep leading-[1.08]">
                Explore Beyond <br />
                <span className="italic font-normal text-brand-warm">The Ordinary.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-xl text-brand-charcoal/85 max-w-xl font-normal leading-relaxed">
                Curated journeys across the Himalayas and beyond. Handcrafted expeditions, boutique mountain retreats, high passes, and trusted private transport rooted in Himachal.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  href="/packages"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Journeys
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  icon={<Compass className="w-4 h-4" />}
                >
                  Plan Your Trip
                </Button>
              </div>

              {/* Trust Metadata Chips */}
              <div className="pt-6 border-t border-brand-sand/25 flex flex-wrap items-center gap-6 text-xs text-brand-taupe">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="font-semibold text-brand-deep font-mono">4.6 / 5</span>
                  <span>(242+ Verified Reviews)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>8+ Years of Local Expertise</span>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive Depth Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative flex flex-col items-center justify-center"
            >
              {/* Framed Editorial Visual Container */}
              <div className="relative w-full max-w-md aspect-[4/5] rounded-sm overflow-hidden border border-brand-sand/40 bg-gradient-to-br from-brand-cream via-brand-beige/30 to-brand-cream shadow-2xl p-6 flex flex-col justify-between group">
                {/* Background Vector Topographic Lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20 text-brand-deep pointer-events-none"
                  viewBox="0 0 400 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M-50,200 C100,120 250,300 450,180" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M-50,280 C150,190 280,380 450,260" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M-50,360 C120,270 300,450 450,340" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M-50,440 C80,350 250,520 450,420" stroke="currentColor" strokeWidth="1.2" />
                </svg>

                {/* Card Top Label */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-brand-taupe uppercase bg-brand-offwhite/90 px-2.5 py-1 rounded-xs border border-brand-sand/30">
                    Trans-Himalayan Series
                  </span>
                  <span className="text-[10px] font-mono text-brand-sand tracking-widest uppercase">
                    Expedition No. 08
                  </span>
                </div>

                {/* Floating Interactive 3D Compass */}
                <div className="relative z-10 my-auto flex items-center justify-center py-4">
                  <FloatingCompass />
                </div>

                {/* Floating Destination Badge Pill */}
                <div className="relative z-10 bg-brand-espresso/95 text-brand-cream p-4 rounded-sm border border-brand-sand/30 backdrop-blur-md space-y-1.5 shadow-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-brand-sand tracking-widest uppercase">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-sand" /> Spiti & Kinnaur Circuit
                    </span>
                    <span>14,931 ft</span>
                  </div>
                  <p className="text-xs text-brand-cream/80 font-editorial line-clamp-1 italic">
                    &ldquo;Ancient gompas, raw moonscapes, and high glacial passes.&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
