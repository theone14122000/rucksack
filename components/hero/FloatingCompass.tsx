"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const destinations = [
  { name: "Himachal Pradesh", bearing: 15, tag: "Home Ground" },
  { name: "Kashmir", bearing: 45, tag: "Paradise" },
  { name: "Leh Ladakh", bearing: 70, tag: "High Passes" },
  { name: "Bali", bearing: 135, tag: "Island Escape" },
  { name: "Dubai", bearing: 200, tag: "Desert Luxury" },
];

export const FloatingCompass: React.FC<{ className?: string; activeIndex?: number }> = ({
  className = "",
  activeIndex = 0,
}) => {
  const [rotate, setRotate] = useState(15);
  const [hovered, setHovered] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);

  const currentDest = destinations[activeIndex % destinations.length];

  useEffect(() => {
    setRotate(currentDest.bearing);
  }, [activeIndex, currentDest.bearing]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    setRotate(angle);
  };

  const handleMouseLeave = () => {
    setRotate(currentDest.bearing);
    setHovered(null);
    setClicked(false);
  };

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className={`relative w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-brand-cream/30 bg-gradient-to-b from-brand-cream/20 to-brand-cream/10 backdrop-blur-md p-4 shadow-luxury flex items-center justify-center select-none cursor-pointer group ${className}`}
    >
      {/* Pulse Ring on Hover */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border border-brand-turquoise/20 pointer-events-none"
      />

      {/* Outer Dial Ring */}
      <div className="absolute inset-2 rounded-full border border-dashed border-brand-cream/20" />

      {/* Degree Ticks */}
      {Array.from({ length: 36 }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: `rotate(${i * 10}deg)` }}
        >
          <div className={`absolute top-1 ${i % 9 === 0 ? "w-px h-3 bg-brand-cream/50" : "w-px h-1.5 bg-brand-cream/20"}`} />
        </div>
      ))}

      {/* Cardinal Direction Labels - Interactive */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { dir: "N", label: "North", top: "4px", left: "50%", translate: "-50%, 0" },
          { dir: "E", label: "East", top: "50%", right: "6px", translate: "0, -50%" },
          { dir: "S", label: "South", bottom: "4px", left: "50%", translate: "-50%, 0" },
          { dir: "W", label: "West", top: "50%", left: "6px", translate: "0, -50%" },
        ].map((cardinal) => (
          <div
            key={cardinal.dir}
            className="absolute pointer-events-auto"
            style={{
              top: cardinal.top,
              bottom: cardinal.bottom,
              left: cardinal.left,
              right: cardinal.right,
              transform: `translate(${cardinal.translate})`,
            }}
            onMouseEnter={() => setHovered(cardinal.dir)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={`font-mono text-[10px] font-bold transition-colors ${
              hovered === cardinal.dir ? "text-brand-turquoise-light" : "text-brand-cream/60"
            }`}>
              {cardinal.dir}
            </span>
          </div>
        ))}
      </div>

      {/* Compass Needle */}
      <motion.div
        animate={{ rotate }}
        transition={{ type: "spring", stiffness: 50, damping: 12 }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="relative w-2.5 h-36 sm:h-44 flex flex-col items-center justify-between">
          {/* North Tip */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[40px] border-b-brand-cream drop-shadow-xs" />
          {/* Center Pivot */}
          <motion.div
            animate={clicked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="w-4 h-4 rounded-full bg-brand-gold/60 border-2 border-brand-turquoise-light shadow-xs z-10"
          />
          {/* South Tip */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[40px] border-t-brand-cream/40 drop-shadow-xs" />
        </div>
      </motion.div>

      {/* Current Destination Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDest.name}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-6 text-center"
        >
          <div className="text-[9px] font-mono tracking-widest text-brand-turquoise-light uppercase bg-brand-dark/50 px-2.5 py-1 rounded-card border border-brand-cream/15 shadow-2xs backdrop-blur-sm">
            {currentDest.name}
          </div>
          <div className="text-[8px] font-mono text-brand-cream/40 mt-1 uppercase tracking-wider">
            {currentDest.tag}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-10 bg-brand-dark/90 text-white text-[10px] font-mono px-3 py-1.5 rounded-full whitespace-nowrap backdrop-blur-sm border border-brand-cream/10"
          >
            {hovered === "N" && "North — Himachal"}
            {hovered === "E" && "East — North East"}
            {hovered === "S" && "South — Bali & Dubai"}
            {hovered === "W" && "West — Kashmir & Ladakh"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
