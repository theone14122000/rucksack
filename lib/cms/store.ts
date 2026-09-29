import fs from "fs";
import os from "os";
import path from "path";
import {
  Destination,
  Package,
  Trek,
  Experience,
  Testimonial,
  FAQ,
  Enquiry,
  SiteSettings,
  GalleryItem,
  Service,
  ContentBlock,
  PublishStatus,
} from "./types";
import {
  initialSiteSettings,
  initialDestinations,
  initialPackages,
  initialTreks,
  initialExperiences,
  initialTestimonials,
  initialFAQs,
  initialGallery,
  initialServices,
  initialContent,
} from "./seed-data";
import { loadState, saveState } from "./mysql";

interface CMSDatabase {
  settings: SiteSettings;
  destinations: Destination[];
  packages: Package[];
  treks: Trek[];
  experiences: Experience[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  enquiries: Enquiry[];
  gallery: GalleryItem[];
  services: Service[];
  content: ContentBlock[];
}

function probeDir(dir: string): string | null {
  try {
    fs.mkdirSync(dir, { recursive: true });
    const probe = path.join(dir, `.probe-${process.pid}`);
    fs.writeFileSync(probe, "ok");
    fs.unlinkSync(probe);
    return dir;
  } catch {
    return null;
  }
}

// Prefer a writable directory: on serverless hosts the bundled .data folder
// lives inside the read-only build output, so writes there fail silently and
// CMS edits (including deletes) revert on the next request. Read from the
// writable copy when present, otherwise fall back to the bundled seed file.
const BUNDLED_DATA_FILE = path.join(process.cwd(), ".data", "cms.json");
const DATA_DIR = probeDir(path.join(process.cwd(), ".data")) ?? probeDir(path.join(os.tmpdir(), "rucksack-data")) ?? path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "cms.json");

function readDataFile(): string | null {
  for (const file of DATA_FILE === BUNDLED_DATA_FILE ? [DATA_FILE] : [DATA_FILE, BUNDLED_DATA_FILE]) {
    try {
      if (fs.existsSync(file)) return fs.readFileSync(file, "utf-8");
    } catch (err) {
      console.error(`Failed reading ${file}, trying next source`, err);
    }
  }
  return null;
}

export type StatusFilter = "published" | "all";

interface ListFilter {
  status?: StatusFilter;
}

function getDefaultData(): CMSDatabase {
  return {
    settings: initialSiteSettings,
    destinations: initialDestinations,
    packages: initialPackages,
    treks: initialTreks,
    experiences: initialExperiences,
    testimonials: initialTestimonials,
    faqs: initialFAQs,
    enquiries: [
      {
        id: "enq-demo-1",
        name: "Aakash Mehta",
        phone: "+91 98200 12345",
        email: "aakash.mehta@example.com",
        destination: "Himachal Pradesh (Spiti Valley)",
        travelType: "Domestic",
        travelDate: "2026-06-15",
        travellersCount: "4 Adults",
        budget: "INR 1.5 Lakhs",
        message: "Looking for an 8-9 day overland Spiti trip starting from Shimla. Need Innova Crysta and verified warm homestays.",
        status: "New",
        createdAt: "2026-03-01T10:30:00.000Z",
      },
      {
        id: "enq-demo-2",
        name: "Pooja Banerjee",
        phone: "+91 98310 98765",
        email: "pooja.b@example.com",
        destination: "Pilgrimage Tour",
        travelType: "Pilgrimage",
        travelDate: "2026-07-10",
        travellersCount: "2 Adults (Senior citizens)",
        budget: "Flexible",
        message: "Inquiring about Baltal helicopter route and medical certificate guidelines for my parents.",
        status: "Contacted",
        createdAt: "2026-03-02T14:15:00.000Z",
      },
    ],
    gallery: initialGallery,
    services: initialServices,
    content: initialContent,
  };
}

let memoryDb: CMSDatabase | null = null;
let memoryLoadedAt = 0;
/** true when the last successful refresh came straight from MySQL */
let lastLoadedFromMysql = false;

/**
 * How long a process may serve the in-memory document before re-reading
 * MySQL. Production runs several serverless instances that each hold their own
 * copy; without a TTL an instance that booted before an edit keeps serving the
 * stale copy forever, so deletes/upserts from other instances appear to vanish.
 */
