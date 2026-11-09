"use client";

import React, { useState } from "react";
import Link from "next/link";
import QuoteModal from "@/components/QuoteModal";
import CleaningPackagesSection from "@/components/CleaningPackagesSection";
import TankPackagesSection from "@/components/TankPackagesSection";
import { ServiceItem } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceModal";

interface ServiceDetailInteractiveProps {
  service: ServiceItem;
  otherServices: ServiceItem[];
}

export default function ServiceDetailInteractive({
  service,
  otherServices,
}: ServiceDetailInteractiveProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string>(service.title);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedQuoteService(serviceName || service.title);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Column (8 cols): Deep details, steps, features, faqs */}
        <div className="lg:col-span-8 space-y-12">
          {/* Detailed Description */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Service Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-4">
              Professional Care with Raycom Standards
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Core Features */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Service Highlights & Capabilities</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="font-semibold text-slate-800 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* If House Cleaning, render Enugu State Pricing & Packages Breakdown */}
          {service.slug === "house-cleaning" && (
            <div className="border-t border-slate-200 pt-8">
              <CleaningPackagesSection
                showTitle={true}
                onSelectPackage={(pkgTitle) => handleOpenBooking(pkgTitle)}
              />
            </div>
          )}

          {/* If Washing of GP Tanks, render All Sizes & Tag Prices */}
          {service.slug === "washing-gp-tanks" && (
            <div className="border-t border-slate-200 pt-8">
              <TankPackagesSection
                showTitle={true}
                onSelectTank={(tankTitle) => handleOpenBooking(`Washing of GP tanks - ${tankTitle}`)}
              />
            </div>
          )}

          {/* What is Included */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Scope of Work & Inclusions</h3>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <ul className="space-y-3">
                {service.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step by Step Execution Process */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Our 4-Step Standard Operating Procedure</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {service.processSteps.map((step, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                    Phase {i + 1}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs for this Service */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="border-t border-slate-200 pt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">{faq.q}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Quick Booking Box + Other services */}
        <div className="lg:col-span-4 space-y-8">
          {/* Sticky Booking CTA Card */}
          <div className="sticky top-28 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Ready to Schedule?</span>
              <h3 className="text-2xl font-bold mt-1">Book {service.title}</h3>
              <p className="text-xs text-slate-300 mt-2">
                Fast response, certified background-checked technicians, and zero hidden costs.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/15 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Base Estimate</span>
                <span className="font-bold text-white">{service.pricingStarting}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Availability</span>
                <span className="font-bold text-emerald-400">Same-Day / Scheduled</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Warranty</span>
                <span className="font-bold text-amber-300">30-Day Workmanship</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleOpenBooking(service.title)}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book This Service Now</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <a
                href="tel:18005557292"
                className="block text-center w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                Direct Line: (800) 555-RAYCOM
              </a>
            </div>

            <div className="pt-2 border-t border-white/10 text-center">
              <span className="text-xs text-slate-400">Licensed, Bonded & Insured #RC-8492</span>
            </div>
          </div>

          {/* Other Services Navigation */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Other Raycom Services</h4>
            <div className="space-y-2">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold text-slate-700 group"
                >
                  <div className="flex items-center gap-2.5">
                    <ServiceIcon name={other.iconName} className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                    <span>{other.title}</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-blue-600">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Linked Get Free Estimate Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={selectedQuoteService}
      />
    </>
  );
}

