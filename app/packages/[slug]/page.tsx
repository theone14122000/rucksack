import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PackageCard } from "@/components/cards/PackageCard";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { getPackageBySlug, getPackages } from "@/lib/cms/store";
import { formatPrice } from "@/lib/utils";

export const revalidate = 0;

interface PackagePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found" };

  return {
    title: pkg.seoTitle || `${pkg.title} | ${pkg.duration} Tour Package`,
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

  return (
    <div className="pt-24 pb-20 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Packages", href: "/packages" },
            { label: pkg.destination, href: `/destinations/${pkg.destinationSlug}` },
            { label: pkg.title },
          ]}
        />

        {/* Hero Header */}
        <div className="py-8 border-b border-brand-sand/30 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand-sand mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-sand" />
              {pkg.destination}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-sand" />
              {pkg.duration}
            </span>
            <span>•</span>
            <span className="text-brand-taupe">{pkg.travelStyle}</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-deep tracking-tight mb-4">
            {pkg.title}
          </h1>

          <p className="text-base sm:text-xl text-brand-charcoal/80 max-w-3xl leading-relaxed">
            {pkg.shortDescription}
          </p>
        </div>

        {/* Visual Hero */}
        <div className="mb-14 rounded-sm overflow-hidden border border-brand-sand/30 shadow-luxury">
          <ImagePlaceholder
            src={pkg.heroImage}
            alt={pkg.title}
            aspectRatio="21:9"
            category={pkg.travelStyle}
            label={pkg.destination}
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-sand/20">
          {/* Left Column: Overview, Itinerary, Inclusions/Exclusions, FAQs */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-deep">
                Journey Overview
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed whitespace-pre-line">
                {pkg.overview}
              </p>
            </section>

            {/* Day by Day Itinerary */}
            <section className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-sand">
                  Day-Wise Route
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-deep mt-1">
                  Detailed Itinerary
                </h2>
              </div>

              <div className="relative border-l border-brand-sand/40 pl-6 sm:pl-8 space-y-8 ml-3">
                {pkg.itinerary.map((item) => (
                  <div key={item.day} className="relative group">
                    {/* Day Marker Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-brand-deep text-brand-offwhite text-[11px] font-mono font-bold flex items-center justify-center border-2 border-brand-offwhite shadow-xs">
                      {item.day}
                    </div>

                    <div className="bg-brand-cream/30 border border-brand-sand/25 p-5 rounded-sm space-y-2 group-hover:border-brand-sand transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-editorial text-xl font-bold text-brand-deep">
                          Day {item.day}: {item.title}
                        </h3>
                        {item.meals && (
                          <span className="text-[10px] font-mono text-brand-sand uppercase bg-brand-offwhite px-2 py-0.5 rounded-xs border border-brand-sand/30">
                            Meals: {item.meals}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                        {item.description}
                      </p>

                      {item.stay && (
                        <p className="text-xs text-brand-taupe pt-1 font-medium">
                          Stay: <span className="text-brand-charcoal">{item.stay}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-sand/20">
              <div className="bg-brand-cream/40 border border-brand-sand/30 p-6 rounded-sm space-y-3">
                <h3 className="font-editorial text-xl font-bold text-brand-deep flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  What Is Included
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-brand-charcoal/85">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-cream/20 border border-brand-sand/25 p-6 rounded-sm space-y-3">
                <h3 className="font-editorial text-xl font-bold text-brand-deep flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-700" />
                  What Is Excluded
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-brand-charcoal/75">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQs */}
            {pkg.faqs && pkg.faqs.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-brand-sand/20">
                <h3 className="font-editorial text-2xl font-bold text-brand-deep">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {pkg.faqs.map((f, i) => (
                    <div
                      key={i}
                      className="p-4 bg-brand-cream/30 border border-brand-sand/25 rounded-xs space-y-1.5"
                    >
                      <h4 className="text-sm font-bold text-brand-deep">{f.question}</h4>
                      <p className="text-xs text-brand-charcoal/80 leading-relaxed">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Booking / Pricing Box */}
          <div className="lg:col-span-4">
            <div className="bg-brand-cream/60 border border-brand-sand/40 rounded-sm p-6 sm:p-7 space-y-6 sticky top-28 shadow-lg">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-taupe block mb-1">
                  Starting Price
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-editorial text-3xl sm:text-4xl font-bold text-brand-deep">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-xs text-brand-taupe">/ person</span>
                </div>
                <p className="text-[11px] text-brand-taupe mt-1">
                  * Based on twin-sharing accommodation. Customized options available.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-brand-sand/20 text-xs text-brand-charcoal/85">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  No Hidden Booking Charges
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-sand shrink-0" />
                  Operated from Kasumpti, Shimla
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-sand shrink-0" />
                  Flexible Departure Dates
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href="#enquire-form-box"
                  className="w-full py-3.5 px-4 rounded-sm bg-brand-deep text-brand-offwhite text-xs font-semibold uppercase tracking-wider text-center block hover:bg-brand-espresso transition-colors shadow-xs"
                >
                  Reserve This Journey
                </a>
                <a
                  href={`https://wa.me/917018678064?text=Hello%20Rucksack%20Adventures%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                    pkg.title
                  )}%20package`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-sm bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider text-center block hover:bg-[#1EBE5D] transition-colors shadow-xs"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Section */}
        <div id="enquire-form-box" className="py-16 max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-sand">
              Direct Reservation Desk
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-deep">
              Customize Your {pkg.destination} Expedition
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe">
              Tell us your group size, travel dates, and preferences.
            </p>
          </div>

          <div className="bg-brand-cream/30 border border-brand-sand/40 p-6 sm:p-10 rounded-sm shadow-luxury">
            <EnquiryForm
              defaultDestination={`${pkg.destination} (${pkg.title})`}
              defaultTravelType={pkg.isInternational ? "International" : "Domestic"}
            />
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <div className="py-16 border-t border-brand-sand/20">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-sand">
                  More Expeditions
                </span>
                <h2 className="font-editorial text-3xl font-bold text-brand-deep mt-1">
                  You Might Also Revere
                </h2>
              </div>
              <Link
                href="/packages"
                className="text-xs font-semibold text-brand-deep hover:text-brand-warm flex items-center gap-1 uppercase tracking-wider"
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
