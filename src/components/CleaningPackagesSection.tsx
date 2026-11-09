"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ENUGU_CLEANING_PACKAGES, CleaningPackage } from "@/data/cleaningPackages";

interface CleaningPackagesSectionProps {
  onSelectPackage?: (pkgName: string) => void;
  showTitle?: boolean;
}

export default function CleaningPackagesSection({
  onSelectPackage,
  showTitle = true,
}: CleaningPackagesSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Flat" | "Duplex">("All");

  const filteredPackages = ENUGU_CLEANING_PACKAGES.filter((pkg) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Flat") return pkg.propertyType.includes("Flat");
    if (selectedFilter === "Duplex") return pkg.propertyType.includes("Duplex");
    return true;
  });

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Enugu State Transparent Pricing
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            House Cleaning Rates for Flats & Duplexes in Enugu State
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Transparent, upfront pricing tailored for residences across <strong>Enugu North, Enugu South, Enugu East, and Nsukka</strong> (including <em>GRA, Independence Layout, New Haven, Trans-Ekulu, and Golf Estate</em>).
          </p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-bold uppercase text-slate-500 mr-2">Filter Property:</span>
        {(["All", "Flat", "Duplex"] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === filter
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            {filter === "All" ? "All Packages (Flats & Duplexes)" : `${filter}s`}
          </button>
        ))}
      </div>

      {/* Packages Grid with High-Quality Pictures */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg: CleaningPackage) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 group ${
              pkg.popular ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md" : "border-slate-200"
            }`}
          >
            <div>
              {/* Picture Banner with Overlay Badge */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {pkg.popular && (
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Top Requested in Enugu
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                    {pkg.propertyType}
                  </span>
                  <span className="text-xs font-medium text-slate-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    ⏱ {pkg.duration}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {pkg.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Enugu Price Tag */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Enugu State Rate</span>
                    <span className="text-lg font-black text-blue-900 tracking-tight">{pkg.enuguPrice}</span>
                  </div>
                  {pkg.originalPrice && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Standard</span>
                      <span className="text-xs font-bold text-slate-400 line-through">{pkg.originalPrice}</span>
                    </div>
                  )}
                </div>

                {/* Scope Highlights Checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    What&apos;s Included:
                  </span>
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => {
                  if (onSelectPackage) {
                    onSelectPackage(`Deep house cleaning (${pkg.name} - Enugu)`);
                  } else {
                    const el = document.getElementById("book");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs text-center transition-colors shadow-sm hover:shadow cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Book This Service Now</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

