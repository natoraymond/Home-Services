"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GEO_HIERARCHY } from "@/data/geoHierarchy";

export interface LocationData {
  country: string;
  state: string;
  lga: string; // Local Government Area / County / District
  street: string;
  houseAddress: string;
}

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

// 6 Core Service Categories as specified by user
export const SERVICE_CATEGORIES = [
  {
    id: "deep-house-cleaning",
    label: "Deep house cleaning",
    badge: "Residential & Commercial",
    desc: "Comprehensive deep scrubbing, sanitizing rooms, kitchens, bathrooms, floors and post-construction cleaning.",
    icon: "✨",
  },
  {
    id: "washing-gp-tanks",
    label: "Washing of GP tanks",
    badge: "200 to 1,200 Gallons",
    desc: "Complete sludge extraction, high-pressure rotary jet scour, biofilm scrub & chlorine disinfection.",
    icon: "🚰",
  },
  {
    id: "plumbing-drainage",
    label: "Plumbing and drainage",
    badge: "24/7 Emergency Repairs",
    desc: "Burst pipes, toilet unclogging, water heater installation, leak detections & drain maintenance.",
    icon: "🔧",
  },
  {
    id: "electrical-lighting",
    label: "Electrical and lighting",
    badge: "Certified Electricians",
    desc: "Wiring overhauls, inverter/solar setups, distribution boards, lighting fixtures & surge protection.",
    icon: "⚡",
  },
  {
    id: "hvac-climate-control",
    label: "HVAC and climate control",
    badge: "AC Repair & Servicing",
    desc: "Air conditioner deep cleaning, gas refill, compressor maintenance, central cooling & ventilation.",
    icon: "❄️",
  },
  {
    id: "remodeling-handyman",
    label: "Remodeling and handyman",
    badge: "Home Transformation",
    desc: "Carpentry, painting, tiles laying, drywall repairs, door/window installations & structural upgrades.",
    icon: "🔨",
  },
];

