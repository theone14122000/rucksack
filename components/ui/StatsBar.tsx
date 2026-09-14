import React from "react";
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
                <p className="text-sm sm:text-xl font-bold text-brand-dark font-editorial leading-tight">{stat.value}</p>
                <p className="text-[7px] sm:text-[10px] uppercase tracking-wider text-brand-taupe leading-tight truncate">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
