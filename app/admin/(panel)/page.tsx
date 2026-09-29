import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  HelpCircle,
  Images,
  Inbox,
  MapPin,
  Mountain,
  Package,
  Sparkles,
  Star,
} from "lucide-react";
import { Card, CardTitle, StatusBadge } from "@/components/admin/ui";
import {
  getDestinations,
  getEnquiries,
  getExperiences,
  getFAQs,
  getGalleryItems,
  getPackages,
  getServices,
  getTestimonials,
  getTreks,
} from "@/lib/cms/store";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
  href,
  icon,
}: {
  label: string;
  value: number | string;
  hint?: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-card-xl border border-brand-turquoise/10 shadow-soft p-5 hover:border-brand-turquoise/30 hover:shadow-luxury-hover transition-all"
    >
      <div className="flex items-start justify-between">
        <span className="w-9 h-9 rounded-card bg-brand-turquoise/10 text-brand-turquoise flex items-center justify-center">
          {icon}
        </span>
        <ArrowRight className="w-4 h-4 text-brand-taupe opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
      <p className="font-editorial text-3xl font-bold text-brand-dark mt-4">{value}</p>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-taupe mt-1">{label}</p>
      {hint && <p className="text-[11px] text-brand-turquoise mt-0.5">{hint}</p>}
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const [destinations, packages, treks, experiences, testimonials, faqs, gallery, services, enquiries] =
    await Promise.all([
      getDestinations({ status: "all" }),
      getPackages({ status: "all" }),
      getTreks({ status: "all" }),
      getExperiences({ status: "all" }),
      getTestimonials({ status: "all" }),
      getFAQs(undefined, { status: "all" }),
      getGalleryItems({ status: "all" }),
      getServices({ status: "all" }),
      getEnquiries(),
    ]);

  const hiddenCount = [...packages, ...destinations, ...treks, ...experiences].filter(
    (item) => item.status === "draft" || item.status === "archived"
  ).length;
  const newEnquiries = enquiries.filter((e) => e.status === "New");
  const recent = enquiries.slice(0, 5);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-editorial text-3xl font-bold text-brand-dark tracking-tight">Dashboard</h1>
          <p className="text-sm text-brand-taupe mt-1">
            Everything on the website is editable from this panel — no code changes needed.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/packages/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider bg-brand-turquoise text-white border border-brand-turquoise hover:bg-brand-turquoise-light transition-all"
          >
            + New package
          </Link>
          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-card text-xs font-bold uppercase tracking-wider bg-white text-brand-dark border border-brand-turquoise/20 hover:border-brand-turquoise/40 transition-all"
          >
            Manage gallery
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Packages" value={packages.length} href="/admin/packages" icon={<Package className="w-5 h-5" />} />
        <StatCard label="Destinations" value={destinations.length} href="/admin/destinations" icon={<MapPin className="w-5 h-5" />} />
        <StatCard label="Treks" value={treks.length} href="/admin/treks" icon={<Mountain className="w-5 h-5" />} />
        <StatCard
          label="New enquiries"
          value={newEnquiries.length}
          hint={newEnquiries.length ? "Awaiting follow-up" : "All caught up"}
          href="/admin/enquiries"
          icon={<Inbox className="w-5 h-5" />}
        />
        <StatCard label="Gallery photos" value={gallery.length} href="/admin/gallery" icon={<Images className="w-5 h-5" />} />
        <StatCard label="Testimonials" value={testimonials.length} href="/admin/testimonials" icon={<Star className="w-5 h-5" />} />
        <StatCard label="FAQs" value={faqs.length} href="/admin/faqs" icon={<HelpCircle className="w-5 h-5" />} />
        <StatCard
          label="Hidden items"
          value={hiddenCount}
          hint="Drafts & archived"
          href="/admin/archived"
          icon={<FileText className="w-5 h-5" />}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Recent enquiries</CardTitle>
            <Link href="/admin/enquiries" className="text-[11px] font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light">
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-brand-taupe py-6 text-center">No enquiries yet.</p>
          ) : (
            <ul className="divide-y divide-brand-turquoise/8">
              {recent.map((enq) => (
                <li key={enq.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-brand-dark truncate">
                      {enq.name} <span className="font-normal text-brand-taupe">— {enq.destination}</span>
                    </p>
                    <p className="text-xs text-brand-taupe truncate">{enq.message}</p>
                    <p className="text-[11px] font-mono text-brand-taupe/70 mt-0.5">
                      {enq.phone} · {new Date(enq.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                      enq.status === "New"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : enq.status === "Booked"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-brand-turquoise/10 text-brand-turquoise border-brand-turquoise/25"
                    }`}
                  >
                    {enq.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardTitle>Quick actions</CardTitle>
          <div className="space-y-2">
            {[
              { href: "/admin/destinations/new", label: "Add destination", icon: <MapPin className="w-4 h-4" /> },
              { href: "/admin/treks/new", label: "Add trek", icon: <Mountain className="w-4 h-4" /> },
              { href: "/admin/experiences/new", label: "Add experience", icon: <Sparkles className="w-4 h-4" /> },
              { href: "/admin/content", label: "Edit website copy", icon: <FileText className="w-4 h-4" /> },
              { href: "/admin/settings", label: "Contact & SEO settings", icon: <ArrowRight className="w-4 h-4" /> },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 px-4 py-3 rounded-card border border-brand-turquoise/10 hover:border-brand-turquoise/30 hover:bg-brand-turquoise/5 transition-all text-sm font-semibold text-brand-dark"
              >
                <span className="text-brand-turquoise">{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-brand-turquoise/10">
            <p className="text-[11px] text-brand-taupe leading-relaxed">
              Site content: {services.length} services · {experiences.length} experiences · changes go live
              immediately after saving.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
