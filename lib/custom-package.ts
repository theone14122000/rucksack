/**
 * Custom Package — data-driven configuration and helpers.
 *
 * Region / state / service options live here as data so future additions
 * (new states, hotels, vehicles) never require UI rewrites.
 * Submission reuses the existing /api/enquiry + WhatsApp mechanism.
 */

export type TripType = "domestic" | "international";

export type DomesticRegionKey = "north" | "south" | "east" | "west";

export interface DomesticRegion {
  key: DomesticRegionKey;
  label: string;
  states: string[];
}

export const DOMESTIC_REGIONS: DomesticRegion[] = [
  {
    key: "north",
    label: "North India",
    states: [
      "Jammu & Kashmir",
      "Ladakh",
      "Himachal Pradesh",
      "Punjab",
      "Haryana",
      "Uttarakhand",
      "Uttar Pradesh",
      "Rajasthan",
      "Delhi",
    ],
  },
  {
    key: "south",
    label: "South India",
    states: [
      "Andhra Pradesh",
      "Karnataka",
      "Kerala",
      "Tamil Nadu",
      "Telangana",
    ],
  },
  {
    key: "east",
    label: "East India",
    states: ["Bihar", "Jharkhand", "Odisha", "West Bengal"],
  },
  {
    key: "west",
    label: "West India",
    states: ["Goa", "Gujarat", "Maharashtra"],
  },
];

/** Fallback list — the page passes live CMS international destination names as props. */
export const INTERNATIONAL_FALLBACKS = [
  "Nepal",
  "Bhutan",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Bali",
  "Dubai",
];

export const HOME_LOCATION_SUGGESTIONS = [
  "Shimla",
  "Chandigarh",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
];

export const CAB_OPTIONS = ["Hatchback", "Sedan", "SUV", "Other"];

export const HOTEL_OPTIONS = [
  "2 Star",
  "3 Star",
  "4 Star",
  "5 Star",
  "Igloo Stay",
  "Dome Stay",
  "Villa",
  "Cottage",
];

export const TICKET_OPTIONS = [
  "Railway Tickets",
  "Bus Tickets",
  "Flight Tickets",
];

export type ChildPricingCategory = "complimentary" | "half_charge";

export interface CustomPackageData {
  tripType: TripType | "";
  homeLocation: string;
  regions: DomesticRegionKey[];
  states: string[];
  internationalDestinations: string[];
  durationDays: number | "";
  adults: number;
  /** One entry per child; "" while the age input is empty. */
  childAges: (number | "")[];
  cab: string[];
  hotels: string[];
  tickets: string[];
  adventureActivity: boolean;
  adventureDetails: string;
  vehicleRent: boolean;
  mountainBike: boolean;
  gypsyTour: boolean;
  mtb4x4: boolean;
  name: string;
  phone: string;
  email: string;
  travelDate: string;
  notes: string;
}

export const initialCustomPackageData: CustomPackageData = {
  tripType: "",
  homeLocation: "",
  regions: [],
  states: [],
  internationalDestinations: [],
  durationDays: "",
  adults: 2,
  childAges: [],
  cab: [],
  hotels: [],
  tickets: [],
  adventureActivity: false,
  adventureDetails: "",
  vehicleRent: false,
  mountainBike: false,
  gypsyTour: false,
  mtb4x4: false,
  name: "",
  phone: "",
  email: "",
  travelDate: "",
  notes: "",
};

export const WHATSAPP_NUMBER = "917018678064";

export function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function getChildPricing(age: number): {
  category: ChildPricingCategory;
  label: string;
} {
  if (age <= 5) {
    return { category: "complimentary", label: "Complimentary / No charge" };
  }
  return {
    category: "half_charge",
    label: "50% discount, subject to hotel policy",
  };
}

export function getRegionLabel(key: DomesticRegionKey): string {
  return DOMESTIC_REGIONS.find((r) => r.key === key)?.label ?? key;
}

function childAgesLabel(childAges: (number | "")[]): string {
  const filled = childAges.filter((a): a is number => typeof a === "number");
  if (filled.length === 0) return "—";
  return filled
    .map((age) => {
      const pricing = getChildPricing(age);
      return `${age} yrs (${pricing.category === "complimentary" ? "Complimentary" : "50% discount*"})`;
    })
    .join(", ");
}

export function buildDestinationSummary(data: CustomPackageData): string {
  if (data.tripType === "domestic") {
    const states = data.states.length > 0 ? data.states.join(", ") : "—";
    const from = data.homeLocation.trim() || "—";
    return `Custom Domestic from ${from}: ${states}`;
  }
  const dests =
    data.internationalDestinations.length > 0
      ? data.internationalDestinations.join(", ")
      : "—";
  return `Custom International: ${dests}`;
}

