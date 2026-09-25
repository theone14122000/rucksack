import React from "react";
import {
  Compass,
  Users,
  ShieldCheck,
  MapPin,
  Leaf,
  Camera,
} from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Adventure With Purpose",
    description:
      "Thoughtfully planned journeys designed around exploration, discovery and memorable experiences.",
  },
  {
    icon: Users,
    title: "Personalized Experiences",
    description:
      "Adventure options designed for solo travelers, couples, families and groups.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Experienced professionals and proper planning help make adventure experiences safer and more enjoyable.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description:
      "Explore destinations through people and experiences connected to the region.",
  },
  {
    icon: Leaf,
    title: "Responsible Travel",
    description:
      "Encourage responsible exploration while respecting nature, communities and local environments.",
  },
  {
    icon: Camera,
    title: "Memories That Stay",
    description:
      "The goal isn't simply to visit a destination — it's to return with stories worth remembering.",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
        Why Choose Rucksack Adventures?
      </span>
      <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
        More Than a Trip. It&apos;s Your{" "}
        <span className="font-hand text-shimmer text-[1.1em]">Adventure</span>
      </h2>
      <p className="text-sm sm:text-base text-brand-dark/60 leading-relaxed">
        We&apos;re not just tour operators. We&apos;re fellow explorers who
        understand the excitement of discovering something new. From carefully
        selected destinations to personalized experiences, we focus on creating
        adventures you&apos;ll remember long after the journey ends.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-6 text-left">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group bg-white rounded-card-xl p-5 sm:p-6 hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/15"
          >
            <div className="w-11 h-11 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center mb-4 group-hover:bg-brand-turquoise group-hover:text-white text-brand-turquoise transition-all duration-300">
              <feature.icon className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-brand-dark group-hover:text-brand-turquoise transition-colors mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-brand-dark/60 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
