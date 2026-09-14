"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
  gap?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className = "",
  itemClassName = "",
  showArrows = true,
  showDots = false,
  gap = 24,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    
    const items = el.children;
    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(scrollCenter - itemCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    }
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);
    return () => { el.removeEventListener("scroll", checkScroll); resizeObserver.disconnect(); };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.children[0] as HTMLElement)?.offsetWidth || 300;
    el.scrollBy({ left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      {showArrows && canScrollLeft && (
        <button onClick={() => scroll("left")} className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-elevated border border-brand-turquoise/10 flex items-center justify-center text-brand-dark hover:bg-brand-turquoise hover:text-white hover:border-brand-turquoise transition-all duration-300" aria-label="Scroll left">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
      {showArrows && canScrollRight && (
        <button onClick={() => scroll("right")} className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-elevated border border-brand-turquoise/10 flex items-center justify-center text-brand-dark hover:bg-brand-turquoise hover:text-white hover:border-brand-turquoise transition-all duration-300" aria-label="Scroll right">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      <div ref={scrollRef} className="flex overflow-x-auto snap-scroll scrollbar-hide px-4 sm:px-0" style={{ gap: `${gap}px`, scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {children.map((child, idx) => (
          <div key={idx} className={cn("flex-shrink-0 snap-start", itemClassName)}>
            {child}
          </div>
        ))}
      </div>

      {showDots && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {children.map((_, idx) => (
            <button key={idx} className={cn("h-1.5 rounded-full transition-all duration-300", activeIndex === idx ? "w-8 bg-brand-turquoise" : "w-1.5 bg-brand-taupe/30 hover:bg-brand-taupe/50")} aria-label={`Go to slide ${idx + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};
