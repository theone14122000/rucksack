import { PublishStatus } from "./types";
import { CollectionType, slugExists } from "./store";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STATUSES: PublishStatus[] = ["published", "draft", "archived"];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

type Raw = Record<string, unknown>;

function isStr(v: unknown): v is string {
  return typeof v === "string";
}

function reqStr(errors: string[], v: unknown, label: string, opts?: { min?: number; max?: number }): string {
  if (!isStr(v) || !v.trim()) {
    errors.push(`${label} is required.`);
    return "";
  }
  const value = v.trim();
  if (opts?.min !== undefined && value.length < opts.min) {
    errors.push(`${label} must be at least ${opts.min} characters.`);
  }
  if (opts?.max !== undefined && value.length > opts.max) {
    errors.push(`${label} must be at most ${opts.max} characters.`);
  }
  return value;
}

function optStr(errors: string[], v: unknown, label: string, opts?: { max?: number }): void {
  if (v === undefined || v === null || v === "") return;
  if (!isStr(v)) {
    errors.push(`${label} must be text.`);
    return;
  }
  if (opts?.max !== undefined && v.length > opts.max) {
    errors.push(`${label} must be at most ${opts.max} characters.`);
  }
}

function strList(errors: string[], v: unknown, label: string): string[] {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v)) {
    errors.push(`${label} must be a list.`);
    return [];
  }
  const out: string[] = [];
  for (const item of v) {
    if (!isStr(item)) {
      errors.push(`${label} entries must be text.`);
      continue;
    }
    if (item.trim()) out.push(item.trim());
  }
  return out;
}

function validateCommon(errors: string[], payload: Raw): void {
  if (payload.status !== undefined && payload.status !== null && payload.status !== "") {
    if (!STATUSES.includes(payload.status as PublishStatus)) {
      errors.push("Status must be published, draft or archived.");
    }
  }
  if (payload.order !== undefined && payload.order !== null && payload.order !== "") {
    const order = Number(payload.order);
    if (!Number.isInteger(order) || order < 0 || order > 99999) {
      errors.push("Order must be a whole number between 0 and 99999.");
    }
  }
}

function validateSlug(errors: string[], payload: Raw): void {
  const slug = reqStr(errors, payload.slug, "Slug", { min: 2, max: 80 });
  if (slug && !SLUG_RE.test(slug)) {
    errors.push("Slug may only contain lowercase letters, numbers and hyphens.");
  }
}

