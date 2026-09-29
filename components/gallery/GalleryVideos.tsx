"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { galleryVideos, type GalleryVideo } from "@/lib/gallery-data";

/**
 * Travel Stories & Videos — responsive video grid.
 * Desktop 3 columns (first video spans 2 when there are 3+ for hierarchy),
 * tablet 2, mobile 1. Cards keep a strict 16:9 thumb with the title below.
 * Videos with a youtubeId show their real thumbnail and open a keyboard
 * accessible embed modal; the rest keep the styled brand placeholder.
 */

function VideoThumb({ video, eager }: { video: GalleryVideo; eager: boolean }) {
  const base = video.youtubeId
    ? `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`
    : null;
  const [src, setSrc] = useState<string | null>(base);

  useEffect(() => {
    setSrc(base);
  }, [base]);

  return (
    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-turquoise/50">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading={eager ? "eager" : "lazy"}
          onError={() =>
            setSrc((s) =>
              s && s.includes("maxresdefault")
                ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
                : null
            )
          }
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-brand-dark/25 group-hover:bg-brand-dark/40 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shadow-luxury group-hover:scale-110 transition-transform duration-500">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" aria-hidden="true" />
        </span>
        {!src && (
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-cream/70">
            YouTube Video
          </span>
        )}
      </div>
    </div>
  );
}

export const GalleryVideos: React.FC = () => {
  const [active, setActive] = useState<GalleryVideo | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  const total = galleryVideos.length;

  return (
    <section className="py-10 sm:py-12 lg:py-14" aria-label="Travel stories and videos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-7 sm:mb-9 space-y-2.5">
          <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-brand-turquoise">
            Watch &amp; Explore
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark tracking-tight">
            Travel Stories &amp; Videos
          </h2>
          <p className="text-sm sm:text-base text-brand-dark/70 leading-relaxed">
            Watch moments from our journeys, discover new destinations and
            experience the adventure before you pack your rucksack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {galleryVideos.map((video, i) => {
            const interactive = !!video.youtubeId;
            const card = (
              <>
                <VideoThumb video={video} eager={i < 3} />
                <div className="px-4 pt-3 pb-4">
                  <h3 className="font-editorial text-base sm:text-lg leading-snug text-brand-dark">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-brand-taupe leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </>
            );
            const cls =
              "group flex h-full flex-col overflow-hidden bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft hover:shadow-luxury transition-shadow duration-500";
            return i === 0 && total >= 3 ? (
              <div key={video.id} className="lg:col-span-2">
                {interactive ? (
                  <button
                    type="button"
                    onClick={() => setActive(video)}
                    aria-label={`Play video: ${video.title}`}
                    className={`${cls} w-full text-left`}
                  >
                    {card}
                  </button>
                ) : (
                  <article className={cls}>{card}</article>
                )}
              </div>
            ) : interactive ? (
              <button
                key={video.id}
                type="button"
                onClick={() => setActive(video)}
                aria-label={`Play video: ${video.title}`}
                className={`${cls} text-left`}
              >
                {card}
              </button>
            ) : (
              <article key={video.id} className={cls}>
                {card}
              </article>
            );
          })}
        </div>
      </div>

      {active && active.youtubeId && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-dark/95 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`Video player: ${active.title}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-brand-cream flex items-center justify-center hover:bg-white/25 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-full max-w-4xl my-auto" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video rounded-card-xl overflow-hidden bg-black ring-1 ring-white/15 shadow-luxury">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="mt-3 text-center px-2">
              <h3 className="font-editorial text-lg text-brand-cream">{active.title}</h3>
              <p className="mt-1 text-sm text-brand-cream/60">{active.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
