"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface InternationalDestination {
  id: string;
  slug: string;
  name: string;
  heroImage?: string;
  tagline?: string;
}

interface InternationalCarouselProps {
  destinations: InternationalDestination[];
}

export const InternationalCarousel: React.FC<InternationalCarouselProps> = ({ destinations }) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  useEffect(() => {
    if (destinations.length <= 1) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, destinations.length]);

  if (destinations.length === 0) return null;

  return (
    <div className="relative">
      {/* Main Image Card with Auto-Toggle */}
      <div className="relative aspect-[4/5] rounded-card-2xl overflow-hidden shadow-luxury group">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={destinations[current].heroImage || "/images/destinations/leh-ladakh.jpg"}
            alt={destinations[current].name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/10" />

        {/* Batch Type Caption - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <motion.span
            key={`badge-${current}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-3 py-1.5 bg-brand-turquoise/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full"
          >
            {destinations[current].tagline || "International"}
          </motion.span>
        </div>

        {/* Current Destination Name - Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`name-${current}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-1">
                {destinations[current].name}
              </h3>
              <Link
                href={`/destinations/${destinations[current].slug}`}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-turquoise-light hover:text-white transition-colors"
              >
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-turquoise/0 group-hover:bg-brand-turquoise/10 transition-colors duration-500" />
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {destinations.map((dest, idx) => (
          <button
            key={dest.id}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-500 rounded-full ${
              idx === current
                ? "w-8 h-2 bg-gradient-to-r from-brand-turquoise to-brand-yellow"
                : "w-2 h-2 bg-brand-turquoise/20 hover:bg-brand-turquoise/40"
            }`}
            aria-label={`Go to ${dest.name}`}
          />
        ))}
      </div>
    </div>
  );
};
