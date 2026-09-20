"use client";

import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Baby,
  BedDouble,
  Bike,
  CalendarDays,
  Car,
  CheckCircle2,
  Compass,
  Globe,
  Loader2,
  MapPin,
  MessageSquare,
  Mountain,
  Plus,
  Minus,
  Send,
  Ticket,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import {
  CAB_OPTIONS,
  DEST_CAB_OPTIONS,
  DEST_HOTEL_OPTIONS,
  DOMESTIC_REGIONS,
  HOTEL_OPTIONS,
  HOME_LOCATION_SUGGESTIONS,
  TICKET_OPTIONS,
  TRAVEL_STYLE_OPTIONS,
  buildBudgetLabel,
  buildDestinationSummary,
  buildEnquiryMessage,
  buildServicesSummary,
  buildTravellersSummary,
  buildWhatsAppUrl,
  daysBetween,
  getChildPricing,
  getRegionLabel,
  initialCustomPackageData,
  toggleInList,
  validateCustomPackageStep,
  type CustomPackageData,
  type FlowMode,
} from "@/lib/custom-package";

const STEPS = [
  "Trip Type",
  "Destinations",
  "Duration & Group",
  "Services",
  "Review & Contact",
];

const inputClass =
  "w-full bg-white border border-brand-turquoise/15 rounded-card px-3.5 py-2.5 text-sm text-brand-dark focus:border-brand-turquoise focus:ring-1 focus:ring-brand-turquoise/30 outline-hidden transition-all";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wider text-brand-dark mb-1";

interface CustomPackageWizardProps {
  internationalOptions: string[];
  /** "package" preserves the existing Custom Package flow; "destination" adds destination-specific fields. */
  mode?: FlowMode;
}

const Chip: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}> = ({ active, onClick, children, ariaLabel }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    aria-label={ariaLabel}
    className={cn(
      "px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border",
      active
        ? "bg-brand-turquoise text-white border-brand-turquoise shadow-lg shadow-brand-turquoise/20"
        : "bg-white text-brand-dark/60 border-brand-turquoise/10 hover:border-brand-turquoise/25 hover:text-brand-dark"
    )}
  >
    {children}
  </button>
);

