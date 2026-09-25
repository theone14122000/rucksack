import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Leaf } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ActivitiesExplorer } from "@/components/activities/ActivitiesExplorer";
import { ADVENTURE_LEVELS, getActivitiesByLevel } from "@/lib/activities";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Adventure Activities in Himachal Pradesh | Rucksack Adventures",
  description:
    "Explore adventure activities in Himachal Pradesh with Rucksack Adventures — trekking, rafting, paragliding, mountain biking, camping, rock climbing and more outdoor adventure experiences across basic, moderate and extreme levels.",
};

export const revalidate = 0;

export default function ActivitiesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rucksackadventures.com" },
    { name: "Activities", url: "https://rucksackadventures.com/activities" },
  ]);

  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Activities" }]} />

        {/* Hero */}
        <div className="py-8 border-b border-brand-turquoise/30 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise flex items-center gap-2 mb-2">
            <Compass className="w-3.5 h-3.5" /> Adventure Starts Here
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Adventure <span className="font-hand text-shimmer">Starts Here</span>
          </h1>
          <p className="font-hand text-2xl sm:text-3xl text-brand-turquoise mb-4">
            &ldquo;JOBS FILL YOUR POCKETS BUT ADVENTURE FILLS YOUR SOUL.&rdquo;
          </p>
          <p className="text-sm sm:text-base text-brand-dark/80 max-w-2xl leading-relaxed">
            Adventure tourism is a rapidly growing form of travel where
            exploration, challenge and the thrill of discovery come together.
            Different adventures demand different levels of preparation,
            fitness and experience.
          </p>
        </div>

        {/* Adventure Levels Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-16">
          {ADVENTURE_LEVELS.map((level, idx) => (
            <div
              key={level.key}
              className="group bg-white rounded-card-xl p-5 sm:p-7 hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/15 relative overflow-hidden"
            >
              <div className="absolute top-5 right-5 text-[80px] font-editorial font-bold text-brand-turquoise/[0.03] leading-none select-none pointer-events-none">
                0{idx + 1}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                {level.tagline}
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-turquoise transition-colors mb-2 mt-1">
                {level.label}
              </h2>
              <p className="text-xs sm:text-sm text-brand-dark/60 leading-relaxed mb-4 line-clamp-4">
                {level.description}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-taupe">
                {getActivitiesByLevel(level.key).length} Activities
              </p>
            </div>
          ))}
        </div>

        {/* Explorer */}
        <div className="mb-16">
          <div className="mb-8 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Adventure Level → Activity → Enquire
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              All <span className="font-hand text-shimmer text-[1.1em]">Activities</span>
            </h2>
          </div>
          <ActivitiesExplorer />
        </div>

        {/* Safety Note */}
        <div className="bg-white border border-brand-turquoise/10 rounded-card-2xl p-6 sm:p-8 mb-16 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          <div className="w-11 h-11 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-brand-turquoise" />
          </div>
          <div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-brand-dark mb-2">
              A Note on Adventure & Responsibility
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/60 leading-relaxed">
              Adventure difficulty levels are shared as informational guidance
              to help you choose experiences matching your fitness and comfort
              — not as a guarantee that an activity is safe or suitable for
              every person. Our team plans every outing with trained
              professionals, appropriate equipment and respect for weather,
              terrain and local environments.{" "}
              <span className="inline-flex items-center gap-1 font-semibold text-brand-turquoise">
                <Leaf className="w-3.5 h-3.5" /> Travel responsibly, leave no trace.
              </span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-brand-dark tracking-tight">
            Ready for Your <span className="font-hand text-shimmer">Next Adventure</span>?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="primary" size="lg" href="/packages">
              Explore Packages
            </Button>
            <Button variant="outline" size="lg" href="/custom-package">
              Create Your Trip
            </Button>
            <Button variant="ghost" size="lg" href="/contact">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
