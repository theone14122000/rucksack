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

/** Flow variant. "package" preserves the existing Custom Package flow exactly. */
export type FlowMode = "package" | "destination";

/** Extended option lists for the Custom Destination flow (additive only). */
export const DEST_CAB_OPTIONS = [
  ...CAB_OPTIONS,
  "Tempo Traveller",
  "Luxury Vehicle",
];

export const DEST_HOTEL_OPTIONS = [
  ...HOTEL_OPTIONS,
  "Luxury Hotel",
  "Homestay",
  "Resort",
  "Budget Stay",
  "Other",
];

export const TRAVEL_STYLE_OPTIONS = [
  "Family Trip",
  "Couple Trip",
  "Friends/Group Trip",
  "Solo Trip",
  "Corporate/Business Trip",
  "Honeymoon",
  "Pilgrimage",
  "Adventure Trip",
  "Leisure/Holiday",
  "Other",
];

export type BudgetType = "per_person" | "total";

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
  /* --- Custom Destination flow (destination mode only; ignored by package mode) --- */
  customDestinationText: string;
  departureDate: string;
  returnDate: string;
  travelStyles: string[];
  travelStyleOther: string;
  stayOther: string;
  noTickets: boolean;
  vehiclePreferred: string;
  vehicleDays: number | "";
  vehiclePickup: string;
  vehicleDropoff: string;
  bikeCount: number | "";
  bikeDays: number | "";
  gypsyDate: string;
  gypsyPeople: number | "";
  gypsyLocation: string;
  budgetAmount: number | "";
  budgetType: BudgetType | "";
  whatsapp: string;
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
  customDestinationText: "",
  departureDate: "",
  returnDate: "",
  travelStyles: [],
  travelStyleOther: "",
  stayOther: "",
  noTickets: false,
  vehiclePreferred: "",
  vehicleDays: "",
  vehiclePickup: "",
  vehicleDropoff: "",
  bikeCount: "",
  bikeDays: "",
  gypsyDate: "",
  gypsyPeople: "",
  gypsyLocation: "",
  budgetAmount: "",
  budgetType: "",
  whatsapp: "",
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

