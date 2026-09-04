import fs from "fs";
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
} from "./types";
import {
  initialSiteSettings,
  initialDestinations,
  initialPackages,
  initialTreks,
  initialExperiences,
  initialTestimonials,
  initialFAQs,
} from "./seed-data";

interface CMSDatabase {
  settings: SiteSettings;
  destinations: Destination[];
  packages: Package[];
  treks: Trek[];
  experiences: Experience[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  enquiries: Enquiry[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "cms.json");

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
        destination: "Amarnath Yatra",
        travelType: "Amarnath",
        travelDate: "2026-07-10",
        travellersCount: "2 Adults (Senior citizens)",
        budget: "Flexible",
        message: "Inquiring about Baltal helicopter route and medical certificate guidelines for my parents.",
        status: "Contacted",
        createdAt: "2026-03-02T14:15:00.000Z",
      },
    ],
  };
}

let memoryDb: CMSDatabase | null = null;

function loadDatabase(): CMSDatabase {
  if (memoryDb) return memoryDb;

  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      memoryDb = JSON.parse(raw);
      return memoryDb!;
    }
  } catch (err) {
    console.error("Failed reading cms.json from disk, falling back to defaults", err);
  }

  const fresh = getDefaultData();
  memoryDb = fresh;
  saveDatabase(fresh);
  return fresh;
}

function saveDatabase(data: CMSDatabase) {
  memoryDb = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed persisting cms.json to disk", err);
  }
}

// ============ SITE SETTINGS ============
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = loadDatabase();
  return db.settings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = loadDatabase();
  db.settings = { ...db.settings, ...settings };
  saveDatabase(db);
  return db.settings;
}

// ============ DESTINATIONS ============
export async function getDestinations(filter?: { isDomestic?: boolean; featured?: boolean }): Promise<Destination[]> {
  const db = loadDatabase();
  let list = db.destinations;
  if (filter?.isDomestic !== undefined) {
    list = list.filter((d) => d.isDomestic === filter.isDomestic);
  }
  if (filter?.featured !== undefined) {
    list = list.filter((d) => d.featured === filter.featured);
  }
  return list;
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const db = loadDatabase();
  return db.destinations.find((d) => d.slug === slug) || null;
}

export async function upsertDestination(dest: Destination): Promise<Destination> {
  const db = loadDatabase();
  const idx = db.destinations.findIndex((d) => d.id === dest.id || d.slug === dest.slug);
  if (idx >= 0) {
    db.destinations[idx] = { ...db.destinations[idx], ...dest };
  } else {
    db.destinations.push(dest);
  }
  saveDatabase(db);
  return dest;
}

