"use client";

import React from "react";
import Link from "next/link";
import { X, MapPin, Phone, Mail, Compass, ChevronRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Tour Packages" },
  { href: "/treks", label: "Himalayan Treks" },
  { href: "/experiences", label: "Curated Experiences" },
  { href: "/taxi-services", label: "Shimla Taxi Services" },
  { href: "/pilgrimage-tour", label: "Pilgrimage Tour" },
  { href: "/bus-booking", label: "Bus Booking" },
  { href: "/railway-booking", label: "Railway Booking" },
  { href: "/about", label: "About Our Story" },
  { href: "/contact", label: "Contact Us" },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-brand-brown text-brand-cream flex flex-col justify-between overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="p-6 flex items-center justify-between border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-white overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.jpeg"
                  alt="Rucksack Adventures logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold tracking-tight text-brand-cream">
                  Rucksack Adventures
                </span>
                <p className="text-[10px] uppercase tracking-widest text-brand-cream/50 font-medium">
                  Shimla &bull; Est. 2018
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 text-brand-cream transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links List */}
          <div className="px-6 py-6 flex-1 divide-y divide-white/10">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + idx * 0.03 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3 text-lg font-editorial tracking-wide text-brand-cream/80 hover:text-brand-cream transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-brand-cream/40" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Actions & Contact */}
          <div className="p-6 bg-brand-brown-dark border-t border-white/15 space-y-4">
            <Button
              variant="secondary"
              fullWidth
              size="lg"
              onClick={() => {
                onClose();
                onOpenEnquiry();
              }}
              icon={<Compass className="w-4 h-4" />}
            >
              Plan Your Journey
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+917018678064"
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs text-brand-cream border border-white/20 rounded-sm hover:bg-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Call Office
              </a>
              <a
                href="https://wa.me/917018678064"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs text-brand-cream bg-[#25D366]/20 border border-[#25D366]/40 rounded-sm hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp
              </a>
            </div>

            <div className="pt-2 text-[11px] text-brand-cream/50 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti, Shimla 171009
              </p>
                <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                info@rucksackadventures.com
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
