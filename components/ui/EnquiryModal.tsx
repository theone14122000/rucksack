"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EnquiryForm } from "./EnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultTravelType?: "Domestic" | "International" | "Trek" | "Taxi" | "Pilgrimage" | "Other";
  title?: string;
  subtitle?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultDestination = "",
  defaultTravelType = "Domestic",
  title = "Plan Your Curated Journey",
  subtitle = "Directly designed by our mountain specialists in Kasumpti, Shimla",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-espresso/70 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-2xl bg-brand-offwhite border border-brand-sand/40 rounded-sm shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-brand-taupe hover:text-brand-deep rounded-full hover:bg-brand-cream/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-sand mb-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Rucksack Adventures
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-deep">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-brand-taupe mt-1">
                {subtitle}
              </p>
            </div>

            {/* Form */}
            <EnquiryForm
              defaultDestination={defaultDestination}
              defaultTravelType={defaultTravelType}
              onSuccess={() => {
                setTimeout(onClose, 3000);
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