const Stepper: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}> = ({ label, value, min, max, onChange }) => (
  <div className="flex items-center justify-between bg-white border border-brand-turquoise/15 rounded-card px-4 py-3">
    <span className="text-sm font-semibold text-brand-dark">{label}</span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 rounded-full border border-brand-turquoise/15 flex items-center justify-center text-brand-dark hover:bg-brand-turquoise-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-editorial text-2xl font-bold text-brand-dark w-8 text-center">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 rounded-full border border-brand-turquoise/15 flex items-center justify-center text-brand-dark hover:bg-brand-turquoise-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const CustomPackageWizard: React.FC<CustomPackageWizardProps> = ({
  internationalOptions,
  mode = "package",
}) => {
  const isDestination = mode === "destination";
  const [data, setData] = useState<CustomPackageData>(initialCustomPackageData);
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const [customIntlInput, setCustomIntlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = <K extends keyof CustomPackageData>(
    key: K,
    value: CustomPackageData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setStepError(null);
  };

  const setChildrenCount = (count: number) => {
    setData((prev) => {
      const next = [...prev.childAges];
      while (next.length < count) next.push("");
      return { ...prev, childAges: next.slice(0, count) };
    });
    setStepError(null);
  };

  const handleDateChange = (
    key: "departureDate" | "returnDate",
    value: string
  ) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      const diff = daysBetween(next.departureDate, next.returnDate);
      if (diff !== null && diff >= 1) next.durationDays = diff;
      return next;
    });
    setStepError(null);
  };

  const setChildAge = (index: number, raw: string) => {
    const parsed = raw === "" ? "" : Number(raw);
    setData((prev) => {
      const next = [...prev.childAges];
      next[index] = raw === "" || Number.isNaN(parsed) ? "" : parsed;
      return { ...prev, childAges: next };
    });
    setStepError(null);
  };

  const selectTripType = (value: "domestic" | "international") => {
    setData((prev) => ({ ...prev, tripType: value }));
    setStepError(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    const err = validateCustomPackageStep(data, step, mode);
    if (err) {
      setStepError(err);
      return;
    }
    setStepError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStepError(null);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateCustomPackageStep(data, 4, mode);
    if (err) {
      setStepError(err);
      return;
    }
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          destination: buildDestinationSummary(data),
          travelType: data.tripType === "domestic" ? "Domestic" : "International",
          travelDate: isDestination
            ? data.departureDate || "Flexible"
            : data.travelDate || "Flexible",
          travellersCount: buildTravellersSummary(data),
          budget: isDestination ? buildBudgetLabel(data) : "",
          message: buildEnquiryMessage(data, mode),
        }),
      });
      if (!res.ok) {
        throw new Error(
          "Unable to send request. Please try WhatsApp or call us directly."
        );
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const availableStates = useMemo(
    () =>
      DOMESTIC_REGIONS.filter((r) => data.regions.includes(r.key)).flatMap(
        (r) => r.states
      ),
    [data.regions]
  );

  const totalTravellers = data.adults + data.childAges.length;

  if (submitted) {
    return (
      <div className="bg-brand-cream border border-brand-turquoise/15 p-8 rounded-card-2xl text-center shadow-luxury">
        <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
        <h3 className="font-editorial text-2xl font-bold text-brand-dark mb-2">
          {isDestination
            ? "Custom Destination Request Received"
            : "Custom Package Request Received"}
        </h3>
        <p className="text-sm text-brand-dark/80 mb-2 max-w-md mx-auto leading-relaxed">
          {buildDestinationSummary(data)} &bull; {data.durationDays} Days &bull;{" "}
          {buildTravellersSummary(data)}
        </p>
        <p className="text-sm text-brand-dark/80 mb-6 max-w-md mx-auto leading-relaxed">
          Our senior trip curator from Kasumpti, Shimla will contact you within
          4 hours with a customized itinerary plan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            onClick={() => window.open(buildWhatsAppUrl(data), "_blank")}
            icon={<MessageSquare className="w-4 h-4" />}
          >
            Chat with Curator on WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setData(initialCustomPackageData);
              setCustomIntlInput("");
              setSubmitted(false);
              setStep(0);
            }}
          >
            Plan Another Trip
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe">
            {STEPS[step]}
          </span>
        </div>
        <div
          className="flex gap-1.5"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Custom package progress"
        >
          {STEPS.map((label, idx) => (
            <div
              key={label}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                idx <= step ? "bg-brand-turquoise" : "bg-brand-turquoise/10"
              )}
            />
          ))}
        </div>
      </div>

      {(stepError || submitError) && (
        <div
          role="alert"
          className="p-3 mb-6 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-card flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{stepError ?? submitError}</span>
        </div>
      )}

      {/* STEP 1 — TRIP TYPE */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-2">
              {isDestination
                ? "Where would you like to travel?"
                : "What kind of trip are you looking for?"}
            </h2>
            <p className="text-sm text-brand-dark/60">
              Select one — you&apos;ll move to the next step automatically.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Trip type">
            {(
              [
                {
                  value: "domestic" as const,
                  icon: MapPin,
                  title: "Domestic",
                  desc: "Himalayas & India — region and state-wise planning",
                },
                {
                  value: "international" as const,
                  icon: Globe,
                  title: "International",
                  desc: "Nepal, Bhutan, Bali, Dubai & beyond with visa support",
                },
              ]
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={data.tripType === opt.value}
                onClick={() => selectTripType(opt.value)}
                className={cn(
                  "text-left p-5 sm:p-6 rounded-card-2xl border transition-all duration-300",
                  data.tripType === opt.value
                    ? "bg-brand-turquoise text-white border-brand-turquoise shadow-lg shadow-brand-turquoise/20"
                    : "bg-white text-brand-dark border-brand-turquoise/15 hover:border-brand-turquoise/30 hover:shadow-luxury"
                )}
              >
                <opt.icon
                  className={cn(
                    "w-6 h-6 mb-3",
                    data.tripType === opt.value
                      ? "text-white"
                      : "text-brand-turquoise"
                  )}
                />
                <p className="font-editorial text-xl sm:text-2xl font-bold tracking-tight">
                  {opt.title}
                </p>
                <p
                  className={cn(
                    "text-xs sm:text-sm mt-1 leading-relaxed",
                    data.tripType === opt.value
                      ? "text-white/80"
                      : "text-brand-dark/60"
                  )}
                >
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — DESTINATIONS */}
      {step === 1 && data.tripType === "domestic" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-2">
              Where is home, and where to?
            </h2>
            <p className="text-sm text-brand-dark/60">
              Tell us your starting city, pick regions, then select multiple
              destinations.
            </p>
          </div>

          <div>
            <label htmlFor="cp-home" className={labelClass}>
              What is your home location? *
            </label>
            <input
              id="cp-home"
              type="text"
              list="cp-home-suggestions"
              placeholder="e.g. Shimla, Chandigarh, Delhi"
              value={data.homeLocation}
              onChange={(e) => set("homeLocation", e.target.value)}
              className={inputClass}
              autoComplete="address-level2"
            />
            <datalist id="cp-home-suggestions">
              {HOME_LOCATION_SUGGESTIONS.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>

          <fieldset>
            <legend className={labelClass}>Select region(s) *</legend>
            <div className="flex flex-wrap gap-2.5">
              {DOMESTIC_REGIONS.map((region) => (
                <Chip
                  key={region.key}
                  active={data.regions.includes(region.key)}
                  onClick={() =>
                    set("regions", toggleInList(data.regions, region.key))
                  }
                >
                  {region.label}
                </Chip>
              ))}
            </div>
          </fieldset>

          {data.regions.length > 0 && (
            <fieldset>
              <legend className={labelClass}>
                Select destinations / states — multiple allowed *
              </legend>
              <div className="space-y-5">
                {DOMESTIC_REGIONS.filter((r) =>
                  data.regions.includes(r.key)
                ).map((region) => (
                  <div key={region.key}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise mb-2">
                      {region.label}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {region.states.map((state) => {
                        const checked = data.states.includes(state);
                        return (
                          <label
                            key={state}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-card border cursor-pointer transition-all text-sm",
                              checked
                                ? "bg-brand-turquoise-50 border-brand-turquoise/40 text-brand-dark font-semibold"
                                : "bg-white border-brand-turquoise/15 text-brand-dark/70 hover:border-brand-turquoise/30"
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                set("states", toggleInList(data.states, state))
                              }
                              className="w-4 h-4 accent-[#0B8F83] shrink-0"
                            />
                            {state}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {availableStates.length > 0 && (
                <p className="text-[11px] text-brand-taupe mt-3">
                  {data.states.length} destination
                  {data.states.length === 1 ? "" : "s"} selected from{" "}
                  {data.regions.map(getRegionLabel).join(", ")}.
                </p>
              )}
            </fieldset>
          )}

          {isDestination && (
            <div className="p-5 rounded-card-2xl border border-dashed border-brand-turquoise/25 bg-white">
              <label htmlFor="cp-custom-dest" className={labelClass}>
                Can&apos;t find your destination?
              </label>
              <input
                id="cp-custom-dest"
                type="text"
                placeholder="e.g. Manali + Spiti Valley, Meghalaya + Sikkim"
                value={data.customDestinationText}
                onChange={(e) => set("customDestinationText", e.target.value)}
                className={inputClass}
              />
              <p className="text-[11px] text-brand-taupe mt-1.5">
                Enter any place not listed above — we&apos;ll plan around it.
              </p>
            </div>
          )}
        </div>
      )}

      {step === 1 && data.tripType === "international" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-2">
              Which countries are on your mind?
            </h2>
            <p className="text-sm text-brand-dark/60">
              Select one or more destinations, or add your own.
            </p>
          </div>
          <fieldset>
            <legend className={labelClass}>
              International destinations — multiple allowed *
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {internationalOptions.map((dest) => (
                <Chip
                  key={dest}
                  active={data.internationalDestinations.includes(dest)}
                  onClick={() =>
                    set(
                      "internationalDestinations",
                      toggleInList(data.internationalDestinations, dest)
                    )
                  }
                >
                  {dest}
                </Chip>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="cp-intl-custom" className={labelClass}>
              Add another destination
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                id="cp-intl-custom"
                type="text"
                placeholder="e.g. Vietnam, Maldives"
                value={customIntlInput}
                onChange={(e) => setCustomIntlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = customIntlInput.trim();
                    if (
                      value &&
                      !data.internationalDestinations.includes(value)
                    ) {
                      set("internationalDestinations", [
                        ...data.internationalDestinations,
                        value,
                      ]);
                      setCustomIntlInput("");
                    }
                  }
                }}
                className={inputClass}
              />
              <Button
                variant="outline"
                onClick={() => {
                  const value = customIntlInput.trim();
                  if (
                    value &&
                    !data.internationalDestinations.includes(value)
                  ) {
                    set("internationalDestinations", [
                      ...data.internationalDestinations,
                      value,
                    ]);
                    setCustomIntlInput("");
                  }
                }}
                className="shrink-0"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — DURATION & GROUP */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-2">
              Duration & travelling group
            </h2>
            <p className="text-sm text-brand-dark/60">
              How long is the journey, and who is travelling?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cp-days" className={labelClass}>
                Duration of trip (days) *
              </label>
              <div className="relative">
                <CalendarDays className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-turquoise pointer-events-none" />
                <input
                  id="cp-days"
                  type="number"
                  min={1}
                  max={60}
                  placeholder="e.g. 7"
                  value={data.durationDays}
                  onChange={(e) =>
                    set(
                      "durationDays",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={`${inputClass} pl-10`}
                />
              </div>
              {typeof data.durationDays === "number" && data.durationDays >= 1 && (
                <p className="text-[11px] text-brand-taupe mt-1.5">
                  {data.durationDays} Days
                  {data.durationDays > 1
                    ? ` / ${data.durationDays - 1} Nights`
                    : ""}
                  .
                </p>
              )}
            </div>
            <div className="bg-white border border-brand-turquoise/15 rounded-card px-4 py-3 flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-turquoise shrink-0" />
              <p className="text-sm text-brand-dark/70">
                Total travellers:{" "}
                <strong className="text-brand-dark">{totalTravellers}</strong>
              </p>
            </div>
          </div>

          {isDestination && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cp-departure" className={labelClass}>
                    Departure Date
                  </label>
                  <input
                    id="cp-departure"
                    type="date"
                    value={data.departureDate}
                    onChange={(e) =>
                      handleDateChange("departureDate", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="cp-return" className={labelClass}>
                    Return Date
                  </label>
                  <input
                    id="cp-return"
                    type="date"
                    value={data.returnDate}
                    min={data.departureDate || undefined}
                    onChange={(e) =>
                      handleDateChange("returnDate", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <fieldset>
                <legend className={labelClass}>
                  What kind of trip is this? (optional)
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {TRAVEL_STYLE_OPTIONS.map((style) => (
                    <Chip
                      key={style}
                      active={data.travelStyles.includes(style)}
                      onClick={() =>
                        set(
                          "travelStyles",
                          toggleInList(data.travelStyles, style)
                        )
                      }
                    >
                      {style}
                    </Chip>
                  ))}
                </div>
              </fieldset>
              {data.travelStyles.includes("Other") && (
                <div>
                  <label htmlFor="cp-style-other" className={labelClass}>
                    Describe your trip style
                  </label>
                  <input
                    id="cp-style-other"
                    type="text"
                    placeholder="e.g. Photography expedition"
                    value={data.travelStyleOther}
                    onChange={(e) => set("travelStyleOther", e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Stepper
              label="Adults *"
              value={data.adults}
              min={1}
              max={30}
              onChange={(next) => set("adults", next)}
            />
            <Stepper
              label="Children"
              value={data.childAges.length}
              min={0}
              max={6}
              onChange={setChildrenCount}
            />
          </div>

          {data.childAges.length > 0 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-brand-cream border border-brand-turquoise/15 rounded-card text-xs text-brand-dark/70 leading-relaxed flex gap-2.5">
                <Baby className="w-4 h-4 text-brand-turquoise shrink-0 mt-0.5" />
                <span>
                  <strong className="text-brand-dark">
                    Children 1–5 years: Complimentary / No charge.
                  </strong>{" "}
                  <strong className="text-brand-dark">
                    Children 5–12 years: 50% discount, subject to hotel policy.
                  </strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.childAges.map((age, idx) => (
                  <div key={idx}>
                    <label
                      htmlFor={`cp-child-${idx}`}
                      className={labelClass}
                    >
                      Child {idx + 1} age (1–12 years) *
                    </label>
                    <input
                      id={`cp-child-${idx}`}
                      type="number"
                      min={1}
                      max={12}
                      placeholder="e.g. 4"
                      value={age}
                      onChange={(e) => setChildAge(idx, e.target.value)}
                      className={inputClass}
                    />
                    {typeof age === "number" && age >= 1 && age <= 12 && (
                      <p className="text-[11px] text-brand-turquoise font-semibold mt-1.5">
                        {getChildPricing(age).label}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4 — SERVICES */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-2">
              Services required
            </h2>
            <p className="text-sm text-brand-dark/60">
              Select everything you need — multiple selections allowed.
            </p>
          </div>

          <fieldset>
            <legend className={`${labelClass} flex items-center gap-1.5`}>
              <Car className="w-3.5 h-3.5 text-brand-turquoise" /> Cab / vehicle preference
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {(isDestination ? DEST_CAB_OPTIONS : CAB_OPTIONS).map((cab) => (
                <Chip
                  key={cab}
                  active={data.cab.includes(cab)}
                  onClick={() => set("cab", toggleInList(data.cab, cab))}
                >
                  {cab}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={`${labelClass} flex items-center gap-1.5`}>
              <BedDouble className="w-3.5 h-3.5 text-brand-turquoise" /> Hotel / stay preference
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {(isDestination ? DEST_HOTEL_OPTIONS : HOTEL_OPTIONS).map(
                (hotel) => (
                  <Chip
                    key={hotel}
                    active={data.hotels.includes(hotel)}
                    onClick={() =>
                      set("hotels", toggleInList(data.hotels, hotel))
                    }
                  >
                    {hotel}
                  </Chip>
                )
              )}
            </div>
            {isDestination && data.hotels.includes("Other") && (
              <div className="mt-3">
                <label htmlFor="cp-stay-other" className={labelClass}>
                  Describe your stay preference
                </label>
                <input
                  id="cp-stay-other"
                  type="text"
                  placeholder="e.g. Riverside camps, heritage haveli"
                  value={data.stayOther}
                  onChange={(e) => set("stayOther", e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className={`${labelClass} flex items-center gap-1.5`}>
              <Ticket className="w-3.5 h-3.5 text-brand-turquoise" /> Travel tickets
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {TICKET_OPTIONS.map((ticket) => (
                <Chip
                  key={ticket}
                  active={data.tickets.includes(ticket)}
                  onClick={() => {
                    if (isDestination && data.noTickets) set("noTickets", false);
                    set("tickets", toggleInList(data.tickets, ticket));
                  }}
                >
                  {ticket}
                </Chip>
              ))}
              {isDestination && (
                <Chip
                  active={data.noTickets}
                  onClick={() => {
                    set("noTickets", !data.noTickets);
                    if (!data.noTickets) set("tickets", []);
                  }}
                >
                  No tickets required
                </Chip>
              )}
            </div>
          </fieldset>

          <fieldset>
            <legend className={labelClass}>Activities & rentals</legend>
            <div className="flex flex-wrap gap-2.5">
              <Chip
                active={data.adventureActivity}
                onClick={() => set("adventureActivity", !data.adventureActivity)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5" /> Adventure Activity
                </span>
              </Chip>
              <Chip
                active={data.vehicleRent}
                onClick={() => set("vehicleRent", !data.vehicleRent)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" /> Vehicle Rent
                </span>
              </Chip>
              <Chip
                active={data.mountainBike}
                onClick={() => set("mountainBike", !data.mountainBike)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5" /> Mountain Bike
                </span>
              </Chip>
              <Chip
                active={data.gypsyTour}
                onClick={() => set("gypsyTour", !data.gypsyTour)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Gypsy Tour
                </span>
              </Chip>
              <Chip
                active={data.mtb4x4}
                onClick={() => set("mtb4x4", !data.mtb4x4)}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> MTB 4x4
                </span>
              </Chip>
            </div>
          </fieldset>

          {isDestination && data.vehicleRent && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-card-2xl border border-brand-turquoise/15 bg-white">
              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                  Vehicle rental details
                </p>
              </div>
              <div>
                <label htmlFor="cp-vehicle-pref" className={labelClass}>
                  Preferred vehicle
                </label>
                <input
                  id="cp-vehicle-pref"
                  type="text"
                  placeholder="e.g. Innova Crysta, 4x4 Scorpio"
                  value={data.vehiclePreferred}
                  onChange={(e) => set("vehiclePreferred", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cp-vehicle-days" className={labelClass}>
                  Number of days
                </label>
                <input
                  id="cp-vehicle-days"
                  type="number"
                  min={1}
                  max={60}
                  placeholder="e.g. 5"
                  value={data.vehicleDays}
                  onChange={(e) =>
                    set(
                      "vehicleDays",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cp-vehicle-pickup" className={labelClass}>
                  Pickup location
                </label>
                <input
                  id="cp-vehicle-pickup"
                  type="text"
                  placeholder="e.g. Shimla"
                  value={data.vehiclePickup}
                  onChange={(e) => set("vehiclePickup", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cp-vehicle-drop" className={labelClass}>
                  Drop-off location
                </label>
                <input
                  id="cp-vehicle-drop"
                  type="text"
                  placeholder="e.g. Manali"
                  value={data.vehicleDropoff}
                  onChange={(e) => set("vehicleDropoff", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {isDestination && data.mountainBike && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-card-2xl border border-brand-turquoise/15 bg-white">
              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                  Mountain bike details
                </p>
              </div>
              <div>
                <label htmlFor="cp-bike-count" className={labelClass}>
                  Number of bikes
                </label>
                <input
                  id="cp-bike-count"
                  type="number"
                  min={1}
                  max={30}
                  placeholder="e.g. 2"
                  value={data.bikeCount}
                  onChange={(e) =>
                    set(
                      "bikeCount",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cp-bike-days" className={labelClass}>
                  Number of days
                </label>
                <input
                  id="cp-bike-days"
                  type="number"
                  min={1}
                  max={60}
                  placeholder="e.g. 3"
                  value={data.bikeDays}
                  onChange={(e) =>
                    set(
                      "bikeDays",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {isDestination && data.gypsyTour && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-card-2xl border border-brand-turquoise/15 bg-white">
              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-turquoise">
                  Gypsy tour details
                </p>
              </div>
              <div>
                <label htmlFor="cp-gypsy-date" className={labelClass}>
                  Preferred date
                </label>
                <input
                  id="cp-gypsy-date"
                  type="date"
                  value={data.gypsyDate}
                  onChange={(e) => set("gypsyDate", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cp-gypsy-people" className={labelClass}>
                  Number of people
                </label>
                <input
                  id="cp-gypsy-people"
                  type="number"
                  min={1}
                  max={30}
                  placeholder="e.g. 4"
                  value={data.gypsyPeople}
                  onChange={(e) =>
                    set(
                      "gypsyPeople",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cp-gypsy-loc" className={labelClass}>
                  Location / destination
                </label>
                <input
                  id="cp-gypsy-loc"
                  type="text"
                  placeholder="e.g. Spiti Valley"
                  value={data.gypsyLocation}
                  onChange={(e) => set("gypsyLocation", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {data.adventureActivity && (
            <div>
              <label htmlFor="cp-adventure" className={labelClass}>
                Adventure preferences / details
              </label>
              <textarea
                id="cp-adventure"
                rows={2}
                placeholder="e.g. Paragliding in Bir, river rafting, difficulty level..."
                value={data.adventureDetails}
                onChange={(e) => set("adventureDetails", e.target.value)}
                className={inputClass}
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 5 — REVIEW & CONTACT */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-2">
              Review & request
            </h2>
            <p className="text-sm text-brand-dark/60">
              Check everything below, add your contact details, then request
              your custom package.
            </p>
          </div>

          <div className="bg-white border border-brand-turquoise/15 rounded-card-2xl p-5 sm:p-6 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                Trip Type
              </span>
              <span className="font-semibold text-brand-dark text-right">
                {data.tripType === "domestic" ? "Domestic" : "International"}
              </span>
            </div>
            {data.tripType === "domestic" && (
              <>
                <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                    Home
                  </span>
                  <span className="font-semibold text-brand-dark text-right">
                    {data.homeLocation}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                    Regions
                  </span>
                  <span className="font-semibold text-brand-dark text-right">
                    {data.regions.map(getRegionLabel).join(", ")}
                  </span>
                </div>
              </>
            )}
            <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                Destinations
              </span>
              <span className="font-semibold text-brand-dark text-right">
                {data.tripType === "domestic"
                  ? [
                      ...data.states,
                      ...(data.customDestinationText.trim()
                        ? [`Custom: ${data.customDestinationText.trim()}`]
                        : []),
                    ].join(", ") || "—"
                  : data.internationalDestinations.join(", ")}
              </span>
            </div>
            {isDestination && (data.departureDate || data.returnDate) && (
              <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                  Travel Dates
                </span>
                <span className="font-semibold text-brand-dark text-right">
                  {data.departureDate || "—"} to {data.returnDate || "—"}
                </span>
              </div>
            )}
            <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                Duration
              </span>
              <span className="font-semibold text-brand-dark text-right">
                {data.durationDays} Days
              </span>
            </div>
            {isDestination && data.travelStyles.length > 0 && (
              <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                  Trip Styles
                </span>
                <span className="font-semibold text-brand-dark text-right">
                  {data.travelStyles
                    .map((s) =>
                      s === "Other" && data.travelStyleOther.trim()
                        ? `Other (${data.travelStyleOther.trim()})`
                        : s
                    )
                    .join(", ")}
                </span>
              </div>
            )}
            <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                Travellers
              </span>
              <span className="font-semibold text-brand-dark text-right">
                {buildTravellersSummary(data)}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                Services
              </span>
              <span className="font-semibold text-brand-dark text-right">
                {buildServicesSummary(data, mode).join(" | ")}
              </span>
            </div>
            {isDestination &&
              (data.budgetAmount !== "" || data.budgetType) && (
                <div className="flex items-start justify-between gap-3 pt-3 border-t border-brand-turquoise/5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-taupe shrink-0 pt-0.5">
                    Budget
                  </span>
                  <span className="font-semibold text-brand-dark text-right">
                    {buildBudgetLabel(data)}
                  </span>
                </div>
              )}
            <Button variant="ghost" size="sm" onClick={goBack} type="button">
              Edit selections
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cp-name" className={labelClass}>
                Your Full Name *
              </label>
              <input
                id="cp-name"
                type="text"
                required
                placeholder="e.g. Vikram Sharma"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputClass}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="cp-phone" className={labelClass}>
                Phone / WhatsApp Number *
              </label>
              <input
                id="cp-phone"
                type="tel"
                required
                placeholder="e.g. 7018678064"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cp-email" className={labelClass}>
                Email Address *
              </label>
              <input
                id="cp-email"
                type="email"
                required
                placeholder="vikram@example.com"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass}
                autoComplete="email"
              />
            </div>
            {isDestination ? (
              <div>
                <label htmlFor="cp-whatsapp" className={labelClass}>
                  WhatsApp Number
                </label>
                <input
                  id="cp-whatsapp"
                  type="tel"
                  placeholder="Same as phone if left blank"
                  value={data.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="cp-date" className={labelClass}>
                  Preferred Travel Date
                </label>
                <input
                  id="cp-date"
                  type="date"
                  value={data.travelDate}
                  onChange={(e) => set("travelDate", e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </div>

          {isDestination && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cp-budget" className={labelClass}>
                  Approximate Budget (optional)
                </label>
                <input
                  id="cp-budget"
                  type="number"
                  min={0}
                  placeholder="e.g. 50000"
                  value={data.budgetAmount}
                  onChange={(e) =>
                    set(
                      "budgetAmount",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cp-budget-type" className={labelClass}>
                  Budget Type
                </label>
                <select
                  id="cp-budget-type"
                  value={data.budgetType}
                  onChange={(e) =>
                    set("budgetType", e.target.value as "" | "per_person" | "total")
                  }
                  className={inputClass}
                >
                  <option value="">Select…</option>
                  <option value="per_person">Budget per person</option>
                  <option value="total">Total trip budget</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="cp-notes" className={labelClass}>
              {isDestination
                ? "Anything else you'd like us to know?"
                : "Additional Notes / Preferences"}
            </label>
            <textarea
              id="cp-notes"
              rows={3}
              placeholder={
                isDestination
                  ? "Special hotel, dietary, accessibility, sightseeing, pickup, occasions, budget preferences..."
                  : "Pace of travel, dietary preferences, budget hints..."
              }
              value={data.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              icon={
                loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )
              }
            >
              {loading
                ? "Transmitting..."
                : isDestination
                  ? "Request Custom Destination"
                  : "Request Custom Package"}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => window.open(buildWhatsAppUrl(data), "_blank")}
              className="w-full sm:w-auto shrink-0"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Quick WhatsApp
            </Button>
          </div>
          <p className="text-[11px] text-center text-brand-taupe">
            Confidential & Direct. No spam. You will be connected directly with
            a certified Himalayan trip planner.
          </p>
        </form>
      )}

      {/* NAV */}
      {!submitted && (
        <div className="mt-8 pt-6 border-t border-brand-turquoise/10 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={step === 0}
            icon={<ArrowLeft className="w-4 h-4" />}
            className={cn(step === 0 && "invisible")}
          >
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              variant="primary"
              onClick={goNext}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue
            </Button>
          ) : (
            <span className="text-[11px] text-brand-taupe">
              Review above & submit
            </span>
          )}
        </div>
      )}
    </div>
  );
};
