"use client";

import React, { createContext, useContext } from "react";
import { SiteSettings } from "@/lib/cms/types";

export { telHref, waHref } from "@/lib/contact-links";

const FALLBACK = {
  phone: "7018678064",
  whatsapp: "917018678064",
  email: "info@rucksackadventures.com",
  address: "Chotta Shimla to Kusumpti Rd, SDA Complex, Kasumpti, Shimla, Himachal Pradesh 171009",
  socialLinks: {
    instagram: "https://www.instagram.com/realitywithriss/",
    facebook: "https://www.facebook.com/adventuresrucksack/",
    youtube: "https://www.youtube.com/@rucksackadventures6559",
    linkedin: "https://in.linkedin.com/in/rucksack-adventures-2a7198179",
  },
  footerDescription:
    "An independent, mountain-first travel atelier headquartered in Kasumpti, Shimla. Curating transformative journeys for over 8 years.",
};

const SettingsContext = createContext<SiteSettings | null>(null);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettings | null {
  return useContext(SettingsContext);
}

export interface ContactSettings {
  phone: string;
  whatsappWaLink: string;
  whatsapp: string;
  email: string;
  address: string;
  socialLinks: typeof FALLBACK.socialLinks;
  footerDescription: string;
}

/** Contact details with safe fallbacks identical to the original hard-coded values. */
export function useContactSettings(): ContactSettings {
  const s = useContext(SettingsContext);
  const waDigits = (s?.whatsapp || FALLBACK.whatsapp).replace(/[^0-9]/g, "");
  const waLink = waDigits.length >= 10 ? waDigits : FALLBACK.whatsapp;
  return {
    phone: s?.phone || FALLBACK.phone,
    whatsapp: waLink,
    whatsappWaLink: waLink.startsWith("91") ? waLink : `91${waLink}`,
    email: s?.email || FALLBACK.email,
    address: s?.address || FALLBACK.address,
    socialLinks: {
      instagram: s?.socialLinks?.instagram || FALLBACK.socialLinks.instagram,
      facebook: s?.socialLinks?.facebook || FALLBACK.socialLinks.facebook,
      youtube: s?.socialLinks?.youtube || FALLBACK.socialLinks.youtube,
      linkedin: s?.socialLinks?.linkedin || FALLBACK.socialLinks.linkedin,
    },
    footerDescription: s?.footerDescription || FALLBACK.footerDescription,
  };
}
