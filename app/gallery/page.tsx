import React from "react";
import { Metadata } from "next";
import { Camera } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { GalleryVideos } from "@/components/gallery/GalleryVideos";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CommunityCTA } from "@/components/sections/CommunityCTA";
import { Reveal } from "@/components/ui/Reveal";
import { galleryImages, type GalleryImage } from "@/lib/gallery-data";
import { getGalleryItems } from "@/lib/cms/store";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore travel moments, adventures, destinations and memories from Rucksack Adventures.",
};

/**
 * CMS gallery items take priority (editable in /admin/gallery). Srcs are passed
 * through unconditionally: server-side existsSync is unreliable on serverless
 * hosts (the function FS often lacks public/, which is served from build
 * output instead) and would hide images whose URLs actually work. The client
 * grid falls back to a themed placeholder when an image really fails to load.
 */
async function resolveGalleryImages(): Promise<GalleryImage[]> {
  const items = await getGalleryItems();
  if (items.length > 0) {
    return items.map((item, i) => ({
      id: i + 1,
      src: item.src,
      alt: item.alt || `Rucksack Adventures moment ${i + 1}`,
      caption: item.caption || undefined,
      featured: item.featured === true,
    }));
  }
  return galleryImages;
}

export default async function GalleryPage() {
  const images = await resolveGalleryImages();
  return (
    <>
      {/* Gallery intro */}
      <div className="pt-24 sm:pt-28 pb-8 sm:pb-10 bg-brand-cream border-b border-brand-turquoise/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Gallery" }]} />
          <div className="pt-4 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
              <Camera className="w-3.5 h-3.5" /> Our Gallery
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight">
              Moments That Make the Journey
            </h1>
            <p className="text-sm sm:text-base text-brand-dark/70 leading-relaxed">
              Moments captured by travellers and clients during their journeys
              with Rucksack Adventures — the places, people and memories that
              make every adventure unforgettable.
            </p>
          </div>
        </div>
      </div>

      {/* Travel stories / videos */}
      <div className="bg-brand-cream">
        <GalleryVideos />
      </div>

      {/* Photo gallery — editorial masonry-style grid */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl mb-7 sm:mb-9 space-y-2.5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-brand-turquoise">
                Captured Along the Way
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark tracking-tight">
                Photo Gallery
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/70 leading-relaxed">
                A collection of places, people and memories captured along the
                way.
              </p>
            </div>
          </Reveal>
          <GalleryGrid images={images} />
        </div>
      </section>

      {/* Reusable CTA */}
      <section className="py-16 lg:py-20 bg-brand-cream border-t border-brand-turquoise/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityCTA />
        </div>
      </section>
    </>
  );
}
