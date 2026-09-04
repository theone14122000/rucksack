import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Testimonial } from "@/lib/cms/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-brand-offwhite border border-brand-sand/30 p-6 sm:p-7 rounded-sm flex flex-col justify-between shadow-xs hover:border-brand-sand transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-600">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(testimonial.rating)
                    ? "fill-amber-500 text-amber-500"
                    : "text-amber-200"
                }`}
              />
            ))}
            <span className="text-xs font-mono font-bold text-brand-deep ml-1.5">
              {testimonial.rating.toFixed(1)}
            </span>
          </div>
          <Quote className="w-6 h-6 text-brand-sand/40" />
        </div>

        <p className="text-sm sm:text-base text-brand-charcoal/90 italic font-editorial leading-relaxed mb-6">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </div>

      <div className="pt-4 border-t border-brand-sand/20 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-brand-deep flex items-center gap-1.5">
            {testimonial.customerName}
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          </h4>
          <p className="text-[11px] text-brand-taupe">
            {testimonial.tripType} • {testimonial.destination}
          </p>
        </div>
        <span className="text-[10px] text-brand-sand font-mono">
          {testimonial.date}
        </span>
      </div>
    </div>
  );
};
