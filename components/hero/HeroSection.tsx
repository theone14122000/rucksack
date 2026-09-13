"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mountain, Star } from "lucide-react";
import { FloatingCompass } from "./FloatingCompass";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/destinations/himachal-pradesh.jpg"
          alt="Himalayan mountain landscape"
          className="w-full h-full object-cover"
        />
        {/* Cinematic Overlay - lighter, more gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/20" />
      </div>

      {/* Floating Compass - Desktop Only */}
      <div className="hidden lg:block absolute top-28 right-8 xl:right-16 z-10">
        <FloatingCompass />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
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
            className="font-editorial text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6"
          >
            Discover the
            <br />
            <span className="text-gradient-brand">Himalayas</span>
            <br />
            <span className="font-hand text-brand-yellow text-[0.85em]">Like Never Before</span>
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

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center gap-6 sm:gap-10"
          >
            {[
              { icon: Mountain, value: "50+", label: "Destinations" },
              { icon: Star, value: "4.6", label: "Google Rating" },
              { icon: MapPin, value: "8+", label: "Years in Shimla" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <stat.icon className="w-4 h-4 text-brand-turquoise-bright" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

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
