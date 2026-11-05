"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/services";
import QuoteModal from "@/components/QuoteModal";
import CleaningPackagesSection from "@/components/CleaningPackagesSection";
import TankPackagesSection from "@/components/TankPackagesSection";

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForBooking?: (serviceTitle: string) => void;
}

export function ServiceIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case "broom":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 3l-4 4m0 0l-7.5 7.5a2.121 2.121 0 003 3L18 10m-3-3l3-3m-7 13l-4 4-2-2 4-4m5-5l1.5-1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l3-3" />
        </svg>
      );
    case "tank":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="4" y="6" width="16" height="13" rx="3" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3M16 3v3M4 11h16M4 15h16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v4" />
        </svg>
      );
    case "wrench":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "bolt":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "paint":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4 4.5 4.5 0 011.5-3.32l10.8-10.8a2.5 2.5 0 113.53 3.53L8.03 17.21A4.47 4.47 0 017 21zM7 21h10" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
  }
}

export default function ServiceModal({ service, onClose, onSelectForBooking }: ServiceModalProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (service) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Dialog Body */}
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 sm:p-8 rounded-t-3xl flex items-start justify-between z-20">
            <div className="space-y-2 pr-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                  {service.category}
                </span>
                {service.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                    {service.badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                  <ServiceIcon name={service.iconName} className="w-6 h-6" />
                </div>
                <span>{service.title}</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                {service.shortDesc}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-8 text-slate-800">
            {/* Snapshot Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Starting Rate</span>
                <p className="text-xl font-black text-blue-900">{service.pricingStarting}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Estimated Time</span>
                <p className="text-lg font-bold text-slate-800">{service.durationEstimate}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Raycom Guarantee</span>
                <p className="text-sm font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <svg className="w-4 h-4 fill-emerald-600" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Guaranteed
                </p>
              </div>
            </div>

            {/* Detailed Overview */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Service Overview</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Key Features & Checklist */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Key Highlights & Capabilities</h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* If Deep House Cleaning, show Enugu State Pricing & Packages with pictures */}
            {service.slug === "house-cleaning" && (
              <div className="border-t border-slate-200 pt-6">
                <CleaningPackagesSection
                  showTitle={true}
                  onSelectPackage={(pkgName) => {
                    if (onSelectForBooking) {
                      onSelectForBooking(pkgName);
                      onClose();
                    } else {
                      setIsQuoteOpen(true);
                    }
                  }}
                />
              </div>
            )}

            {/* If Washing of GP Tanks, show all GP Tank Sizes & Tag Prices */}
            {service.slug === "washing-gp-tanks" && (
              <div className="border-t border-slate-200 pt-6">
                <TankPackagesSection
                  showTitle={true}
                  onSelectTank={(tankTitle) => {
                    if (onSelectForBooking) {
                      onSelectForBooking(`Washing of GP Tanks - ${tankTitle}`);
                      onClose();
                    } else {
                      setIsQuoteOpen(true);
                    }
                  }}
                />
              </div>
            )}

            {/* Inclusions */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">What is Included in Every Job</h3>
              <ul className="space-y-2">
                {service.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step by Step Process */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">How Our Technicians Work</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.processSteps.map((step, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Common Questions</h3>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-sm font-bold text-slate-900">{faq.q}</p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 sm:p-6 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Immediate Assistance</span>
              <div className="text-base font-extrabold text-blue-900">(800) 555-RAYCOM</div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/services/${service.slug}`}
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-sm text-center transition-colors w-full sm:w-auto"
              >
                Dedicated Page
              </Link>

              <button
                onClick={() => {
                  if (onSelectForBooking) {
                    onSelectForBooking(service.title);
                    onClose();
                  } else {
                    setIsQuoteOpen(true);
                  }
                }}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all w-full sm:w-auto text-center cursor-pointer"
              >
                Book with GPS Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal opened from Service Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => {
          setIsQuoteOpen(false);
          onClose();
        }}
        defaultService={service.title}
      />
    </>
  );
}