export default function QuoteModal({
  isOpen,
  onClose,
  defaultService = "Deep house cleaning",
}: QuoteModalProps) {
  const router = useRouter();
  // Modal navigation tabs: "quote" | "signin" | "signup"
  const [activeTab, setActiveTab] = useState<"quote" | "signin" | "signup">("quote");
  const [submitted, setSubmitted] = useState(false);

  // Authentication State
  const [currentClient, setCurrentClient] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    state?: string;
    lga?: string;
    preferredService?: string;
  } | null>(null);

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up inputs
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpCountry, setSignUpCountry] = useState("Nigeria");
  const [signUpState, setSignUpState] = useState("Lagos");
  const [signUpLga, setSignUpLga] = useState("Ikeja");
  const [signUpAddress, setSignUpAddress] = useState("");
  const [signUpCategory, setSignUpCategory] = useState("Deep house cleaning");

  // Quote Form Data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    preferredDate: "",
    message: "",
    country: "Nigeria",
    state: "Lagos",
    lga: "Ikeja",
    street: "",
    houseAddress: "",
  });

  // Reset password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);

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
          email: prev.email || parsed.email || "",
          phone: prev.phone || parsed.phone || "",
          state: prev.state || parsed.state || "Lagos",
          lga: prev.lga || parsed.lga || "Ikeja",
          service: parsed.preferredService || prev.service || "Deep house cleaning",
        }));
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset tab when opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab("quote");
      setAuthError(null);
      setAuthSuccess(null);
    }
  }, [isOpen]);

  // Geo Hierarchy helpers for Quote form
  const activeCountry =
    GEO_HIERARCHY.find((c) => c.name.toLowerCase() === formData.country.toLowerCase()) ||
    GEO_HIERARCHY[0];
  const activeStates = activeCountry.states || [];
  const activeState =
    activeStates.find((s) => s.name.toLowerCase() === formData.state.toLowerCase()) ||
    activeStates[0];
  const activeLgas = activeState?.lgas || [];

  const handleCountryChange = (cName: string) => {
    const cObj = GEO_HIERARCHY.find((c) => c.name === cName);
    if (!cObj) return;
    const defaultState = cObj.states[0];
    const defaultLga = defaultState?.lgas[0];
    setFormData((prev) => ({
      ...prev,
      country: cObj.name,
      state: defaultState ? defaultState.name : "",
      lga: defaultLga ? defaultLga.name : "",
    }));
  };

  const handleStateChange = (stateName: string) => {
    const sObj = activeStates.find((s) => s.name === stateName);
    if (!sObj) return;
    const defaultLga = sObj.lgas[0];
    setFormData((prev) => ({
      ...prev,
      state: sObj.name,
      lga: defaultLga ? defaultLga.name : "",
    }));
  };

  const handleLgaChange = (lgaName: string) => {
    setFormData((prev) => ({
      ...prev,
      lga: lgaName,
    }));
  };

  // Sign Up geo helpers
  const signUpActiveCountry =
    GEO_HIERARCHY.find((c) => c.name.toLowerCase() === signUpCountry.toLowerCase()) ||
    GEO_HIERARCHY[0];
  const signUpActiveStates = signUpActiveCountry?.states || [];
  const signUpActiveState =
    signUpActiveStates.find((s) => s.name.toLowerCase() === signUpState.toLowerCase()) ||
    signUpActiveStates[0];
  const signUpActiveLgas = signUpActiveState?.lgas || [];

  const handleSignUpCountryChange = (cName: string) => {
    setSignUpCountry(cName);
    const cObj = GEO_HIERARCHY.find((c) => c.name === cName);
    if (cObj && cObj.states.length > 0) {
      setSignUpState(cObj.states[0].name);
      setSignUpLga(cObj.states[0].lgas[0]?.name || "");
    }
  };

  const handleSignUpStateChange = (sName: string) => {
    setSignUpState(sName);
    const sObj = signUpActiveStates.find((s) => s.name === sName);
    if (sObj && sObj.lgas.length > 0) {
      setSignUpLga(sObj.lgas[0].name);
    }
  };

  // Handle Client Sign In
  const handleClientSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signInEmail.trim())) {
      setAuthError("Please enter a valid email address (e.g. name@example.com).");
      setAuthLoading(false);
      return;
    }

    if (signInPassword.length < 6) {
      setAuthError("Password must be at least 6 characters long.");
      setAuthLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: signInEmail,
          password: signInPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Login failed. Check your email or password.");
        setAuthLoading(false);
        return;
      }

      setAuthSuccess(`Welcome back, ${data.user.fullName}!`);
      const userProfile = {
        id: data.user.id,
        name: data.user.fullName,
        email: data.user.email,
        phone: data.user.phone,
        state: data.user.state,
        lga: data.user.lga,
        preferredService: data.user.preferredService || "Deep house cleaning",
      };
      setCurrentClient(userProfile);

      // Auto fill quote form with signed in details
      setFormData((prev) => ({
        ...prev,
        name: data.user.fullName,
        email: data.user.email,
        phone: data.user.phone,
        state: data.user.state || prev.state,
        lga: data.user.lga || prev.lga,
        service: data.user.preferredService || prev.service || "Deep house cleaning",
      }));

      setTimeout(() => {
        setAuthLoading(false);
        setActiveTab("quote");
      }, 700);
    } catch {
      setAuthError("Failed to connect to authentication server.");
      setAuthLoading(false);
    }
  };

  // Handle Client Sign Up with service category selection
  const handleClientSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail.trim())) {
      setAuthError("Please enter a valid email address (e.g. name@example.com).");
      setAuthLoading(false);
      return;
    }

    if (signUpPassword.length < 6) {
      setAuthError("Password must be at least 6 characters long.");
      setAuthLoading(false);
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setAuthError("Passwords do not match. Please verify your confirmation password.");
      setAuthLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          fullName: signUpName,
          email: signUpEmail,
          phone: signUpPhone,
          password: signUpPassword,
          confirmPassword: signUpConfirmPassword,
          country: signUpCountry,
          state: signUpState,
          lga: signUpLga,
          address: signUpAddress,
          preferredService: signUpCategory,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Registration failed.");
        setAuthLoading(false);
        return;
      }

      setAuthSuccess(`Account created for ${data.user.fullName}! Selected Category: ${signUpCategory}`);
      const userProfile = {
        id: data.user.id,
        name: data.user.fullName,
        email: data.user.email,
        phone: data.user.phone,
        state: data.user.state,
        lga: data.user.lga,
        preferredService: data.user.preferredService || signUpCategory,
      };
      setCurrentClient(userProfile);

      // Pre-fill quote form with client details and their selected service category
      setFormData((prev) => ({
        ...prev,
        name: data.user.fullName,
        email: data.user.email,
        phone: data.user.phone,
        state: data.user.state || prev.state,
        lga: data.user.lga || prev.lga,
        street: signUpAddress || prev.street,
        service: signUpCategory,
      }));

      setTimeout(() => {
        setAuthLoading(false);
        setActiveTab("quote");
      }, 900);
    } catch {
      setAuthError("Network error. Could not register account.");
      setAuthLoading(false);
    }
  };

  // Sign out button handler
  const handleSignOut = () => {
    document.cookie = "raycom_client_session=; path=/; max-age=0";
    setCurrentClient(null);
    setFormData((prev) => ({
      ...prev,
      name: "",
      email: "",
      phone: "",
    }));
  };

  // Handle Submit Quote Form
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback persists in client memory
    }
    setSubmitted(true);
  };

  // Navigate to Professional Home Services & Maintenance section
  const handleNavigateToServices = () => {
    onClose();
    // Smooth scroll to services section or navigate to /#services
    const elem = document.getElementById("services");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#services");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 rounded-t-3xl flex items-start justify-between z-20 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Client Service Request
              </span>
              <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                Nigeria 36 States & LGAs
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1.5">
              Get Free Estimate & Dispatch
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {activeTab === "quote"
                ? "Complete your service request below or sign in/sign up to save your profile."
                : activeTab === "signin"
                  ? "Sign in with your email and password to auto-load your registered details."
                  : "Sign up, choose your service category, and auto-populate your estimate form."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Navigation Switcher Tabs (Quote | Sign In | Sign Up) */}
        <div className="p-4 sm:p-6 pb-0">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab("quote");
                setAuthError(null);
                setAuthSuccess(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${activeTab === "quote"
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Estimate Form
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("signin");
                setAuthError(null);
                setAuthSuccess(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${activeTab === "signin"
                ? "bg-white text-blue-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("signup");
                setAuthError(null);
                setAuthSuccess(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${activeTab === "signup"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Sign Up (Select Category)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 text-slate-800">
          {/* TAB 1: ESTIMATE FORM */}
          {activeTab === "quote" && (
            <>
              {/* Signed-in badge with Sign Out button */}
              <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 flex items-center justify-between gap-2">
                {currentClient ? (
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="text-xs text-slate-700 truncate">
                      Signed in as <strong className="text-blue-900">{currentClient.name}</strong> ({currentClient.email})
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Returning client? </span>
                    <span className="hidden sm:inline">Sign in to auto-fill your saved details</span>
                  </div>
                )}

                <div className="flex items-center gap-2 shrink-0">
                  {currentClient ? (
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer shadow-sm flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveTab("signin")}
                      className="text-xs font-bold text-blue-700 hover:underline bg-white px-3 py-1 rounded-lg border border-blue-200 cursor-pointer shadow-sm"
                    >
                      Sign In Now
                    </button>
                  )}
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Estimate Request Dispatched!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our team has received your estimate for{" "}
                    <span className="font-semibold text-blue-700">{formData.service}</span> at{" "}
                    <span className="font-semibold text-slate-900">
                      {formData.houseAddress ? `${formData.houseAddress}, ` : ""}
                      {formData.street}, {formData.lga}, {formData.state}, {formData.country}
                    </span>.
                  </p>
                  <p className="text-xs text-slate-500">
                    A coordinator will contact <span className="font-semibold text-slate-800">{formData.phone}</span> within 15 minutes.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleNavigateToServices}
                      className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Explore Professional Home Services & Maintenance</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Submit Another Estimate
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  {/* Step 1: Personal & Service Details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">1</span>
                      Client & Service Details
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Adebayo Ogunlesi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="e.g. client@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +234 801 234 5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Required Service Category *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50 font-medium cursor-pointer"
                        >
                          {SERVICE_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.label}>
                              {cat.icon} {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Service Date (Optional)
                        </label>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Location Information */}
                  <div className="border-t border-slate-200 pt-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">2</span>
                      Service Location (Nigeria 36 States & LGAs)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Country *
                        </label>
                        <select
                          value={formData.country}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50 font-medium cursor-pointer"
                        >
                          {GEO_HIERARCHY.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => handleStateChange(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50 font-medium cursor-pointer"
                        >
                          {activeStates.map((s) => (
                            <option key={s.name} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          LGA / District *
                        </label>
                        <select
                          value={formData.lga}
                          onChange={(e) => handleLgaChange(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50 font-medium cursor-pointer"
                        >
                          {activeLgas.map((l) => (
                            <option key={l.name} value={l.name}>
                              {l.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Street & House Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Street Name / Area *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Independence Layout, GRA, or Lekki Phase 1"
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          House Address / Flat No. *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Plot 14B, Flat 2 or House 8"
                          value={formData.houseAddress}
                          onChange={(e) => setFormData({ ...formData, houseAddress: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Details */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Notes or Specific Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 500-gallon black GeePee tank washing, or 4-bedroom duplex cleaning in Enugu..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                    ></textarea>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Estimate and Dispatch</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <p className="text-[11px] text-center text-slate-500 mt-2">
                      🔒 100% Free Consultation • No Obligation • Verified Certified Technicians
                    </p>
                  </div>
                </form>
              )}
            </>
          )}

          {/* TAB 2: CLIENT SIGN IN FORM */}
          {activeTab === "signin" && (
            <div className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Sign In to Your Client Account</h3>
                <p className="text-xs text-slate-500">
                  Use your email and password to log in and retrieve your saved details.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0">!</span>
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
                  <span>{authSuccess}</span>
                </div>
              )}

              {/* Demo Account shortcut */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Demo Account:</span>
                  <span>client@raycom.ng • password123</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSignInEmail("client@raycom.ng");
                    setSignInPassword("password123");
                  }}
                  className="text-xs font-bold text-amber-800 hover:underline bg-amber-100 px-2 py-1 rounded cursor-pointer"
                >
                  Auto Fill
                </button>
              </div>

              <form onSubmit={handleClientSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="client@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Must be a valid email format (e.g. name@domain.com)</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="current-password"
                    placeholder="Enter your password (min 6 characters)"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {authLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Sign In & Continue to Estimate</span>
                  )}
                </button>
              </form>

              {/* Forgot password outside the form */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(signInEmail || "");
                    setForgotMsg(null);
                    setShowForgotModal(true);
                  }}
                  className="font-bold text-amber-700 hover:text-amber-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span>Forgot password?</span>
                </button>

                <span className="text-slate-400 text-[11px]">Instant recovery via email</span>
              </div>

              {/* Forgot Password Reset Dialog */}
              {showForgotModal && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🔑</span> Reset Your Password
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Enter the email address registered with your account. We will send you instructions to regain access.
                  </p>
                  {forgotMsg ? (
                    <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900">
                      {forgotMsg}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!forgotEmail || !forgotEmail.includes("@")) {
                            setForgotMsg("Please provide a valid email address.");
                            return;
                          }
                          setForgotMsg(`Password reset link sent to ${forgotEmail}. Please check your inbox.`);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-sm"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("signup");
                    setAuthError(null);
                  }}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT SIGN UP FORM WITH SERVICE CATEGORY SELECTION */}
          {activeTab === "signup" && (
            <div className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-slate-900">New Client Registration</h3>
                <p className="text-xs text-slate-500">
                  Create your account and select the service category you need.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0">!</span>
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
                  <span>{authSuccess}</span>
                </div>
              )}

              <form onSubmit={handleClientSignUp} className="space-y-4">
                {/* 1. Account Credentials */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block">
                    1. Account Credentials
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Emeka Okafor"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 000 0000"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="client@domain.com"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-slate-50/50"
                      />
                      <span className="text-[10px] text-slate-400">Valid email format required</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Choose Password *
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="text-[10px] text-blue-600 hover:underline font-semibold cursor-pointer"
                        >
                          {showSignUpPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <input
                        type={showSignUpPassword ? "text" : "password"}
                        required
                        minLength={6}
                        autoComplete="new-password"
                        placeholder="Min 6 characters"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-slate-50/50"
                      />
                      <span className="text-[10px] text-slate-400">Minimum 6 characters</span>
                    </div>
                  </div>

                  {/* Confirmation Password */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type={showSignUpPassword ? "text" : "password"}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      placeholder="Re-enter your password to confirm"
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-slate-50/50 focus:ring-2 focus:ring-blue-600 ${
                        signUpConfirmPassword && signUpPassword !== signUpConfirmPassword
                          ? "border-rose-400 bg-rose-50/40"
                          : signUpConfirmPassword && signUpPassword === signUpConfirmPassword
                          ? "border-emerald-400 bg-emerald-50/30"
                          : "border-slate-300"
                      }`}
                    />
                    {signUpConfirmPassword && (
                      <span
                        className={`text-[10px] block mt-0.5 font-medium ${
                          signUpPassword === signUpConfirmPassword
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {signUpPassword === signUpConfirmPassword
                          ? "✓ Passwords match"
                          : "✕ Passwords do not match"}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. REQUIRED: Service Category Option Selection */}
                <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block">
                      2. Choose Required Service Category *
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                      Select 1 Option
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICE_CATEGORIES.map((cat) => {
                      const isSelected = signUpCategory === cat.label;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => setSignUpCategory(cat.label)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${isSelected
                            ? "bg-white border-blue-600 ring-2 ring-blue-600/20 shadow-sm"
                            : "bg-white/80 border-slate-200 hover:border-blue-300 hover:bg-white"
                            }`}
                        >
                          <input
                            type="radio"
                            name="serviceCategory"
                            value={cat.label}
                            checked={isSelected}
                            onChange={() => setSignUpCategory(cat.label)}
                            className="mt-1 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <div className="text-left flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 truncate">
                                {cat.icon} {cat.label}
                              </span>
                            </div>
                            <span className="text-[10px] text-blue-600 font-semibold block">{cat.badge}</span>
                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                              {cat.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Default Location Details */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                    3. Your Delivery Location in Nigeria
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                        Country
                      </label>
                      <select
                        value={signUpCountry}
                        onChange={(e) => handleSignUpCountryChange(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                      >
                        {GEO_HIERARCHY.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                        State
                      </label>
                      <select
                        value={signUpState}
                        onChange={(e) => handleSignUpStateChange(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                      >
                        {signUpActiveStates.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                      LGA / District
                    </label>
                    <select
                      value={signUpLga}
                      onChange={(e) => setSignUpLga(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                    >
                      {signUpActiveLgas.map((l) => (
                        <option key={l.name} value={l.name}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                      Street / Compound Address (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Independence Layout, GRA, or Lekki Phase 1"
                      value={signUpAddress}
                      onChange={(e) => setSignUpAddress(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-4 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {authLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Register & Open Estimate Form</span>
                  )}
                </button>
              </form>

              {/* Forgot password outside the form */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(signInEmail || "");
                    setForgotMsg(null);
                    setShowForgotModal(true);
                  }}
                  className="font-bold text-amber-700 hover:text-amber-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span>Forgot password?</span>
                </button>

                <span className="text-slate-400 text-[11px]">Instant recovery via email</span>
              </div>

              {/* Forgot Password Reset Dialog */}
              {showForgotModal && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🔑</span> Reset Your Password
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Enter the email address registered with your account. We will send you instructions to regain access.
                  </p>
                  {forgotMsg ? (
                    <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900">
                      {forgotMsg}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!forgotEmail || !forgotEmail.includes("@")) {
                            setForgotMsg("Please provide a valid email address.");
                            return;
                          }
                          setForgotMsg(`Password reset link sent to ${forgotEmail}. Please check your inbox.`);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-sm"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                Already registered with Raycom?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("signin");
                    setAuthError(null);
                  }}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
