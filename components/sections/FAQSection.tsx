"use client";

import React, { useState } from "react";
import { ChevronRight, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "@/lib/cms/types";

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || "general");

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center justify-center gap-2">
          <MessageCircleQuestion className="w-4 h-4" /> Clarity & Guidance
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
          Frequently Asked <span className="font-hand text-brand-turquoise text-[1.1em]">Questions</span>
        </h2>
        <p className="text-xs sm:text-sm text-brand-taupe max-w-md mx-auto">
          Clear answers from our mountain desk to prepare you for the road.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIdx(0); }}
            className={`snap-center shrink-0 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? "bg-brand-turquoise text-white shadow-lg shadow-brand-turquoise/20"
                : "bg-white text-brand-dark/60 border border-brand-turquoise/10 hover:border-brand-turquoise/25 hover:text-brand-dark"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`group rounded-card-xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-brand-turquoise text-white shadow-xl shadow-brand-turquoise/15"
                    : "bg-white border border-brand-turquoise/8 hover:border-brand-turquoise/20 hover:shadow-lg"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
                  aria-expanded={isOpen}
                >
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isOpen ? "bg-white/20 text-white" : "bg-brand-turquoise/5 text-brand-turquoise"
                  }`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className={`font-editorial text-base sm:text-lg font-bold leading-snug transition-colors ${
                      isOpen ? "text-white" : "text-brand-dark group-hover:text-brand-turquoise"
                    }`}>
                      {faq.question}
                    </span>
                  </span>
                  <ChevronRight className={`w-5 h-5 shrink-0 mt-0.5 transition-all duration-300 ${
                    isOpen ? "rotate-90 text-white/70" : "text-brand-turquoise/40 group-hover:text-brand-turquoise"
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 pl-[4.25rem]">
                        <p className={`text-sm leading-relaxed transition-colors ${
                          isOpen ? "text-white/80" : "text-brand-dark/60"
                        }`}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
