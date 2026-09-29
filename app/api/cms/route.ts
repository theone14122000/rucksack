import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth";
import { validateEntity } from "@/lib/cms/validate";
import { sanitizeRichText, hasRichMarkup } from "@/lib/cms/sanitize";
import {
  getDestinations,
  upsertDestination,
  deleteDestination,
  getPackages,
  upsertPackage,
  deletePackage,
  getTreks,
  upsertTrek,
  deleteTrek,
  getExperiences,
  upsertExperience,
  deleteExperience,
  getTestimonials,
  upsertTestimonial,
  deleteTestimonial,
  getFAQs,
  upsertFAQ,
  deleteFAQ,
  getGalleryItems,
  upsertGalleryItem,
  deleteGalleryItem,
  getServices,
  upsertService,
  deleteService,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  getSiteSettings,
  updateSiteSettings,
  getContentBlocks,
  updateContentBlocks,
  reorderItems,
  CollectionType,
} from "@/lib/cms/store";

const RICH_FIELDS: Partial<Record<CollectionType, string[]>> = {
  package: ["overview"],
  trek: ["overview"],
  destination: ["fullDescription"],
  experience: ["fullDescription"],
};

function sanitizeRichFields(type: string, payload: Record<string, unknown>): void {
  const fields = RICH_FIELDS[type as CollectionType];
  if (!fields) return;
  for (const field of fields) {
    const value = payload[field];
    if (typeof value === "string" && hasRichMarkup(value)) {
      payload[field] = sanitizeRichText(value);
    }
  }
}

