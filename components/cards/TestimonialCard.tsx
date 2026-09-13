import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Testimonial } from "@/lib/cms/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white border border-brand-turquoise/5 p-6 sm:p-7 rounded-card-2xl flex flex-col justify-between hover:shadow-luxury transition-all duration-500 hover:border-brand-turquoise/12 relative overflow-hidden group h-full">
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Quote className="w-8 h-8 text-brand-turquoise/10" />
      </div>
      <div>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? "fill-brand-yellow text-brand-yellow" : "text-brand-yellow/20"}`} />
          ))}
          <span className="text-xs font-mono font-bold text-brand-dark ml-1.5">{testimonial.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm sm:text-base text-brand-dark/70 italic font-editorial leading-relaxed mb-6">&ldquo;{testimonial.review}&rdquo;</p>
      </div>
      <div className="pt-4 border-t border-brand-turquoise/5 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-brand-dark flex items-center gap-1.5">
            {testimonial.customerName}
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-turquoise" />
          </h4>
          <p className="text-[11px] text-brand-taupe">{testimonial.tripType} &bull; {testimonial.destination}</p>
        </div>
        <span className="text-[10px] text-brand-gold font-mono">{testimonial.date}</span>
      </div>
    </div>
  );
};
