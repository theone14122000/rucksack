"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight, Compass, ArrowRight } from "lucide-react";
import { useContactSettings, telHref, waHref } from "@/components/cms/SettingsProvider";

export const Footer: React.FC = () => {
  const contact = useContactSettings();
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const address = contact.address.replace("Himachal Pradesh", "HP");
  const socials = [
    { href: contact.socialLinks.instagram, label: "Instagram", icon: "instagram" as const },
    { href: contact.socialLinks.linkedin, label: "LinkedIn", icon: "linkedin" as const },
  ].filter((s) => s.href);
  return (
    <footer className="bg-brand-dark text-white relative overflow-hidden">
      {/* Inject shimmer keyframes directly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cta-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      {/* CTA Banner */}
      <div
        className="relative py-12 sm:py-16 overflow-hidden cta-shimmer"
      >
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-brand-dark/50 block mb-3">Ready to Explore?</span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight mb-4">
            Let&apos;s Plan Your Next <span className="font-hand text-brand-dark/70">Adventure</span>
          </h2>
          <p className="text-sm text-brand-dark/60 mb-8 max-w-lg mx-auto">Share your travel dreams. Our Shimla-based team crafts every journey with care.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-brand-dark-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Compass className="w-4 h-4" /> Start Planning <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={waHref(contact.whatsappWaLink)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1EBE5D] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/8">
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-card bg-white/10 overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-brand-turquoise/20 transition-all">
                  <img src="/images/logo.jpeg" alt="Rucksack Adventures logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-editorial text-2xl font-bold tracking-tight text-white leading-none block">Rucksack Adventures</span>
                  <span className="font-hand text-brand-turquoise-bright text-sm block mt-0.5">Shimla &bull; Est. 2018</span>
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-white/40 leading-relaxed max-w-sm">{contact.footerDescription}</p>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-turquoise hover:border-brand-turquoise hover:text-white transition-all duration-300 hover:scale-110" aria-label={social.label}>
                    {social.icon === "instagram" && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    )}
                    {social.icon === "linkedin" && (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise-light flex items-center gap-2">
                <div className="w-6 h-px bg-brand-turquoise" /> Explore
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/45">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/destinations", label: "All Destinations" },
                  { href: "/packages", label: "Curated Adventures" },
                  { href: "/activities", label: "Adventure Activities" },
                  { href: "/custom-package", label: "Custom Package" },
                  { href: "/treks", label: "Himalayan Treks" },
                  { href: "/experiences", label: "Signature Experiences" },
                  { href: "/destinations/shimla", label: "Shimla" },
                  { href: "/destinations/manali", label: "Manali" },
                  { href: "/destinations/dharamshala", label: "Dharamshala" },
                  { href: "/destinations/dalhousie", label: "Dalhousie" },
                  { href: "/destinations/kinnaur", label: "Kinnaur" },
                  { href: "/destinations/lahaul-spiti", label: "Lahaul & Spiti" },
                  { href: "/destinations/leh-ladakh", label: "Leh Ladakh" },
                ].map((link) => (
                  <li key={link.href}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise-light flex items-center gap-2">
                <div className="w-6 h-px bg-brand-turquoise" /> Specialized Services
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/45">
                {[
                  { href: "/taxi-services", label: "Premium Cab & Outstation Services" },
                  { href: "/pilgrimage-tour", label: "Pilgrimage Tour (Char Dham & Temples)" },
                  { href: "/bus-booking", label: "Volvo & Himalayan Bus Booking" },
                  { href: "/railway-booking", label: "Toy Train & Railway Reservation" },
                ].map((link) => (
                  <li key={link.href}><Link href={link.href} className="hover:text-white transition-colors flex items-center gap-1 group"><span>{link.label}</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise-light flex items-center gap-2">
                <div className="w-6 h-px bg-brand-turquoise" /> Headquarters
              </h4>
              <div className="space-y-3 text-xs text-white/45">
                <p className="flex items-start gap-2.5 leading-relaxed"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-brand-turquoise/60" /><span>{address}</span></p>
                <p className="flex items-center gap-2.5"><Phone className="w-4 h-4 shrink-0 text-brand-turquoise/60" /><a href={telHref(contact.phone)} className="hover:text-white transition-colors font-mono">{contact.phone}</a></p>
                <p className="flex items-center gap-2.5"><MessageSquare className="w-4 h-4 shrink-0 text-[#25D366]/70" /><a href={waHref(contact.whatsappWaLink)} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Travel Concierge</a></p>
                <p className="flex items-center gap-2.5"><Mail className="w-4 h-4 shrink-0 text-brand-turquoise/60" /><a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a></p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} Rucksack Adventures. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