const MEMORY_TTL_MS = 10_000;

function migrate(data: Partial<CMSDatabase>): CMSDatabase {
  const full = { ...getDefaultData(), ...data } as CMSDatabase;
  if (!Array.isArray(full.gallery)) full.gallery = [...initialGallery];
  if (!Array.isArray(full.services)) full.services = [...initialServices];
  if (!Array.isArray(full.content)) full.content = [...initialContent];
  if (!full.settings || typeof full.settings !== "object") full.settings = initialSiteSettings;
  if (!Array.isArray(full.enquiries)) full.enquiries = [];
  return full;
}

// Persistence order: MySQL (when DATABASE_URL/MYSQL_URL is set and reachable)
// → .data/cms.json → bundled seed data. The document is cached in memory for
// MEMORY_TTL_MS, then re-read so every instance converges on MySQL.
async function getDatabase(opts?: { forceReload?: boolean }): Promise<CMSDatabase> {
  const fresh = !opts?.forceReload && memoryDb && Date.now() - memoryLoadedAt < MEMORY_TTL_MS;
  if (fresh && memoryDb) return memoryDb;

  const remote = await loadState();
  if (remote.ok && remote.data) {
    try {
      memoryDb = migrate(remote.data as Partial<CMSDatabase>);
      memoryLoadedAt = Date.now();
      lastLoadedFromMysql = true;
      return memoryDb;
    } catch (err) {
      console.error("Invalid CMS document in MySQL, falling back to file", err);
    }
  }

  // MySQL unreachable: keep serving the cached copy if we have one instead of
  // regressing to seed data (which would wipe the user's edits on screen).
  if (memoryDb) {
    memoryLoadedAt = Date.now();
    lastLoadedFromMysql = false;
    return memoryDb;
  }

  let fromFile: CMSDatabase | null = null;
  try {
    const raw = readDataFile();
    if (raw) {
      fromFile = migrate(JSON.parse(raw));
    }
  } catch (err) {
    console.error("Failed reading cms.json from disk, falling back to defaults", err);
  }

  const data = fromFile ?? getDefaultData();
  memoryDb = data;
  memoryLoadedAt = Date.now();
  // Push the snapshot to MySQL on first use of an empty row, and always seed
  // the file when there was none. If MySQL is unreachable this only writes the
  // file (or nothing, when a file already existed).
  if (remote.ok || !fromFile) {
    await saveDatabase(data);
  }
  return data;
}

async function saveDatabase(data: CMSDatabase) {
  memoryDb = data;
  memoryLoadedAt = Date.now();
  const json = JSON.stringify(data, null, 2);
  const targets = [DATA_DIR, path.join(os.tmpdir(), "rucksack-data")];
  let written = false;
  for (const dir of targets) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(path.join(dir, "cms.json"), json, "utf-8");
      written = true;
      break;
    } catch (err) {
      console.error(
        `Failed persisting cms.json to ${dir} (read-only filesystem?). ` +
          "Set DATABASE_URL so CMS changes persist in MySQL.",
        err
      );
    }
  }
  if (!written) {
    console.error(
      "[cms] No writable location for cms.json — changes exist only in memory and are lost on restart. Set DATABASE_URL."
    );
  }
  const ok = await saveState(data);
  if (!ok) {
    console.error(
      "[cms] MySQL save failed — changes are in memory + cms.json only and will fully resync to MySQL on the next save."
    );
  }
}

/** Drop the in-memory cache so the next read re-fetches MySQL. */
export function invalidateCache(): void {
  memoryLoadedAt = 0;
}

/**
 * Runs a delete; if the id was missing, reloads from MySQL and retries.
 *
 * A missing id usually means this instance's cache predates the item (another
 * instance wrote it) — reloading finds it. If MySQL is reachable and the id is
 * STILL missing, the row is already gone, so the delete is treated as done
 * (idempotent) rather than reporting a failure the user cannot act on.
 */
async function deleteWithReload(attempt: () => Promise<boolean>): Promise<boolean> {
  if (await attempt()) return true;
  invalidateCache();
  if (await attempt()) return true;
  return lastLoadedFromMysql;
}

