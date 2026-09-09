"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "./Button";

interface EnquiryFormProps {
  defaultDestination?: string;
  defaultTravelType?: "Domestic" | "International" | "Trek" | "Taxi" | "Pilgrimage" | "Other";
  onSuccess?: () => void;
  className?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  defaultDestination = "",
  defaultTravelType = "Domestic",
  onSuccess,
  className = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: defaultDestination,
    travelType: defaultTravelType,
    travelDate: "",
    travellersCount: "2 Adults",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Unable to send enquiry. Please try WhatsApp or call us directly.");
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Rucksack Adventures! I want to enquire about:
\`Destination: ${formData.destination || "Himalayan Journey"}
\`Travel Type: ${formData.travelType}
\`Travellers: ${formData.travellersCount}
\`Dates: ${formData.travelDate || "Upcoming"}
\`Name: ${formData.name || "Traveler"}`
    );
    window.open(`https://wa.me/917018678064?text=${text}`, "_blank");
  };

  if (submitted) {
    return (
      <div className="bg-brand-cream border border-brand-brown/15 p-8 rounded-card text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
        <h3 className="font-editorial text-2xl font-bold text-brand-black mb-2">
          Enquiry Received with Gratitude
        </h3>
        <p className="text-sm text-brand-charcoal/80 mb-6 max-w-md mx-auto leading-relaxed">
          Our senior trip curator from our Kasumpti, Shimla operations center will contact you within 4 hours with a customized itinerary plan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="whatsapp"
            onClick={handleWhatsAppDirect}
            icon={<MessageSquare className="w-4 h-4" />}
          >
            Chat with Curator on WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                destination: "",
                travelType: "Domestic",
                travelDate: "",
                travellersCount: "2 Adults",
                budget: "",
                message: "",
              });
            }}
          >
            Send Another Query
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-card flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Vikram Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. 7018678064"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="vikram@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
            Travel Type *
          </label>
          <select
            value={formData.travelType}
            onChange={(e) => setFormData({ ...formData, travelType: e.target.value as any })}
            className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
          >
            <option value="Domestic">Domestic Journey (Himalayas / India)</option>
            <option value="International">International Escape</option>
            <option value="Trek">Himalayan Trekking Expedition</option>
            <option value="Taxi">Shimla / Himachal Taxi Service</option>
            <option value="Pilgrimage">Pilgrimage Tour</option>
            <option value="Other">Bus / Railway / Custom</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
            Destination of Choice *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Spiti, Kashmir, Bali"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
            Preferred Travel Date
          </label>
          <input
            type="date"
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
            Travellers Count
          </label>
          <input
            type="text"
            placeholder="e.g. 2 Adults, 1 Child"
            value={formData.travellersCount}
            onChange={(e) => setFormData({ ...formData, travellersCount: e.target.value })}
            className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-black mb-1">
          Special Requests / Preferences / Budget
        </label>
        <textarea
          rows={3}
          placeholder="Tell us about hotel categories, pace of travel, vehicle requirements, or dietary preferences..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white border border-brand-brown/15 rounded-card px-3.5 py-2.5 text-sm text-brand-black focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/30 outline-hidden transition-all"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={loading}
          icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        >
          {loading ? "Transmitting..." : "Submit Travel Enquiry"}
        </Button>
        <Button
          type="button"
          variant="whatsapp"
          size="lg"
          onClick={handleWhatsAppDirect}
          className="w-full sm:w-auto shrink-0"
          icon={<MessageSquare className="w-4 h-4" />}
        >
          Quick WhatsApp
        </Button>
      </div>
      <p className="text-[11px] text-center text-brand-taupe">
        Confidential & Direct. No spam. You will be connected directly with a certified Himalayan trip planner.
      </p>
    </form>
  );
};
