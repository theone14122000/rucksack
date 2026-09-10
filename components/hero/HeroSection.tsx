"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Compass, MapPin, Star, ArrowRight, ShieldCheck, Sparkles, Mountain, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { FloatingCompass } from "./FloatingCompass";
import { EnquiryModal } from "../ui/EnquiryModal";

export const HeroSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.7]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-deep-forest"
      >
        {/* Cinematic gradient overlays */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-br from-brand-deep-forest via-brand-brown-dark to-brand-black"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-brand-deep-forest/30" />

        {/* Animated grain */}
        <div className="absolute inset-0 bg-grain-dark pointer-events-none opacity-30" />

        {/* Floating mountain silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-black/40 to-transparent pointer-events-none" />

        {/* Floating accent orbs */}
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-brand-gold/8 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[10%] w-80 h-80 rounded-full bg-brand-terracotta/6 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Overline Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-brand-cream/10 border border-brand-cream/15 text-brand-cream text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Premier Himalayan Travel Operator</span>
                <span className="text-brand-cream/40">&bull;</span>
                <span className="text-brand-cream/60 font-normal">Kasumpti, Shimla</span>
              </motion.div>

              {/* Editorial Display Heading with Text Reveal */}
              <div ref={headingRef} className="space-y-1">
                <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-cream leading-[1.06]">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="block"
                  >
                    Explore Beyond
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="block"
                  >
                    the{" "}
                    <span className="font-cursive italic text-brand-gold">Ordinary.</span>
                  </motion.span>
                </h1>
              </div>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-base sm:text-lg text-brand-cream/75 max-w-xl font-normal leading-relaxed"
              >
                Curated journeys across the Himalayas and beyond. Handcrafted expeditions, boutique mountain retreats, high passes, and trusted private transport rooted in Himachal.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
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
                  className="border-brand-cream/30 text-brand-cream hover:bg-brand-cream/10"
                >
                  Plan Your Trip
                </Button>
              </motion.div>

              {/* Trust Metadata Chips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="pt-6 border-t border-brand-cream/10 flex flex-wrap items-center gap-6 text-xs text-brand-cream/60"
              >
                <div className="flex items-center gap-2">
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="font-semibold text-brand-cream">4.6 / 5</span>
                  <span>(242+ Verified Reviews)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-sage" />
                  <span>8+ Years of Local Expertise</span>
                </div>
              </motion.div>
            </div>

            {/* Right Interactive Depth Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotateY: -5 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:col-span-5 relative flex flex-col items-center justify-center"
            >
              {/* Framed Editorial Visual Container */}
              <div className="relative w-full max-w-md aspect-[4/5] rounded-card overflow-hidden border border-brand-cream/10 bg-gradient-to-br from-brand-brown via-brand-brown-dark to-brand-deep-forest shadow-2xl p-6 flex flex-col justify-between group">
                {/* Background Vector Topographic Lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10 text-brand-cream pointer-events-none"
                  viewBox="0 0 400 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M-50,200 C100,120 250,300 450,180"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <motion.path
                    d="M-50,280 C150,190 280,380 450,260"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.3 }}
                  />
                  <motion.path
                    d="M-50,360 C120,270 300,450 450,340"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.6 }}
                  />
                  <motion.path
                    d="M-50,440 C80,350 250,520 450,420"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.9 }}
                  />
                </svg>

                {/* Card Top Label */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-brand-cream/70 uppercase bg-brand-cream/10 px-2.5 py-1 rounded-xs border border-brand-cream/15">
                    Trans-Himalayan Series
                  </span>
                  <span className="text-[10px] font-mono text-brand-gold tracking-widest uppercase">
                    Expedition No. 08
                  </span>
                </div>

                {/* Floating Interactive 3D Compass */}
                <div className="relative z-10 my-auto flex items-center justify-center py-4">
                  <FloatingCompass />
                </div>

                {/* Floating Destination Badge Pill */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="relative z-10 bg-brand-cream/95 text-brand-black p-4 rounded-card border border-brand-brown/10 backdrop-blur-md space-y-1.5 shadow-xl"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-brand-brown tracking-widest uppercase">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Spiti & Kinnaur Circuit
                    </span>
                    <span>14,931 ft</span>
                  </div>
                  <p className="text-xs text-brand-charcoal/70 font-editorial line-clamp-1 italic">
                    &ldquo;Ancient gompas, raw moonscapes, and high glacial passes.&rdquo;
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4 text-brand-cream/40" />
          </motion.div>
        </motion.div>
      </section>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
