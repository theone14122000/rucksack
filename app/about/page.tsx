import React from "react";
import { Metadata } from "next";
import { Mountain, Users, Award, Heart, Shield, Globe, Compass, ArrowRight, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Rucksack Adventures | Himalayan Travel Experts Since 2018",
  description: "Learn about Rucksack Adventures — a Shimla-based premium tour operator specialising in curated Himalayan journeys, domestic & international travel, and trekking expeditions across India.",
};

const stats = [
  { icon: Award, value: "8+", label: "Years of Experience" },
  { icon: Star, value: "4.6", label: "Google Rating" },
  { icon: Users, value: "242+", label: "Verified Ratings" },
  { icon: Globe, value: "50+", label: "Destinations Covered" },
];

const values = [
  { icon: Mountain, title: "Mountain-First Philosophy", description: "Every itinerary is designed with deep respect for Himalayan ecosystems. We partner with local communities, eco-lodges, and follow Leave No Trace principles on every trek and journey." },
  { icon: Heart, title: "Genuine Care", description: "Travel is personal. We listen first — to your pace, your interests, your comfort level — before crafting a single suggestion. Your journey should feel like yours, not a template." },
  { icon: Shield, title: "Safety as a Standard", description: "Certified mountain guides, verified vehicles, real-time weather monitoring, and emergency protocols are non-negotiable on every Rucksack Adventures trip." },
  { icon: Compass, title: "Local Expertise", description: "Rooted in Shimla, we know these mountains intimately. Our team comprises locals who have walked every trail, driven every mountain road, and tasted every regional cuisine." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About" }]} />
        <div className="py-12 border-b border-brand-turquoise/15 mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow block mb-3">Our Story</span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-6 max-w-4xl">
            Born in the <span className="font-hand text-brand-turquoise">Himalayas</span>. Built for the Curious.
          </h1>
          <p className="text-base sm:text-lg text-brand-dark/75 max-w-3xl leading-relaxed">
            Rucksack Adventures began in 2018 with a simple conviction: that the most meaningful travel happens when you slow down, go deeper, and let the landscape lead. Founded in Kasumpti, Shimla, we have grown from a local trekking outfit into a full-service travel atelier covering India and select international destinations.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-brand-cream/30 border border-brand-turquoise/12 rounded-card-lg p-6 text-center">
              <stat.icon className="w-5 h-5 text-brand-yellow mx-auto mb-3" />
              <p className="font-editorial text-3xl font-bold text-brand-dark">{stat.value}</p>
              <p className="text-xs text-brand-taupe mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">What We Believe</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-dark mt-2">
              Travel Should Be <span className="font-hand text-brand-turquoise">Deliberate</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val) => (
              <div key={val.title} className="bg-brand-cream/30 border border-brand-turquoise/12 rounded-card-lg p-8 hover:border-brand-turquoise/25 hover:shadow-card-hover transition-all duration-300">
                <val.icon className="w-8 h-8 text-brand-turquoise mb-4" />
                <h3 className="font-editorial text-xl font-bold text-brand-dark mb-3">{val.title}</h3>
                <p className="text-sm text-brand-dark/75 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-20 py-12 border-t border-brand-turquoise/12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-yellow block mb-3">What We Do</span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-dark mb-6">
                End-to-End Travel, <span className="font-hand text-brand-turquoise">Perfected</span>
              </h2>
              <div className="space-y-4 text-sm text-brand-dark/75 leading-relaxed">
                <p>From the first conversation to the last mile of your journey, we handle every detail. Curated itineraries, verified accommodations, experienced guides, seamless transport, and round-the-hour support — all under one roof.</p>
                <p>We specialise in Himalayan treks, domestic holidays across India, and international getaways to Nepal, Bhutan, Southeast Asia, Dubai, and beyond. Our cab services cover Shimla, Manali, and the wider Himachal region, while our dedicated Pilgrimage Tour packages have helped hundreds of pilgrims complete sacred journeys safely.</p>
                <p>Bus and railway booking assistance ensures that reaching your destination is as effortless as the journey itself.</p>
              </div>
            </div>
            <div className="bg-brand-cream/30 border border-brand-turquoise/15 rounded-card-lg p-8 space-y-4">
              {["Curated Himalayan Treks", "Domestic & International Packages", "Premium Cab Services", "Pilgrimage Tour Packages", "Volvo & Bus Booking", "Railway & Toy Train Booking", "Custom Group & Corporate Travel", "Honeymoon & Family Packages"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-turquoise shrink-0" />
                  <span className="text-sm text-brand-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center py-12 border-t border-brand-turquoise/12">
          <h2 className="font-editorial text-3xl font-bold text-brand-dark mb-4">
            Ready to <span className="font-hand text-brand-turquoise">Begin</span>?
          </h2>
          <p className="text-sm text-brand-taupe mb-8 max-w-lg mx-auto">Tell us where you want to go. We will handle everything else.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-turquoise text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-brand-turquoise-light transition-colors">
              Plan Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/destinations" className="inline-flex items-center gap-2 px-8 py-3 border border-brand-turquoise/25 text-brand-dark text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-brand-turquoise/5 transition-colors">
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
