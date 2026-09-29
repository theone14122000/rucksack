"use client";

import React from "react";
import { Card, CardTitle, Checkbox, Field, Input, Select, Textarea } from "./ui";
import { ArrayEditor, ImagePicker, ImagesEditor, PairsEditor, RichTextEditor, SlugInput } from "./editors";
import { EditorShell, OrderInput, SeoFields, SidebarCard, StatusRow, useEntityForm } from "./editor-kit";
import { Destination } from "@/lib/cms/types";

export function DestinationEditor({ initial, isNew }: { initial: Destination; isNew: boolean }) {
  const form = useEntityForm<Destination>({
    type: "destination",
    initial,
    isNew,
    backHref: "/admin/destinations",
    label: initial.name || "destination",
  });
  const { item, patch, busy, errors, save, remove } = form;

  return (
    <EditorShell
      title={isNew ? "New destination" : item.name || "Edit destination"}
      subtitle={isNew ? "Destinations appear on /destinations and in package filters." : `Editing /destinations/${item.slug}`}
      backHref="/admin/destinations"
      backLabel="All destinations"
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
                hint="Highlights this destination across the site"
                checked={item.featured}
                onChange={(e) => patch({ featured: e.target.checked })}
              />
              <Checkbox
                label="Domestic (India)"
                checked={item.isDomestic}
                onChange={(e) => patch({ isDomestic: e.target.checked })}
              />
            </div>
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
            <Input value={item.name} onChange={(e) => patch({ name: e.target.value })} placeholder="e.g. Kinnaur" />
          </Field>
          <SlugInput value={item.slug} onChange={(slug) => patch({ slug })} sourceValue={item.name} />
          <Field label="Region" required>
            <Input value={item.region} onChange={(e) => patch({ region: e.target.value })} placeholder="Himachal Pradesh" />
          </Field>
          <Field label="Best time to visit" required>
            <Input value={item.bestTimeToVisit} onChange={(e) => patch({ bestTimeToVisit: e.target.value })} placeholder="March to June" />
          </Field>
          <Field label="Packages count" hint="Legacy field used by older layouts">
            <Input
              type="number"
              min={0}
              value={item.packagesCount}
              onChange={(e) => patch({ packagesCount: Number(e.target.value) })}
            />
          </Field>
          <Field label="Treks count" hint="Optional">
            <Input
              type="number"
              min={0}
              value={item.treksCount ?? ""}
              onChange={(e) => patch({ treksCount: e.target.value === "" ? undefined : Number(e.target.value) })}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Short description" required hint="Shown on destination cards">
            <Textarea value={item.shortDescription} onChange={(e) => patch({ shortDescription: e.target.value })} className="min-h-[72px]" />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Full description</CardTitle>
        <RichTextEditor
          value={item.fullDescription}
          onChange={(fullDescription) => patch({ fullDescription })}
          label="About this destination"
          minRows={8}
          hint="Supports headings, bold, lists and links."
        />
      </Card>

      <Card>
        <CardTitle>Highlights</CardTitle>
        <ArrayEditor label="Highlight points" items={item.highlights || []} onChange={(highlights) => patch({ highlights })} placeholder="e.g. Snowline cafés" />
      </Card>

      <Card>
        <CardTitle>Attractions</CardTitle>
        <PairsEditor
          label="Places to see"
          items={item.attractions || []}
          onChange={(attractions) => patch({ attractions })}
          nameLabel="Attraction name"
          descLabel="Description (optional)"
          addLabel="Add attraction"
        />
      </Card>

      <Card>
        <CardTitle>Photo gallery</CardTitle>
        <ImagesEditor label="Gallery images" items={item.gallery || []} onChange={(gallery) => patch({ gallery })} />
      </Card>
    </EditorShell>
  );
}
