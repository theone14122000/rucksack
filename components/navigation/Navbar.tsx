"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Compass, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import { EnquiryModal } from "../ui/EnquiryModal";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdown(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/packages", label: "Packages" },
    { href: "/treks", label: "Treks" },
    { href: "/experiences", label: "Experiences" },
  ];

  const services = [
    { href: "/taxi-services", title: "Shimla Taxi Services", desc: "Local & outstation cabs" },
    { href: "/pilgrimage-tour", title: "Pilgrimage Tour", desc: "Sacred Char Dham & temple circuits" },
    { href: "/bus-booking", title: "Volvo & Bus Booking", desc: "Himalayan highway routes" },
    { href: "/railway-booking", title: "Railway Booking", desc: "Toy train & IRCTC assistance" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-brand-offwhite/95 backdrop-blur-md shadow-xs border-b border-brand-sand/30 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Crest & Title */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-white border border-brand-sand/40 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-xs">
              <img
                src="/images/logo.jpeg"
                alt="Rucksack Adventures logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-brand-deep leading-none block">
                Rucksack Adventures
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-taupe font-medium block mt-0.5">
                Shimla • Est. 2018
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-brand-charcoal">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors duration-200 hover:text-brand-deep relative py-1",
                    active ? "text-brand-deep font-semibold" : "text-brand-charcoal/80"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-sand rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 transition-colors duration-200 py-1 hover:text-brand-deep",
                  pathname.includes("services") || pathname.includes("booking") || pathname.includes("pilgrimage")
                    ? "text-brand-deep font-semibold"
                    : "text-brand-charcoal/80"
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300 text-brand-taupe",
                    servicesDropdown && "rotate-180"
                  )}
                />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-brand-offwhite border border-brand-sand/40 rounded-sm p-2 divide-y divide-brand-sand/15">
                    {services.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="block p-2.5 rounded-xs hover:bg-brand-cream/60 transition-colors group"
                      >
                        <p className="text-xs font-semibold text-brand-deep group-hover:text-brand-warm">
                          {svc.title}
                        </p>
                        <p className="text-[11px] text-brand-taupe">{svc.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={cn(
                "transition-colors duration-200 hover:text-brand-deep py-1",
                pathname === "/about" ? "text-brand-deep font-semibold" : "text-brand-charcoal/80"
              )}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={cn(
                "transition-colors duration-200 hover:text-brand-deep py-1",
                pathname === "/contact" ? "text-brand-deep font-semibold" : "text-brand-charcoal/80"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+917018678064"
              className="flex items-center gap-2 text-xs font-semibold text-brand-deep tracking-wider uppercase hover:text-brand-warm transition-colors py-1.5 px-3 rounded-sm border border-brand-sand/30"
            >
              <Phone className="w-3.5 h-3.5 text-brand-sand" />
              7018678064
            </a>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setEnquiryModalOpen(true)}
              icon={<Compass className="w-3.5 h-3.5" />}
            >
              Plan Your Journey
            </Button>
          </div>

          {/* Mobile Actions: Call Button & Hamburger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <a
              href="tel:+917018678064"
              className="p-2 rounded-sm border border-brand-sand/40 text-brand-deep hover:bg-brand-cream transition-colors"
              aria-label="Call Rucksack Adventures"
            >
              <Phone className="w-4 h-4 text-brand-deep" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-sm bg-brand-deep text-brand-offwhite hover:bg-brand-espresso transition-colors border border-brand-deep"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenEnquiry={() => setEnquiryModalOpen(true)}
      />

      {/* Universal Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
};
