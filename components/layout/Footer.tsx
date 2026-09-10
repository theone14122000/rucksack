import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-brown text-brand-cream pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/15">
          {/* Col 1: Brand Lore (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-sm bg-white overflow-hidden flex items-center justify-center shadow-sm">
                <img
                  src="/images/logo.jpeg"
                  alt="Rucksack Adventures logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold tracking-tight text-brand-cream leading-none block">
                  Rucksack Adventures
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/50 font-medium block mt-0.5">
                  Shimla &bull; Est. 2018
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed max-w-sm">
              An independent, mountain-first travel atelier headquartered in Kasumpti, Shimla. Curating transformative journeys, remote trans-Himalayan crossings, boutique holidays, and reliable private transportation for over 8 years.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/rucksackadventures"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-brown transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://facebook.com/rucksackadventures"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-brown transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://x.com/rucksackadv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-brown transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Explore (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-cream">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream/65">
              <li>
                <Link href="/destinations" className="hover:text-brand-cream transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-brand-cream transition-colors">
                  Curated Packages
                </Link>
              </li>
              <li>
                <Link href="/treks" className="hover:text-brand-cream transition-colors">
                  Himalayan Treks
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-brand-cream transition-colors">
                  Signature Experiences
                </Link>
              </li>
              <li>
                <Link href="/destinations/himachal-pradesh" className="hover:text-brand-cream transition-colors">
                  Himachal Pradesh
                </Link>
              </li>
              <li>
                <Link href="/destinations/kashmir" className="hover:text-brand-cream transition-colors">
                  Kashmir Valleys
                </Link>
              </li>
              <li>
                <Link href="/destinations/leh-ladakh" className="hover:text-brand-cream transition-colors">
                  Leh Ladakh
                </Link>
              </li>
              <li>
                <Link href="/destinations/nepal" className="hover:text-brand-cream transition-colors">
                  Nepal Holidays
                </Link>
              </li>
              <li>
                <Link href="/destinations/bhutan" className="hover:text-brand-cream transition-colors">
                  Bhutan Journeys
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-cream">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream/65">
              <li>
                <Link href="/taxi-services" className="hover:text-brand-cream transition-colors flex items-center gap-1">
                  <span>Shimla Taxi & Outstation Fleet</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/pilgrimage-tour" className="hover:text-brand-cream transition-colors flex items-center gap-1">
                  <span>Pilgrimage Tour (Char Dham & Temples)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/bus-booking" className="hover:text-brand-cream transition-colors">
                  Volvo & Himalayan Bus Booking
                </Link>
              </li>
              <li>
                <Link href="/railway-booking" className="hover:text-brand-cream transition-colors">
                  Toy Train & Railway Reservation
                </Link>
              </li>
              <li>
                <Link href="/destinations/bali" className="hover:text-brand-cream transition-colors">
                  Bali International Escapes
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai" className="hover:text-brand-cream transition-colors">
                  Dubai Luxury Holidays
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-cream">
              Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-brand-cream/70">
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti,<br />
                  Shimla, Himachal Pradesh 171009
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+917018678064" className="hover:text-brand-cream transition-colors font-mono">
                  7018678064
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <a
                  href="https://wa.me/917018678064"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cream transition-colors"
                >
                  WhatsApp Travel Concierge
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@rucksackadventures.com" className="hover:text-brand-cream transition-colors">
                  info@rucksackadventures.com
                </a>
              </p>
            </div>

            <div className="pt-3">
              <Link
                href="/admin"
                className="text-[11px] uppercase tracking-widest text-brand-cream/40 hover:text-brand-cream transition-colors inline-block"
              >
                Admin Management Portal &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/50">
          <p>&copy; {new Date().getFullYear()} Rucksack Adventures. All rights reserved. Registered Travel Operator, Himachal Pradesh.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-brand-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-cream transition-colors">
              Terms & Booking Conditions
            </Link>
            <Link href="/faq" className="hover:text-brand-cream transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
