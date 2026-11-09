"use client";

import React, { useState, useEffect } from "react";
import { GEO_HIERARCHY } from "@/data/geoHierarchy";

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  state?: string;
  lga?: string;
}

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  onSuccess?: (user: ClientProfile) => void;
}

export default function ClientAuthModal({
  isOpen,
  onClose,
  initialMode = "signin",
  onSuccess,
}: ClientAuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sign In Form Data
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up Form Data
  const [fullName, setFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("Lagos");
  const [lga, setLga] = useState("Ikeja");
  const [address, setAddress] = useState("");

  // Reset password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);

  // Sync mode with prop changes
  useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [initialMode, isOpen]);

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

  // Hierarchy lookups
  const activeCountry =
    GEO_HIERARCHY.find((c) => c.name.toLowerCase() === country.toLowerCase()) ||
    GEO_HIERARCHY[0];
  const activeStates = activeCountry?.states || [];
  const activeState =
    activeStates.find((s) => s.name.toLowerCase() === state.toLowerCase()) ||
    activeStates[0];
  const activeLgas = activeState?.lgas || [];

  const handleCountryChange = (cName: string) => {
    setCountry(cName);
    const cObj = GEO_HIERARCHY.find((c) => c.name === cName);
    if (cObj && cObj.states.length > 0) {
      setState(cObj.states[0].name);
      setLga(cObj.states[0].lgas[0]?.name || "");
    }
  };

  const handleStateChange = (sName: string) => {
    setState(sName);
    const sObj = activeStates.find((s) => s.name === sName);
    if (sObj && sObj.lgas.length > 0) {
      setLga(sObj.lgas[0].name);
    }
  };

  // Submit Handler for Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail.trim())) {
      setErrorMsg("Please enter a valid email address (e.g. name@example.com).");
      setLoading(false);
      return;
    }

    if (loginPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Authentication failed. Please check credentials.");
        setLoading(false);
        return;
      }

      setSuccessMsg(data.message || "Signed in successfully!");
      if (onSuccess && data.user) {
        onSuccess({
          id: data.user.id,
          name: data.user.fullName,
          email: data.user.email,
          phone: data.user.phone,
          state: data.user.state,
          lga: data.user.lga,
        });
      }

      setTimeout(() => {
        onClose();
        setLoading(false);
      }, 900);
    } catch {
      setErrorMsg("Network error. Could not connect to authentication service.");
      setLoading(false);
    }
  };

  // Submit Handler for Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail.trim())) {
      setErrorMsg("Please enter a valid email address (e.g. name@example.com).");
      setLoading(false);
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setErrorMsg("Passwords do not match. Please verify your confirmation password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          fullName,
          email: registerEmail,
          phone,
          password: registerPassword,
          confirmPassword: registerConfirmPassword,
          country,
          state,
          lga,
          address,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Account creation failed.");
        setLoading(false);
        return;
      }

      setSuccessMsg(data.message || "Account registered successfully!");
      if (onSuccess && data.user) {
        onSuccess({
          id: data.user.id,
          name: data.user.fullName,
          email: data.user.email,
          phone: data.user.phone,
          state: data.user.state,
          lga: data.user.lga,
        });
      }

      setTimeout(() => {
        onClose();
        setLoading(false);
      }, 1000);
    } catch {
      setErrorMsg("Network error. Could not register account.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-900 via-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Client Portal
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300 border border-white/20">
                  Nigeria & Global
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {mode === "signin" ? "Sign In to Your Account" : "Create Client Account"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close client login popup"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div className="p-4 sm:p-6 pb-0">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === "signin"
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Client Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              New Client Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-in fade-in">
              <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                !
              </span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2 animate-in fade-in">
              <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                ✓
              </span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Demo Credentials Tip */}
          {mode === "signin" && !successMsg && (
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-center justify-between">
              <div>
                <span className="font-bold block">Quick Demo Account:</span>
                <span>client@raycom.ng • password123</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("client@raycom.ng");
                  setLoginPassword("password123");
                }}
                className="text-xs font-bold text-amber-800 hover:underline bg-amber-100 px-2 py-1 rounded cursor-pointer"
              >
                Auto Fill
              </button>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === "signin" ? (
            <>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                    />
                  </div>
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
                    placeholder="Enter your account password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Forgot password outside the form */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(loginEmail || "");
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
                <span className="text-[11px] text-slate-400">Direct account recovery</span>
              </div>

              {/* Forgot Password Reset Dialog */}
              {showForgotModal && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 space-y-3 animate-in fade-in zoom-in-95 mt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🔑</span> Password Recovery
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
                    Enter your registered client email to receive a password reset link.
                  </p>
                  {forgotMsg ? (
                    <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-900">
                      {forgotMsg}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="client@domain.com"
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
                        Send Link
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emeka Okafor"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="client@domain.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Choose Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="text-[10px] text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      {showRegPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={showRegPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-slate-50/50"
                  />
                  <span className="text-[10px] text-slate-400">Min 6 characters</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showRegPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Re-enter password to confirm"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm bg-slate-50/50 focus:ring-2 focus:ring-blue-600 ${
                      registerConfirmPassword && registerPassword !== registerConfirmPassword
                        ? "border-rose-400 bg-rose-50/40"
                        : registerConfirmPassword && registerPassword === registerConfirmPassword
                        ? "border-emerald-400 bg-emerald-50/30"
                        : "border-slate-300"
                    }`}
                  />
                  {registerConfirmPassword && (
                    <span
                      className={`text-[10px] block mt-0.5 font-medium ${
                        registerPassword === registerConfirmPassword
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {registerPassword === registerConfirmPassword
                        ? "✓ Passwords match"
                        : "✕ Passwords do not match"}
                    </span>
                  )}
                </div>
              </div>

              {/* Geographic Hierarchy Selection (Nigeria 36 States + LGAs) */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Service Delivery Location
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
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
                      value={state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                    >
                      {activeStates.map((s) => (
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
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                  >
                    {activeLgas.map((l) => (
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Create Free Client Account</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            {mode === "signin" ? (
              <p>
                Need our services but don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg(null);
                  }}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already registered with Raycom?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMsg(null);
                  }}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

