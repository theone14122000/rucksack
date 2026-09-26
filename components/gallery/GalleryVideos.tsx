import React from "react";
import { Play } from "lucide-react";
import { galleryVideos } from "@/lib/gallery-data";

const pad = (n: number) => String(n).padStart(2, "0");

export const GalleryVideos: React.FC = () => {
  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-12 space-y-3">
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">
            Travel Stories on Video
          </h2>
          <p className="text-sm sm:text-base text-brand-dark/70 leading-relaxed">
            Watch moments from our journeys, discover new destinations and
            experience the adventure before you pack your rucksack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {galleryVideos.map((video) => (
            <article
              key={video.id}
              className="group h-full flex flex-col bg-white rounded-card-xl border border-brand-turquoise/10 p-3 sm:p-4 pb-5 shadow-soft hover:shadow-luxury hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500"
            >
              {/* YouTube embed placeholder — replace inner content with iframe when youtubeId is ready */}
              <div className="relative aspect-video rounded-card overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-turquoise/50 ring-1 ring-brand-dark/10 flex flex-col items-center justify-center text-center px-4">
                <div className="w-14 h-14 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shadow-luxury group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-cream/70">
                  YouTube Video
                </span>
              </div>

              <div className="pt-4 px-1 text-center flex-1 flex flex-col justify-start">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                  Video {pad(video.id)}
                </p>
                <h3 className="mt-1.5 font-editorial text-lg sm:text-xl text-brand-dark leading-snug">
                  {video.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-brand-taupe leading-relaxed">
                  {video.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
