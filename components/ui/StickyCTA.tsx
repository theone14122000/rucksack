"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Compass } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";

export const StickyCTA: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-brand-brown/95 backdrop-blur-md border-t border-white/15 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href="tel:+917018678064"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-sm border border-white/20 text-brand-cream text-xs font-semibold tracking-wider uppercase"
        >
          <Phone className="w-3.5 h-3.5" /> Call Us
        </a>
        <a
          href="https://wa.me/917018678064?text=Hello%20Rucksack%20Adventures%2C%20I%20would%20like%20to%20plan%20a%20journey"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-sm bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
        </a>
        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-sm bg-brand-cream text-brand-brown text-xs font-bold tracking-wider uppercase shadow-xs"
        >
          <Compass className="w-3.5 h-3.5" /> Plan
        </button>
      </div>

      {/* Floating Desktop WhatsApp Trigger */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
        <a
          href="https://wa.me/917018678064?text=Hello%20Rucksack%20Adventures%2C%20I%20would%20like%20to%20plan%20a%20journey"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-semibold tracking-wide"
          aria-label="Direct WhatsApp Chat"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden group-hover:inline transition-all duration-300">
            WhatsApp Travel Desk
          </span>
        </a>
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
