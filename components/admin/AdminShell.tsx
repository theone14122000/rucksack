"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  Car,
  ChevronLeft,
  ExternalLink,
  FileText,
  FolderOpen,
  HelpCircle,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Mountain,
  Package,
  Settings,
  Sparkles,
  Star,
  X,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
}

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, exact: true }],
  },
  {
    title: "Catalog",
    items: [
      { href: "/admin/packages", label: "Packages", icon: <Package className="w-4 h-4" /> },
      { href: "/admin/destinations", label: "Destinations", icon: <MapPin className="w-4 h-4" /> },
      { href: "/admin/treks", label: "Treks", icon: <Mountain className="w-4 h-4" /> },
      { href: "/admin/experiences", label: "Experiences", icon: <Sparkles className="w-4 h-4" /> },
      { href: "/admin/services", label: "Services", icon: <Car className="w-4 h-4" /> },
    ],
  },
  {
    title: "Media",
    items: [
      { href: "/admin/gallery", label: "Gallery", icon: <Images className="w-4 h-4" /> },
      { href: "/admin/media", label: "Media Library", icon: <FolderOpen className="w-4 h-4" /> },
    ],
  },
  {
    title: "Engagement",
    items: [
      { href: "/admin/enquiries", label: "Enquiries", icon: <Inbox className="w-4 h-4" /> },
      { href: "/admin/testimonials", label: "Testimonials", icon: <Star className="w-4 h-4" /> },
      { href: "/admin/faqs", label: "FAQs", icon: <HelpCircle className="w-4 h-4" /> },
    ],
  },
  {
    title: "Website",
    items: [
      { href: "/admin/content", label: "Website Content", icon: <FileText className="w-4 h-4" /> },
      { href: "/admin/settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
      { href: "/admin/archived", label: "Archived", icon: <Archive className="w-4 h-4" /> },
    ],
  },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  return (
    <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="px-3 mb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-semibold transition-all ${
                    isActive(item)
                      ? "bg-brand-turquoise/15 text-brand-turquoise-bright border border-brand-turquoise/25"
                      : "text-white/55 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarBrand() {
  return (
    <Link href="/admin" className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
      <div className="w-9 h-9 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.jpeg" alt="" className="w-full h-full object-contain" />
      </div>
      <div>
        <span className="block font-editorial text-base font-bold text-white leading-none">
          Rucksack Adventures
        </span>
        <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-brand-turquoise-bright mt-1">
          Admin Panel
        </span>
      </div>
    </Link>
  );
}

async function logout() {
  try {
    await fetch("/api/auth", { method: "DELETE" });
  } finally {
    window.location.href = "/admin/login";
  }
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-brand-dark border-r border-white/5 z-40">
        <SidebarBrand />
        <NavLinks />
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-semibold text-white/55 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink className="w-4 h-4" /> View website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-semibold text-white/55 hover:text-red-300 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-brand-dark flex flex-col shadow-luxury">
            <div className="flex items-center justify-between pr-3">
              <SidebarBrand />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <NavLinks onNavigate={() => setMobileOpen(false)} />
            <div className="px-3 py-4 border-t border-white/8 space-y-1">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-semibold text-white/55"
              >
                <ExternalLink className="w-4 h-4" /> View website
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-semibold text-white/55"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-brand-turquoise/10">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 -ml-2 text-brand-dark hover:bg-brand-dark/5 rounded-card"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.2em] text-brand-taupe">
                Content Management
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="text-xs font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-brand-taupe/50 hidden sm:inline">
                <ChevronLeft className="w-3 h-3 -rotate-90" />
              </span>
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-turquoise hover:text-brand-turquoise-light transition-colors"
              >
                View site <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={logout}
                className="sm:hidden p-2 text-brand-dark/70 hover:text-brand-dark"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
