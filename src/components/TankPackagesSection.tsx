"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GP_TANK_PACKAGES, TankPackage } from "@/data/tankPackages";

interface TankPackagesSectionProps {
  onSelectTank?: (tankTitle: string) => void;
  showTitle?: boolean;
}

export default function TankPackagesSection({
  onSelectTank,
  showTitle = true,
}: TankPackagesSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = [
    { label: "All Tanks (200 - 1,200 Gal)", value: "All" },
    { label: "Small (200 - 300 Gal)", value: "Small" },
    { label: "Medium (500 Gal)", value: "Medium" },
    { label: "High Tower & Scaffolding (800 - 1,200 Gal)", value: "Large" },
  ];

  const filteredPackages = GP_TANK_PACKAGES.filter((pkg) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Small") return pkg.sizeGallons <= 300;
    if (selectedFilter === "Medium") return pkg.sizeGallons === 500;
    if (selectedFilter === "Large") return pkg.sizeGallons >= 800;
    return true;
  });

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              Nigeria Water Tank Standards & Rates
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              GeePee • Storex • Hart • Poly Tanks
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            GP Water Storage Tank Washing & Disinfection Rates in Nigeria
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed">
            Transparent pricing based on tank gallon capacity commonly used across Nigerian homes & estates (<strong>200, 300, 500, 800, 1,000, and 1,200 gallons / 900L - 6,000L</strong>). Includes dewatering, high-pressure jet wash, sediment vacuuming, and antibacterial chlorine sterilization.
          </p>
        </div>
      )}

      {/* Filter Tabs - Mobile Responsive Scroll / Wrap */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-bold uppercase text-slate-500 mr-2">Filter Capacity:</span>
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSelectedFilter(opt.value)}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${selectedFilter === opt.value
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Responsive Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredPackages.map((pkg: TankPackage) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 group ${pkg.popular ? "border-cyan-500 ring-2 ring-cyan-500/20 shadow-md" : "border-slate-200"
              }`}
          >
            <div>
              {/* Picture Banner with Overlay Badge */}
              <div className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

                {pkg.popular && (
                  <span className="absolute top-3 right-3 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Popular Choice
                  </span>
                )}

                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    {pkg.sizeGallons.toLocaleString()} Gallons (~{pkg.sizeLiters.toLocaleString()}L)
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                    {pkg.category}
                  </span>
                  <span className="text-xs font-medium text-slate-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    ⏱ {pkg.duration}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors">
                    {pkg.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Price Tag Box */}
                <div className="bg-cyan-50/60 p-3 sm:p-3.5 rounded-2xl border border-cyan-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Washing & Sanitize Tag Price</span>
                    <span className="text-lg sm:text-xl font-black text-cyan-950 tracking-tight">{pkg.priceNgn}</span>
                  </div>
                  {pkg.originalPriceNgn && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Standard</span>
                      <span className="text-xs font-bold text-slate-400 line-through">{pkg.originalPriceNgn}</span>
                    </div>
                  )}
                </div>

                {/* Nigeria Tank Model & Best For */}
                <div className="space-y-1.5">
                  <div className="text-xs text-cyan-900 bg-cyan-100/50 p-2.5 rounded-xl border border-cyan-200/60">
                    <span className="text-[10px] uppercase font-bold text-cyan-800 block">Common Tank in Nigeria:</span>
                    <strong className="text-slate-900">{pkg.nigeriaStandard}</strong>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <strong className="text-slate-800">Best For: </strong> {pkg.idealFor}
                  </div>
                </div>

                {/* Included Checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Package Includes:</span>
                  {pkg.keyIncludes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                        ✓
                      </span>
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 sm:p-5 pt-0">
              <button
                type="button"
                onClick={() => onSelectTank?.(pkg.title)}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book This Tank Wash</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

