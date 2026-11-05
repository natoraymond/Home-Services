"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import QuoteModal from "@/components/QuoteModal";

export default function Header() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Services", href: "/services" },
    { label: "House Cleaning", href: "/services/house-cleaning", badge: "Popular" },
    { label: "Washing of GP Tanks", href: "/services/washing-gp-tanks", badge: "Featured" },
    { label: "Plumbing & Drainage", href: "/services/plumbing-services" },
    { label: "Electrical & Lighting", href: "/services/electrical-services" },
    { label: "HVAC & Climate Control", href: "/services/hvac-services" },
    { label: "Remodeling & Handyman", href: "/services/remodeling-handyman" },
    { label: "Why Choose Us", href: "/#why-us" },
    { label: "Customer Reviews", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      {/* Top Banner (Responsive: compact on mobile, detailed on desktop) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
              24/7 Available
            </span>
            <span className="hidden sm:inline">Emergency Repairs, GP Tank Washing & Deep Cleaning</span>
            <span className="sm:hidden text-[11px] truncate">Emergency Home Services Available</span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:18005557292"
              className="flex items-center gap-1 text-white hover:text-amber-400 transition-colors font-medium text-xs"
            >
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(800) 555-RAYCOM</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">Licensed & Insured #RC-8492</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
              R
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                RAYCOM
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-blue-600 block -mt-1">
                Home Services
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible on large screens) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-600">
            <Link href="/services" className="hover:text-blue-600 transition-colors">
              All Services
            </Link>
            <Link href="/services/house-cleaning" className="hover:text-blue-600 transition-colors">
              House Cleaning
            </Link>
            <Link href="/services/washing-gp-tanks" className="hover:text-blue-600 transition-colors">
              GP Tank Washing
            </Link>
            <Link href="/#why-us" className="hover:text-blue-600 transition-colors">
              Why Us
            </Link>
            <Link href="/#testimonials" className="hover:text-blue-600 transition-colors">
              Reviews
            </Link>
            <Link href="/#faq" className="hover:text-blue-600 transition-colors">
              FAQ
            </Link>
            <Link href="/admin" className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 transition-colors">
              <span>Admin</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Dashboard</span>
            </Link>
          </nav>

          {/* Header Action Buttons & Hamburger Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Call Now button (visible on larger mobile & desktop) */}
            <a
              href="tel:18005557292"
              className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors border border-slate-200"
            >
              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now</span>
            </a>

            {/* Request Free Quote CTA Button */}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="hidden md:inline-flex items-center justify-center text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 sm:px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              Get Free Estimate
            </button>

            {/* Mobile Hamburger / Close Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
            >
              {isMobileMenuOpen ? (
                // Close (X) icon
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger bars icon
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE FULL-SCREEN / SLIDE-DOWN DRAWER MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[calc(theme(spacing.18))] sm:top-[calc(theme(spacing.20))] bottom-0 z-50 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white border-b border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto rounded-b-3xl p-5 sm:p-6 space-y-5">
              {/* Quick Actions in Menu */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs text-center shadow-md cursor-pointer transition-colors"
                >
                  Request Free Quote ⚡
                </button>
                <a
                  href="tel:18005557292"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(800) 555-RAYCOM</span>
                </a>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1 divide-y divide-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-2">
                  Navigation & Services
                </div>
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                        {link.badge}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">→</span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Operations & Administration Link */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>Admin Dashboard</span>
                  </div>
                  <span className="text-amber-400 text-[10px] font-extrabold uppercase bg-amber-400/20 px-2 py-0.5 rounded">
                    Manage
                  </span>
                </Link>
              </div>

              {/* Hotline & Licensing Details */}
              <div className="text-center pt-2 text-xs text-slate-400 space-y-1">
                <p>Licensed, Bonded & Insured • Reg #RC-8492</p>
                <p className="text-[11px]">Serving 36 States & FCT with Real-time GPS Dispatch</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
}
