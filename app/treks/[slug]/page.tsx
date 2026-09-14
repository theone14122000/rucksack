import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Mountain, Gauge, Calendar, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getTrekImage } from "@/lib/utils/images";
import { TrekCard } from "@/components/cards/TrekCard";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { getTrekBySlug, getTreks } from "@/lib/cms/store";

export const revalidate = 0;

interface TrekPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TrekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);
  if (!trek) return { title: "Trek Not Found" };

  return {
    title: trek.seoTitle || `${trek.name} | ${trek.altitude} Himalayan Trek`,
    description: trek.seoDescription || trek.shortDescription,
    openGraph: {
      title: `${trek.name} | Rucksack Adventures`,
      description: trek.shortDescription,
    },
  };
}

export default async function TrekDetailPage({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);

  if (!trek) {
    notFound();
  }

  const allTreks = await getTreks();
  const relatedTreks = allTreks.filter((t) => t.id !== trek.id).slice(0, 3);

  return (
    <div className="pt-24 pb-20 bg-brand-dark text-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="opacity-80">
          <Breadcrumbs
            items={[
              { label: "Himalayan Treks", href: "/treks" },
              { label: trek.name },
            ]}
          />
        </div>

        {/* Hero Header */}
        <div className="py-8 border-b border-brand-gold/20 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold uppercase tracking-widest text-brand-gold/70 mb-3">
            <span className="flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5" />
              {trek.region}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5" />
              Grade: {trek.difficulty}
            </span>
            <span>•</span>
            <span>Peak: {trek.altitude}</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-cream tracking-tight mb-4">
            {trek.name}
          </h1>
          <p className="text-base sm:text-xl text-brand-cream/75 max-w-3xl leading-relaxed">
            {trek.shortDescription}
          </p>
        </div>

        {/* Visual Slot */}
        <div className="mb-14 rounded-card-lg overflow-hidden border border-brand-gold/15 shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getTrekImage(trek.slug)}
            alt={trek.name}
            className="w-full h-auto object-cover aspect-[21/9]"
            loading="lazy"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-gold/12">
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-4">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-cream">
                Expedition Overview
              </h2>
              <p className="text-sm sm:text-base text-brand-cream/75 leading-relaxed whitespace-pre-line">
                {trek.overview}
              </p>
            </section>

            <section className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold/60">
                  Trail Route
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-cream mt-1">
                  Day-Wise Mountain Itinerary
                </h2>
              </div>
              <div className="relative border-l border-brand-gold/20 pl-6 sm:pl-8 space-y-8 ml-3">
                {trek.itinerary.map((item) => (
                  <div key={item.day} className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-brand-gold text-brand-dark text-[11px] font-mono font-bold flex items-center justify-center border-2 border-brand-dark shadow-xs">
                      {item.day}
                    </div>
                    <div className="bg-brand-dark-light/80 border border-brand-gold/12 p-5 rounded-card space-y-2 group-hover:border-brand-gold/25 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-editorial text-xl font-bold text-brand-cream">
                          Day {item.day}: {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-brand-gold/60">
                          {item.distance && <span>Distance: {item.distance}</span>}
                          {item.altitudeGain && <span>• Gain: {item.altitudeGain}</span>}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-cream/65 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-gold/12">
              <div className="bg-brand-dark-light/60 border border-brand-gold/15 p-6 rounded-card space-y-3">
                <h3 className="font-editorial text-xl font-bold text-brand-cream flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  What Is Included
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-brand-cream/75">
                  {trek.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-dark-light/40 border border-brand-gold/10 p-6 rounded-card space-y-3">
                <h3 className="font-editorial text-xl font-bold text-brand-cream flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-brand-yellow" />
                  What Is Excluded
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-brand-cream/65">
                  {trek.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-yellow font-bold">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="bg-brand-dark-light/80 border border-brand-gold/12 p-6 rounded-card space-y-3">
              <h3 className="font-editorial text-xl font-bold text-brand-gold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-brand-gold" />
                Physical Fitness & Essential Gear
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-cream/75">
                {trek.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-gold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {trek.faqs && trek.faqs.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-brand-gold/12">
                <h3 className="font-editorial text-2xl font-bold text-brand-cream">
                  Trek Intelligence & FAQs
                </h3>
                <div className="space-y-3">
                  {trek.faqs.map((f, i) => (
                    <div key={i} className="p-4 bg-brand-dark-light/60 border border-brand-gold/12 rounded-card space-y-1.5">
                      <h4 className="text-sm font-bold text-brand-gold">{f.question}</h4>
                      <p className="text-xs text-brand-cream/65 leading-relaxed">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Trek Booking Box */}
          <div className="lg:col-span-4">
            <div className="bg-brand-dark border border-brand-gold/20 rounded-card-lg p-6 sm:p-7 space-y-6 sticky top-28 shadow-2xl">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold/60 block">
                  Expedition Specifications
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-brand-gold/15">
                  <div>
                    <span className="text-brand-taupe block">Max Altitude</span>
                    <strong className="text-brand-cream text-sm">{trek.altitude}</strong>
                  </div>
                  <div>
                    <span className="text-brand-taupe block">Trail Duration</span>
                    <strong className="text-brand-cream text-sm">{trek.duration}</strong>
                  </div>
                  <div>
                    <span className="text-brand-taupe block">Difficulty</span>
                    <strong className="text-brand-yellow text-sm">{trek.difficulty}</strong>
                  </div>
                  <div>
                    <span className="text-brand-taupe block">Region</span>
                    <strong className="text-brand-cream text-sm">{trek.region.split(",")[0]}</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-brand-gold/15 text-xs text-brand-cream/75">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  Certified Himalayan Guides
                </p>
                <p className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-brand-gold shrink-0" />
                  Medical Oxygen Cylinders On-Trail
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                  Best: {trek.bestSeason}
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href="#trek-enquiry-box"
                  className="w-full py-3.5 px-4 rounded-card bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider text-center block hover:bg-brand-gold-light transition-colors shadow-xs"
                >
                  Book This Expedition
                </a>
                <a
                  href={`https://wa.me/917018678064?text=Hello%20Rucksack%20Adventures%2C%20I%20am%20enquiring%20about%20the%20${encodeURIComponent(
                    trek.name
                  )}%20trek`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-card bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider text-center block hover:bg-[#1EBE5D] transition-colors"
                >
                  Ask for Details on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Section */}
        <div id="trek-enquiry-box" className="py-16 max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold/60">
              Expedition Registration
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-cream">
              Join the {trek.name}
            </h2>
            <p className="text-xs sm:text-sm text-brand-cream/65">
              Submit your details to receive available batch dates and gear advisory.
            </p>
          </div>
          <div className="bg-brand-dark-light/60 border border-brand-gold/12 p-6 sm:p-10 rounded-card-lg shadow-2xl text-brand-dark">
            <EnquiryForm
              defaultDestination={`${trek.name} (${trek.region})`}
              defaultTravelType="Trek"
            />
          </div>
        </div>

        {/* Related Treks */}
        {relatedTreks.length > 0 && (
          <div className="py-16 border-t border-brand-gold/12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold/60">
                  Alternate Trails
                </span>
                <h2 className="font-editorial text-3xl font-bold text-brand-cream mt-1">
                   More Himalayan <span className="font-hand text-shimmer">Ascents</span>
                </h2>
              </div>
              <Link
                href="/treks"
                className="text-xs font-mono text-brand-gold hover:text-brand-cream flex items-center gap-1 uppercase tracking-wider"
              >
                View All Treks <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTreks.map((t) => (
                <TrekCard key={t.id} trek={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
