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
            ? "bg-brand-brown/95 backdrop-blur-md shadow-lg py-3"
            : "bg-brand-brown/80 backdrop-blur-sm py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-white/95 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-sm">
              <img
                src="/images/logo.jpeg"
                alt="Rucksack Adventures logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-brand-cream leading-none block">
                Rucksack Adventures
              </span>
              <span className="text-[8px] uppercase tracking-[0.22em] text-brand-cream/60 font-medium block mt-0.5">
                Shimla &bull; Est. 2018
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-all duration-200 relative px-3 py-2 rounded-sm",
                    active
                      ? "text-brand-cream font-semibold bg-white/10"
                      : "text-brand-cream/75 hover:text-brand-cream hover:bg-white/5"
                  )}
                >
                  {item.label}
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
                  "flex items-center gap-1 transition-all duration-200 px-3 py-2 rounded-sm hover:text-brand-cream hover:bg-white/5",
                  pathname.includes("services") || pathname.includes("booking") || pathname.includes("pilgrimage")
                    ? "text-brand-cream font-semibold bg-white/10"
                    : "text-brand-cream/75"
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300 text-brand-cream/50",
                    servicesDropdown && "rotate-180"
                  )}
                />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-brand-brown border border-white/10 rounded-card p-2 shadow-xl">
                    {services.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="block p-2.5 rounded-card hover:bg-white/10 transition-colors group"
                      >
                        <p className="text-xs font-semibold text-brand-cream group-hover:text-white">
                          {svc.title}
                        </p>
                        <p className="text-[11px] text-brand-cream/60">{svc.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={cn(
                "transition-all duration-200 px-3 py-2 rounded-sm hover:text-brand-cream hover:bg-white/5",
                pathname === "/about" ? "text-brand-cream font-semibold bg-white/10" : "text-brand-cream/75"
              )}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={cn(
                "transition-all duration-200 px-3 py-2 rounded-sm hover:text-brand-cream hover:bg-white/5",
                pathname === "/contact" ? "text-brand-cream font-semibold bg-white/10" : "text-brand-cream/75"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917018678064"
              className="flex items-center gap-2 text-[11px] font-semibold text-brand-cream/90 tracking-wider uppercase hover:text-white transition-colors py-1.5 px-3 rounded-sm border border-white/15 hover:border-white/30"
            >
              <Phone className="w-3.5 h-3.5" />
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

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+917018678064"
              className="p-2 rounded-sm border border-white/20 text-brand-cream hover:bg-white/10 transition-colors"
              aria-label="Call Rucksack Adventures"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-sm bg-white/15 text-brand-cream hover:bg-white/25 transition-colors border border-white/10"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenEnquiry={() => setEnquiryModalOpen(true)}
      />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
};
