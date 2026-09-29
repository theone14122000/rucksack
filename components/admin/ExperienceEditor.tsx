"use client";

import React from "react";
import { Card, CardTitle, Checkbox, Field, Input, Textarea } from "./ui";
import { ArrayEditor, ImagePicker, RichTextEditor, SlugInput } from "./editors";
import { EditorShell, OrderInput, SidebarCard, StatusRow, useEntityForm } from "./editor-kit";
import { Experience } from "@/lib/cms/types";

export function ExperienceEditor({ initial, isNew }: { initial: Experience; isNew: boolean }) {
  const form = useEntityForm<Experience>({
    type: "experience",
    initial,
    isNew,
    backHref: "/admin/experiences",
    label: initial.name || "experience",
  });
  const { item, patch, busy, errors, save, remove } = form;

  return (
    <EditorShell
      title={isNew ? "New experience" : item.name || "Edit experience"}
      subtitle={isNew ? "Signature experiences shown on /experiences." : `Editing experience "${item.name}"`}
      backHref="/admin/experiences"
      backLabel="All experiences"
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
              checked={item.featured}
              onChange={(e) => patch({ featured: e.target.checked })}
            />
          </SidebarCard>
          <ImagePicker label="Experience image" value={item.image || ""} onChange={(image) => patch({ image })} />
        </>
      }
    >
      <Card>
        <CardTitle>Core details</CardTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" required>
            <Input value={item.name} onChange={(e) => patch({ name: e.target.value })} placeholder="e.g. Alpine Stargazing" />
          </Field>
          <SlugInput value={item.slug} onChange={(slug) => patch({ slug })} sourceValue={item.name} />
          <Field label="Category" required hint="e.g. Mountains, Culture, Wildlife">
            <Input value={item.category} onChange={(e) => patch({ category: e.target.value })} placeholder="Mountains" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Short description" required>
            <Textarea value={item.shortDescription} onChange={(e) => patch({ shortDescription: e.target.value })} className="min-h-[72px]" />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Full description</CardTitle>
        <RichTextEditor
          value={item.fullDescription}
          onChange={(fullDescription) => patch({ fullDescription })}
          minRows={8}
        />
      </Card>

      <Card>
        <CardTitle>Highlights</CardTitle>
        <ArrayEditor label="Highlight points" items={item.highlights || []} onChange={(highlights) => patch({ highlights })} />
      </Card>
    </EditorShell>
  );
}