export async function validateEntity(
  type: CollectionType | "content",
  payload: unknown,
  opts?: { excludeId?: string }
): Promise<ValidationResult> {
  const errors: string[] = [];
  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: ["Invalid payload."] };
  }
  const p = payload as Raw;
  validateCommon(errors, p);

  if (type === "content") {
    const blocks = p.blocks;
    if (!Array.isArray(blocks) || blocks.length === 0) {
      errors.push("No content blocks supplied.");
    } else {
      for (const block of blocks) {
        const b = block as Raw;
        if (!isStr(b.key) || !/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+$/.test(b.key)) {
          errors.push("Content keys must look like `section.field` (letters, digits, dots).");
          break;
        }
        if (!isStr(b.value)) {
          errors.push("Content values must be text.");
          break;
        }
        if (b.value.length > 20000) {
          errors.push("A content value exceeds the 20000 character limit.");
          break;
        }
      }
    }
    return errors.length ? { valid: false, errors } : { valid: true, errors: [] };
  }

  switch (type) {
    case "destination": {
      reqStr(errors, p.name, "Name", { min: 2, max: 120 });
      validateSlug(errors, p);
      reqStr(errors, p.region, "Region", { max: 120 });
      reqStr(errors, p.shortDescription, "Short description", { min: 10, max: 600 });
      reqStr(errors, p.fullDescription, "Full description", { min: 10, max: 50000 });
      reqStr(errors, p.bestTimeToVisit, "Best time to visit", { max: 200 });
      if (typeof p.isDomestic !== "boolean") errors.push("Type (domestic/international) is required.");
      if (typeof p.featured !== "boolean") p.featured = false;
      const packagesCount = Number(p.packagesCount ?? 0);
      if (!Number.isFinite(packagesCount) || packagesCount < 0) errors.push("Packages count must be zero or more.");
      strList(errors, p.highlights, "Highlights");
      optStr(errors, p.seoTitle, "SEO title", { max: 300 });
      optStr(errors, p.seoDescription, "SEO description", { max: 500 });
      break;
    }
    case "package": {
      reqStr(errors, p.title, "Title", { min: 3, max: 200 });
      validateSlug(errors, p);
      reqStr(errors, p.destination, "Destination", { max: 120 });
      reqStr(errors, p.destinationSlug, "Destination slug", { max: 120 });
      reqStr(errors, p.duration, "Duration", { max: 80 });
      reqStr(errors, p.travelStyle, "Travel style", { max: 80 });
      const price = Number(p.price);
      if (!Number.isFinite(price) || price < 0) errors.push("Price must be zero or more.");
      reqStr(errors, p.shortDescription, "Short description", { min: 10, max: 600 });
      reqStr(errors, p.overview, "Overview", { min: 10, max: 50000 });
      if (!Array.isArray(p.itinerary)) {
        errors.push("Itinerary must be a list.");
      } else {
        for (const day of p.itinerary) {
          const d = day as Raw;
          if (!isStr(d.title) || !d.title.trim()) { errors.push("Each itinerary day needs a title."); break; }
          if (!isStr(d.description) || !d.description.trim()) { errors.push("Each itinerary day needs a description."); break; }
        }
      }
      strList(errors, p.inclusions, "Inclusions");
      strList(errors, p.exclusions, "Exclusions");
      if (p.faqs !== undefined && !Array.isArray(p.faqs)) errors.push("FAQs must be a list.");
      if (typeof p.featured !== "boolean") p.featured = false;
      if (typeof p.isInternational !== "boolean") p.isInternational = false;
      optStr(errors, p.seoTitle, "SEO title", { max: 300 });
      optStr(errors, p.seoDescription, "SEO description", { max: 500 });
      break;
    }
    case "trek": {
      reqStr(errors, p.name, "Name", { min: 3, max: 200 });
      validateSlug(errors, p);
      reqStr(errors, p.region, "Region", { max: 120 });
      reqStr(errors, p.duration, "Duration", { max: 80 });
      const difficulties = ["Easy", "Moderate", "Challenging", "Difficult"];
      if (!isStr(p.difficulty) || !difficulties.includes(p.difficulty)) {
        errors.push("Difficulty must be Easy, Moderate, Challenging or Difficult.");
      }
      reqStr(errors, p.altitude, "Altitude", { max: 80 });
      reqStr(errors, p.bestSeason, "Best season", { max: 120 });
      reqStr(errors, p.shortDescription, "Short description", { min: 10, max: 600 });
      reqStr(errors, p.overview, "Overview", { min: 10, max: 50000 });
      if (!Array.isArray(p.itinerary)) {
        errors.push("Itinerary must be a list.");
      } else {
        for (const day of p.itinerary) {
          const d = day as Raw;
          if (!isStr(d.title) || !d.title.trim()) { errors.push("Each itinerary day needs a title."); break; }
          if (!isStr(d.description) || !d.description.trim()) { errors.push("Each itinerary day needs a description."); break; }
        }
      }
      strList(errors, p.inclusions, "Inclusions");
      strList(errors, p.exclusions, "Exclusions");
      strList(errors, p.requirements, "Requirements");
      if (p.faqs !== undefined && !Array.isArray(p.faqs)) errors.push("FAQs must be a list.");
      if (typeof p.featured !== "boolean") p.featured = false;
      optStr(errors, p.seoTitle, "SEO title", { max: 300 });
      optStr(errors, p.seoDescription, "SEO description", { max: 500 });
      break;
    }
    case "experience": {
      reqStr(errors, p.name, "Name", { min: 3, max: 200 });
      validateSlug(errors, p);
      reqStr(errors, p.category, "Category", { max: 80 });
      reqStr(errors, p.shortDescription, "Short description", { min: 10, max: 600 });
      reqStr(errors, p.fullDescription, "Full description", { min: 10, max: 50000 });
      strList(errors, p.highlights, "Highlights");
      if (typeof p.featured !== "boolean") p.featured = false;
      break;
    }
    case "testimonial": {
      reqStr(errors, p.customerName, "Customer name", { min: 2, max: 120 });
      reqStr(errors, p.review, "Review", { min: 10, max: 5000 });
      const rating = Number(p.rating);
      if (!Number.isFinite(rating) || rating < 1 || rating > 5) errors.push("Rating must be between 1 and 5.");
      reqStr(errors, p.date, "Date", { max: 40 });
      reqStr(errors, p.destination, "Destination", { max: 120 });
      reqStr(errors, p.tripType, "Trip type", { max: 80 });
      break;
    }
    case "faq": {
      reqStr(errors, p.question, "Question", { min: 5, max: 500 });
      reqStr(errors, p.answer, "Answer", { min: 5, max: 5000 });
      const categories = ["general", "booking", "treks", "cabs", "cancellation"];
      if (!isStr(p.category) || !categories.includes(p.category)) {
        errors.push("Category must be general, booking, treks, cabs or cancellation.");
      }
      break;
    }
    case "gallery": {
      const src = reqStr(errors, p.src, "Image path", { max: 500 });
      if (src && !src.startsWith("/")) errors.push("Image path must start with /.");
      if (src && !/\.(jpe?g|png|webp|avif)$/i.test(src)) {
        errors.push("Images must be JPEG, PNG, WebP or AVIF files.");
      }
      reqStr(errors, p.alt, "Alt text", { min: 3, max: 300 });
      optStr(errors, p.caption, "Caption", { max: 300 });
      optStr(errors, p.credit, "Credit", { max: 200 });
      if (typeof p.featured !== "boolean") p.featured = false;
      break;
    }
    case "service": {
      reqStr(errors, p.icon, "Icon (emoji)", { max: 8 });
      reqStr(errors, p.title, "Title", { min: 3, max: 200 });
      reqStr(errors, p.description, "Description", { min: 10, max: 600 });
      const href = reqStr(errors, p.href, "Link", { max: 300 });
      if (href && !/^(\/|https?:\/\/)/.test(href)) errors.push("Link must start with / or https://.");
      strList(errors, p.items, "Bullets");
      break;
    }
  }

  if (errors.length === 0) {
    const slug = p.slug;
    if (isStr(slug) && (await slugExists(type as CollectionType, slug, opts?.excludeId))) {
      errors.push(`Slug "${slug}" is already used by another item.`);
    }
  }

  return { valid: errors.length === 0, errors };
}
