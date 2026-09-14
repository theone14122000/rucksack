"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const internationalImageMap: Record<string, string> = {
  bali: "/images/destinations/bali.jpg",
  dubai: "/images/destinations/dubai.jpg",
  thailand: "/images/destinations/thailand.jpg",
  singapore: "/images/destinations/singapore.jpg",
  malaysia: "/images/destinations/malaysia.jpg",
  nepal: "/images/destinations/nepal.jpg",
  bhutan: "/images/destinations/bhutan.jpg",
};

interface InternationalDestination {
  id: string;
  slug: string;
  name: string;
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

  const currentDest = destinations[current];
  const imageSrc = internationalImageMap[currentDest.slug] || "/images/destinations/bali.jpg";

  return (
    <div className="relative">
      {/* Main Image Card with Crossfade */}
      <div className="relative aspect-[4/5] rounded-card-2xl overflow-hidden shadow-luxury group">
        {/* All images layered for smooth crossfade */}
        {destinations.map((dest, idx) => (
          <motion.img
            key={dest.id}
            src={internationalImageMap[dest.slug] || "/images/destinations/bali.jpg"}
            alt={dest.name}
            initial={false}
            animate={{
              opacity: idx === current ? 1 : 0,
              scale: idx === current ? 1 : 1.06,
            }}
            transition={{ duration: 1.4, ease: [0.45, 0, 0.15, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/10" />

        {/* Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={`badge-${current}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="inline-block px-3 py-1.5 bg-brand-gold/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full"
            >
              {currentDest.tagline || "International"}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Destination Name - Bottom Left */}
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
                {currentDest.name}
              </h3>
              <Link
                href={`/destinations/${currentDest.slug}`}
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
            className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: idx === current ? 32 : 8, background: idx === current ? "transparent" : "rgba(11,143,131,0.2)" }}
            aria-label={`Go to ${dest.name}`}
          >
            {idx === current && (
              <motion.div
                key={`progress-${current}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.5, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-brand-turquoise to-brand-yellow origin-left rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
