export interface Destination {
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

export interface Package {
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

export interface Trek {
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

export interface Experience {
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

export interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  date: string;
  destination: string;
  tripType: string;
}

export interface FAQ {
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
  travelType: "Domestic" | "International" | "Trek" | "Taxi" | "Amarnath" | "Other";
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
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter?: string;
    youtube?: string;
  };
  seoDefaults: {
    title: string;
    description: string;
    keywords: string[];
  };
}
