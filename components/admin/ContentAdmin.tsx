"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { AdminButton, Card, CardTitle, Field, Input, Textarea, useToast } from "./ui";
import { cmsPost } from "./api";
import { ContentBlock } from "@/lib/cms/types";

interface ContentField {
  key: string;
  label: string;
  type?: "text" | "textarea";
  hint?: string;
}

interface ContentSection {
  id: string;
  title: string;
  description: string;
  fields: ContentField[];
}

const SECTIONS: ContentSection[] = [
  {
    id: "hero",
    title: "Homepage — Hero",
    description: "The opening screen of the website.",
    fields: [
      { key: "home.hero.eyebrow", label: "Eyebrow line (above the heading)" },
      { key: "home.hero.line1", label: "Heading line 1" },
      { key: "home.hero.line2", label: "Heading line 2 (highlighted)", hint: "Rendered with the shimmer effect." },
      { key: "home.hero.line3", label: "Heading line 3 (script accent)", hint: "Rendered in the handwritten accent style." },
      { key: "home.hero.subtitle", label: "Supporting paragraph", type: "textarea" },
    ],
  },
  {
    id: "philosophy",
    title: "Homepage — Our Philosophy",
    description: "The editorial intro section below the stats bar.",
    fields: [
      { key: "home.philosophy.eyebrow", label: "Eyebrow label" },
      { key: "home.philosophy.titleA", label: "Heading (before accent)" },
      { key: "home.philosophy.titleB", label: "Heading accent word" },
      { key: "home.philosophy.body", label: "Body paragraph", type: "textarea" },
    ],
  },
  {
    id: "services",
    title: "Homepage — Services section",
    description: "The transport & pilgrimage desk heading. The three service cards are managed under Services.",
    fields: [
      { key: "home.services.eyebrow", label: "Eyebrow label" },
      { key: "home.services.titleA", label: "Heading (before accent)" },
      { key: "home.services.titleB", label: "Heading accent word" },
      { key: "home.services.titleC", label: "Heading (after accent)" },
      { key: "home.services.note", label: "Closing note above buttons", type: "textarea" },
    ],
  },
  {
    id: "treks",
    title: "Homepage — Treks section",
    description: "Into the Mountains section heading.",
    fields: [
      { key: "home.treks.eyebrow", label: "Eyebrow label" },
      { key: "home.treks.titleA", label: "Heading (before accent)" },
      { key: "home.treks.titleB", label: "Heading accent word" },
      { key: "home.treks.description", label: "Supporting paragraph", type: "textarea" },
    ],
  },
  {
    id: "testimonials",
    title: "Homepage — Testimonials section",
    description: "Words From Our Travelers heading.",
    fields: [
      { key: "home.testimonials.eyebrow", label: "Eyebrow label" },
      { key: "home.testimonials.titleA", label: "Heading (before accent)" },
      { key: "home.testimonials.titleB", label: "Heading accent word" },
    ],
  },
  {
    id: "enquiry",
    title: "Homepage — Enquiry section",
    description: "Begin Your Travel Story heading and note.",
    fields: [
      { key: "home.enquiry.eyebrow", label: "Eyebrow label" },
      { key: "home.enquiry.titleA", label: "Heading (before accent)" },
      { key: "home.enquiry.titleB", label: "Heading accent word" },
      { key: "home.enquiry.note", label: "Note under the heading", type: "textarea" },
    ],
  },
];

function SectionCard({ section, values }: { section: ContentSection; values: Record<string, string> }) {
  const router = useRouter();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [local, setLocal] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const get = (key: string) => (key in local ? local[key] : values[key] ?? "");

  const save = async () => {
    setBusy(true);
    setError("");
    const blocks = section.fields.map((f) => ({ key: f.key, value: get(f.key) }));
    const result = await cmsPost("content", "update", { blocks });
    setBusy(false);
    if (result.ok) {
      setLocal({});
      toast(`${section.title} saved — live on the website`);
      router.refresh();
    } else {
      setError(result.error || "Save failed");
      toast(result.error || "Save failed", "error");
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <CardTitle>{section.title}</CardTitle>
          <p className="text-xs text-brand-taupe -mt-3 mb-4">{section.description}</p>
        </div>
        <AdminButton onClick={save} disabled={busy} className="shrink-0">
          <Save className="w-4 h-4" /> {busy ? "Saving…" : "Save"}
        </AdminButton>
      </div>
      {error && <p className="text-xs font-semibold text-red-600 mb-3">{error}</p>}
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        {section.fields.map((field) => (
          <Field key={field.key} label={field.label} hint={field.hint} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
            {field.type === "textarea" ? (
              <Textarea value={get(field.key)} onChange={(e) => setLocal((p) => ({ ...p, [field.key]: e.target.value }))} />
            ) : (
              <Input value={get(field.key)} onChange={(e) => setLocal((p) => ({ ...p, [field.key]: e.target.value }))} />
            )}
          </Field>
        ))}
      </div>
    </Card>
  );
}

export function ContentAdmin({ initial }: { initial: ContentBlock[] }) {
  const values: Record<string, string> = {};
  for (const block of initial) values[block.key] = block.value;

  return (
    <div className="space-y-5">
      {SECTIONS.map((section) => (
        <SectionCard key={section.id} section={section} values={values} />
      ))}
    </div>
  );
}
