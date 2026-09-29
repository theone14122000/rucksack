import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { SiteSettingsProvider } from "@/components/cms/SettingsProvider";
import { getLocalBusinessSchema } from "@/lib/seo";
import { getSiteSettings } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const seo = settings.seoDefaults;
  return {
    metadataBase: new URL("https://rucksackadventures.com"),
    title: {
      default: seo.title,
      template: `%s | ${settings.brandName}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: settings.brandName, url: "https://rucksackadventures.com" }],
    creator: settings.brandName,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "https://rucksackadventures.com",
      siteName: settings.brandName,
      title: seo.title,
      description: seo.ogDescription || seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: "Rucksack Adventures | Curated Himalayan Journeys",
      description: seo.twitterDescription || seo.description,
    },
    robots: { index: true, follow: true },
    icons: { icon: "/images/logo.jpeg" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, jsonLd] = await Promise.all([getSiteSettings(), getLocalBusinessSchema()]);
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes cta-shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-brand-dark font-sans selection:bg-brand-turquoise selection:text-white">
        <SiteSettingsProvider settings={settings}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCTA />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