export async function deleteDestination(id: string): Promise<boolean> {
  const db = loadDatabase();
  const lenBefore = db.destinations.length;
  db.destinations = db.destinations.filter((d) => d.id !== id);
  if (db.destinations.length !== lenBefore) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// ============ PACKAGES ============
export async function getPackages(filter?: { destinationSlug?: string; featured?: boolean; isInternational?: boolean }): Promise<Package[]> {
  const db = loadDatabase();
  let list = db.packages;
  if (filter?.destinationSlug) {
    list = list.filter((p) => p.destinationSlug === filter.destinationSlug);
  }
  if (filter?.featured !== undefined) {
    list = list.filter((p) => p.featured === filter.featured);
  }
  if (filter?.isInternational !== undefined) {
    list = list.filter((p) => p.isInternational === filter.isInternational);
  }
  return list;
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const db = loadDatabase();
  return db.packages.find((p) => p.slug === slug) || null;
}

export async function upsertPackage(pkg: Package): Promise<Package> {
  const db = loadDatabase();
  const idx = db.packages.findIndex((p) => p.id === pkg.id || p.slug === pkg.slug);
  if (idx >= 0) {
    db.packages[idx] = { ...db.packages[idx], ...pkg };
  } else {
    db.packages.push(pkg);
  }
  saveDatabase(db);
  return pkg;
}

export async function deletePackage(id: string): Promise<boolean> {
  const db = loadDatabase();
  const lenBefore = db.packages.length;
  db.packages = db.packages.filter((p) => p.id !== id);
  if (db.packages.length !== lenBefore) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// ============ TREKS ============
export async function getTreks(filter?: { featured?: boolean; difficulty?: string }): Promise<Trek[]> {
  const db = loadDatabase();
  let list = db.treks;
  if (filter?.featured !== undefined) {
    list = list.filter((t) => t.featured === filter.featured);
  }
  if (filter?.difficulty) {
    list = list.filter((t) => t.difficulty.toLowerCase() === filter.difficulty?.toLowerCase());
  }
  return list;
}

export async function getTrekBySlug(slug: string): Promise<Trek | null> {
  const db = loadDatabase();
  return db.treks.find((t) => t.slug === slug) || null;
}

export async function upsertTrek(trek: Trek): Promise<Trek> {
  const db = loadDatabase();
  const idx = db.treks.findIndex((t) => t.id === trek.id || t.slug === trek.slug);
  if (idx >= 0) {
    db.treks[idx] = { ...db.treks[idx], ...trek };
  } else {
    db.treks.push(trek);
  }
  saveDatabase(db);
  return trek;
}

export async function deleteTrek(id: string): Promise<boolean> {
  const db = loadDatabase();
  const lenBefore = db.treks.length;
  db.treks = db.treks.filter((t) => t.id !== id);
  if (db.treks.length !== lenBefore) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// ============ EXPERIENCES ============
export async function getExperiences(): Promise<Experience[]> {
  const db = loadDatabase();
  return db.experiences;
}

export async function upsertExperience(exp: Experience): Promise<Experience> {
  const db = loadDatabase();
  const idx = db.experiences.findIndex((e) => e.id === exp.id || e.slug === exp.slug);
  if (idx >= 0) {
    db.experiences[idx] = { ...db.experiences[idx], ...exp };
  } else {
    db.experiences.push(exp);
  }
  saveDatabase(db);
  return exp;
}

export async function deleteExperience(id: string): Promise<boolean> {
  const db = loadDatabase();
  const lenBefore = db.experiences.length;
  db.experiences = db.experiences.filter((e) => e.id !== id);
  if (db.experiences.length !== lenBefore) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// ============ TESTIMONIALS ============
export async function getTestimonials(): Promise<Testimonial[]> {
  const db = loadDatabase();
  return db.testimonials;
}

export async function upsertTestimonial(item: Testimonial): Promise<Testimonial> {
  const db = loadDatabase();
  const idx = db.testimonials.findIndex((t) => t.id === item.id);
  if (idx >= 0) {
    db.testimonials[idx] = item;
  } else {
    db.testimonials.push(item);
  }
  saveDatabase(db);
  return item;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = loadDatabase();
  const lenBefore = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  if (db.testimonials.length !== lenBefore) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// ============ FAQS ============
export async function getFAQs(category?: string): Promise<FAQ[]> {
  const db = loadDatabase();
  if (category) {
    return db.faqs.filter((f) => f.category === category);
  }
  return db.faqs;
}

export async function upsertFAQ(item: FAQ): Promise<FAQ> {
  const db = loadDatabase();
  const idx = db.faqs.findIndex((f) => f.id === item.id);
  if (idx >= 0) {
    db.faqs[idx] = item;
  } else {
    db.faqs.push(item);
  }
  saveDatabase(db);
  return item;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const db = loadDatabase();
  const lenBefore = db.faqs.length;
  db.faqs = db.faqs.filter((f) => f.id !== id);
  if (db.faqs.length !== lenBefore) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// ============ ENQUIRIES ============
export async function getEnquiries(): Promise<Enquiry[]> {
  const db = loadDatabase();
  return [...db.enquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt" | "status">): Promise<Enquiry> {
  const db = loadDatabase();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: "enq-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  db.enquiries.unshift(newEnquiry);
  saveDatabase(db);
  return newEnquiry;
}

export async function updateEnquiryStatus(id: string, status: Enquiry["status"]): Promise<boolean> {
  const db = loadDatabase();
  const item = db.enquiries.find((e) => e.id === id);
  if (item) {
    item.status = status;
    saveDatabase(db);
    return true;
  }
  return false;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = loadDatabase();
  const lenBefore = db.enquiries.length;
  db.enquiries = db.enquiries.filter((e) => e.id !== id);
  if (db.enquiries.length !== lenBefore) {
    saveDatabase(db);
    return true;
  }
  return false;
}
