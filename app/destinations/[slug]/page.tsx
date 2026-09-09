import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MapPin, Calendar, Compass, Mountain, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PackageCard } from "@/components/cards/PackageCard";
import { TrekCard } from "@/components/cards/TrekCard";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { getDestinationBySlug, getPackages, getTreks } from "@/lib/cms/store";
import { getTouristDestinationSchema } from "@/lib/seo";

export const revalidate = 0;

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: "Destination Not Found" };

  return {
    title: destination.seoTitle || `${destination.name} Tour Packages & Travel Guide`,
    description: destination.seoDescription || destination.shortDescription,
    openGraph: {
      title: `${destination.name} | Rucksack Adventures`,
      description: destination.shortDescription,
    },
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const [allPackages, allTreks] = await Promise.all([
    getPackages({ destinationSlug: destination.slug }),
    getTreks(),
  ]);

  const relatedTreks = allTreks.filter((t) =>
    t.region.toLowerCase().includes(destination.name.toLowerCase()) ||
    destination.name.toLowerCase().includes(t.region.toLowerCase().split(",")[0])
  );

  const jsonLd = getTouristDestinationSchema({
    name: destination.name,
    description: destination.fullDescription,
    region: destination.region,
    url: `https://rucksackadventures.com/destinations/${destination.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-24 pb-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: destination.name },
            ]}
          />

          {/* Hero Header */}
          <div className="py-8 border-b border-brand-brown/30 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown mb-3">
              <MapPin className="w-3.5 h-3.5 text-brand-brown" />
              <span>{destination.region}</span>
              <span>•</span>
              <span>{destination.isDomestic ? "Domestic Himalayas" : "International Sanctuary"}</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-black tracking-tight mb-4">
              {destination.name}
            </h1>

            <p className="text-base sm:text-xl text-brand-charcoal/80 max-w-3xl leading-relaxed">
              {destination.shortDescription}
            </p>
          </div>

          {/* Large Aspect Hero Image Placeholder */}
          <div className="mb-14 rounded-sm overflow-hidden border border-brand-brown/30 shadow-luxury">
            <ImagePlaceholder
              src={destination.heroImage}
              alt={destination.name}
              aspectRatio="21:9"
              category={destination.region}
              label={destination.name}
            />
          </div>

          {/* Introduction & Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-brown/20">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-black">
                The Essence of {destination.name}
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
                {destination.fullDescription}
              </p>

              <div className="pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-brown mb-4">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-brand-cream/40 border border-brand-brown/30 rounded-xs flex items-center gap-2.5 text-xs sm:text-sm text-brand-charcoal"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-brown shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Meta Box */}
            <div className="lg:col-span-4">
              <div className="bg-brand-cream/60 border border-brand-brown/40 rounded-sm p-6 space-y-5 sticky top-28">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-taupe">
                    Best Season
                  </span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-black">
                    <Calendar className="w-4 h-4 text-brand-brown" />
                    <span>{destination.bestTimeToVisit}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-3 border-t border-brand-brown/20">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-taupe">
                    Operating Desk
                  </span>
                  <p className="text-xs text-brand-charcoal/85">
                    Kasumpti Operations Center, Shimla. All packages customized directly by local destination heads.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="#enquire-section"
                    className="w-full py-3 px-4 rounded-sm bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider text-center block hover:bg-brand-brown-dark transition-colors"
                  >
                    Enquire for {destination.name}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Available Packages in this Destination */}
          <div className="py-16 border-b border-brand-brown/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-brown">
                  Journeys
                </span>
                <h2 className="font-editorial text-3xl font-bold text-brand-black mt-1">
                  Curated Packages in {destination.name}
                </h2>
              </div>
              <span className="text-xs text-brand-taupe">
                {allPackages.length} Available
              </span>
            </div>

            {allPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="p-8 bg-brand-cream/30 border border-brand-brown/30 rounded-sm text-center">
                <p className="text-sm text-brand-taupe">
                  Custom itineraries are crafted on-demand for {destination.name}. Submit your travel dates below to receive a private itinerary.
                </p>
              </div>
            )}
          </div>

          {/* Associated Himalayan Treks if applicable */}
          {relatedTreks.length > 0 && (
            <div className="py-16 border-b border-brand-brown/20">
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-brown">
                  High Altitude Routes
                </span>
                <h2 className="font-editorial text-3xl font-bold text-brand-black mt-1">
                  Himalayan Treks in {destination.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTreks.map((trek) => (
                  <TrekCard key={trek.id} trek={trek} />
                ))}
              </div>
            </div>
          )}

          {/* Enquiry Section */}
          <div id="enquire-section" className="py-16 max-w-4xl mx-auto">
            <div className="text-center mb-8 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-brown">
                Custom Itinerary
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-black">
                Plan Your Journey to {destination.name}
              </h2>
              <p className="text-xs sm:text-sm text-brand-taupe">
                Speak directly with our regional destination specialist in Shimla.
              </p>
            </div>

            <div className="bg-brand-cream/30 border border-brand-brown/40 p-6 sm:p-10 rounded-sm shadow-luxury">
              <EnquiryForm defaultDestination={destination.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
