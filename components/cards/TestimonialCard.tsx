import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Testimonial } from "@/lib/cms/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-brand-cream border border-brand-brown/10 p-6 sm:p-7 rounded-card flex flex-col justify-between hover:border-brand-brown/30 transition-all duration-300 card-3d">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-brand-gold">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(testimonial.rating)
                    ? "fill-brand-gold text-brand-gold"
                    : "text-brand-gold/20"
                }`}
              />
            ))}
            <span className="text-xs font-mono font-bold text-brand-black ml-1.5">
              {testimonial.rating.toFixed(1)}
            </span>
          </div>
          <Quote className="w-6 h-6 text-brand-brown/20" />
        </div>

        <p className="text-sm sm:text-base text-brand-charcoal italic font-editorial leading-relaxed mb-6">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </div>

      <div className="pt-4 border-t border-brand-brown/10 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-brand-black flex items-center gap-1.5">
            {testimonial.customerName}
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          </h4>
          <p className="text-[11px] text-brand-taupe">
            {testimonial.tripType} &bull; {testimonial.destination}
          </p>
        </div>
        <span className="text-[10px] text-brand-brown font-mono">
          {testimonial.date}
        </span>
      </div>
    </div>
  );
};
