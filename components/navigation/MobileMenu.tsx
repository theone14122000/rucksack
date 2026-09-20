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
  { href: "/packages", label: "Adventures" },
  { href: "/treks", label: "Himalayan Treks" },
  { href: "/experiences", label: "Experiences" },
  { href: "/custom-package", label: "Custom Package" },
  { href: "/taxi-services", label: "Shimla Cab Services" },
  { href: "/pilgrimage-tour", label: "Pilgrimage Tour" },
  { href: "/bus-booking", label: "Bus Booking" },
  { href: "/railway-booking", label: "Railway Booking" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenEnquiry }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-white flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="p-5 sm:p-6 flex items-center justify-between border-b border-brand-turquoise/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-card bg-brand-turquoise-50 overflow-hidden flex items-center justify-center shrink-0">
                  <img src="/images/logo.jpeg" alt="Rucksack Adventures logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-editorial text-xl font-bold tracking-tight text-brand-dark">Rucksack Adventures</span>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-brand-turquoise font-medium">Shimla &bull; Est. 2018</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2.5 rounded-full border border-brand-turquoise/10 hover:bg-brand-turquoise/5 text-brand-dark/40 hover:text-brand-dark transition-colors" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 sm:px-6 py-6 flex-1 overflow-y-auto">
              <div className="space-y-0.5">
                {navLinks.map((link, idx) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + idx * 0.03 }}>
                    <Link href={link.href} onClick={onClose} className="flex items-center justify-between py-3 text-lg font-editorial tracking-wide text-brand-dark/70 hover:text-brand-turquoise transition-colors group">
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-brand-turquoise/0 group-hover:text-brand-turquoise transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-brand-cream border-t border-brand-turquoise/5 space-y-4">
              <Button variant="primary" fullWidth size="lg" onClick={() => { onClose(); onOpenEnquiry(); }} icon={<Compass className="w-4 h-4" />}>
                Plan Your Journey
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+917018678064" className="flex items-center justify-center gap-1.5 py-2.5 text-xs text-brand-dark/70 border border-brand-turquoise/10 rounded-card hover:bg-brand-turquoise/5 hover:text-brand-dark transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Call Office
                </a>
                <a href="https://wa.me/917018678064" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 py-2.5 text-xs text-[#25D366] bg-[#25D366]/8 border border-[#25D366]/20 rounded-card hover:bg-[#25D366]/15 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
              <div className="pt-2 text-[11px] text-brand-taupe space-y-1">
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" /> Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti, Shimla 171009</p>
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 shrink-0" /> info@rucksackadventures.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
