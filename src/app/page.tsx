"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceModal, { ServiceIcon } from "@/components/ServiceModal";
import QuoteModal from "@/components/QuoteModal";
import ClientAuthModal, { ClientProfile } from "@/components/ClientAuthModal";
import InteractiveMapPicker from "@/components/InteractiveMapPicker";
import CleaningPackagesSection from "@/components/CleaningPackagesSection";
import { GEO_HIERARCHY } from "@/data/geoHierarchy";
import { servicesData, ServiceItem } from "@/data/services";

// Clean inline SVG icons
function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5 text-amber-400" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ClockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeQuoteService, setActiveQuoteService] = useState("House Cleaning");

  // Map toggle state on the "Get Free Estimate" card
  const [showEstimateMap, setShowEstimateMap] = useState(true);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [currentClient, setCurrentClient] = useState<ClientProfile | null>(null);

  // Check client session cookie
  useEffect(() => {
    try {
      const match = document.cookie.match(new RegExp("(^| )raycom_client_session=([^;]+)"));
      if (match) {
        const parsed = JSON.parse(decodeURIComponent(match[2]));
        setCurrentClient(parsed);
        setFormData((prev) => ({
          ...prev,
          name: prev.name || parsed.name || "",
          phone: prev.phone || parsed.phone || "",
          state: prev.state || parsed.state || "Lagos",
          lga: prev.lga || parsed.lga || "Ikeja",
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "House Cleaning",
    country: "Nigeria",
    state: "Lagos",
    lga: "Ikeja",
    street: "",
    houseAddress: "",
    latitude: 6.6018,
    longitude: 3.3515,
    message: "",
  });

  // Active items from geography hierarchy
  const currentCountry =
    GEO_HIERARCHY.find((c) => c.name.toLowerCase() === formData.country.toLowerCase()) ||
    GEO_HIERARCHY[0];
  const availableStates = currentCountry.states || [];
  const currentState =
    availableStates.find((s) => s.name.toLowerCase() === formData.state.toLowerCase()) ||
    availableStates[0];
  const availableLgas = currentState?.lgas || [];

  // Hierarchy change handlers that sync directly with Google Map coordinates
  const handleCountrySelect = (countryName: string) => {
    const cObj = GEO_HIERARCHY.find((c) => c.name === countryName);
    if (!cObj) return;
    const defaultState = cObj.states[0];
    const defaultLga = defaultState?.lgas[0];
    setFormData((prev) => ({
      ...prev,
      country: cObj.name,
      state: defaultState ? defaultState.name : "",
      lga: defaultLga ? defaultLga.name : "",
      latitude: defaultLga ? defaultLga.lat : defaultState ? defaultState.lat : cObj.lat,
      longitude: defaultLga ? defaultLga.lng : defaultState ? defaultState.lng : cObj.lng,
    }));
  };

  const handleStateSelect = (stateName: string) => {
    const sObj = availableStates.find((s) => s.name === stateName);
    if (!sObj) return;
    const defaultLga = sObj.lgas[0];
    setFormData((prev) => ({
      ...prev,
      state: sObj.name,
      lga: defaultLga ? defaultLga.name : "",
      latitude: defaultLga ? defaultLga.lat : sObj.lat,
      longitude: defaultLga ? defaultLga.lng : sObj.lng,
    }));
  };

  const handleLgaSelect = (lgaName: string) => {
    const lObj = availableLgas.find((l) => l.name === lgaName);
    if (!lObj) return;
    setFormData((prev) => ({
      ...prev,
      lga: lObj.name,
      latitude: lObj.lat,
      longitude: lObj.lng,
    }));
  };

  // Reverse geocode helper when user moves map pin or uses GPS
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      );
      if (!res.ok) return;
      const data = await res.json();
      const addr = data.address || {};

      const detectedCountry = addr.country || formData.country;
      const detectedState = addr.state || addr.region || formData.state;
      const detectedLga =
        addr.county ||
        addr.state_district ||
        addr.city_district ||
        addr.suburb ||
        addr.city ||
        formData.lga;
      const detectedStreet =
        addr.road || addr.pedestrian || addr.residential || addr.neighbourhood || "";
      const detectedHouse = addr.house_number
        ? `No. ${addr.house_number}`
        : addr.building || "";

      setFormData((prev) => ({
        ...prev,
        country: detectedCountry,
        state: detectedState,
        lga: detectedLga,
        street: detectedStreet || prev.street,
        houseAddress: detectedHouse || prev.houseAddress,
        latitude: lat,
        longitude: lng,
      }));
    } catch {
      setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    }
  };

  // GPS auto-detect function
  const handleDetectGPSLocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        await reverseGeocode(latitude, longitude);
        setGpsLoading(false);
      },
      (error) => {
        let msg = "Could not access GPS.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied. Please select Country, State & LGA below.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "GPS position unavailable.";
        } else if (error.code === error.TIMEOUT) {
          msg = "GPS request timed out.";
        }
        setGpsError(msg);
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 30000,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback
    }
    setSubmitted(true);
  };

  const testimonials = [
    {
      name: "Marcus Sterling",
      role: "Homeowner in Oakridge",
      quote:
        "Raycom washed our 2,000-liter rooftop GP tank and did deep house cleaning before our holiday guests arrived. Spotless results, punctual crew, and zero mess left behind.",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Property Manager",
      quote:
        "We manage 18 residential rental units and Raycom Home Services is our sole provider for both routine cleaning, GP tank sterilization, and plumbing repairs. Invaluable partner.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Homeowner in West Lake",
      quote:
        "Had bad sediment and brown water coming into our showers. Raycom desludged and sterilized our underground and overhead GP tanks in 3 hours. Water is pristine clean now!",
      rating: 5,
    },
  ];

  const stats = [
    { label: "Happy Homeowners", value: "15,800+" },
    { label: "GP Tanks Cleaned", value: "3,200+" },
    { label: "Average Response Time", value: "< 45 Mins" },
    { label: "Satisfaction Rate", value: "99.6%" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white py-16 lg:py-24">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-amber-300">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Top-Rated Home Service Provider • Interactive Google Map Hierarchy
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                Reliable Home Repairs,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                  Deep Cleaning & Tank Washing.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
                Specialized <strong>Washing of GP Tanks</strong> and <strong>Deep House Cleaning</strong>, plumbing, and electrical. Select your <strong>Country, State, and LGA / District directly from Google Map</strong> for instant pricing and verified dispatch.
              </p>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg p-3">
                  <ShieldCheckIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">100% Guaranteed</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg p-3">
                  <ClockIcon className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Same-Day Service</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg p-3 col-span-2 sm:col-span-1">
                  <div className="flex text-amber-400">
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                    <StarIcon className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">4.9/5 Rating</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 rounded-xl text-base font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-400/20 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Request A Free Quote Modal
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
                <Link
                  href="/services"
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 rounded-xl text-base font-bold bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  Explore All Services
                </Link>
              </div>
            </div>

            {/* Right Column: "Get Free Estimate" Card with Google Map + Selective Country, State, LGA */}
            <div id="book" className="lg:col-span-6">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-900 border border-slate-100">
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      Free Assessment
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowEstimateMap(!showEstimateMap)}
                        className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span>{showEstimateMap ? "Hide Map" : "Show Google Map"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDetectGPSLocation}
                        disabled={gpsLoading}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {gpsLoading ? (
                          <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        <span>{gpsLoading ? "Locating..." : "GPS"}</span>
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">Get Free Estimate</h3>
                  <p className="text-xs text-slate-500">
                    Select your Country, State, and LGA / District on the Google Map or dropdowns below.
                  </p>
                </div>

                {/* Client Quick Sign In / Sign Up Callout */}
                <div className="mb-3.5 p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-amber-50/50 border border-blue-100 flex items-center justify-between gap-2">
                  {currentClient ? (
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="text-xs text-slate-700 truncate">
                        Signed in as <strong className="text-blue-900">{currentClient.name}</strong>
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-600 truncate">
                      <span className="font-bold text-slate-800">Returning Client? </span>
                      <span className="hidden sm:inline">Sign in to auto-fill address</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 shrink-0">
                    {currentClient ? (
                      <button
                        type="button"
                        onClick={() => {
                          document.cookie = "raycom_client_session=; path=/; max-age=0";
                          setCurrentClient(null);
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:underline px-1.5 py-0.5"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode("signin");
                            setIsAuthOpen(true);
                          }}
                          className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-white border border-blue-200 px-2.5 py-1 rounded-lg cursor-pointer"
                        >
                          Sign In
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode("signup");
                            setIsAuthOpen(true);
                          }}
                          className="text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg cursor-pointer shadow-sm"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {gpsError && (
                  <div className="mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                    {gpsError}
                  </div>
                )}

                {/* Embedded Interactive Google Map with live Country, State, and LGA synchronizers */}
                {showEstimateMap && (
                  <div className="mb-4">
                    <InteractiveMapPicker
                      latitude={formData.latitude}
                      longitude={formData.longitude}
                      onSelectCoordinates={(lat, lng) => reverseGeocode(lat, lng)}
                      selectedCountry={formData.country}
                      selectedState={formData.state}
                      selectedLga={formData.lga}
                      selectedStreet={formData.street}
                      onSelectLocationHierarchy={(country, state, lga, lat, lng) => {
                        setFormData((prev) => ({
                          ...prev,
                          country,
                          state,
                          lga,
                          latitude: lat,
                          longitude: lng,
                        }));
                      }}
                    />
                  </div>
                )}

                {formData.latitude && (
                  <div className="mb-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-between">
                    <span>
                      📍 Selected on Map: <strong>{formData.country}</strong> • <strong>{formData.state}</strong> • <strong>{formData.lga}</strong>
                    </span>
                    <span className="font-bold text-emerald-700">Map Linked</span>
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircleIcon className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">Estimate Request Dispatched!</h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      A Raycom coordinator will contact <span className="font-semibold text-slate-900">{formData.phone || "you"}</span> for{" "}
                      <span className="font-semibold text-blue-600">{formData.service}</span> at{" "}
                      <span className="font-semibold text-slate-900">{formData.street}, {formData.lga}, {formData.state}, {formData.country}</span>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Submit another estimate
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Phone / WhatsApp"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Service Needed *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50"
                      >
                        <option value="House Cleaning">House Cleaning (Deep Cleaning)</option>
                        <option value="Washing of GP Tanks">Washing of GP Tanks (Water Sanitation)</option>
                        <option value="Plumbing & Drainage">Plumbing & Drainage</option>
                        <option value="Electrical & Lighting">Electrical & Lighting</option>
                        <option value="HVAC & Climate Control">HVAC & Climate Control</option>
                        <option value="Remodeling & Handyman">Remodeling & Handyman</option>
                      </select>
                    </div>

                    {/* SELECTIVE FROM GOOGLE MAP: Country, State, LGA / District */}
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Country (Map) *
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) => handleCountrySelect(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50 font-medium cursor-pointer"
                        >
                          {GEO_HIERARCHY.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          State (Map) *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => handleStateSelect(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50 font-medium cursor-pointer"
                        >
                          {availableStates.map((s) => (
                            <option key={s.name} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          LGA / District (Map) *
                        </label>
                        <select
                          value={formData.lga}
                          onChange={(e) => handleLgaSelect(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50 font-medium cursor-pointer"
                        >
                          {availableLgas.map((l) => (
                            <option key={l.name} value={l.name}>
                              {l.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Street & House Address */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Street Name / Area *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Allen Ave, Lekki Phase 1"
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          House Address / Flat No. *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Plot 4B, Apt 2"
                          value={formData.houseAddress}
                          onChange={(e) => setFormData({ ...formData, houseAddress: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Short Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tank sizes, number of rooms, or urgency..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs bg-slate-50/50"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Get Free Estimate & Dispatch
                    </button>

                    <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500">
                      <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero obligation • No hidden fees • Verified Technicians</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {stats.map((stat, idx) => (
              <div key={idx} className={`text-center ${idx > 0 ? "pt-4 md:pt-0" : ""}`}>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Modal & Dedicated Links */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Professional Home Services & Maintenance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Professional Home Services & Maintenance
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Click <strong>Quick View</strong> to open the full service modal, or explore our dedicated service pages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((srv) => (
              <div
                key={srv.id}
                className={`relative bg-white rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${srv.popular ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
                  }`}
              >
                {srv.badge && (
                  <span className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    {srv.badge}
                  </span>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <ServiceIcon name={srv.iconName} className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider mb-1">
                    {srv.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{srv.shortDesc}</p>
                </div>

                <div>
                  <div className="border-t border-slate-100 pt-4 space-y-2 mb-6">
                    {srv.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs font-medium text-slate-700">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">From</span>
                      <span className="text-base font-extrabold text-blue-900">{srv.pricingStarting}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Duration</span>
                      <span className="text-xs font-bold text-slate-700">{srv.durationEstimate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedService(srv)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Quick View</span>
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <Link
                      href={`/services/${srv.slug}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center transition-colors shadow-sm"
                    >
                      Full Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enugu State House Cleaning Rates & Packages Section with High-Resolution Photos */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <CleaningPackagesSection
              showTitle={true}
              onSelectPackage={(pkgTitle) => {
                setActiveQuoteService(pkgTitle);
                setIsQuoteModalOpen(true);
              }}
            />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-300 hover:border-blue-600 hover:text-blue-600 font-bold text-slate-800 transition-colors shadow-sm"
            >
              <span>View All Services & Filter By Category</span>
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
            <button
              onClick={() => {
                setActiveQuoteService("House Cleaning");
                setIsQuoteModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 font-bold text-slate-950 transition-colors shadow-md cursor-pointer"
            >
              <span>Open Request A Free Quote Modal</span>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Raycom Section */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                The Raycom Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Why Thousands Of Homeowners Trust Raycom Home Services
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether washing high-capacity GP tanks or deep cleaning your kitchen, home care should come with transparency, GPS-tracked dispatch, safety gear, and certified technicians.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Background Checked & Certified Pros</h4>
                    <p className="text-sm text-slate-600 mt-0.5">Every technician is drug-tested, background-verified, and licensed in their designated field.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Upfront Flat-Rate Pricing</h4>
                    <p className="text-sm text-slate-600 mt-0.5">You approve the written quote before work starts. No unexpected hourly rate markups.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Raycom 100% Workmanship Warranty</h4>
                    <p className="text-sm text-slate-600 mt-0.5">If something isn't right, our team returns and fixes it at zero additional cost to you.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-900 p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

                <h3 className="text-2xl font-bold mb-4">Our Service Promise</h3>
                <ul className="space-y-4 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Strict on-time arrival windows with live SMS & GPS updates
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Clean shoe covers, drop-cloth protection, and post-job cleanups
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Food-grade tank disinfectants and hospital-grade cleaners
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Direct emergency lines open 365 days a year
                  </li>
                </ul>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-amber-300 font-bold">Have an urgent request?</div>
                    <div className="text-xl font-extrabold text-white">(800) 555-RAYCOM</div>
                  </div>
                  <a
                    href="tel:18005557292"
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Verified Client Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Real Reviews From Neighbors You Know
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 mb-2">How does Google Map Country, State, and LGA selection work?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Selecting your Country (e.g., Nigeria, Ghana, US), State (e.g., Lagos, Abuja, Texas), or LGA (e.g., Ikeja, Eti-Osa, Port Harcourt) immediately moves and zooms the embedded Google Map to that jurisdiction. You can also drag or search on the map to automatically select the matching administrative boundaries.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 mb-2">How is the GP Tank washing performed?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We pump out existing water and heavy sludge with submersible slurry pumps, scour the interior walls and ceiling with rotary high-pressure jets, apply food-grade anti-bacterial chlorine sterilization, and rinse thoroughly before refilling.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 mb-2">What does your House Cleaning service cover?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our house cleaning includes deep kitchen degreasing, bathroom descaling, high-to-low dusting, floor scrubbing/mopping, baseboard wiping, and HEPA filtration vacuuming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Upgrade or Clean Your Home?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Get in touch with Raycom Home Services today for honest advice, punctual technicians, and quality you can rely on.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-8 py-3.5 rounded-xl font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
            >
              Get Free Estimate Modal
            </button>
            <a
              href="tel:18005557292"
              className="px-8 py-3.5 rounded-xl font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              Call (800) 555-RAYCOM
            </a>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectForBooking={(title) => {
          setActiveQuoteService(title);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Request A Free Quote / Get Free Estimate Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={activeQuoteService}
      />

      {/* Client Sign In & Sign Up Modal Popup */}
      <ClientAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => {
          setCurrentClient(user);
          setFormData((prev) => ({
            ...prev,
            name: user.name || prev.name,
            phone: user.phone || prev.phone,
            state: user.state || prev.state,
            lga: user.lga || prev.lga,
          }));
        }}
      />

      <Footer />
    </div>
  );
}
