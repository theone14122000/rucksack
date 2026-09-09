"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const FloatingCompass: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [rotate, setRotate] = useState(15);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    setRotate(angle);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className={`relative w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-brand-cream/30 bg-gradient-to-b from-brand-cream/20 to-brand-cream/10 backdrop-blur-md p-4 shadow-luxury flex items-center justify-center select-none cursor-pointer group ${className}`}
    >
      {/* Outer Dial Ring */}
      <div className="absolute inset-2 rounded-full border border-dashed border-brand-cream/20" />

      {/* Degree Markers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="absolute top-2 font-mono text-[10px] font-bold text-brand-cream">N</span>
        <span className="absolute right-2.5 font-mono text-[10px] font-bold text-brand-cream/50">E</span>
        <span className="absolute bottom-2 font-mono text-[10px] font-bold text-brand-cream/50">S</span>
        <span className="absolute left-2.5 font-mono text-[10px] font-bold text-brand-cream/50">W</span>
      </div>

      {/* Compass Needle with Motion */}
      <motion.div
        animate={{ rotate }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="relative w-2.5 h-36 sm:h-44 flex flex-col items-center justify-between">
          {/* North Tip */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[40px] border-b-brand-cream drop-shadow-xs" />
          {/* Center Pivot */}
          <div className="w-4 h-4 rounded-full bg-brand-sand border-2 border-brand-brown-dark shadow-xs z-10" />
          {/* South Tip */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[40px] border-t-brand-cream/40 drop-shadow-xs" />
        </div>
      </motion.div>

      {/* Subtle Elevation Label */}
      <div className="absolute bottom-8 text-[9px] font-mono tracking-widest text-brand-cream/50 uppercase bg-brand-black/40 px-2 py-0.5 rounded-xs border border-brand-cream/15 shadow-2xs">
        Himalayan Sector
      </div>
    </motion.div>
  );
};
