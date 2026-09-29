"use client";

import React from "react";
import { Card, CardTitle, Checkbox, Field, Input, Select, Textarea } from "./ui";
import { ArrayEditor, FaqsEditor, ImagePicker, ImagesEditor, ItineraryEditor, RichTextEditor, SlugInput } from "./editors";
import { EditorShell, OrderInput, SeoFields, SidebarCard, StatusRow, useEntityForm } from "./editor-kit";
import { Package } from "@/lib/cms/types";

const TRAVEL_STYLES = ["Leisure", "Adventure", "Trek", "Family", "Honeymoon", "Pilgrimage", "Cultural", "Wildlife", "Luxury", "Custom"];

export function PackageEditor({
  initial,
  isNew,
  destinations,
}: {
  initial: Package;
  isNew: boolean;
  destinations: { name: string; slug: string }[];
}) {
  const form = useEntityForm<Package>({
    type: "package",
    initial,
    isNew,
    backHref: "/admin/packages",
    label: initial.title || "package",
  });
  const { item, patch, busy, errors, save, remove } = form;

  return (
    <EditorShell
      title={isNew ? "New package" : item.title || "Edit package"}
      subtitle={isNew ? "Create a tour package — it appears on /packages once published." : `Editing /packages/${item.slug}`}
      backHref="/admin/packages"
      backLabel="All packages"
      busy={busy}
      errors={errors}
      onSave={() => save()}
      onSaveDraft={() => save("draft")}
      onDelete={isNew ? undefined : remove}
      sidebar={
        <>
          <SidebarCard title="Publishing">
            <StatusRow status={item.status} onChange={(status) => patch({ status })} />
            <OrderInput value={item.order} onChange={(order) => patch({ order })} />
            <div className="grid grid-cols-1 gap-3">
              <Checkbox
                label="Featured"
                hint="Show in Featured Adventures on the homepage"
                checked={item.featured}
                onChange={(e) => patch({ featured: e.target.checked })}
              />
              <Checkbox
                label="International"
                hint="Counts towards international destinations"
                checked={item.isInternational}
                onChange={(e) => patch({ isInternational: e.target.checked })}
              />
            </div>
          </SidebarCard>
          <ImagePicker label="Hero image" value={item.heroImage || ""} onChange={(heroImage) => patch({ heroImage })} />
          <SeoFields
            seoTitle={item.seoTitle}
            seoDescription={item.seoDescription}
            onChange={(p) => patch(p)}
          />
        </>
      }
    >
      <Card>
        <CardTitle>Core details</CardTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title" required>
            <Input value={item.title} onChange={(e) => patch({ title: e.target.value })} placeholder="e.g. Spiti Valley Overland Expedition" />
          </Field>
          <SlugInput value={item.slug} onChange={(slug) => patch({ slug })} sourceValue={item.title} />
          <Field label="Destination" required>
            <Select
              value={item.destinationSlug}
              onChange={(e) => {
                const dest = destinations.find((d) => d.slug === e.target.value);
                patch({ destinationSlug: e.target.value, destination: dest ? dest.name : item.destination });
              }}
            >
              <option value="">Select destination…</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
              {item.destinationSlug && !destinations.some((d) => d.slug === item.destinationSlug) && (
                <option value={item.destinationSlug}>{item.destination || item.destinationSlug}</option>
              )}
            </Select>
          </Field>
          <Field label="Travel style" required hint="Used for filters — pick or type your own">
            <Input
              list="travel-styles"
              value={item.travelStyle}
              onChange={(e) => patch({ travelStyle: e.target.value })}
              placeholder="Leisure"
            />
            <datalist id="travel-styles">
              {TRAVEL_STYLES.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </Field>
          <Field label="Duration" required>
            <Input value={item.duration} onChange={(e) => patch({ duration: e.target.value })} placeholder="6 Days / 5 Nights" />
          </Field>
          <Field label="Price (INR)" required>
            <Input
              type="number"
              min={0}
              value={item.price}
              onChange={(e) => patch({ price: Number(e.target.value) })}
              placeholder="24999"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Short description" required hint="One or two sentences shown on cards">
            <Textarea
              value={item.shortDescription}
              onChange={(e) => patch({ shortDescription: e.target.value })}
              className="min-h-[72px]"
            />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Overview</CardTitle>
        <RichTextEditor
          value={item.overview}
          onChange={(overview) => patch({ overview })}
          label="Full overview"
          hint="Headings, bold, lists and links are supported. Saved content is sanitised before rendering."
          minRows={8}
        />
      </Card>

      <Card>
        <CardTitle>Itinerary</CardTitle>
        <ItineraryEditor items={item.itinerary || []} onChange={(itinerary) => patch({ itinerary })} />
      </Card>

      <Card>
        <CardTitle>What&apos;s included</CardTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <ArrayEditor label="Inclusions" items={item.inclusions || []} onChange={(inclusions) => patch({ inclusions })} placeholder="e.g. Breakfast & dinner" />
          <ArrayEditor label="Exclusions" items={item.exclusions || []} onChange={(exclusions) => patch({ exclusions })} placeholder="e.g. Airfare" />
        </div>
      </Card>

      <Card>
        <CardTitle>FAQs</CardTitle>
        <FaqsEditor items={item.faqs || []} onChange={(faqs) => patch({ faqs })} />
      </Card>

      <Card>
        <CardTitle>Photo gallery</CardTitle>
        <ImagesEditor label="Gallery images" items={item.gallery || []} onChange={(gallery) => patch({ gallery })} hint="Shown in the package detail page gallery." />
      </Card>
    </EditorShell>
  );
}
