import React from "react";
import Link from "next/link";
import { ArrowRight, Mountain, Train, Compass, Star, MapPin } from "lucide-react";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatsBar } from "@/components/ui/StatsBar";
import { Carousel } from "@/components/ui/Carousel";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { TrekCard } from "@/components/cards/TrekCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { Button } from "@/components/ui/Button";
import { FAQSection } from "@/components/sections/FAQSection";
import { InternationalCarousel } from "@/components/sections/InternationalCarousel";
import { getDestinations, getPackages, getTreks, getExperiences, getTestimonials, getFAQs } from "@/lib/cms/store";

export const revalidate = 0;

export default async function HomePage() {
  const [destinations, featuredPackages, featuredTreks, experiences, testimonials, faqs] = await Promise.all([
    getDestinations(),
    getPackages({ featured: true }),
    getTreks({ featured: true }),
    getExperiences(),
    getTestimonials(),
    getFAQs(),
  ]);

  const domesticDestinations = destinations.filter((d) => d.isDomestic);
  const internationalDestinations = destinations.filter((d) => !d.isDomestic);

  const editorialImageMap: Record<string, string> = {
    "himachal-pradesh": "/images/editorial/philosophy.jpg",
    "kashmir": "/images/editorial/international.jpg",
    "leh-ladakh": "/images/destinations/leh-ladakh.jpg",
    "kinnaur": "/images/destinations/kinnaur.jpg",
    "uttarakhand": "/images/destinations/uttarakhand.jpg",
    "north-east": "/images/destinations/north-east.jpg",
    "andaman": "/images/destinations/andaman.jpg",
    "bali": "/images/destinations/bali.jpg",
    "dubai": "/images/destinations/dubai.jpg",
    "nepal": "/images/destinations/nepal.jpg",
    "singapore": "/images/destinations/singapore.jpg",
    "thailand": "/images/destinations/thailand.jpg",
  };

  return (
    <div>
      {/* 1. HERO - Auto-Toggle Image Carousel */}
      <HeroSection />

      {/* 2. STATS BAR - Single Strip */}
      <StatsBar />

      {/* 3. EDITORIAL INTRO - Light, Spacious */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
            <div className="space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center gap-2">
                <div className="w-8 h-px bg-brand-turquoise" /> Our Philosophy
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight leading-[1.05]">
                Travel Should Be{" "}
                <span className="font-hand text-shimmer text-[1.1em]">Deliberate</span>
              </h2>
              <p className="text-base sm:text-lg text-brand-dark/60 leading-relaxed max-w-lg">
                From the first conversation to the last mile of your journey, we handle every detail. Curated itineraries, verified accommodations, experienced guides, and round-the-hour support — all from our mountain headquarters in Shimla.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-card-2xl overflow-hidden shadow-luxury">
                <img src="/images/editorial/philosophy.jpg" alt="Himalayan landscape" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-card-xl p-5 shadow-luxury border border-brand-turquoise/5">
                <p className="font-hand text-2xl text-brand-turquoise">&ldquo;Mountains are calling&rdquo;</p>
                <p className="text-[10px] text-brand-taupe mt-1">— Every adventurer ever</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS - Domestic Carousel */}
      <section className="py-16 lg:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Explore India
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                Domestic <span className="font-hand text-shimmer text-[1.1em]">Destinations</span>
              </h2>
            </div>
            <Link href="/destinations?region=domestic" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light transition-colors">
              View All ({domesticDestinations.length}) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Carousel itemClassName="w-[320px] sm:w-[360px] lg:w-[400px]">
          {domesticDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </Carousel>
      </section>

      {/* 4. INTERNATIONAL ESCAPES - Auto-Toggle Carousel + Links */}
      <section className="py-16 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            {/* Auto-Toggle Image Carousel */}
            <div className="relative order-2 lg:order-1">
              <InternationalCarousel destinations={internationalDestinations} />
            </div>

            {/* Text + Links */}
            <div className="space-y-6 order-1 lg:order-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                <div className="w-8 h-px bg-brand-gold" /> International Escapes
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight leading-[1.05]">
                Beyond the{" "}
                <span className="font-hand text-shimmer text-[1.1em]">Borders</span>
              </h2>
              <p className="text-base text-brand-dark/60 leading-relaxed">
                Boutique international getaways featuring private villas, secluded island shores, and desert luxury with complete visa and concierge support.
              </p>
              <div className="space-y-3">
                {internationalDestinations.slice(0, 4).map((dest) => (
                  <Link key={dest.id} href={`/destinations/${dest.slug}`} className="flex items-center justify-between p-4 rounded-card-lg hover:bg-brand-turquoise-50 transition-all group border border-transparent hover:border-brand-turquoise/10">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-brand-turquoise" />
                      <span className="text-sm font-semibold text-brand-dark group-hover:text-brand-turquoise transition-colors">{dest.name}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-taupe group-hover:text-brand-turquoise group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
              <Link href="/destinations?region=international" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light transition-colors pt-2">
                Explore All Global <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED ADVENTURES - Carousel */}
      <section className="py-16 lg:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" /> Handcrafted Itineraries
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                Featured <span className="font-hand text-shimmer text-[1.1em]">Adventures</span>
              </h2>
            </div>
            <Link href="/packages" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light transition-colors">
              Browse All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Carousel itemClassName="w-[320px] sm:w-[380px] lg:w-[420px]">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </Carousel>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <Link href="/custom-package" className="group bg-white rounded-card-2xl border border-brand-turquoise/10 hover:border-brand-turquoise/20 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-luxury transition-all duration-500">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-3xl shrink-0">🧳</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                  Can&apos;t find your perfect journey?
                </p>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-brand-dark tracking-tight group-hover:text-brand-turquoise transition-colors">
                  Custom Package
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/55 leading-relaxed mt-1">
                  Choose your regions, duration, travellers, stays, cabs, and mountain experiences — we craft the rest.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-turquoise shrink-0">
              Build Custom Package <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* 6. TREKS - Light Section with Timeline Feel */}
      <section className="py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center justify-center gap-2">
              <Mountain className="w-3.5 h-3.5" /> High Himalayan Ascents
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              Into the <span className="font-hand text-shimmer text-[1.1em]">Mountains</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-dark/60 leading-relaxed">
              Curated Himalayan trekking experiences for explorers seeking something beyond conventional travel.
            </p>
          </div>
        </div>
        <Carousel itemClassName="w-[300px] sm:w-[340px] lg:w-[380px]">
          {featuredTreks.map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </Carousel>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
          <Button variant="outline" size="lg" href="/treks">
            Explore All Trek Routes &rarr;
          </Button>
        </div>
      </section>

      {/* 7. SERVICES - Interactive List */}
      <section className="py-16 lg:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
              Reliable Ground Logistics
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              Specialized Transport &{" "}
              <span className="font-hand text-shimmer text-[1.1em]">Pilgrimage</span> Desk
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {[
              { icon: "🚗", title: "Premium Cab Services", desc: "Airport transfers, local sightseeing, and mountain 4x4 transfers to Kinnaur and Spiti.", href: "/taxi-services", items: ["Toyota Innova Crysta & 4x4 Scorpio", "Professional mountain chauffeurs", "Transparent pricing"] },
              { icon: "🛕", title: "Pilgrimage Tour Packages", desc: "Comprehensive pilgrimage coordination across Char Dham and temple circuits.", href: "/pilgrimage-tour", items: ["Helicopter ticket support", "Private vehicle transfers", "Medical guidelines & packing"] },
              { icon: "🚂", title: "Bus & Toy Train", desc: "Heritage toy train rides and luxury Volvo buses connecting Delhi, Shimla, and Manali.", href: "/bus-booking", items: ["Kalka-Shimla Toy Train", "HPTDC & premium Volvo buses", "Express enquiry response"] },
            ].map((service, idx) => (
              <Link key={service.href} href={service.href} className="group bg-white rounded-card-xl p-5 sm:p-7 hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/15 relative overflow-hidden">
                <div className="absolute top-5 right-5 text-[80px] font-editorial font-bold text-brand-turquoise/[0.03] leading-none select-none pointer-events-none">0{idx + 1}</div>
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h3 className="font-editorial text-xl font-bold text-brand-dark group-hover:text-brand-turquoise transition-colors mb-2">{service.title}</h3>
                <p className="text-sm text-brand-dark/60 leading-relaxed mb-4">{service.desc}</p>
                <ul className="space-y-2 mb-6">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-xs text-brand-taupe flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise mt-1.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-turquoise group-hover:gap-2.5 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS - Carousel */}
      <section className="py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center justify-center gap-2">
              <Star className="w-3.5 h-3.5" /> Guest Reflections
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              Words From Our <span className="font-hand text-shimmer text-[1.1em]">Travelers</span>
            </h2>
          </div>
        </div>
        <Carousel itemClassName="w-[320px] sm:w-[380px] lg:w-[420px]">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </Carousel>
      </section>

      {/* 9. FAQ - Dynamic Section */}
      {faqs.length > 0 && (
        <section className="py-16 lg:py-28 bg-brand-cream">
          <FAQSection faqs={faqs} />
        </section>
      )}

      {/* 10. ENQUIRY - Clean, Light */}
      <section className="py-16 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">Direct Himalayan Concierge</span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark">
              Begin Your Travel <span className="font-hand text-shimmer text-[1.1em]">Story</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-taupe max-w-md mx-auto">Share your travel aspirations. Our planners in Kasumpti, Shimla craft each journey individually.</p>
          </div>
          <div className="bg-brand-cream border border-brand-turquoise/5 p-6 sm:p-10 rounded-card-2xl shadow-luxury">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
