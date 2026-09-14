import React from "react";
import { Mountain, Star, MapPin, Clock } from "lucide-react";

const stats = [
  { icon: Mountain, value: "50+", label: "Destinations" },
  { icon: Star, value: 4.6, label: "Google Rating" },
  { icon: MapPin, value: "8+", label: "Years in Shimla" },
  { icon: Clock, value: "24/7", label: "Service" },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="relative -mt-1 z-20 bg-white border-b border-brand-turquoise/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex items-center justify-center gap-3 py-5 sm:py-6 ${
                idx < 3 ? "lg:border-r lg:border-brand-turquoise/8" : ""
              } ${idx === 0 ? "border-r border-brand-turquoise/8 lg:border-r" : ""} ${idx === 1 ? "border-r-0 lg:border-r lg:border-brand-turquoise/8" : ""} ${
                idx < 2 ? "border-b lg:border-b-0 border-brand-turquoise/8" : ""
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 text-brand-turquoise" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-brand-dark font-editorial">{stat.value}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-taupe">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
