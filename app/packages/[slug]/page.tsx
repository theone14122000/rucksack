import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getPackageImage } from "@/lib/utils/images";
import { PackageCard } from "@/components/cards/PackageCard";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { getPackageBySlug, getPackages } from "@/lib/cms/store";

export const revalidate = 0;

interface PackagePageProps {
  params: Promise<{ slug: string }>;
}

const WHATSAPP_NUMBER = "917018678064";

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };

  return {
    title: pkg.seoTitle || `${pkg.title} | ${pkg.duration} Adventure`,
    description: pkg.seoDescription || pkg.shortDescription,
    openGraph: {
      title: `${pkg.title} | Rucksack Adventures`,
      description: pkg.shortDescription,
    },
  };
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const allPackages = await getPackages();
  const relatedPackages = allPackages
    .filter((p) => p.id !== pkg.id)
    .slice(0, 3);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Rucksack Adventures! I'm interested in the "${pkg.title}" adventure. Please share the details and itinerary.`
  )}`;

  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Adventures", href: "/packages" },
            { label: pkg.destination, href: `/destinations/${pkg.destinationSlug}` },
            { label: pkg.title },
          ]}
        />

        {/* Hero Header */}
        <div className="py-8 border-b border-brand-turquoise/15 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {pkg.destination}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {pkg.duration}
            </span>
            <span>&bull;</span>
            <span className="text-brand-taupe">{pkg.travelStyle}</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            {pkg.title}
          </h1>
          <p className="text-base sm:text-xl text-brand-dark/75 max-w-3xl leading-relaxed">
            {pkg.shortDescription}
          </p>
        </div>

        {/* Visual Hero */}
        <div className="mb-14 rounded-card-lg overflow-hidden border border-brand-turquoise/12 shadow-luxury">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getPackageImage(pkg.slug)}
            alt={pkg.title}
            className="w-full h-auto object-cover aspect-[21/9]"
            loading="lazy"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-turquoise/12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-4">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark">
                Journey Overview
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/80 leading-relaxed whitespace-pre-line">
                {pkg.overview}
              </p>
            </section>

            <section className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
                  Day-Wise Route
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark mt-1">
                  Detailed Itinerary
                </h2>
              </div>
              <div className="relative border-l border-brand-turquoise/20 pl-6 sm:pl-8 space-y-8 ml-3">
                {pkg.itinerary.map((item) => (
                  <div key={item.day} className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-brand-turquoise text-brand-cream text-[11px] font-mono font-bold flex items-center justify-center border-2 border-brand-cream shadow-xs">
                      {item.day}
                    </div>
                    <div className="bg-brand-cream/30 border border-brand-turquoise/12 p-5 rounded-card space-y-2 group-hover:border-brand-turquoise/25 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-editorial text-xl font-bold text-brand-dark">
                          Day {item.day}: {item.title}
                        </h3>
                        {item.meals && (
                          <span className="text-[10px] font-mono text-brand-turquoise uppercase bg-brand-cream/60 px-2 py-0.5 rounded-card border border-brand-turquoise/15">
                            Meals: {item.meals}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-brand-dark/75 leading-relaxed">
                        {item.description}
                      </p>
                      {item.stay && (
                        <p className="text-xs text-brand-taupe pt-1 font-medium">
                          Stay: <span className="text-brand-dark">{item.stay}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-turquoise/12">
              <div className="bg-brand-cream/30 border border-brand-turquoise/15 p-6 rounded-card space-y-3">
                <h3 className="font-editorial text-xl font-bold text-brand-dark flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-turquoise" />
                  What Is Included
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-brand-dark/80">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-turquoise font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-cream border border-brand-turquoise/10 p-6 rounded-card space-y-3">
                <h3 className="font-editorial text-xl font-bold text-brand-dark flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-brand-yellow" />
                  What Is Excluded
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-brand-dark/70">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-yellow font-bold">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {pkg.faqs && pkg.faqs.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-brand-turquoise/12">
                <h3 className="font-editorial text-2xl font-bold text-brand-dark">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {pkg.faqs.map((f, i) => (
                    <div key={i} className="p-4 bg-brand-cream/30 border border-brand-turquoise/12 rounded-card space-y-1.5">
                      <h4 className="text-sm font-bold text-brand-dark">{f.question}</h4>
                      <p className="text-xs text-brand-dark/70 leading-relaxed">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column — No Prices */}
          <div className="lg:col-span-4">
            <div className="bg-brand-cream/30 border border-brand-turquoise/15 rounded-card-lg p-6 sm:p-7 space-y-6 sticky top-28 shadow-luxury">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-yellow block mb-1">
                  Custom Pricing
                </span>
                <p className="font-hand text-2xl text-brand-turquoise">
                  Ask for Details
                </p>
                <p className="text-[11px] text-brand-taupe mt-1">
                  Pricing varies by group size, season, and customization. Contact us for a personalized quote.
                </p>
              </div>
              <div className="space-y-2.5 pt-4 border-t border-brand-turquoise/15 text-xs text-brand-dark/80">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-turquoise shrink-0" />
                  No Hidden Booking Charges
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
                  Operated from Kasumpti, Shimla
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                  Flexible Departure Dates
                </p>
              </div>
              <div className="pt-2 space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-card bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask for Details on WhatsApp
                </a>
                <a
                  href="#enquire-form-box"
                  className="w-full py-3 px-4 rounded-card bg-brand-turquoise text-brand-cream text-xs font-semibold uppercase tracking-wider text-center block hover:bg-brand-turquoise-light transition-colors shadow-xs"
                >
                  Send Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Section */}
        <div id="enquire-form-box" className="py-16 max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
              Direct Reservation Desk
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-dark">
              Customize Your {pkg.destination} Expedition
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe">
              Tell us your group size, travel dates, and preferences.
            </p>
          </div>
          <div className="bg-brand-cream/30 border border-brand-turquoise/12 p-6 sm:p-10 rounded-card-lg shadow-luxury">
            <EnquiryForm
              defaultDestination={`${pkg.destination} (${pkg.title})`}
              defaultTravelType={pkg.isInternational ? "International" : "Domestic"}
            />
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="py-16 border-t border-brand-turquoise/12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">
                  More Expeditions
                </span>
                <h2 className="font-editorial text-3xl font-bold text-brand-dark mt-1">
                  You Might Also <span className="font-hand text-brand-turquoise">Love</span>
                </h2>
              </div>
              <Link
                href="/packages"
                className="text-xs font-semibold text-brand-dark hover:text-brand-turquoise flex items-center gap-1 uppercase tracking-wider"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPackages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
