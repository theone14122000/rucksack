"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mountain } from "lucide-react";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { cn } from "@/lib/utils";
import {
  ADVENTURE_LEVELS,
  getActivitiesByLevel,
  type AdventureLevelKey,
} from "@/lib/activities";

export const HomeActivities: React.FC = () => {
  const [active, setActive] = useState<AdventureLevelKey>("moderate");
  const reduce = useReducedMotion();
  const activeLevel =
    ADVENTURE_LEVELS.find((l) => l.key === active) ?? ADVENTURE_LEVELS[0];
  const activeActivities = getActivitiesByLevel(activeLevel.key);

  return (
    <section className="py-16 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center gap-2">
                <Mountain className="w-3.5 h-3.5" /> Adventure Starts Here
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                Choose Your{" "}
                <span className="font-hand text-shimmer text-[1.1em]">Adventure Level</span>
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/60 leading-relaxed">
                From gentle forest walks to extreme Himalayan expeditions —
                sixteen guided activities across three levels.
              </p>
            </div>
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light transition-colors shrink-0"
            >
              View All Activities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {ADVENTURE_LEVELS.map((level, idx) => {
            const activities = getActivitiesByLevel(level.key);
            const isActive = active === level.key;
            return (
              <Link
                key={level.key}
                href="/activities"
                onMouseEnter={() => setActive(level.key)}
                onFocus={() => setActive(level.key)}
                aria-label={`${level.label} — view activities`}
                className={cn(
                  "group bg-white rounded-card-xl p-5 sm:p-7 transition-all duration-500 hover:-translate-y-1 border relative overflow-hidden",
                  isActive
                    ? "shadow-luxury border-brand-turquoise/25 -translate-y-1"
                    : "hover:shadow-luxury border-brand-turquoise/5 hover:border-brand-turquoise/15"
                )}
              >
                <div className="absolute top-5 right-5 text-[80px] font-editorial font-bold text-brand-turquoise/[0.03] leading-none select-none pointer-events-none">
                  0{idx + 1}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                  {level.tagline}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-turquoise transition-colors mb-2 mt-1">
                  {level.label}
                </h3>
                <p className="text-sm text-brand-dark/60 leading-relaxed mb-4 line-clamp-3">
                  {activities
                    .slice(0, 4)
                    .map((a) => a.name)
                    .join("  •  ")}
                  {activities.length > 4 && "  •  ..."}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-turquoise group-hover:gap-2.5 transition-all">
                  {activities.length} Activities <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand-turquoise to-brand-yellow transition-all duration-500",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Active level detail — transitions as you hover each category */}
        <div className="mt-6 bg-white rounded-card-xl border border-brand-turquoise/10 p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLevel.key}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise mb-1">
                {activeLevel.label} — {activeLevel.tagline}
              </p>
              <p className="text-xs sm:text-sm text-brand-dark/60 leading-relaxed mb-4 line-clamp-2">
                {activeLevel.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeActivities.map((a) => (
                  <Link
                    key={a.slug}
                    href="/activities"
                    className="text-[11px] font-semibold text-brand-dark/70 bg-brand-cream px-3 py-1.5 rounded-full border border-brand-turquoise/10 hover:border-brand-turquoise/30 hover:text-brand-turquoise transition-all"
                  >
                    {a.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 text-center">
          <Button variant="primary" size="lg" href="/activities">
            View All Activities
          </Button>
        </div>
      </div>
    </section>
  );
};
