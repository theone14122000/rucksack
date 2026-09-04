"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "@/lib/cms/types";

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  title = "Essential Travel Intelligence",
  subtitle = "Clear answers from our mountain desk to prepare you for the road.",
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {title && (
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
            Clarity & Guidance
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-deep">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-brand-taupe">{subtitle}</p>
        </div>
      )}

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.id || idx}
              className="border border-brand-sand/30 bg-brand-offwhite rounded-sm overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-editorial text-lg sm:text-xl font-bold text-brand-deep hover:text-brand-warm transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-sand shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-brand-deep" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-brand-charcoal/80 leading-relaxed border-t border-brand-sand/15">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
