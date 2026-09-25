"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mountain, Star, MapPin, Clock } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";

interface Stat {
  icon: React.ElementType;
  label: string;
  value?: number;
  decimals?: number;
  suffix?: string;
  display?: string;
}

// Values come from the existing site data; only numeric stats animate.
const stats: Stat[] = [
  { icon: Mountain, value: 50, suffix: "+", label: "Destinations" },
  { icon: Star, value: 4.6, decimals: 1, label: "Google Rating" },
  { icon: MapPin, value: 8, suffix: "+", label: "Years in Shimla" },
  { icon: Clock, display: "24/7", label: "Service" },
];

const AnimatedValue: React.FC<{ value: number; decimals?: number; suffix?: string }> = ({
  value,
  decimals = 0,
  suffix = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (!inView || reduce) {
      if (inView || reduce) setDisplay(`${value.toFixed(decimals)}${suffix}`);
      return;
    }
    let frame = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${(value * eased).toFixed(decimals)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, decimals, suffix]);

  return <span ref={ref}>{display}</span>;
};

export const StatsBar: React.FC = () => {
  return (
    <section className="relative -mt-1 z-20 bg-white border-b border-brand-turquoise/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between divide-x divide-brand-turquoise/8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5 px-2 sm:px-6 flex-1 min-w-0"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-brand-turquoise" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-xl font-bold text-brand-dark font-editorial leading-tight">
                  {stat.display ?? (
                    <AnimatedValue
                      value={stat.value ?? 0}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  )}
                </p>
                <p className="text-[7px] sm:text-[10px] uppercase tracking-wider text-brand-taupe leading-tight truncate">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
