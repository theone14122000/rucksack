import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Compass,
  HeartHandshake,
  Leaf,
  Mountain,
  ShieldCheck,
  Sparkles,
  Tent,
  Users,
  Waves,
} from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CommunityCTA } from "@/components/sections/CommunityCTA";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Rucksack Adventures | Adventure Travel in Himachal Pradesh",
  description:
    "About Rucksack Adventures — adventure travel in Himachal Pradesh since 2018. Trekking, outdoor experiences and customized adventures crafted by Shimla-based mountain specialists.",
};

const commitments = [
  {
    icon: ShieldCheck,
    title: "Safety",
    description:
      "Experienced guides, appropriate equipment and careful planning sit at the core of every journey we design.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We travel light on the land — supporting eco-conscious stays and low-impact mountain practices.",
  },
  {
    icon: HeartHandshake,
    title: "Responsible Travel",
    description:
      "Respect for nature, local communities and mountain culture shapes every itinerary we craft.",
  },
  {
    icon: Users,
    title: "Experienced Guides",
    description:
      "We work with experienced guides who share our enthusiasm for the great outdoors.",
  },
  {
    icon: Compass,
    title: "Carefully Designed Experiences",
    description:
      "Every destination is handpicked and every itinerary designed around the traveler, never templated.",
  },
];

const services = [
  {
    icon: Mountain,
    title: "Trekking",
    description:
      "Guided Himalayan treks with route planning and appropriate safety considerations.",
    href: "/treks",
  },
  {
    icon: Bike,
    title: "Cycling",
    description:
      "Mountain biking and scenic cycling trails across Himachal's valleys and passes.",
    href: "/activities",
  },
  {
    icon: Waves,
    title: "Water Adventures",
    description:
      "River rafting and water-based thrills run with experienced professionals.",
    href: "/activities",
  },
  {
    icon: Compass,
    title: "Mountain Adventures",
    description:
      "4x4 expeditions, Gypsy tours and high-altitude explorations.",
    href: "/taxi-services",
  },
  {
    icon: Tent,
    title: "Nature Experiences",
    description:
      "Camping, village walks, photography and slow immersion in mountain life.",
    href: "/experiences",
  },
  {
    icon: Sparkles,
    title: "Custom Trips",
    description:
      "Fully custom-designed trips for solo adventurers, couples, families and groups.",
    href: "/custom-package",
  },
];

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rucksackadventures.com" },
    { name: "About Us", url: "https://rucksackadventures.com/about" },
  ]);

  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About Us" }]} />

        {/* Hero */}
        <div className="py-8 sm:py-12 border-b border-brand-turquoise/30 mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-turquoise block mb-3">
            Rucksack Adventures
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-4">
            Pack Your{" "}
            <span className="font-hand text-shimmer">Rucksack!</span>
          </h1>
          <p className="font-hand text-2xl sm:text-3xl text-brand-turquoise">
            Explore. Experience. Discover.
          </p>
        </div>

        {/* Mission & Passion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center mb-16 sm:mb-24">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center gap-2">
              <div className="w-8 h-px bg-brand-turquoise" /> Our Mission & Passion
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight leading-[1.05]">
              Driven by{" "}
              <span className="font-hand text-shimmer text-[1.1em]">Wanderlust</span>
            </h2>
            <p className="text-base sm:text-lg text-brand-dark/60 leading-relaxed">
              At Rucksack Adventure, we are passionate about exploring the
              world&apos;s most breathtaking destinations and experiencing the
              thrill of adventure. Our mission is to inspire and empower
              adventurers like you to embark on life-changing journeys filled
              with excitement, discovery, and unforgettable memories.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-card-2xl overflow-hidden shadow-luxury">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/editorial/philosophy.jpg"
                alt="Himalayan landscape"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-card-xl p-5 shadow-luxury border border-brand-turquoise/5">
              <p className="font-hand text-2xl text-brand-turquoise">
                &ldquo;Mountains are calling&rdquo;
              </p>
              <p className="text-[10px] text-brand-taupe mt-1">
                — Every adventurer ever
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-card-2xl border border-brand-turquoise/5 p-6 sm:p-10 lg:p-12 mb-16 sm:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:text-left">
            <p className="font-editorial text-7xl sm:text-8xl font-bold text-shimmer leading-none">
              2018
            </p>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise mt-2">
              The year it all began
            </p>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
              Our Story
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
              A Rucksack, A Dream & the Open Trail
            </h2>
            <p className="text-sm sm:text-base text-brand-dark/60 leading-relaxed">
              Founded in 2018, Rucksack Adventure has its roots in a shared
              love for exploration and a deep connection to nature. We started
              this journey with a rucksack and a dream to share the
              world&apos;s hidden gems with fellow adventure seekers. What
              began as a personal quest soon blossomed into a thriving
              community of adventurers who are as passionate about travel as
              we are.
            </p>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
              Our Commitment
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              The Rucksack{" "}
              <span className="font-hand text-shimmer text-[1.1em]">Promise</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-dark/60 leading-relaxed">
              At Rucksack Adventure, we are committed to providing you with
              the ultimate adventure travel experience. We handpick every
              destination, design each itinerary, and work with experienced
              guides who share our enthusiasm for the great outdoors. Safety,
              sustainability, and responsible travel are at the core of
              everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {commitments.map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-card-xl p-5 sm:p-6 hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/15"
              >
                <div className="w-11 h-11 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center mb-4 group-hover:bg-brand-turquoise group-hover:text-white text-brand-turquoise transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-brand-dark group-hover:text-brand-turquoise transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-dark/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
              Our Services
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              Adventures for Every{" "}
              <span className="font-hand text-shimmer text-[1.1em]">Kind of Explorer</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-dark/60 leading-relaxed">
              Whether you&apos;re into trekking through remote mountain ranges
              or cycling along picturesque trails, we offer a wide range of
              adventure travel packages to suit your interests and skill level.
              Our custom-designed trips cater to solo adventurers, couples,
              families, and groups.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-card-xl p-5 sm:p-6 hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-brand-turquoise/5 hover:border-brand-turquoise/15"
              >
                <div className="w-11 h-11 rounded-full bg-brand-turquoise/5 border border-brand-turquoise/10 flex items-center justify-center mb-4 group-hover:bg-brand-turquoise group-hover:text-white text-brand-turquoise transition-all duration-300">
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-brand-dark group-hover:text-brand-turquoise transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-dark/60 leading-relaxed mb-3">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-turquoise">
                  Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16 sm:mb-24">
          <WhyChooseUs />
        </div>

        {/* Join Our Community */}
        <div className="bg-white rounded-card-2xl border border-brand-turquoise/5 p-6 sm:p-10 mb-16 sm:mb-24">
          <CommunityCTA />
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-brand-dark tracking-tight">
            Ready to Write Your{" "}
            <span className="font-hand text-shimmer">Story</span>?
          </h2>
          <p className="text-sm text-brand-taupe max-w-lg mx-auto">
            Tell us where you want to go. We will handle everything else.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-turquoise text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-brand-turquoise-light transition-colors"
            >
              Plan Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-3 border border-brand-turquoise/25 text-brand-dark text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-brand-turquoise/5 transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
