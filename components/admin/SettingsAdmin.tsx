"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { AdminButton, Card, CardTitle, Field, Input, Textarea, useToast } from "./ui";
import { cmsPost } from "./api";
import { SiteSettings } from "@/lib/cms/types";

type Tab = "contact" | "social" | "seo" | "footer";

const TABS: { id: Tab; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "social", label: "Social" },
  { id: "seo", label: "SEO" },
  { id: "footer", label: "Footer" },
];

export function SettingsAdmin({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("contact");
  const [settings, setSettings] = useState<SiteSettings>(initial);
  const [keywords, setKeywords] = useState<string>(initial.seoDefaults.keywords.join(", "));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const patch = (partial: Partial<SiteSettings>) => setSettings((prev) => ({ ...prev, ...partial }));

  const save = async () => {
    setBusy(true);
    setError("");
    const payload: Partial<SiteSettings> = {
      ...settings,
      seoDefaults: {
        ...settings.seoDefaults,
        keywords: keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      },
    };
    const result = await cmsPost("settings", "update", payload);
    setBusy(false);
    if (result.ok) {
      toast("Settings saved — applied across the website");
      router.refresh();
    } else {
      setError(result.error || "Save failed");
      toast(result.error || "Save failed", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider border transition-all ${
              tab === t.id
                ? "bg-brand-turquoise text-white border-brand-turquoise"
                : "bg-white text-brand-taupe border-brand-turquoise/15 hover:border-brand-turquoise/40"
            }`}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto">
          <AdminButton onClick={save} disabled={busy}>
            <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save settings"}
          </AdminButton>
        </span>
      </div>

      {error && (
        <div className="mb-5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {tab === "contact" && (
        <Card>
          <CardTitle>Contact details</CardTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Brand name">
              <Input value={settings.brandName} onChange={(e) => patch({ brandName: e.target.value })} />
            </Field>
            <Field label="Tagline">
              <Input value={settings.tagline} onChange={(e) => patch({ tagline: e.target.value })} />
            </Field>
            <Field label="Location">
              <Input value={settings.location} onChange={(e) => patch({ location: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input value={settings.phone} onChange={(e) => patch({ phone: e.target.value })} />
            </Field>
            <Field label="Alternate phone">
              <Input value={settings.alternatePhone} onChange={(e) => patch({ alternatePhone: e.target.value })} />
            </Field>
            <Field label="WhatsApp number (digits only)" hint="Used for wa.me links — include country code">
              <Input value={settings.whatsapp} onChange={(e) => patch({ whatsapp: e.target.value })} />
            </Field>
            <Field label="Email">
              <Input type="email" value={settings.email} onChange={(e) => patch({ email: e.target.value })} />
            </Field>
            <Field label="Years of experience (badge)">
              <Input value={settings.experienceYears} onChange={(e) => patch({ experienceYears: e.target.value })} />
            </Field>
            <Field label="Rating">
              <Input
                type="number"
                step="0.1"
                min={0}
                max={5}
                value={settings.rating}
                onChange={(e) => patch({ rating: Number(e.target.value) })}
              />
            </Field>
            <Field label="Ratings count">
              <Input
                type="number"
                min={0}
                value={settings.ratingsCount}
                onChange={(e) => patch({ ratingsCount: Number(e.target.value) })}
              />
            </Field>
            <Field label="Curated journeys count">
              <Input value={settings.curatedJourneysCount} onChange={(e) => patch({ curatedJourneysCount: e.target.value })} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Office address">
              <Textarea value={settings.address} onChange={(e) => patch({ address: e.target.value })} className="min-h-[64px]" />
            </Field>
          </div>
        </Card>
      )}

      {tab === "social" && (
        <Card>
          <CardTitle>Social links</CardTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Instagram URL">
              <Input value={settings.socialLinks.instagram} onChange={(e) => patch({ socialLinks: { ...settings.socialLinks, instagram: e.target.value } })} />
            </Field>
            <Field label="Facebook URL">
              <Input value={settings.socialLinks.facebook} onChange={(e) => patch({ socialLinks: { ...settings.socialLinks, facebook: e.target.value } })} />
            </Field>
            <Field label="YouTube URL">
              <Input value={settings.socialLinks.youtube || ""} onChange={(e) => patch({ socialLinks: { ...settings.socialLinks, youtube: e.target.value } })} />
            </Field>
            <Field label="LinkedIn URL">
              <Input value={settings.socialLinks.linkedin || ""} onChange={(e) => patch({ socialLinks: { ...settings.socialLinks, linkedin: e.target.value } })} />
            </Field>
          </div>
        </Card>
      )}

      {tab === "seo" && (
        <Card>
          <CardTitle>Default SEO</CardTitle>
          <div className="space-y-4">
            <Field label="Default page title" hint="Used when a page does not set its own title">
              <Input value={settings.seoDefaults.title} onChange={(e) => patch({ seoDefaults: { ...settings.seoDefaults, title: e.target.value } })} />
            </Field>
            <Field label="Default meta description">
              <Textarea
                value={settings.seoDefaults.description}
                onChange={(e) => patch({ seoDefaults: { ...settings.seoDefaults, description: e.target.value } })}
              />
            </Field>
            <Field label="Keywords" hint="Comma-separated">
              <Textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} className="min-h-[80px]" />
            </Field>
          </div>
        </Card>
      )}

      {tab === "footer" && (
        <Card>
          <CardTitle>Footer</CardTitle>
          <Field label="Footer description" hint="The short paragraph under the logo">
            <Textarea
              value={settings.footerDescription || ""}
              onChange={(e) => patch({ footerDescription: e.target.value })}
            />
          </Field>
          <p className="text-xs text-brand-taupe mt-4 leading-relaxed">
            Footer navigation links and legal pages are part of the site template. Contact details shown in the
            footer come from the Contact tab, social icons from the Social tab.
          </p>
        </Card>
      )}
    </div>
  );
}
