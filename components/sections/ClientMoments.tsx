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

const TOTAL = MOMENT_IMAGES.length;
const AUTOPLAY_MS = 2000; // required: auto-advance exactly every 2 seconds
const TRANSITION_MS = 550; // slide animation (must stay under AUTOPLAY_MS)
const SNAP_MS = 40; // micro-delay used for seamless backward-loop jumps

// Very subtle editorial rotations — physical photos on a memory board.
// No rotation on mobile; straightens gently on hover.
const CARD_ROTATIONS = [
  "sm:-rotate-1 sm:hover:rotate-0",
  "sm:rotate-[0.6deg] sm:hover:rotate-0",
  "sm:-rotate-[0.5deg] sm:hover:rotate-0",
  "sm:rotate-1 sm:hover:rotate-0",
];

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
  const [cycle, setCycle] = useState(0);

  const indexRef = useRef(0);
  indexRef.current = index;
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Single autoplay timer for the component lifetime. Interval callback only
  // bumps state via a functional update (no stale closure), so it never needs
  // to be recreated — and therefore can never stack.
  const stopAutoplay = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    timerRef.current = window.setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setIndex((i) => (i >= TOTAL ? TOTAL : i + 1));
    }, AUTOPLAY_MS);
  }, [stopAutoplay]);

  // Mount: responsive listener + start the ONE autoplay timer.
  // Unmount: clear it. Runs once (TOTAL is a stable module constant).
  useEffect(() => {
    setVisible(getVisibleCount());
    const onResize = () => setVisible(getVisibleCount());
    window.addEventListener("resize", onResize);
    startAutoplay();
    return () => {
      stopAutoplay();
      window.removeEventListener("resize", onResize);
    };
  }, [startAutoplay, stopAutoplay]);

  // Snap from the trailing clones back to the real first slide (no visual jump).
  useEffect(() => {
    if (index !== TOTAL) return;
    const snap = setTimeout(() => {
      setInstant(true);
      setIndex(0);
      setTimeout(() => setInstant(false), SNAP_MS);
    }, TRANSITION_MS);
    return () => clearTimeout(snap);
  }, [index]);

  const goNext = useCallback(() => {
    setInstant(false);
    setIndex((i) => (i >= TOTAL ? TOTAL : i + 1));
  }, []);

  const goPrev = useCallback(() => {
    const current = indexRef.current;
    if (current > 0) {
      setInstant(false);
      setIndex(current - 1);
    } else {
      // Seamless backward loop: jump (instantly) to the trailing clone of the
      // first slide, then step back animated — visually Memory 10 slides in.
      setInstant(true);
      setIndex(TOTAL);
      setTimeout(() => {
        setInstant(false);
        setIndex(TOTAL - 1);
      }, SNAP_MS);
    }
  }, []);

  const goTo = useCallback((page: number) => {
    setInstant(false);
    setIndex(page);
  }, []);

  // Manual interaction acts immediately, then cleanly RESTARTS the 2s timer so
  // the next auto-advance is a full 2 seconds away (no double transition,
  // autoplay never stops permanently).
  const manual = useCallback(
    (action: () => void) => {
      action();
      setCycle((c) => c + 1);
      startAutoplay();
    },
    [startAutoplay]
  );

  const page = index % TOTAL;
  const slides = [...MOMENT_IMAGES, ...MOMENT_IMAGES.slice(0, visible)];

  return (
    <section
      id="moments"
      className="py-16 lg:py-28 bg-white overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 space-y-2 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" /> Client Memories
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            Our Precious and{" "}
            <span className="font-hand text-shimmer text-[1.1em]">
              Happy Moments
            </span>{" "}
            from Our Clients
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden py-4"
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
              "flex items-stretch",
              !instant && "transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]"
            )}
            style={{
              transform: `translateX(-${index * (100 / visible)}%)`,
              transitionDuration: `${TRANSITION_MS}ms`,
            }}
          >
            {slides.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / visible}%` }}
                aria-hidden={idx >= TOTAL}
                role="group"
                aria-roledescription="slide"
                aria-label={`${(idx % TOTAL) + 1} of ${TOTAL}`}
              >
                <div
                  className={cn(
                    "group h-full transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]",
                    CARD_ROTATIONS[idx % CARD_ROTATIONS.length]
                  )}
                >
                  <div className="h-full bg-[#FAF5E9] rounded-[4px] border border-[#E7DCC2] p-4 pb-6 sm:p-5 sm:pb-7 shadow-[0_10px_30px_rgba(7,20,18,0.10)] group-hover:shadow-[0_20px_44px_rgba(7,20,18,0.16)] transition-shadow duration-500">
                    <div className="overflow-hidden rounded-[2px] border-[6px] border-white ring-1 ring-brand-dark/10 shadow-[0_2px_10px_rgba(7,20,18,0.12)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Happy client moment ${(idx % TOTAL) + 1} from Rucksack Adventures`}
                        className="w-full aspect-[3/4] object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-105"
                        loading={idx < visible * 2 ? "eager" : "lazy"}
                        draggable={false}
                      />
                    </div>
                    <div className="pt-4 pb-1 text-center">
                      <p className="font-editorial text-xl text-brand-dark leading-tight">
                        Memory {String((idx % TOTAL) + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 flex items-center justify-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-turquoise">
                        <span className="w-6 h-px bg-brand-turquoise/50" />
                        Client Memories
                        <span className="w-6 h-px bg-brand-turquoise/50" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual controls + auto-advancing progress indicators */}
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 items-center sm:grid-cols-[auto_1fr_auto]">
          <button
            onClick={() => manual(goPrev)}
            className="justify-self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-turquoise/20 text-brand-dark text-[11px] font-bold uppercase tracking-[0.16em] hover:border-brand-turquoise hover:text-brand-turquoise transition-all duration-300 shadow-soft"
            aria-label="Previous memories"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="col-span-2 row-start-2 flex items-center justify-center gap-2 sm:col-span-1 sm:row-auto">
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
                {idx === page && (
                  <motion.div
                    key={`progress-${page}-${cycle}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: AUTOPLAY_MS / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-brand-turquoise to-brand-yellow origin-left rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => manual(goNext)}
            className="justify-self-end inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-turquoise/20 text-brand-dark text-[11px] font-bold uppercase tracking-[0.16em] hover:border-brand-turquoise hover:text-brand-turquoise transition-all duration-300 shadow-soft"
            aria-label="Next memories"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
