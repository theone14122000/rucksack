import React from "react";
import { Metadata } from "next";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { getExperiences } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Curated Travel Experiences | Custom Himalayan & Global Itineraries",
  description:
    "Explore signature travel styles curated by Rucksack Adventures: High-altitude expeditions, family holidays, romantic escapes, luxury sanctuaries, spiritual journeys, and scenic road trips.",
};

export const revalidate = 0;

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Experiences" }]} />

        {/* Page Header */}
        <div className="py-8 border-b border-brand-turquoise/30 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise block mb-2">
            Tailored Perspectives
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Curated Travel Experiences
          </h1>
          <p className="text-sm sm:text-base text-brand-dark/80 max-w-2xl leading-relaxed">
            Travel designed around personal intention. Whether you seek contemplative alpine silence, high-adrenaline 4x4 trails, or luxurious family reunions, our Shimla atelier crafts each experience individually.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-brand-cream/30 border border-brand-turquoise/30 rounded-card p-7 flex flex-col justify-between hover:border-brand-dark hover:shadow-luxury transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-turquoise bg-brand-dark px-2.5 py-0.5 rounded-card">
                    {exp.category}
                  </span>
                  <Sparkles className="w-4 h-4 text-brand-turquoise" />
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark">
                  {exp.name}
                </h2>

                <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed">
                  {exp.fullDescription}
                </p>

                <div className="pt-4 border-t border-brand-turquoise/20 space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark block">
                    Signature Elements:
                  </span>
                  {exp.highlights.map((h, i) => (
                    <p key={i} className="text-xs text-brand-taupe flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise shrink-0" />
                      <span>{h}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-brand-turquoise/20">
                <a
                  href="#custom-experience-form"
                  className="w-full py-2.5 px-4 rounded-card bg-brand-cream border border-brand-turquoise/40 hover:bg-brand-dark hover:text-brand-cream text-brand-dark text-xs font-semibold uppercase tracking-wider text-center block transition-colors"
                >
                  Design This Style →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Experience Builder Form */}
        <div id="custom-experience-form" className="max-w-4xl mx-auto py-12 border-t border-brand-turquoise/30">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-turquoise">
              Custom Travel Atelier
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-dark">
              Design a Bespoke Journey
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe">
              Tell us your vision. We will coordinate vehicles, stays, permits, and private guides.
            </p>
          </div>

          <div className="bg-brand-cream/40 border border-brand-turquoise/40 p-6 sm:p-10 rounded-card shadow-luxury">
            <EnquiryForm defaultTravelType="Other" />
          </div>
        </div>
      </div>
    </div>
  );
}
