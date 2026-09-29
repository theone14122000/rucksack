"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered, Plus, Trash2, Type, Upload } from "lucide-react";
import { AdminButton, Field, Input, Select, Textarea, useToast } from "./ui";
import { slugify, uploadFiles } from "./api";

// ============ SLUG INPUT ============
export function SlugInput({
  value,
  onChange,
  sourceValue,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  sourceValue?: string;
  error?: string;
}) {
  return (
    <Field label="Slug" hint="URL-friendly identifier: lowercase letters, numbers, hyphens" error={error} required>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(slugify(e.target.value))} placeholder="my-item-slug" />
        {sourceValue && (
          <AdminButton variant="secondary" onClick={() => onChange(slugify(sourceValue))} className="shrink-0">
            Generate
          </AdminButton>
        )}
      </div>
    </Field>
  );
}

// ============ STRING ARRAY ============
export function ArrayEditor({
  label,
  items,
  onChange,
  placeholder = "Add an item…",
  hint,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  hint?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[index] = e.target.value;
                onChange(next);
              }}
            />
            <div className="flex flex-col gap-0.5">
              <button type="button" onClick={() => move(index, -1)} className="p-1 text-brand-taupe hover:text-brand-turquoise disabled:opacity-30" disabled={index === 0} aria-label="Move up">
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => move(index, 1)} className="p-1 text-brand-taupe hover:text-brand-turquoise disabled:opacity-30" disabled={index === items.length - 1} aria-label="Move down">
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="p-2 text-red-500 hover:text-red-700"
              aria-label="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
            placeholder={placeholder}
          />
          <AdminButton variant="secondary" onClick={add} className="shrink-0">
            <Plus className="w-4 h-4" /> Add
          </AdminButton>
        </div>
      </div>
    </Field>
  );
}

// ============ PAIRS (name + description) ============
export function PairsEditor({
  label,
  items,
  onChange,
  nameLabel,
  descLabel,
  addLabel,
}: {
  label: string;
  items: { name: string; description: string }[];
  onChange: (items: { name: string; description: string }[]) => void;
  nameLabel: string;
  descLabel: string;
  addLabel: string;
}) {
  const update = (index: number, patch: Partial<{ name: string; description: string }>) => {
    const next = items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    onChange(next);
  };

  return (
    <Field label={label}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-card border border-brand-turquoise/10 p-3 bg-brand-cream/40 space-y-2">
            <div className="flex items-center gap-2">
              <Input value={item.name} onChange={(e) => update(index, { name: e.target.value })} placeholder={nameLabel} />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="p-2 text-red-500 hover:text-red-700"
                aria-label="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              value={item.description}
              onChange={(e) => update(index, { description: e.target.value })}
              placeholder={descLabel}
              className="min-h-[72px]"
            />
          </div>
        ))}
        <AdminButton
          variant="secondary"
          onClick={() => onChange([...items, { name: "", description: "" }])}
        >
          <Plus className="w-4 h-4" /> {addLabel}
        </AdminButton>
      </div>
    </Field>
  );
}

// ============ ITINERARY ============
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  distance?: string;
  altitudeGain?: string;
  meals?: string;
  stay?: string;
}