// ============ VISIBILITY / ORDERING HELPERS ============
export function isVisible(item: { status?: PublishStatus }): boolean {
  return !item.status || item.status === "published";
}

function applyStatus<T extends { status?: PublishStatus }>(list: T[], filter?: ListFilter): T[] {
  if (filter?.status === "all") return list;
  return list.filter(isVisible);
}

function sortByOrder<T extends { order?: number }>(list: T[]): T[] {
  return [...list].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
  );
}

// ============ SITE SETTINGS ============
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await getDatabase();
  return db.settings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await getDatabase();
  db.settings = { ...db.settings, ...settings };
  await saveDatabase(db);
  return db.settings;
}

// ============ DESTINATIONS ============
export async function getDestinations(
  filter?: { isDomestic?: boolean; featured?: boolean } & ListFilter
): Promise<Destination[]> {
  const db = await getDatabase();
  let list = applyStatus(db.destinations, filter);
  if (filter?.isDomestic !== undefined) {
    list = list.filter((d) => d.isDomestic === filter.isDomestic);
  }
  if (filter?.featured !== undefined) {
    list = list.filter((d) => d.featured === filter.featured);
  }
  return sortByOrder(list);
}

export async function getDestinationBySlug(
  slug: string,
  opts?: { includeHidden?: boolean }
): Promise<Destination | null> {
  const db = await getDatabase();
  const found = db.destinations.find((d) => d.slug === slug);
  if (!found) return null;
  if (!opts?.includeHidden && !isVisible(found)) return null;
  return found;
}

export async function upsertDestination(dest: Destination): Promise<Destination> {
  const db = await getDatabase();
  const idx = db.destinations.findIndex((d) => d.id === dest.id || d.slug === dest.slug);
  if (idx >= 0) {
    db.destinations[idx] = { ...db.destinations[idx], ...dest };
  } else {
    db.destinations.push(dest);
  }
  await saveDatabase(db);
  return dest;
}

