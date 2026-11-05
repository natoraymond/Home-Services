"use client";

import React, { useState, useEffect } from "react";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: true,
    marketing: true,
    locationPreferences: true,
  });

  useEffect(() => {
    // Check if consent has already been recorded in database or cookie
    async function checkConsent() {
      try {
        const res = await fetch("/api/cookies");
        const data = await res.json();
        if (!data.hasConsent) {
          // Delay display by 1 second for smooth entrance
          const timer = setTimeout(() => setIsVisible(true), 800);
          return () => clearTimeout(timer);
        }
      } catch {
        // Fallback: check document.cookie
        if (!document.cookie.includes("raycom_cookie_consent=")) {
          setIsVisible(true);
        }
      }
    }
    checkConsent();
  }, []);

  const handleSaveConsent = async (acceptAll = true) => {
    setIsSaving(true);
    try {
      await fetch("/api/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analytics: acceptAll ? true : preferences.analytics,
          marketing: acceptAll ? true : preferences.marketing,
          preferences: acceptAll ? true : preferences.locationPreferences,
        }),
      });
      setIsVisible(false);
    } catch {
      // Local fallback cookie
      document.cookie = "raycom_cookie_consent=accepted; path=/; max-age=31536000; SameSite=Lax";
      setIsVisible(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl text-white rounded-3xl border border-slate-700/80 p-5 sm:p-6 shadow-2xl pointer-events-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍪</span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Raycom Cookie & Location Preferences
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Database Synced
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              We store your location settings, preferred state/LGA, and session data in our secure database to provide accurate GPS dispatch, turn-by-turn routing for technicians, and remember your service quote history.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors border border-slate-700 cursor-pointer"
            >
              {showPreferences ? "Close Settings" : "Customize"}
            </button>
            <button
              onClick={() => handleSaveConsent(true)}
              disabled={isSaving}
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Accept All Cookies"}
            </button>
          </div>
        </div>

        {/* Detailed Preference Toggles */}
        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-slate-800 grid sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="font-bold text-white block">Strictly Necessary</span>
                <span className="text-slate-400 text-[11px]">Database sessions & quote records.</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">Always Active</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="font-bold text-white block">GPS & Location Sync</span>
                <span className="text-slate-400 text-[11px]">Remembers selected Country & LGA.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.locationPreferences}
                onChange={(e) => setPreferences({ ...preferences, locationPreferences: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 mt-1 cursor-pointer"
              />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="font-bold text-white block">Analytics & Performance</span>
                <span className="text-slate-400 text-[11px]">Dispatch speed & site optimizations.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 mt-1 cursor-pointer"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end pt-1">
              <button
                onClick={() => handleSaveConsent(false)}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Save Selected Preferences to Database
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

