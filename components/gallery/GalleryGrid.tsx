"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/gallery-data";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Editorial photo grid: responsive 2/3/4-column dense grid where CMS-featured
 * photos get a 2x2 "anchor" treatment (spaced apart, first item as fallback).
 * All cells are square so the layout is predictable at every breakpoint, rows
 * never shift (aspect-ratio boxes), and mobile keeps two usable columns.
 * Desktop hover reveals an elegant overlay + caption; touch devices get a
 * fully functional grid with a swipeable, keyboard accessible lightbox.
 */

function largeSetFor(images: GalleryImage[]): Set<number> {
  const out = new Set<number>();
  if (images.length < 4) return out;
  const maxLarge = Math.max(1, Math.floor(images.length / 5));
  let last = -99;
  images.forEach((img, i) => {
    if (out.size < maxLarge && img.featured && i - last >= 5) {
      out.add(i);
      last = i;
    }
  });
  if (out.size === 0) out.add(0);
  return out;
}

interface Props {
  images: GalleryImage[];
}

export const GalleryGrid: React.FC<Props> = ({ images }) => {
  const [active, setActive] = useState<number | null>(null);
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const large = React.useMemo(() => largeSetFor(images), [images]);
  const touchX = useRef<number | null>(null);

  const markFailed = (i: number) =>
    setFailed((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });

  const close = useCallback(() => setActive(null), []);
  const goPrev = useCallback(
    () => setActive((a) => (a === null ? null : (a - 1 + images.length) % images.length)),
    [images.length]
  );
  const goNext = useCallback(
    () => setActive((a) => (a === null ? null : (a + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Warm up neighbours so arrow navigation feels instant.
    const preload = (i: number) => {
      const img = images[(i + images.length) % images.length];
      if (img?.src) {
        const el = new Image();
        el.src = img.src;
      }
    };
    preload(active - 1);
    preload(active + 1);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, goPrev, goNext, images]);

  const current = active !== null ? images[active] : null;
  const captionFor = (img: GalleryImage) => img.caption?.trim() || img.alt;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-flow-dense gap-2 sm:gap-3 lg:gap-4">
        {images.map((image, i) => (
          <button
            key={`${image.id}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View photo: ${image.alt}`}
            className={cn(
              "group relative overflow-hidden rounded-card bg-brand-cream aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2",
              large.has(i) && "col-span-2 row-span-2"
            )}
          >
            {failed.has(i) ? (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-cream text-brand-taupe text-center px-2">
                <Camera className="w-6 h-6 text-brand-turquoise" aria-hidden="true" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em]">
                  Image unavailable
                </span>
              </span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image.src}
                alt={image.alt}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                onError={() => markFailed(i)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            )}
            <span
              aria-hidden="true"
              className="absolute inset-0 hidden sm:block bg-gradient-to-t from-brand-dark/75 via-brand-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="absolute inset-x-0 bottom-0 hidden sm:block px-3 pb-3 pt-8 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="block truncate text-xs font-semibold text-brand-cream drop-shadow">
                {captionFor(image)}
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${current.alt}`}
            className="fixed inset-0 z-[80] bg-brand-dark/95 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={close}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (dx > 50) goPrev();
              else if (dx < -50) goNext();
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-brand-cream flex items-center justify-center hover:bg-white/25 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.figure
              key={current.id}
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-w-full max-h-[64vh] sm:max-h-[70vh] object-contain rounded-card ring-1 ring-white/10 bg-brand-dark-light"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-brand-cream/80 max-w-2xl mx-auto line-clamp-2">
                {captionFor(current)}
              </figcaption>

              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-brand-cream flex items-center justify-center hover:bg-white/25 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span
                  aria-live="polite"
                  className="min-w-[74px] text-center text-sm font-semibold text-brand-cream/85 tabular-nums"
                >
                  {active + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-brand-cream flex items-center justify-center hover:bg-white/25 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;
