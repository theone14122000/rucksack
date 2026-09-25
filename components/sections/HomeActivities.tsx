import React from "react";
import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";
import { Button } from "../ui/Button";
import { ADVENTURE_LEVELS, getActivitiesByLevel } from "@/lib/activities";

export const HomeActivities: React.FC = () => {
  return (
    <section className="py-16 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {ADVENTURE_LEVELS.map((level, idx) => {
            const activities = getActivitiesByLevel(level.key);
            return (
              <Link
                key={level.key}
                href="/activities"
                className="group bg-white rounded-card-xl p-5 sm:p-7 hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/15 relative overflow-hidden"
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
              </Link>
            );
          })}
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
