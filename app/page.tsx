import React from "react";
import Link from "next/link";
import { ArrowRight, Mountain, Car, Train, ShieldCheck, Sparkles, Compass } from "lucide-react";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { DomesticInternationalSplit } from "@/components/sections/DomesticInternationalSplit";
import { TopographicContour3D } from "@/components/sections/TopographicContour3D";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { TrekCard } from "@/components/cards/TrekCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import {
  getDestinations,
  getPackages,
  getTreks,
  getExperiences,
  getTestimonials,
  getFAQs,
} from "@/lib/cms/store";

export const revalidate = 0; // Fresh CMS data on every request

export default async function HomePage() {
  const [destinations, featuredPackages, featuredTreks, experiences, testimonials, faqs] =
    await Promise.all([
      getDestinations(),
      getPackages({ featured: true }),
      getTreks({ featured: true }),
      getExperiences(),
      getTestimonials(),
      getFAQs(),
    ]);

  const domesticDestinations = destinations.filter((d) => d.isDomestic);
  const internationalDestinations = destinations.filter((d) => !d.isDomestic);

  return (
    <div className="space-y-0">
      {/* SECTION 01 — HERO */}
      <HeroSection />

      {/* SECTION 02 — TRUST / CREDIBILITY STRIP */}
      <TrustStrip />

      {/* SECTION 03 — DISCOVER INDIA: DOMESTIC DESTINATIONS */}
      <section className="py-20 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-brand-sand" /> Domestic Exploration
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-deep tracking-tight">
                Journeys Across India
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
                Curated journeys across towering mountains, emerald valleys, living heritage, and spiritual frontiers. Handcrafted from our local Shimla headquarters.
              </p>
            </div>

            <Link
              href="/destinations?region=domestic"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-deep hover:text-brand-warm transition-colors py-2 px-4 rounded-sm border border-brand-sand/40 hover:bg-brand-cream/60 shrink-0 self-start md:self-auto"
            >
              <span>View All Domestic ({domesticDestinations.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domesticDestinations.slice(0, 6).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 — DOMESTIC / INTERNATIONAL SPLIT */}
      <DomesticInternationalSplit />

      {/* SECTION 05 — INTERNATIONAL DESTINATIONS */}
      <section className="py-20 bg-brand-cream/30 border-b border-brand-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
                Global Sanctuaries
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-deep tracking-tight">
                International Escapes
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
                Boutique international getaways featuring private villas, secluded island shores, and desert luxury with complete visa and concierge support.
              </p>
            </div>

            <Link
              href="/destinations?region=international"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-deep hover:text-brand-warm transition-colors py-2 px-4 rounded-sm border border-brand-sand/40 hover:bg-brand-cream/60 shrink-0 self-start md:self-auto"
            >
              <span>Explore All Global ({internationalDestinations.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — FEATURED JOURNEYS */}
      <section className="py-20 bg-brand-offwhite border-b border-brand-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
                Handcrafted Itineraries
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-deep tracking-tight">
                Featured Journeys
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
                Thoughtfully paced, deeply immersive itineraries with verified mountain chauffeurs and handpicked boutique accommodations.
              </p>
            </div>

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-deep hover:text-brand-warm transition-colors py-2 px-4 rounded-sm border border-brand-sand/40 hover:bg-brand-cream/60 shrink-0 self-start md:self-auto"
            >
              <span>Browse All Packages ({featuredPackages.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 07 — TREKKING SECTION: INTO THE MOUNTAINS */}
      <section className="py-24 bg-brand-espresso text-brand-cream relative overflow-hidden border-b border-brand-sand/30">
        <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-[0.25em] text-brand-sand">
              <Mountain className="w-4 h-4 text-brand-sand" /> High Himalayan Ascents
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-offwhite tracking-tight">
              Into the Mountains
            </h2>
            <p className="text-sm sm:text-base text-brand-cream/80 leading-relaxed">
              Curated Himalayan trekking experiences for explorers seeking something beyond conventional travel. Certified wilderness leaders, medical oxygen support, and 4-season alpine gear.
            </p>
          </div>

          {/* Interactive 3D Topographic Contour */}
          <div className="mb-14 rounded-sm border border-brand-sand/30 bg-brand-deep/80 overflow-hidden shadow-2xl">
            <TopographicContour3D />
          </div>

          {/* Trek Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTreks.map((trek) => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" href="/treks" className="border-brand-sand/40 text-brand-cream hover:bg-brand-sand/15">
              Explore All Himalayan Trek Routes →
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 08 — EXPERIENCES BEYOND PACKAGES */}
      <section className="py-20 bg-brand-cream/40 border-b border-brand-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
              Curated Travel Styles
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-deep tracking-tight">
              Signature Travel Experiences
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
              Tailored journeys designed around your personal travel rhythm — from romantic alpine sanctuaries to family expeditions and sacred pilgrimages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-brand-offwhite border border-brand-sand/30 rounded-sm p-6 space-y-4 hover:border-brand-deep transition-all duration-300 hover:shadow-luxury"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-taupe bg-brand-cream px-2 py-0.5 rounded-xs border border-brand-sand/30">
                    {exp.category}
                  </span>
                  <Sparkles className="w-4 h-4 text-brand-sand" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-brand-deep">
                  {exp.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                  {exp.shortDescription}
                </p>
                <div className="pt-2 border-t border-brand-sand/15 space-y-1">
                  {exp.highlights.slice(0, 2).map((h, idx) => (
                    <p key={idx} className="text-xs text-brand-taupe flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-sand" /> {h}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 09 — SPECIALIZED SERVICES SUMMARY (Taxi, Amarnath, Bus, Railway) */}
      <section className="py-20 bg-brand-offwhite border-b border-brand-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
              Reliable Ground Logistics
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-deep tracking-tight">
              Specialized Transport & Pilgrimage Desk
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
              Operating our own private fleet and reservation desks from Mehli, Shimla to ensure uninterrupted mountain travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Taxi Services */}
            <div className="bg-brand-cream/30 border border-brand-sand/30 rounded-sm p-7 flex flex-col justify-between hover:border-brand-deep transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-sm bg-brand-deep text-brand-sand flex items-center justify-center">
                  <Car className="w-6 h-6 text-brand-sand" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-brand-deep">
                  Shimla Taxi & Outstation Fleet
                </h3>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                  Dedicated airport transfers (Chandigarh, Delhi, Shimla Jubbarhatti), local Shimla heritage sightseeing, and rugged mountain 4x4 transfers to Kinnaur and Spiti.
                </p>
                <ul className="text-xs text-brand-taupe space-y-1.5 pt-2">
                  <li>✓ Toyota Innova Crysta & 4x4 Scorpio</li>
                  <li>✓ Professional local Pahari mountain chauffeurs</li>
                  <li>✓ Transparent pricing with zero hidden toll surprises</li>
                </ul>
              </div>
              <div className="pt-6 mt-4 border-t border-brand-sand/20">
                <Button variant="outline" size="sm" href="/taxi-services" fullWidth>
                  Explore Taxi Services & Rates →
                </Button>
              </div>
            </div>

            {/* Service 2: Amarnath Yatra */}
            <div className="bg-brand-cream/30 border border-brand-sand/30 rounded-sm p-7 flex flex-col justify-between hover:border-brand-deep transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-sm bg-brand-deep text-brand-sand flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-brand-sand" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-brand-deep">
                  Amarnath Yatra Tours
                </h3>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                  Comprehensive pilgrimage coordination including helicopter slots from Baltal and Pahalgam, compulsory health certificate guidance, and verified luxury camp lodgings.
                </p>
                <ul className="text-xs text-brand-taupe space-y-1.5 pt-2">
                  <li>✓ Helicopter ticket pre-registration support</li>
                  <li>✓ Private vehicle transfers from Srinagar</li>
                  <li>✓ Dedicated medical guidelines & packing advisory</li>
                </ul>
              </div>
              <div className="pt-6 mt-4 border-t border-brand-sand/20">
                <Button variant="outline" size="sm" href="/amarnath-yatra" fullWidth>
                  View Amarnath Tour Details →
                </Button>
              </div>
            </div>

            {/* Service 3: Bus & Railway Booking */}
            <div className="bg-brand-cream/30 border border-brand-sand/30 rounded-sm p-7 flex flex-col justify-between hover:border-brand-deep transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-sm bg-brand-deep text-brand-sand flex items-center justify-center">
                  <Train className="w-6 h-6 text-brand-sand" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-brand-deep">
                  Bus & Toy Train Reservation
                </h3>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                  Ticketing assistance for UNESCO Kalka-Shimla heritage toy train rides and luxury Volvo/Scania multi-axle buses connecting Delhi, Chandigarh, Shimla, and Manali.
                </p>
                <ul className="text-xs text-brand-taupe space-y-1.5 pt-2">
                  <li>✓ Kalka-Shimla Toy Train confirmed bookings</li>
                  <li>✓ HPTDC & premium private Volvo buses</li>
                  <li>✓ Express enquiry response desk</li>
                </ul>
              </div>
              <div className="pt-6 mt-4 border-t border-brand-sand/20">
                <Button variant="outline" size="sm" href="/bus-booking" fullWidth>
                  Enquire for Bus & Trains →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — TESTIMONIALS */}
      <section className="py-20 bg-brand-cream/40 border-b border-brand-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
              Guest Reflections
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-deep tracking-tight">
              Words From Our Travelers
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed">
              Real stories from families, couples, and trekkers who have trusted Rucksack Adventures for over eight years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 — QUICK ENQUIRY SECTION */}
      <section className="py-20 bg-brand-offwhite border-b border-brand-sand/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
              Direct Himalayan Concierge
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-deep">
              Begin Your Travel Story
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe max-w-md mx-auto">
              Share your travel aspirations. Our planners in Mehli, Shimla craft each journey individually.
            </p>
          </div>

          <div className="bg-brand-cream/30 border border-brand-sand/40 p-6 sm:p-10 rounded-sm shadow-luxury">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* SECTION 12 — FAQ ACCORDION */}
      <section className="py-20 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
