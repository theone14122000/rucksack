"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/gallery-data";

const pad = (n: number) => String(n).padStart(2, "0");

interface MemoryImageProps {
  image: GalleryImage;
  wrapperClassName?: string;
  imgClassName?: string;
  eager?: boolean;
}

/**
 * Shows the real gallery photo when it exists (resolved server-side).
 * Client-side safety net: .jpeg -> .jpg -> themed placeholder.
 * The native error listener also catches images that failed before
 * hydration (React's onError would miss those events).
 */
const MemoryImage: React.FC<MemoryImageProps> = ({
  image,
  wrapperClassName,
  imgClassName,
  eager = false,
}) => {
  // src: "" means the server found no file — render the placeholder directly.
  const [stage, setStage] = useState(image.src ? 0 : 2);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (stage >= 2) return;
    const el = imgRef.current;
    if (!el) return;
    const onError = () => setStage((s) => Math.min(s + 1, 2));
    el.addEventListener("error", onError);
    // Image may have already failed before this effect attached.
    if (el.complete && el.naturalWidth === 0) onError();
    return () => el.removeEventListener("error", onError);
  }, [stage]);

  const src = stage === 0 ? image.src : image.src.replace(/\.jpeg$/, ".jpg");

  return (
    <div className={cn("relative overflow-hidden bg-brand-cream", wrapperClassName)}>
      {stage >= 2 ? (
        <div className="w-full aspect-[4/5] flex flex-col items-center justify-center gap-2.5 text-center px-4 bg-brand-cream/70 border border-dashed border-brand-turquoise/30">
          <Camera className="w-7 h-7 text-brand-turquoise/60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-turquoise/80">
            Photo Placeholder
          </span>
          <span className="text-[11px] text-brand-taupe">
            Gallery Image {pad(image.id)}
          </span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={src}
          alt={image.alt}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          className={cn("w-full object-cover object-center", imgClassName)}
        />
      )}
    </div>
  );
};

const MemoryCard: React.FC<{ image: GalleryImage; index: number; onOpen: () => void }> = ({
  image,
  index,
  onOpen,
}) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={`Open Gallery Image ${pad(image.id)} in lightbox`}
    className="group h-full w-full text-left bg-[#FAF5E9] rounded-card-xl border border-[#E7DCC2] p-3 sm:p-4 pb-4 shadow-soft hover:shadow-luxury hover:-translate-y-1 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2"
  >
    <MemoryImage
      image={image}
      eager={index < 4}
      wrapperClassName="rounded-card border-[5px] border-white ring-1 ring-brand-dark/10 shadow-[0_2px_10px_rgba(7,20,18,0.10)]"
      imgClassName="aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-105"
    />
    <div className="pt-3.5 text-center">
      <p className="font-editorial text-base sm:text-lg text-brand-dark leading-tight">
        Gallery Image {pad(image.id)}
      </p>
      <p className="mt-1.5 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-turquoise">
        <span className="w-4 h-px bg-brand-turquoise/50" />
        Gallery
        <span className="w-4 h-px bg-brand-turquoise/50" />
      </p>
    </div>
  </button>
);

export const GalleryGrid: React.FC<{ images: GalleryImage[] }> = ({ images }) => {
  const total = images.length;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const goPrev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + total) % total)),
    [total]
  );
  const goNext = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % total)),
    [total]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, goPrev, goNext]);

  return (
    <>
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
        {images.map((image, i) => (
          <MemoryCard
            key={image.id}
            image={image}
            index={i}
            onOpen={() => setActive(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-[60] bg-brand-dark/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={close}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-brand-cream flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-brand-cream flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-brand-cream flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
              <div className="bg-[#FAF5E9] rounded-card-xl border border-[#E7DCC2] p-3 sm:p-4 pb-5 shadow-luxury">
                <MemoryImage
                  image={images[active]}
                  wrapperClassName="rounded-card border-[6px] border-white ring-1 ring-brand-dark/10 flex items-center justify-center bg-white"
                  imgClassName="max-h-[62vh] object-contain"
                  eager
                />
                <figcaption className="pt-4 text-center">
                  <p className="font-editorial text-xl text-brand-dark">
                    Gallery Image {pad(images[active].id)}
                  </p>
                  <p className="mt-1.5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-turquoise">
                    <span className="w-5 h-px bg-brand-turquoise/50" />
                    Gallery
                    <span className="w-5 h-px bg-brand-turquoise/50" />
                  </p>
                </figcaption>
              </div>
              <p className="mt-4 text-center text-xs font-semibold tracking-widest text-brand-cream/70">
                {pad(active + 1)} / {pad(total)}
              </p>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