/** Whole days between two YYYY-MM-DD dates, or null when unusable. */
export function daysBetween(departure: string, ret: string): number | null {
  if (!departure || !ret) return null;
  const start = new Date(`${departure}T00:00:00`);
  const end = new Date(`${ret}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const diff = Math.round((end.getTime() - start.getTime()) / 86400000);
  return diff >= 0 ? diff : null;
}

export function buildBudgetLabel(data: CustomPackageData): string {
  if (data.budgetAmount === "" || !data.budgetType) return "—";
  const amount = `₹${Number(data.budgetAmount).toLocaleString("en-IN")}`;
  return data.budgetType === "per_person" ? `${amount} per person` : `${amount} total`;
}

export function buildDestinationSummary(data: CustomPackageData): string {
  if (data.tripType === "domestic") {
    const parts = [...data.states];
    if (data.customDestinationText.trim()) {
      parts.push(`Custom: ${data.customDestinationText.trim()}`);
    }
    const states = parts.length > 0 ? parts.join(", ") : "—";
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

export function buildServicesSummary(
  data: CustomPackageData,
  mode: FlowMode = "package"
): string[] {
  const lines: string[] = [];
  if (data.cab.length > 0) lines.push(`Cab: ${data.cab.join(", ")}`);
  if (data.hotels.length > 0) {
    let stay = `Stay: ${data.hotels.join(", ")}`;
    if (
      mode === "destination" &&
      data.stayOther.trim() &&
      data.hotels.includes("Other")
    ) {
      stay = stay.replace("Other", `Other (${data.stayOther.trim()})`);
    }
    lines.push(stay);
  }
  if (data.tickets.length > 0) lines.push(`Tickets: ${data.tickets.join(", ")}`);
  if (mode === "destination" && data.noTickets && data.tickets.length === 0) {
    lines.push("Tickets: No tickets required");
  }
  if (data.adventureActivity) {
    lines.push(
      `Adventure Activity${data.adventureDetails.trim() ? `: ${data.adventureDetails.trim()}` : ""}`
    );
  }
  if (data.vehicleRent) lines.push("Vehicle Rent");
  if (mode === "destination" && data.vehicleRent) {
    const bits = [
      data.vehiclePreferred.trim() || "",
      data.vehicleDays !== "" ? `${data.vehicleDays} days` : "",
      data.vehiclePickup.trim() ? `Pickup: ${data.vehiclePickup.trim()}` : "",
      data.vehicleDropoff.trim() ? `Drop: ${data.vehicleDropoff.trim()}` : "",
    ].filter(Boolean);
    if (bits.length > 0) lines.push(`Rental Details: ${bits.join(" | ")}`);
  }
  if (data.mountainBike) lines.push("Mountain Bike");
  if (mode === "destination" && data.mountainBike) {
    const bits = [
      data.bikeCount !== "" ? `${data.bikeCount} bikes` : "",
      data.bikeDays !== "" ? `${data.bikeDays} days` : "",
    ].filter(Boolean);
    if (bits.length > 0) lines.push(`Bike Details: ${bits.join(" | ")}`);
  }
  if (data.gypsyTour) lines.push("Gypsy Tour");
  if (mode === "destination" && data.gypsyTour) {
    const bits = [
      data.gypsyDate ? `Date: ${data.gypsyDate}` : "",
      data.gypsyPeople !== "" ? `${data.gypsyPeople} people` : "",
      data.gypsyLocation.trim()
        ? `Location: ${data.gypsyLocation.trim()}`
        : "",
    ].filter(Boolean);
    if (bits.length > 0) lines.push(`Gypsy Details: ${bits.join(" | ")}`);
  }
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

export function buildEnquiryMessage(
  data: CustomPackageData,
  mode: FlowMode = "package"
): string {
  const isDestination = mode === "destination";
  const lines = [
    isDestination ? "CUSTOM DESTINATION REQUEST" : "CUSTOM PACKAGE REQUEST",
    "",
    `Trip Type: ${data.tripType === "domestic" ? "Domestic" : "International"}`,
  ];
  if (data.tripType === "domestic") {
    lines.push(`Home Location: ${data.homeLocation.trim() || "—"}`);
    lines.push(
      `Regions: ${data.regions.length > 0 ? data.regions.map(getRegionLabel).join(", ") : "—"}`
    );
    const destParts = [...data.states];
    if (data.customDestinationText.trim()) {
      destParts.push(`Custom: ${data.customDestinationText.trim()}`);
    }
    lines.push(
      `Destinations / States: ${destParts.length > 0 ? destParts.join(", ") : "—"}`
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
  if (isDestination) {
    if (data.departureDate || data.returnDate) {
      lines.push(
        `Travel Dates: ${data.departureDate || "—"} to ${data.returnDate || "—"}`
      );
    }
  }
  lines.push(`Duration: ${data.durationDays} Days`);
  lines.push(`Adults: ${data.adults}`);
  lines.push(`Children: ${data.childAges.length}`);
  if (data.childAges.length > 0) {
    lines.push(`Child Ages & Pricing: ${childAgesLabel(data.childAges)}`);
  }
  if (isDestination && data.travelStyles.length > 0) {
    const styles = [...data.travelStyles];
    if (data.travelStyleOther.trim() && styles.includes("Other")) {
      styles[styles.indexOf("Other")] = `Other (${data.travelStyleOther.trim()})`;
    }
    lines.push(`Travel Styles: ${styles.join(", ")}`);
  }
  const services = buildServicesSummary(data, mode);
  lines.push(`Services Required: ${services.length > 0 ? services.join(" | ") : "—"}`);
  if (isDestination && (data.budgetAmount !== "" || data.budgetType)) {
    lines.push(`Approximate Budget: ${buildBudgetLabel(data)}`);
  }
  if (data.travelDate) lines.push(`Preferred Travel Date: ${data.travelDate}`);
  if (data.notes.trim()) {
    lines.push(
      isDestination
        ? `Special Requirements: ${data.notes.trim()}`
        : `Additional Notes: ${data.notes.trim()}`
    );
  }
  if (isDestination && data.whatsapp.trim()) {
    lines.push(`WhatsApp Number: ${data.whatsapp.trim()}`);
  }
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
  step: number,
  mode: FlowMode = "package"
): string | null {
  const isDestination = mode === "destination";
  if (step === 0 && !data.tripType) {
    return isDestination
      ? "Please select Domestic or International."
      : "Please select whether your trip is Domestic or International.";
  }
  if (step === 1) {
    if (data.tripType === "domestic") {
      if (!data.homeLocation.trim()) {
        return "Please enter your home location (city / place).";
      }
      if (data.regions.length === 0) {
        return "Please select at least one region (North / South / East / West India).";
      }
      if (
        data.states.length === 0 &&
        !(isDestination && data.customDestinationText.trim())
      ) {
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
    if (
      isDestination &&
      data.departureDate &&
      data.returnDate &&
      data.returnDate < data.departureDate
    ) {
      return "Return date cannot be before the departure date.";
    }
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