function revalidateFor(type: string, payload?: Record<string, unknown>): void {
  const paths = new Set<string>(["/", "/sitemap.xml"]);
  const slug = typeof payload?.slug === "string" ? payload.slug : undefined;

  switch (type) {
    case "package":
      paths.add("/packages");
      if (slug) paths.add(`/packages/${slug}`);
      break;
    case "destination":
      paths.add("/destinations");
      paths.add("/custom-package");
      paths.add("/custom-destination");
      if (slug) paths.add(`/destinations/${slug}`);
      break;
    case "trek":
      paths.add("/treks");
      if (slug) paths.add(`/treks/${slug}`);
      break;
    case "experience":
      paths.add("/experiences");
      break;
    case "gallery":
      paths.add("/gallery");
      break;
    case "testimonial":
      paths.add("/reviews");
      break;
    case "faq":
      paths.add("/faq");
      break;
    case "settings":
    case "content":
      revalidatePath("/", "layout");
      return;
  }
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch (err) {
      console.error("revalidatePath failed", path, err);
    }
  }
}

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type");
  const all = { status: "all" as const };

  try {
    switch (type) {
      case "packages":
        return NextResponse.json({ items: await getPackages(all) });
      case "destinations":
        return NextResponse.json({ items: await getDestinations(all) });
      case "treks":
        return NextResponse.json({ items: await getTreks(all) });
      case "experiences":
        return NextResponse.json({ items: await getExperiences(all) });
      case "services":
        return NextResponse.json({ items: await getServices(all) });
      case "testimonials":
        return NextResponse.json({ items: await getTestimonials(all) });
      case "faqs":
        return NextResponse.json({ items: await getFAQs(undefined, all) });
      case "gallery":
        return NextResponse.json({ items: await getGalleryItems(all) });
      case "enquiries":
        return NextResponse.json({ items: await getEnquiries() });
      case "content":
        return NextResponse.json({ items: await getContentBlocks() });
      case "settings":
        return NextResponse.json({ settings: await getSiteSettings() });
      default:
        return NextResponse.json({ error: "Unknown type." }, { status: 400 });
    }
  } catch (err) {
    console.error("CMS GET error:", err);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { action, type, payload } = await req.json();

    if (type === "enquiry") {
      if (action === "status") {
        const res = await updateEnquiryStatus(payload.id, payload.status);
        return NextResponse.json({ success: res });
      }
      if (action === "delete") {
        const res = await deleteEnquiry(payload.id);
        if (!res) {
          return NextResponse.json({ error: "Item not found." }, { status: 404 });
        }
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (type === "settings") {
      if (action === "update") {
        const res = await updateSiteSettings(payload);
        revalidateFor("settings");
        return NextResponse.json({ success: true, settings: res });
      }
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (type === "content") {
      if (action === "update") {
        const check = await validateEntity("content", payload);
        if (!check.valid) {
          return NextResponse.json({ error: check.errors[0], errors: check.errors }, { status: 400 });
        }
        const res = await updateContentBlocks(payload.blocks as { key: string; value: string }[]);
        revalidateFor("content");
        return NextResponse.json({ success: true, items: res });
      }
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const collectionTypes: CollectionType[] = [
      "destination", "package", "trek", "experience",
      "testimonial", "faq", "gallery", "service",
    ];

    if (!collectionTypes.includes(type as CollectionType)) {
      return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    if (action === "reorder") {
      if (!Array.isArray(payload?.items)) {
        return NextResponse.json({ error: "Missing items list." }, { status: 400 });
      }
      await reorderItems(type as CollectionType, payload.items);
      revalidateFor(type, payload);
      return NextResponse.json({ success: true });
    }

    if (action === "status") {
      const list = await listForType(type as CollectionType);
      const item = list.find((i: { id: string }) => i.id === payload?.id);
      if (!item) {
        return NextResponse.json({ error: "Item not found." }, { status: 404 });
      }
      if (!["published", "draft", "archived"].includes(payload?.status)) {
        return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
      }
      const updated = { ...item, status: payload.status };
      await upsertForType(type as CollectionType, updated as never);
      revalidateFor(type, updated as Record<string, unknown>);
      return NextResponse.json({ success: true, item: updated });
    }

    if (action === "upsert") {
      const check = await validateEntity(type as CollectionType, payload, { excludeId: payload?.id });
      if (!check.valid) {
        return NextResponse.json({ error: check.errors[0], errors: check.errors }, { status: 400 });
      }
      sanitizeRichFields(type, payload);
      const saved = await upsertForType(type as CollectionType, payload as never);
      revalidateFor(type, payload);
      return NextResponse.json({ success: true, item: saved });
    }

    if (action === "delete") {
      const res = await deleteForType(type as CollectionType, payload?.id);
      if (!res) {
        return NextResponse.json({ error: "Item not found." }, { status: 404 });
      }
      revalidateFor(type, payload);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("CMS API error:", err);
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}

async function listForType(type: CollectionType): Promise<{ id: string }[]> {
  switch (type) {
    case "destination": return getDestinations({ status: "all" });
    case "package": return getPackages({ status: "all" });
    case "trek": return getTreks({ status: "all" });
    case "experience": return getExperiences({ status: "all" });
    case "testimonial": return getTestimonials({ status: "all" });
    case "faq": return getFAQs(undefined, { status: "all" });
    case "gallery": return getGalleryItems({ status: "all" });
    case "service": return getServices({ status: "all" });
  }
}

async function upsertForType(type: CollectionType, payload: never): Promise<unknown> {
  switch (type) {
    case "destination": return upsertDestination(payload);
    case "package": return upsertPackage(payload);
    case "trek": return upsertTrek(payload);
    case "experience": return upsertExperience(payload);
    case "testimonial": return upsertTestimonial(payload);
    case "faq": return upsertFAQ(payload);
    case "gallery": return upsertGalleryItem(payload);
    case "service": return upsertService(payload);
  }
}

async function deleteForType(type: CollectionType, id: string): Promise<boolean> {
  switch (type) {
    case "destination": return deleteDestination(id);
    case "package": return deletePackage(id);
    case "trek": return deleteTrek(id);
    case "experience": return deleteExperience(id);
    case "testimonial": return deleteTestimonial(id);
    case "faq": return deleteFAQ(id);
    case "gallery": return deleteGalleryItem(id);
    case "service": return deleteService(id);
  }
}
