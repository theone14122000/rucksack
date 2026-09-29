"use client";

import React from "react";
import { Card, CardTitle, Checkbox, Field, Input, Select, Textarea } from "./ui";
import { ArrayEditor, FaqsEditor, ImagePicker, ImagesEditor, ItineraryEditor, RichTextEditor, SlugInput } from "./editors";
import { EditorShell, OrderInput, SeoFields, SidebarCard, StatusRow, useEntityForm } from "./editor-kit";
import { Trek } from "@/lib/cms/types";

const DIFFICULTIES: Trek["difficulty"][] = ["Easy", "Moderate", "Challenging", "Difficult"];

export function TrekEditor({ initial, isNew }: { initial: Trek; isNew: boolean }) {
  const form = useEntityForm<Trek>({
    type: "trek",
    initial,
    isNew,
    backHref: "/admin/treks",
    label: initial.name || "trek",
  });
  const { item, patch, busy, errors, save, remove } = form;

  return (
    <EditorShell
      title={isNew ? "New trek" : item.name || "Edit trek"}
      subtitle={isNew ? "Treks appear on /treks and homepage mountain section." : `Editing /treks/${item.slug}`}
      backHref="/admin/treks"
      backLabel="All treks"
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
            <Checkbox
              label="Featured"
              hint="Show in Featured Treks on the homepage"
              checked={item.featured}
              onChange={(e) => patch({ featured: e.target.checked })}
            />
          </SidebarCard>
          <ImagePicker label="Hero image" value={item.heroImage || ""} onChange={(heroImage) => patch({ heroImage })} />
          <SeoFields seoTitle={item.seoTitle} seoDescription={item.seoDescription} onChange={(p) => patch(p)} />
        </>
      }
    >
      <Card>
        <CardTitle>Core details</CardTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" required>
            <Input value={item.name} onChange={(e) => patch({ name: e.target.value })} placeholder="e.g. Bhaba Pass Trek" />
          </Field>
          <SlugInput value={item.slug} onChange={(slug) => patch({ slug })} sourceValue={item.name} />
          <Field label="Region" required>
            <Input value={item.region} onChange={(e) => patch({ region: e.target.value })} placeholder="Kinnaur, Himachal Pradesh" />
          </Field>
          <Field label="Duration" required>
            <Input value={item.duration} onChange={(e) => patch({ duration: e.target.value })} placeholder="7 Days / 6 Nights" />
          </Field>
          <Field label="Difficulty" required>
            <Select value={item.difficulty} onChange={(e) => patch({ difficulty: e.target.value as Trek["difficulty"] })}>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Altitude" required>
            <Input value={item.altitude} onChange={(e) => patch({ altitude: e.target.value })} placeholder="4,950 m" />
          </Field>
          <Field label="Best season" required>
            <Input value={item.bestSeason} onChange={(e) => patch({ bestSeason: e.target.value })} placeholder="May to October" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Short description" required hint="Shown on trek cards">
            <Textarea value={item.shortDescription} onChange={(e) => patch({ shortDescription: e.target.value })} className="min-h-[72px]" />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Overview</CardTitle>
        <RichTextEditor value={item.overview} onChange={(overview) => patch({ overview })} label="Full overview" minRows={8} />
      </Card>

      <Card>
        <CardTitle>Itinerary</CardTitle>
        <ItineraryEditor items={item.itinerary || []} onChange={(itinerary) => patch({ itinerary })} />
      </Card>

      <Card>
        <CardTitle>Trek details</CardTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <ArrayEditor label="Inclusions" items={item.inclusions || []} onChange={(inclusions) => patch({ inclusions })} placeholder="e.g. Tents & sleeping bags" />
          <ArrayEditor label="Exclusions" items={item.exclusions || []} onChange={(exclusions) => patch({ exclusions })} placeholder="e.g. Personal gear" />
        </div>
        <div className="mt-5">
          <ArrayEditor label="Requirements" items={item.requirements || []} onChange={(requirements) => patch({ requirements })} placeholder="e.g. Prior high-altitude experience" />
        </div>
      </Card>

      <Card>
        <CardTitle>FAQs</CardTitle>
        <FaqsEditor items={item.faqs || []} onChange={(faqs) => patch({ faqs })} />
      </Card>

      <Card>
        <CardTitle>Photo gallery</CardTitle>
        <ImagesEditor label="Gallery images" items={item.gallery || []} onChange={(gallery) => patch({ gallery })} />
      </Card>
    </EditorShell>
  );
}
