import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { getLocalBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://rucksackadventures.com"),
  title: {
    default: "Rucksack Adventures | Premium Travel Agency in Shimla, Himachal Pradesh",
    template: "%s | Rucksack Adventures",
  },
  description:
    "Curated Himalayan journeys, high altitude trekking expeditions, custom domestic & international tour packages, Amarnath Yatra, and trusted taxi services based in Mehli, Shimla.",
  keywords: [
    "travel agency in Shimla",
    "Himachal tour packages",
    "Kashmir tour packages",
    "Leh Ladakh tour packages",
    "Uttarakhand tour packages",
    "North East India tours",
    "Himalayan trekking",
    "Chopta Chandrashila Trek",
    "Bhaba Pass Trek",
    "Triund Trek",
    "Amarnath Yatra",
    "Shimla taxi service",
    "Rucksack Adventures",
  ],
  authors: [{ name: "Rucksack Adventures", url: "https://rucksackadventures.com" }],
  creator: "Rucksack Adventures",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rucksackadventures.com",
    siteName: "Rucksack Adventures",
    title: "Rucksack Adventures | Premium Travel Agency in Shimla",
    description:
      "Explore curated Himalayan journeys, custom tour packages, trekking expeditions, and reliable taxi services from Mehli, Shimla with 8+ years of expertise.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rucksack Adventures | Curated Himalayan Journeys",
    description: "Premium travel company based in Mehli, Shimla, Himachal Pradesh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getLocalBusinessSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-offwhite text-brand-charcoal selection:bg-brand-sand selection:text-brand-espresso">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