export function ItineraryEditor({
  items,
  onChange,
}: {
  items: ItineraryDay[];
  onChange: (items: ItineraryDay[]) => void;
}) {
  const update = (index: number, patch: Partial<ItineraryDay>) => {
    onChange(items.map((day, i) => (i === index ? { ...day, ...patch } : day)));
  };

  return (
    <Field label="Day-wise itinerary">
      <div className="space-y-3">
        {items.map((day, index) => (
          <div key={index} className="rounded-card-lg border border-brand-turquoise/10 bg-brand-cream/40 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-turquoise">
                Day {day.day || index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => {
                    const next = [...items];
                    [next[index - 1], next[index]] = [next[index], next[index - 1]];
                    onChange(next.map((d, i) => ({ ...d, day: i + 1 })));
                  }}
                  className="p-1.5 text-brand-taupe hover:text-brand-turquoise disabled:opacity-30"
                  aria-label="Move day up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => {
                    const next = [...items];
                    [next[index], next[index + 1]] = [next[index + 1], next[index]];
                    onChange(next.map((d, i) => ({ ...d, day: i + 1 })));
                  }}
                  className="p-1.5 text-brand-taupe hover:text-brand-turquoise disabled:opacity-30"
                  aria-label="Move day down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 })))}
                  className="p-1.5 text-red-500 hover:text-red-700"
                  aria-label="Remove day"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Input value={day.title} onChange={(e) => update(index, { title: e.target.value })} placeholder="Day title (e.g. Arrival in Manali)" />
            <Textarea value={day.description} onChange={(e) => update(index, { description: e.target.value })} placeholder="What happens this day…" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Input value={day.distance || ""} onChange={(e) => update(index, { distance: e.target.value })} placeholder="Distance" />
              <Input value={day.altitudeGain || ""} onChange={(e) => update(index, { altitudeGain: e.target.value })} placeholder="Altitude gain" />
              <Input value={day.meals || ""} onChange={(e) => update(index, { meals: e.target.value })} placeholder="Meals" />
              <Input value={day.stay || ""} onChange={(e) => update(index, { stay: e.target.value })} placeholder="Stay" />
            </div>
          </div>
        ))}
        <AdminButton
          variant="secondary"
          onClick={() =>
            onChange([...items, { day: items.length + 1, title: "", description: "", distance: "", altitudeGain: "", meals: "", stay: "" }])
          }
        >
          <Plus className="w-4 h-4" /> Add day
        </AdminButton>
      </div>
    </Field>
  );
}

// ============ FAQs ============
export function FaqsEditor({
  items,
  onChange,
  categories,
}: {
  items: { question: string; answer: string }[];
  onChange: (items: { question: string; answer: string }[]) => void;
  categories?: { value: string; label: string }[];
}) {
  const update = (index: number, patch: Partial<{ question: string; answer: string; category?: string }>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)) as { question: string; answer: string }[]);
  };

  return (
    <Field label="FAQs">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-card-lg border border-brand-turquoise/10 bg-brand-cream/40 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Input
                value={item.question}
                onChange={(e) => update(index, { question: e.target.value })}
                placeholder="Question"
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="p-2 text-red-500 hover:text-red-700"
                aria-label="Remove FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              value={item.answer}
              onChange={(e) => update(index, { answer: e.target.value })}
              placeholder="Answer"
              className="min-h-[72px]"
            />
            {categories && (
              <Select
                value={(item as { category?: string }).category || categories[0].value}
                onChange={(e) => update(index, { category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            )}
          </div>
        ))}
        <AdminButton variant="secondary" onClick={() => onChange([...items, { question: "", answer: "" }])}>
          <Plus className="w-4 h-4" /> Add FAQ
        </AdminButton>
      </div>
    </Field>
  );
}