export function buildTravellersSummary(data: CustomPackageData): string {
  const total = data.adults + data.childAges.length;
  const children =
    data.childAges.length > 0
      ? `, ${data.childAges.length} Children (ages ${childAgesLabel(data.childAges)})`
      : "";
  return `${data.adults} Adults${children} — Total ${total}`;
}

export function buildServicesSummary(data: CustomPackageData): string[] {
  const lines: string[] = [];
  if (data.cab.length > 0) lines.push(`Cab: ${data.cab.join(", ")}`);
  if (data.hotels.length > 0) lines.push(`Stay: ${data.hotels.join(", ")}`);
  if (data.tickets.length > 0) lines.push(`Tickets: ${data.tickets.join(", ")}`);
  if (data.adventureActivity) {
    lines.push(
      `Adventure Activity${data.adventureDetails.trim() ? `: ${data.adventureDetails.trim()}` : ""}`
    );
  }
  if (data.vehicleRent) lines.push("Vehicle Rent");
  if (data.mountainBike) lines.push("Mountain Bike");
  if (data.gypsyTour) lines.push("Gypsy Tour");
  if (data.mtb4x4) lines.push("MTB 4x4");
  return lines;
}

export function hasAnyService(data: CustomPackageData): boolean {
  return (
    data.cab.length > 0 ||
    data.hotels.length > 0 ||
    data.tickets.length > 0 ||
    data.adventureActivity ||
    data.vehicleRent ||
    data.mountainBike ||
    data.gypsyTour ||
    data.mtb4x4
  );
}

export function buildEnquiryMessage(data: CustomPackageData): string {
  const lines = [
    "CUSTOM PACKAGE REQUEST",
    "",
    `Trip Type: ${data.tripType === "domestic" ? "Domestic" : "International"}`,
  ];
  if (data.tripType === "domestic") {
    lines.push(`Home Location: ${data.homeLocation.trim() || "—"}`);
    lines.push(
      `Regions: ${data.regions.length > 0 ? data.regions.map(getRegionLabel).join(", ") : "—"}`
    );
    lines.push(
      `Destinations / States: ${data.states.length > 0 ? data.states.join(", ") : "—"}`
    );
  } else {
    lines.push(
      `International Destinations: ${
        data.internationalDestinations.length > 0
          ? data.internationalDestinations.join(", ")
          : "—"
      }`
    );
  }
  lines.push(`Duration: ${data.durationDays} Days`);
  lines.push(`Adults: ${data.adults}`);
  lines.push(`Children: ${data.childAges.length}`);
  if (data.childAges.length > 0) {
    lines.push(`Child Ages & Pricing: ${childAgesLabel(data.childAges)}`);
  }
  const services = buildServicesSummary(data);
  lines.push(`Services Required: ${services.length > 0 ? services.join(" | ") : "—"}`);
  if (data.travelDate) lines.push(`Preferred Travel Date: ${data.travelDate}`);
  if (data.notes.trim()) lines.push(`Additional Notes: ${data.notes.trim()}`);
  return lines.join("\n");
}

export function buildWhatsAppUrl(data: CustomPackageData): string {
  const text = encodeURIComponent(
    `Hello Rucksack Adventures! I would like a custom package:\n${buildEnquiryMessage(data)}\nName: ${data.name || "Traveler"}`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/** Step-level validation. Returns an error message or null when the step is valid. */
export function validateCustomPackageStep(
  data: CustomPackageData,
  step: number
): string | null {
  if (step === 0 && !data.tripType) {
    return "Please select whether your trip is Domestic or International.";
  }
  if (step === 1) {
    if (data.tripType === "domestic") {
      if (!data.homeLocation.trim()) {
        return "Please enter your home location (city / place).";
      }
      if (data.regions.length === 0) {
        return "Please select at least one region (North / South / East / West India).";
      }
      if (data.states.length === 0) {
        return "Please select at least one destination / state.";
      }
    } else if (data.tripType === "international") {
      if (data.internationalDestinations.length === 0) {
        return "Please select or add at least one international destination.";
      }
    } else {
      return "Please go back and select a trip type first.";
    }
  }
  if (step === 2) {
    if (data.durationDays === "" || Number(data.durationDays) < 1) {
      return "Please specify the trip duration in days (minimum 1 day).";
    }
    if (data.adults < 1) {
      return "At least one adult traveller is required.";
    }
    for (let i = 0; i < data.childAges.length; i++) {
      const age = data.childAges[i];
      if (age === "" || age < 1 || age > 12) {
        return `Please enter a valid age (1–12 years) for child ${i + 1}.`;
      }
    }
  }
  if (step === 3 && !hasAnyService(data)) {
    return "Please select at least one required service (cab, stay, tickets, or an activity).";
  }
  if (step === 4) {
    if (!data.name.trim() || !data.phone.trim() || !data.email.trim()) {
      return "Name, phone, and email are required so our trip curator can reach you.";
    }
  }
  return null;
}
