"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FloatingCompass } from "./FloatingCompass";

const heroSlides = [
  { src: "/images/hero/slide-1.jpg", alt: "Himachal Pradesh mountains", label: "Himachal Pradesh" },
  { src: "/images/hero/slide-2.jpg", alt: "Kashmir valley", label: "Kashmir" },
  { src: "/images/hero/slide-3.jpg", alt: "Leh Ladakh landscape", label: "Leh Ladakh" },
  { src: "/images/hero/slide-4.jpg", alt: "Bali tropical paradise", label: "Bali" },
  { src: "/images/hero/slide-5.jpg", alt: "Dubai skyline", label: "Dubai" },
];

export const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Subtle scroll parallax: background drifts slower than the page, content lifts and fades.
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 140]);
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const contentY = useTransform(scrollY, [0, 400], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image Carousel - Crossfade + Parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
      >
        {heroSlides.map((slide, idx) => (
          <motion.img
            key={idx}
            src={slide.src}
            alt={slide.alt}
            initial={false}
            animate={{
              opacity: idx === current ? 1 : 0,
              scale: idx === current ? 1 : 1.08,
            }}
            transition={{ duration: 1.8, ease: [0.45, 0, 0.15, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/20" />
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-4 sm:left-8 z-20 flex items-center gap-2">
        {heroSlides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: idx === current ? 32 : 8, background: idx === current ? "transparent" : "rgba(255,255,255,0.3)" }}
            aria-label={`Go to slide: ${slide.label}`}
          >
            {idx === current && (
              <motion.div
                key={`progress-${current}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-brand-turquoise to-brand-yellow origin-left rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Current Slide Label */}
      <div className="absolute bottom-20 right-4 sm:right-8 z-20">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40"
          >
            {heroSlides[current].label} — {current + 1}/{heroSlides.length}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Floating Compass - Desktop Only */}
      <div className="hidden lg:block absolute top-28 right-8 xl:right-16 z-10">
        <FloatingCompass activeIndex={current} />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          {/* Micro Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-px bg-gradient-to-r from-brand-turquoise to-brand-turquoise-bright" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-brand-turquoise-light">
              Kasumpti, Shimla &bull; Since 2018
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6"
          >
            Discover the
            <br />
            <span className="text-shimmer">Himalayas</span>
            <br />
            <span className="font-hand text-shimmer text-[0.85em]">Like Never Before</span>
          </motion.h1>

          {/* Supporting Content */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed mb-10"
          >
            Curated Himalayan journeys, high altitude trekking expeditions, custom domestic & international tour packages, and trusted cab services — all from our mountain headquarters in Shimla.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-turquoise to-brand-turquoise-bright text-white text-xs font-bold uppercase tracking-wider rounded-full btn-premium"
            >
              Explore Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/packages"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider rounded-full hover:border-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              View Adventures
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