// ============ IMAGE PICKER (single) ============
export function ImagePicker({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    const result = await uploadFiles(Array.from(files).slice(0, 1));
    setBusy(false);
    if (result.ok) {
      onChange(result.files[0].url);
      toast("Image uploaded");
    } else {
      toast(result.error, "error");
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <Field label={label} hint={hint || "Paste a path like /images/foo.jpg or upload a file."}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="/images/…" />
          <label className="shrink-0">
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            <span
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider cursor-pointer border border-brand-turquoise/20 bg-white hover:bg-brand-turquoise/5 transition-all ${busy ? "opacity-50 pointer-events-none" : ""}`}
            >
              <Upload className="w-4 h-4" /> {busy ? "Uploading…" : "Upload"}
            </span>
          </label>
        </div>
        {value && (
          <div className="relative w-full max-w-[280px] aspect-[16/10] rounded-card overflow-hidden border border-brand-turquoise/10 bg-brand-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </Field>
  );
}

// ============ IMAGES EDITOR (multiple) ============
export function ImagesEditor({
  label,
  items,
  onChange,
  hint,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  hint?: string;
}) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    const result = await uploadFiles(Array.from(files));
    setBusy(false);
    if (result.ok) {
      onChange([...items, ...result.files.map((f) => f.url)]);
      toast(`${result.files.length} image(s) added`);
    } else {
      toast(result.error, "error");
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map((src, index) => (
            <div key={`${src}-${index}`} className="group relative aspect-square rounded-card overflow-hidden border border-brand-turquoise/10 bg-brand-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-1.5 bg-brand-dark/70 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="p-1 text-white/80 hover:text-white disabled:opacity-30" aria-label="Move left">
                    <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} className="p-1 text-white/80 hover:text-white disabled:opacity-30" aria-label="Move right">
                    <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                  className="p-1 text-white/80 hover:text-red-400"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          <label className={`aspect-square rounded-card border-2 border-dashed border-brand-turquoise/25 hover:border-brand-turquoise/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all bg-brand-cream/40 ${busy ? "opacity-50 pointer-events-none" : ""}`}>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            <Upload className="w-5 h-5 text-brand-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-taupe">{busy ? "Uploading…" : "Add images"}</span>
          </label>
        </div>
      </div>
    </Field>
  );
}

// ============ RICH TEXT EDITOR ============
export function RichTextEditor({
  value,
  onChange,
  label,
  minRows = 6,
  hint,
}: {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  minRows?: number;
  hint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (ref.current && lastValue.current !== value) {
      ref.current.innerHTML = value;
      lastValue.current = value;
    }
    if (ref.current && !ref.current.innerHTML && !value) {
      ref.current.innerHTML = "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    if (ref.current) {
      const html = ref.current.innerHTML;
      lastValue.current = html;
      onChange(html);
    }
  };

  const addLink = () => {
    const url = window.prompt("Link URL (https://… or /page)");
    if (!url) return;
    exec("createLink", url);
  };

  const buttons: { icon: React.ReactNode; label: string; run: () => void }[] = [
    { icon: <Bold className="w-4 h-4" />, label: "Bold", run: () => exec("bold") },
    { icon: <Italic className="w-4 h-4" />, label: "Italic", run: () => exec("italic") },
    { icon: <Heading2 className="w-4 h-4" />, label: "Heading 2", run: () => exec("formatBlock", "h2") },
    { icon: <Heading3 className="w-4 h-4" />, label: "Heading 3", run: () => exec("formatBlock", "h3") },
    { icon: <List className="w-4 h-4" />, label: "Bullet list", run: () => exec("insertUnorderedList") },
    { icon: <ListOrdered className="w-4 h-4" />, label: "Numbered list", run: () => exec("insertOrderedList") },
    { icon: <Link2 className="w-4 h-4" />, label: "Link", run: addLink },
    { icon: <Type className="w-4 h-4" />, label: "Normal text", run: () => exec("formatBlock", "p") },
  ];

  return (
    <div>
      {label && (
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark/70 mb-1.5">{label}</span>
      )}
      <div className="rounded-card border border-brand-turquoise/15 overflow-hidden focus-within:border-brand-turquoise focus-within:ring-2 focus-within:ring-brand-turquoise/15 transition-all bg-white">
        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-brand-turquoise/10 bg-brand-cream/60">
          {buttons.map((b) => (
            <button
              key={b.label}
              type="button"
              title={b.label}
              aria-label={b.label}
              onMouseDown={(e) => {
                e.preventDefault();
                b.run();
              }}
              className="p-2 rounded text-brand-dark/70 hover:bg-brand-turquoise/10 hover:text-brand-turquoise transition-colors"
            >
              {b.icon}
            </button>
          ))}
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={() => {
            if (ref.current) {
              const html = ref.current.innerHTML;
              lastValue.current = html;
              onChange(html);
            }
          }}
          data-placeholder="Write the content…"
          className="rich-text px-4 py-3 text-sm leading-relaxed text-brand-dark focus:outline-none"
          style={{ minHeight: `${minRows * 1.5}rem` }}
        />
      </div>
      {hint && <span className="block text-[11px] text-brand-taupe mt-1">{hint}</span>}
    </div>
  );
}
