export type PublishStatus = "published" | "draft" | "archived";

export interface WithPublishMeta {
  status?: PublishStatus;
  order?: number;
}

export interface Destination extends WithPublishMeta {
  id: string;
  name: string;
  slug: string;
  region: string;
  isDomestic: boolean;
  shortDescription: string;
  fullDescription: string;
  heroImage?: string;
  gallery?: string[];
  bestTimeToVisit: string;
  highlights: string[];
  attractions?: { name: string; description: string }[];
  packagesCount: number;
  treksCount?: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  distance?: string;
  altitudeGain?: string;
  meals?: string;
  stay?: string;
}

export interface Package extends WithPublishMeta {
  id: string;
  title: string;
  slug: string;
  destination: string;
  destinationSlug: string;
  duration: string;
  travelStyle: string;
  price: number;
  shortDescription: string;
  overview: string;
  heroImage?: string;
  gallery?: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  faqs: { question: string; answer: string }[];
  featured: boolean;
  isInternational: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Trek extends WithPublishMeta {
  id: string;
  name: string;
  slug: string;
  region: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Difficult";
  altitude: string;
  bestSeason: string;
  shortDescription: string;
  overview: string;
  heroImage?: string;
  gallery?: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  faqs: { question: string; answer: string }[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Experience extends WithPublishMeta {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  highlights: string[];
  featured: boolean;
}

export interface Testimonial extends WithPublishMeta {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  date: string;
  destination: string;
  tripType: string;
}

export interface FAQ extends WithPublishMeta {
  id: string;
  question: string;
  answer: string;
  category: "general" | "booking" | "treks" | "cabs" | "cancellation";
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelType: "Domestic" | "International" | "Trek" | "Taxi" | "Pilgrimage" | "Other";
  travelDate: string;
  travellersCount: string;
  budget?: string;
  message: string;
  status: "New" | "Contacted" | "Quoted" | "Booked";
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  location: string;
  address: string;
  phone: string;
  alternatePhone: string;
  whatsapp: string;
  email: string;
  experienceYears: string;
  rating: number;
  ratingsCount: number;
  curatedJourneysCount: string;
  footerDescription?: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube?: string;
    linkedin?: string;
  };
  seoDefaults: {
    title: string;
    description: string;
    keywords: string[];
    ogDescription?: string;
    twitterDescription?: string;
  };
}

export interface GalleryItem extends WithPublishMeta {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service extends WithPublishMeta {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  items: string[];
}

export interface ContentBlock {
  key: string;
  value: string;
  updatedAt?: string;
}