export async function deleteDestination(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.destinations.length;
    db.destinations = db.destinations.filter((d) => d.id !== id);
    if (db.destinations.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ PACKAGES ============
export async function getPackages(
  filter?: { destinationSlug?: string; featured?: boolean; isInternational?: boolean } & ListFilter
): Promise<Package[]> {
  const db = await getDatabase();
  let list = applyStatus(db.packages, filter);
  if (filter?.destinationSlug) {
    list = list.filter((p) => p.destinationSlug === filter.destinationSlug);
  }
  if (filter?.featured !== undefined) {
    list = list.filter((p) => p.featured === filter.featured);
  }
  if (filter?.isInternational !== undefined) {
    list = list.filter((p) => p.isInternational === filter.isInternational);
  }
  return sortByOrder(list);
}

export async function getPackageBySlug(
  slug: string,
  opts?: { includeHidden?: boolean }
): Promise<Package | null> {
  const db = await getDatabase();
  const found = db.packages.find((p) => p.slug === slug);
  if (!found) return null;
  if (!opts?.includeHidden && !isVisible(found)) return null;
  return found;
}

export async function upsertPackage(pkg: Package): Promise<Package> {
  const db = await getDatabase();
  const idx = db.packages.findIndex((p) => p.id === pkg.id || p.slug === pkg.slug);
  if (idx >= 0) {
    db.packages[idx] = { ...db.packages[idx], ...pkg };
  } else {
    db.packages.push(pkg);
  }
  await saveDatabase(db);
  return pkg;
}

export async function deletePackage(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.packages.length;
    db.packages = db.packages.filter((p) => p.id !== id);
    if (db.packages.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ TREKS ============
export async function getTreks(
  filter?: { featured?: boolean; difficulty?: string } & ListFilter
): Promise<Trek[]> {
  const db = await getDatabase();
  let list = applyStatus(db.treks, filter);
  if (filter?.featured !== undefined) {
    list = list.filter((t) => t.featured === filter.featured);
  }
  if (filter?.difficulty) {
    list = list.filter((t) => t.difficulty.toLowerCase() === filter.difficulty?.toLowerCase());
  }
  return sortByOrder(list);
}

export async function getTrekBySlug(
  slug: string,
  opts?: { includeHidden?: boolean }
): Promise<Trek | null> {
  const db = await getDatabase();
  const found = db.treks.find((t) => t.slug === slug);
  if (!found) return null;
  if (!opts?.includeHidden && !isVisible(found)) return null;
  return found;
}

export async function upsertTrek(trek: Trek): Promise<Trek> {
  const db = await getDatabase();
  const idx = db.treks.findIndex((t) => t.id === trek.id || t.slug === trek.slug);
  if (idx >= 0) {
    db.treks[idx] = { ...db.treks[idx], ...trek };
  } else {
    db.treks.push(trek);
  }
  await saveDatabase(db);
  return trek;
}

export async function deleteTrek(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.treks.length;
    db.treks = db.treks.filter((t) => t.id !== id);
    if (db.treks.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ EXPERIENCES ============
export async function getExperiences(filter?: ListFilter): Promise<Experience[]> {
  const db = await getDatabase();
  return sortByOrder(applyStatus(db.experiences, filter));
}

export async function getExperienceBySlug(
  slug: string,
  opts?: { includeHidden?: boolean }
): Promise<Experience | null> {
  const db = await getDatabase();
  const found = db.experiences.find((e) => e.slug === slug);
  if (!found) return null;
  if (!opts?.includeHidden && !isVisible(found)) return null;
  return found;
}

export async function upsertExperience(exp: Experience): Promise<Experience> {
  const db = await getDatabase();
  const idx = db.experiences.findIndex((e) => e.id === exp.id || e.slug === exp.slug);
  if (idx >= 0) {
    db.experiences[idx] = { ...db.experiences[idx], ...exp };
  } else {
    db.experiences.push(exp);
  }
  await saveDatabase(db);
  return exp;
}

export async function deleteExperience(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.experiences.length;
    db.experiences = db.experiences.filter((e) => e.id !== id);
    if (db.experiences.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ TESTIMONIALS ============
export async function getTestimonials(filter?: ListFilter): Promise<Testimonial[]> {
  const db = await getDatabase();
  return sortByOrder(applyStatus(db.testimonials, filter));
}

export async function upsertTestimonial(item: Testimonial): Promise<Testimonial> {
  const db = await getDatabase();
  const idx = db.testimonials.findIndex((t) => t.id === item.id);
  if (idx >= 0) {
    db.testimonials[idx] = item;
  } else {
    db.testimonials.push(item);
  }
  await saveDatabase(db);
  return item;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.testimonials.length;
    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    if (db.testimonials.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ FAQS ============
export async function getFAQs(category?: string, filter?: ListFilter): Promise<FAQ[]> {
  const db = await getDatabase();
  let list = applyStatus(db.faqs, filter);
  if (category) {
    list = list.filter((f) => f.category === category);
  }
  return sortByOrder(list);
}

export async function upsertFAQ(item: FAQ): Promise<FAQ> {
  const db = await getDatabase();
  const idx = db.faqs.findIndex((f) => f.id === item.id);
  if (idx >= 0) {
    db.faqs[idx] = item;
  } else {
    db.faqs.push(item);
  }
  await saveDatabase(db);
  return item;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.faqs.length;
    db.faqs = db.faqs.filter((f) => f.id !== id);
    if (db.faqs.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ GALLERY ============
export async function getGalleryItems(
  filter?: { featured?: boolean } & ListFilter
): Promise<GalleryItem[]> {
  const db = await getDatabase();
  let list = applyStatus(db.gallery, filter);
  if (filter?.featured !== undefined) {
    list = list.filter((g) => g.featured === filter.featured);
  }
  return sortByOrder(list);
}

export async function upsertGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  const db = await getDatabase();
  const idx = db.gallery.findIndex((g) => g.id === item.id);
  if (idx >= 0) {
    db.gallery[idx] = { ...db.gallery[idx], ...item, updatedAt: new Date().toISOString() };
  } else {
    db.gallery.push({ ...item, createdAt: item.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  await saveDatabase(db);
  return item;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.gallery.length;
    db.gallery = db.gallery.filter((g) => g.id !== id);
    if (db.gallery.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ SERVICES ============
export async function getServices(filter?: ListFilter): Promise<Service[]> {
  const db = await getDatabase();
  return sortByOrder(applyStatus(db.services, filter));
}

export async function upsertService(item: Service): Promise<Service> {
  const db = await getDatabase();
  const idx = db.services.findIndex((s) => s.id === item.id);
  if (idx >= 0) {
    db.services[idx] = item;
  } else {
    db.services.push(item);
  }
  await saveDatabase(db);
  return item;
}

export async function deleteService(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.services.length;
    db.services = db.services.filter((s) => s.id !== id);
    if (db.services.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ CONTENT BLOCKS ============
export async function getContentBlocks(): Promise<ContentBlock[]> {
  const db = await getDatabase();
  return db.content;
}

export async function getContentMap(): Promise<Record<string, string>> {
  const db = await getDatabase();
  const map: Record<string, string> = {};
  for (const block of db.content) {
    map[block.key] = block.value;
  }
  return map;
}

export async function updateContentBlocks(
  blocks: { key: string; value: string }[]
): Promise<ContentBlock[]> {
  const db = await getDatabase();
  const now = new Date().toISOString();
  for (const block of blocks) {
    const idx = db.content.findIndex((c) => c.key === block.key);
    if (idx >= 0) {
      db.content[idx] = { ...db.content[idx], value: block.value, updatedAt: now };
    } else {
      db.content.push({ key: block.key, value: block.value, updatedAt: now });
    }
  }
  await saveDatabase(db);
  return db.content;
}

// ============ ENQUIRIES ============
export async function getEnquiries(): Promise<Enquiry[]> {
  const db = await getDatabase();
  return [...db.enquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt" | "status">): Promise<Enquiry> {
  const db = await getDatabase();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: "enq-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  db.enquiries.unshift(newEnquiry);
  await saveDatabase(db);
  return newEnquiry;
}

export async function updateEnquiryStatus(id: string, status: Enquiry["status"]): Promise<boolean> {
  const db = await getDatabase();
  const item = db.enquiries.find((e) => e.id === id);
  if (item) {
    item.status = status;
    await saveDatabase(db);
    return true;
  }
  return false;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  return deleteWithReload(async () => {
    const db = await getDatabase();
    const lenBefore = db.enquiries.length;
    db.enquiries = db.enquiries.filter((e) => e.id !== id);
    if (db.enquiries.length !== lenBefore) {
      await saveDatabase(db);
      return true;
    }
    return false;
  });
}

// ============ ADMIN HELPERS ============
export type CollectionType =
  | "destination"
  | "package"
  | "trek"
  | "experience"
  | "testimonial"
  | "faq"
  | "gallery"
  | "service";

const COLLECTION_KEYS: Record<CollectionType, keyof CMSDatabase> = {
  destination: "destinations",
  package: "packages",
  trek: "treks",
  experience: "experiences",
  testimonial: "testimonials",
  faq: "faqs",
  gallery: "gallery",
  service: "services",
};

export async function slugExists(type: CollectionType, slug: string, excludeId?: string): Promise<boolean> {
  const db = await getDatabase();
  const key = COLLECTION_KEYS[type];
  const list = db[key] as { id: string; slug?: string }[] | undefined;
  if (!Array.isArray(list)) return false;
  return list.some((item) => item.slug === slug && item.id !== excludeId);
}

export async function reorderItems(
  type: CollectionType,
  items: { id: string; order: number }[]
): Promise<boolean> {
  const db = await getDatabase();
  const key = COLLECTION_KEYS[type];
  const list = db[key] as unknown as ({ id: string; order?: number }[]) | undefined;
  if (!Array.isArray(list)) return false;
  for (const pair of items) {
    const item = list.find((i) => i.id === pair.id);
    if (item) item.order = pair.order;
  }
  await saveDatabase(db);
  return true;
}

/** Scans all content collections for references to a media URL. */
export async function findMediaUsage(url: string): Promise<string | null> {
  const db = await getDatabase();
  const collections: [string, unknown[]][] = [
    ["Gallery", db.gallery],
    ["Packages", db.packages],
    ["Destinations", db.destinations],
    ["Treks", db.treks],
    ["Experiences", db.experiences],
    ["Services", db.services],
    ["Content", db.content],
    ["Settings", [db.settings]],
  ];
  for (const [name, items] of collections) {
    if (JSON.stringify(items).includes(url)) return name;
  }
  return null;
}
