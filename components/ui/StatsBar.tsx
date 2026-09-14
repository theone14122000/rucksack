"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mountain, Star, MapPin, Clock } from "lucide-react";

const stats = [
  { icon: Mountain, value: "50+", label: "Destinations" },
  { icon: Star, value: "4.6", label: "Google Rating" },
  { icon: MapPin, value: "8+", label: "Years in Shimla" },
  { icon: Clock, value: "24/7", label: "Service" },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="relative -mt-1 z-20 bg-white border-b border-brand-turquoise/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="flex items-center gap-3 snap-center shrink-0 py-5 px-5 sm:py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0 border-brand-turquoise/8 sm:border-r sm:last:border-r-0 first:border-l-0"
            >
              <div className="w-10 h-10 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 text-brand-turquoise" />
              </div>
              <div>
                <p className="text-xl font-bold text-brand-dark font-editorial">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-taupe">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
