"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import QuoteModal from "@/components/QuoteModal";
import { servicesData } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceModal";

export default function Header() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(true);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>

            {/* Services Dropdown with ChevronDown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsServicesDropdownOpen(!isServicesDropdownOpen);
                  setIsAboutDropdownOpen(false);
                }}
                onMouseEnter={() => {
                  setIsServicesDropdownOpen(true);
                  setIsAboutDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 py-2 hover:text-blue-600 transition-colors cursor-pointer group ${isServicesDropdownOpen ? "text-blue-600" : "text-slate-700"
                  }`}
                aria-expanded={isServicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                {/* ChevronDown Icon with smooth rotation */}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 text-slate-400 group-hover:text-blue-600 ${isServicesDropdownOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu Popup containing all Professional Home Services & Maintenance */}
              {isServicesDropdownOpen && (
                <div
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  className="absolute left-0 top-full pt-2 w-[420px] xl:w-[460px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 ring-1 ring-black/5 overflow-hidden">
                    {/* Header Banner inside dropdown */}
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 px-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          Our Offerings
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                          Professional Home Services & Maintenance
                        </h4>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        View All →
                      </Link>
                    </div>

                    {/* All 6 Services List */}
                    <div className="space-y-1.5">
                      {servicesData.map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.slug}`}
                          onClick={() => setIsServicesDropdownOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                              <ServiceIcon name={srv.iconName} className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors flex items-center gap-1.5">
                                <span>{srv.title}</span>
                                {srv.badge && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                                    {srv.badge.split(" ")[0]}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {srv.category} • From <strong className="text-slate-700">{srv.pricingStarting}</strong>
                              </p>
                            </div>
                          </div>
                          <span className="text-slate-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all text-xs font-bold">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Footer inside dropdown */}
                    <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-4 -mb-4 p-3 px-4 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">
                        Need help choosing?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setIsQuoteOpen(true);
                        }}
                        className="text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-3 py-1 rounded-lg transition-colors shadow-xs"
                      >
                        Free Estimate & Dispatch
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Us Dropdown with ChevronDown */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsAboutDropdownOpen(!isAboutDropdownOpen);
                  setIsServicesDropdownOpen(false);
                }}
                onMouseEnter={() => {
                  setIsAboutDropdownOpen(true);
                  setIsServicesDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 py-2 hover:text-blue-600 transition-colors cursor-pointer group ${isAboutDropdownOpen ? "text-blue-600" : "text-slate-700"
                  }`}
                aria-expanded={isAboutDropdownOpen}
                aria-haspopup="true"
              >
                <span>About Us</span>
                {/* ChevronDown Icon with smooth rotation */}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 text-slate-400 group-hover:text-blue-600 ${isAboutDropdownOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu Popup containing everything about Raycom Home Services */}
              {isAboutDropdownOpen && (
                <div
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  className="absolute left-0 top-full pt-2 w-[440px] xl:w-[480px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 ring-1 ring-black/5 overflow-hidden">
                    {/* Header inside About Us dropdown */}
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 px-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          About Raycom
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                          Everything About Raycom Home Services
                        </h4>
                      </div>
                      <Link
                        href="/about"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Full Story →
                      </Link>
                    </div>

                    {/* About Content Links & Sections */}
                    <div className="space-y-1.5">
                      <Link
                        href="/about"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors text-base font-bold">
                          📖
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors flex items-center gap-1.5">
                            <span>Our Story & Mission</span>
                            <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded">Since 2018</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            How we transformed Nigerian home maintenance with engineering rigor and hospital-grade hygiene.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/about"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover/item:bg-amber-500 group-hover/item:text-slate-950 transition-colors text-base font-bold">
                          🛡️
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors flex items-center gap-1.5">
                            <span>Six Pillars of Excellence</span>
                            <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">Core Standards</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            100% vetted staff, GPS dispatch across 36 states, tag pricing, and 30-day workmanship warranties.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/services/washing-gp-tanks"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-600 group-hover/item:text-white transition-colors text-base font-bold">
                          🚰
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors flex items-center gap-1.5">
                            <span>Specialized GP Tank Division</span>
                            <span className="text-[9px] font-extrabold bg-cyan-100 text-cyan-800 px-1.5 py-0.2 rounded">200 - 1,200 Gal</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            Rotary jet pressure scour, sediment extraction, and food-grade chlorine disinfection on raised towers.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/#why-us"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors text-base font-bold">
                          📍
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors flex items-center gap-1.5">
                            <span>Nationwide 36 States & FCT Coverage</span>
                            <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">Real-Time GPS</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            Satellite-tracked rapid dispatch for emergencies and scheduled visits in under 45-60 minutes.
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Footer inside About Us dropdown */}
                    <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-4 -mb-4 p-3 px-4 flex items-center justify-between">
                      <div className="text-[11px] text-slate-600">
                        <strong className="text-slate-900">RC-8492</strong> • Licensed & Insured
                      </div>
                      <Link
                        href="/about"
                        onClick={() => setIsAboutDropdownOpen(false)}
                        className="text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-lg transition-colors shadow-xs"
                      >
                        Read Full Story →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
          <div className="lg:hidden fixed inset-x-0 top-[72px] sm:top-[80px] bottom-0 z-50 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 flex flex-col">
            <div className="bg-white border-b border-slate-200 shadow-2xl flex-1 overflow-y-auto overscroll-contain rounded-b-3xl p-4 sm:p-6 space-y-4 max-h-[calc(100vh-80px)] pb-16">
              {/* Quick Actions in Menu */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="w-full py-3 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs text-center shadow-md cursor-pointer transition-colors active:scale-95"
                >
                  ⚡ Free Estimate & Dispatch
                </button>
                <a
                  href="tel:18005557292"
                  className="w-full py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-md transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(800) 555-RAYCOM</span>
                </a>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-bold text-slate-900 border border-slate-200/70"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Home Page</span>
                  </div>
                  <span className="text-slate-400 text-xs font-bold">→</span>
                </Link>

                {/* Collapsible Services Section in Mobile Menu */}
                <div className="border border-blue-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50/50 hover:bg-blue-100/50 transition-colors font-extrabold text-sm text-slate-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>Services (Professional Home Care)</span>
                    </div>
                    {/* ChevronDown for mobile */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        6 Services
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180 text-blue-600" : ""
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isMobileServicesOpen && (
                    <div className="p-2 space-y-1.5 bg-white divide-y divide-slate-100">
                      <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 rounded-xl flex items-center justify-between">
                        <span>All 6 Professional Services</span>
                        <Link
                          href="/services"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xs text-blue-700 font-extrabold underline hover:text-blue-900"
                        >
                          View Catalog →
                        </Link>
                      </div>

                      {servicesData.map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors pt-2.5"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
                              <ServiceIcon name={srv.iconName} className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{srv.title}</span>
                                {srv.badge && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900">
                                    {srv.badge.split(" ")[0]}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {srv.category} • From <strong className="text-slate-800">{srv.pricingStarting}</strong>
                              </div>
                            </div>
                          </div>
                          <span className="text-slate-400 text-xs font-bold">→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Collapsible About Us Section in Mobile Menu */}
                <div className="border border-amber-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                    className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-amber-50 to-orange-50/50 hover:bg-amber-100/50 transition-colors font-extrabold text-sm text-slate-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>About Us (Raycom Story & Standards)</span>
                    </div>
                    {/* ChevronDown for mobile */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Overview
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isMobileAboutOpen ? "rotate-180 text-amber-600" : ""
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isMobileAboutOpen && (
                    <div className="p-2 space-y-1.5 bg-white divide-y divide-slate-100">
                      <Link
                        href="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-900 pt-2"
                      >
                        <span className="text-xl">📖</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Our Story & Mission</div>
                          <span className="text-[11px] text-slate-500 font-normal">Founded in 2018 with engineering rigor</span>
                        </div>
                      </Link>

                      <Link
                        href="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-900 pt-2"
                      >
                        <span className="text-xl">🛡️</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Six Pillars of Excellence</div>
                          <span className="text-[11px] text-slate-500 font-normal">100% vetted staff & 30-day warranty</span>
                        </div>
                      </Link>

                      <Link
                        href="/services/washing-gp-tanks"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-900 pt-2"
                      >
                        <span className="text-xl">🚰</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Specialized GP Tank Division</div>
                          <span className="text-[11px] text-slate-500 font-normal">200 - 1,200 gallon tanks & towers</span>
                        </div>
                      </Link>

                      <Link
                        href="/#why-us"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-900 pt-2"
                      >
                        <span className="text-xl">📍</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">36 States GPS Dispatch</div>
                          <span className="text-[11px] text-slate-500 font-normal">Real-time emergency tracking</span>
                        </div>
                      </Link>

                      <div className="pt-2 px-1">
                        <Link
                          href="/about"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-center w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-sm"
                        >
                          View Complete About Us Page →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Quick Navigation Links */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  <Link
                    href="/#why-us"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200"
                  >
                    <span>Why Choose Us</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                  <Link
                    href="/#testimonials"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200"
                  >
                    <span>Customer Reviews</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                  <Link
                    href="/#faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200"
                  >
                    <span>FAQ & Warranty</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                </div>
              </div>

              {/* Operations & Administration Link */}
              <div className="pt-2">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white text-xs font-bold transition-all shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>Admin Operations Dashboard</span>
                  </div>
                  <span className="text-amber-400 text-[10px] font-extrabold uppercase bg-amber-400/20 px-2 py-0.5 rounded-full">
                    Manage
                  </span>
                </Link>
              </div>

              {/* Hotline & Licensing Details */}
              <div className="text-center pt-2 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-500">Licensed, Bonded & Insured • Reg #RC-8492</p>
                <p className="text-[11px] text-slate-400">Serving 36 States & FCT with Real-time GPS Dispatch</p>
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
