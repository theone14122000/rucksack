import React from "react";
import { Users } from "lucide-react";
import { getSiteSettings } from "@/lib/cms/store";

export const CommunityCTA: React.FC = async () => {
  const settings = await getSiteSettings();
  const socials = [
    { href: settings.socialLinks.instagram, label: "Instagram" },
    { href: settings.socialLinks.facebook, label: "Facebook" },
    { href: settings.socialLinks.youtube ?? "", label: "YouTube" },
    { href: settings.socialLinks.linkedin ?? "", label: "LinkedIn" },
  ].filter((s) => s.href);
  return (
    <div className="text-center max-w-2xl mx-auto space-y-4">
      <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
        <Users className="w-3.5 h-3.5" /> Join Our Community
      </span>
      <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight">
        Travel With{" "}
        <span className="font-hand text-shimmer text-[1.1em]">Fellow Explorers</span>
      </h2>
      <p className="text-sm sm:text-base text-brand-dark/60 leading-relaxed">
        Join the Rucksack Adventure community and be part of a like-minded
        group of explorers who value the beauty of the world and the thrill of
        discovery. Follow us on social media, and stay updated on upcoming
        trips, travel tips, and inspiring stories from fellow travelers.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {socials.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-brand-dark/60 border border-brand-turquoise/10 hover:border-brand-turquoise/25 hover:text-brand-dark transition-all duration-300"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
};
