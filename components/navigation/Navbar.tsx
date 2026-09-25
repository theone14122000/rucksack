"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Compass, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setServicesDropdown(false); }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/destinations", label: "Destinations" },
    { href: "/packages", label: "Packages" },
    { href: "/activities", label: "Activities" },
    { href: "/treks", label: "Treks" },
    { href: "/experiences", label: "Experiences" },
    { href: "/#moments", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const services = [
    { href: "/custom-package", title: "Custom Package", desc: "Build your own itinerary", icon: "🧳" },
    { href: "/taxi-services", title: "Shimla Cab Services", desc: "Local & outstation cabs", icon: "🚗" },
    { href: "/pilgrimage-tour", title: "Pilgrimage Tour", desc: "Sacred Char Dham & temple circuits", icon: "🛕" },
    { href: "/bus-booking", title: "Volvo & Bus Booking", desc: "Himalayan highway routes", icon: "🚌" },
    { href: "/railway-booking", title: "Railway Booking", desc: "Toy train & IRCTC assistance", icon: "🚂" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_30px_rgba(7,20,18,0.04)] py-3 border-b border-brand-turquoise/5"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-card bg-white overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-soft border border-brand-turquoise/5">
              <img src="/images/logo.jpeg" alt="Rucksack Adventures logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className={cn(
                "font-editorial text-lg sm:text-xl font-bold tracking-tight leading-none block transition-colors duration-500",
                scrolled ? "text-brand-dark" : "text-white"
              )}>
                Rucksack Adventures
              </span>
              <span className={cn(
                "text-[8px] uppercase tracking-[0.22em] font-medium block mt-0.5 transition-colors duration-500",
                scrolled ? "text-brand-taupe" : "text-white/50"
              )}>
                Shimla &bull; Est. 2018
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5 text-[13px] font-medium">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-all duration-300 relative px-2 py-2 rounded-card",
                    active
                      ? scrolled ? "text-brand-turquoise font-semibold" : "text-white font-semibold"
                      : scrolled ? "text-brand-dark/60 hover:text-brand-dark" : "text-white/65 hover:text-white"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-brand-turquoise to-brand-yellow rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <div className="relative" onMouseEnter={() => setServicesDropdown(true)} onMouseLeave={() => setServicesDropdown(false)}>
              <button className={cn(
                "flex items-center gap-1 transition-all duration-300 px-2 py-2 rounded-card",
                pathname.includes("services") || pathname.includes("booking") || pathname.includes("pilgrimage") || pathname.includes("custom-package")
                  ? scrolled ? "text-brand-turquoise font-semibold" : "text-white font-semibold"
                  : scrolled ? "text-brand-dark/60 hover:text-brand-dark" : "text-white/65 hover:text-white"
              )}>
                Services
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", servicesDropdown && "rotate-180")} />
              </button>
              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 w-80 pt-2 z-50"
                  >
                    <div className="bg-white/95 backdrop-blur-2xl border border-brand-turquoise/8 rounded-card-xl p-2 shadow-luxury">
                      {services.map((svc) => (
                        <Link key={svc.href} href={svc.href} className="flex items-center gap-3 p-3 rounded-card hover:bg-brand-turquoise-50 transition-all group">
                          <span className="text-xl">{svc.icon}</span>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-brand-dark group-hover:text-brand-turquoise transition-colors">{svc.title}</p>
                            <p className="text-[11px] text-brand-taupe mt-0.5">{svc.desc}</p>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-brand-turquoise/0 group-hover:text-brand-turquoise transition-all" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <a href="tel:+917018678064" className={cn("flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase transition-all py-1.5 px-3 rounded-card border", scrolled ? "text-brand-dark/60 border-brand-turquoise/10 hover:border-brand-turquoise/20 hover:text-brand-dark" : "text-white/70 border-white/15 hover:border-white/25 hover:text-white")}>
              <Phone className="w-3.5 h-3.5" />
              7018678064
            </a>
            <Button variant="primary" size="sm" onClick={() => setEnquiryModalOpen(true)} icon={<Compass className="w-3.5 h-3.5" />}>
              Plan Your Journey
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <a href="tel:+917018678064" className={cn("p-2 rounded-card border transition-all", scrolled ? "border-brand-turquoise/10 text-brand-dark hover:bg-brand-turquoise/5" : "border-white/15 text-white hover:bg-white/10")} aria-label="Call Rucksack Adventures">
              <Phone className="w-4 h-4" />
            </a>
            <button onClick={() => setMobileMenuOpen(true)} className={cn("p-2 rounded-card transition-all border", scrolled ? "bg-brand-turquoise text-white border-brand-turquoise" : "bg-white/15 text-white border-white/10 hover:bg-white/25")} aria-label="Open Navigation Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onOpenEnquiry={() => setEnquiryModalOpen(true)} />
      <EnquiryModal isOpen={enquiryModalOpen} onClose={() => setEnquiryModalOpen(false)} />
    </>
  );
};
