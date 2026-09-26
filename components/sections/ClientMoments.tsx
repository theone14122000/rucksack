"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MOMENT_IMAGES = [
  "/gallery/gallery1.jpg",
  "/gallery/gallery2.jpg",
  "/gallery/gallery3.jpg",
  "/gallery/gallery4.jpg",
  "/gallery/gallery5.jpg",
  "/gallery/gallery6.jpg",
  "/gallery/gallery7.jpg",
  "/gallery/gallery8.jpg",
  "/gallery/gallery9.jpg",
  "/gallery/galler10.jpg",
];

const TRANSITION_MS = 700;
const AUTOPLAY_MS = 3500;

function getVisibleCount(): number {
  if (typeof window === "undefined") return 1;
  if (window.matchMedia("(min-width: 1280px)").matches) return 4;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

export const ClientMoments: React.FC = () => {
  const [visible, setVisible] = useState(1);
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const indexRef = useRef(0);
  indexRef.current = index;
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Manual interaction pauses autoplay briefly, then resumes it.
  const manual = useCallback((action: () => void) => {
    action();
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 6000);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    setVisible(getVisibleCount());
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const onResize = () => setVisible(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = MOMENT_IMAGES.length;

  // Snap from the trailing clones back to the real first slide (no visual jump).
  useEffect(() => {
    if (index !== total) return;
    const snap = setTimeout(() => {
      setInstant(true);
      setIndex(0);
      setTimeout(() => setInstant(false), 40);
    }, TRANSITION_MS);
    return () => clearTimeout(snap);
  }, [index, total]);

  const goNext = useCallback(() => {
    setInstant(false);
    setIndex((i) => (i >= total ? total : i + 1));
  }, [total]);

  const goPrev = useCallback(() => {
    const current = indexRef.current;
    if (current > 0) {
      setInstant(false);
      setIndex(current - 1);
    } else {
      // Seamless backward loop: jump (instantly) to the trailing clones,
      // which look identical to the first slide, then step back animated.
      setInstant(true);
      setIndex(total);
      setTimeout(() => {
        setInstant(false);
        setIndex(total - 1);
      }, 40);
    }
  }, [total]);

  const goTo = useCallback((page: number) => {
    setInstant(false);
    setIndex(page);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => {
      if (!document.hidden) goNext();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, goNext, index]);

  const page = index % total;

  const slides = [...MOMENT_IMAGES, ...MOMENT_IMAGES.slice(0, visible)];

  return (
    <section id="moments" className="py-16 lg:py-28 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" /> Client Memories
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              Our Precious and{" "}
              <span className="font-hand text-shimmer text-[1.1em]">Happy Moments</span>{" "}
              from Our Clients
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => manual(goPrev)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-elevated border border-brand-turquoise/10 flex items-center justify-center text-brand-dark hover:bg-brand-turquoise hover:text-white hover:border-brand-turquoise transition-all duration-300"
              aria-label="Previous photos"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => manual(goNext)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-elevated border border-brand-turquoise/10 flex items-center justify-center text-brand-dark hover:bg-brand-turquoise hover:text-white hover:border-brand-turquoise transition-all duration-300"
              aria-label="Next photos"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Happy client moments gallery"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (delta < -40) manual(goNext);
            else if (delta > 40) manual(goPrev);
          }}
        >
          <div
            className={cn(
              "flex",
              !instant &&
                "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            )}
            style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {slides.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / visible}%` }}
                aria-hidden={idx >= total}
                role="group"
                aria-roledescription="slide"
                aria-label={`${(idx % total) + 1} of ${total}`}
              >
                <div className="group h-full bg-brand-cream rounded-card-xl border border-brand-turquoise/10 p-3 sm:p-4 shadow-soft hover:shadow-luxury hover:-translate-y-1 hover:border-brand-turquoise/25 transition-all duration-500">
                  <div className="rounded-card overflow-hidden ring-1 ring-brand-dark/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Happy client moment ${(idx % total) + 1} from Rucksack Adventures`}
                      className="w-full aspect-[3/4] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={idx < visible * 2 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                  <div className="pt-4 pb-1 px-1 text-center">
                    <p className="font-editorial text-lg text-brand-dark leading-tight">
                      Memory {String((idx % total) + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1.5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                      <span className="w-5 h-px bg-brand-turquoise/40" />
                      Client Memories
                      <span className="w-5 h-px bg-brand-turquoise/40" />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-toggle progress indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {MOMENT_IMAGES.map((src, idx) => (
            <button
              key={src}
              onClick={() => manual(() => goTo(idx))}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: idx === page ? 32 : 8,
                background:
                  idx === page ? "transparent" : "rgba(11,143,131,0.2)",
              }}
              aria-label={`Go to photo ${idx + 1}`}
            >
              {idx === page && !reducedMotion && (
                <motion.div
                  key={`progress-${page}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-brand-turquoise to-brand-yellow origin-left rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
