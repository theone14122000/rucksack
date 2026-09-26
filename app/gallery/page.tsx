import React from "react";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Camera } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { GalleryVideos } from "@/components/gallery/GalleryVideos";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CommunityCTA } from "@/components/sections/CommunityCTA";
import { Reveal } from "@/components/ui/Reveal";
import { galleryImages, type GalleryImage } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore travel moments, adventures, destinations and memories from Rucksack Adventures.",
};

/**
 * Resolve which gallery files actually exist in /public/gallery at build time.
 * Missing files get src: "" so the client renders a themed placeholder instead
 * of a broken image. Dropping real files into public/gallery + redeploying
 * makes them appear automatically.
 */
function resolveGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  return galleryImages.map((image) => {
    const base = `gallery${image.id}`;
    if (fs.existsSync(path.join(dir, `${base}.jpeg`))) return image;
    if (fs.existsSync(path.join(dir, `${base}.jpg`)))
      return { ...image, src: `/gallery/${base}.jpg` };
    return { ...image, src: "" };
  });
}

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="pt-24 sm:pt-28 pb-10 sm:pb-12 bg-brand-cream border-b border-brand-turquoise/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Gallery" }]} />
          <div className="pt-4 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
              <Camera className="w-3.5 h-3.5" /> Rucksack Adventures
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight">
              Our Gallery
            </h1>
            <p className="text-sm sm:text-base text-brand-dark/70 leading-relaxed">
              Explore the journeys, places, people and moments that make every
              adventure memorable.
            </p>
          </div>
        </div>
      </div>

      {/* YouTube Video Placeholders */}
      <div className="bg-brand-cream">
        <GalleryVideos />
      </div>

      {/* Photo Gallery */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl mb-8 sm:mb-12 space-y-3">
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">
                Moments From Our Journeys
              </h2>
              <p className="text-sm sm:text-base text-brand-dark/70 leading-relaxed">
                A collection of places, people and memories captured along the
                way.
              </p>
            </div>
          </Reveal>
          <GalleryGrid images={resolveGalleryImages()} />
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
