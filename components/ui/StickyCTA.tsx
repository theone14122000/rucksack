"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Compass } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";

export const StickyCTA: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/90 backdrop-blur-xl border-t border-brand-turquoise/10 px-3 pb-[env(safe-area-inset-bottom)] pt-2.5 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(7,20,18,0.06)]">
        <a href="tel:+917018678064" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full border border-brand-turquoise/15 text-brand-dark text-[10px] sm:text-xs font-bold tracking-wider uppercase hover:bg-brand-turquoise-50 transition-colors">
          <Phone className="w-3.5 h-3.5" /> Call
        </a>
        <a href="https://wa.me/917018678064" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full bg-[#25D366] text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
        </a>
        <button onClick={() => setModalOpen(true)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full bg-gradient-to-r from-brand-turquoise to-brand-turquoise-bright text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
          <Compass className="w-3.5 h-3.5" /> Plan
        </button>
      </div>

      {/* Desktop floating WhatsApp */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
        <a href="https://wa.me/917018678064" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-bold tracking-wide">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden group-hover:inline transition-all duration-300">Ask for Details</span>
        </a>
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
