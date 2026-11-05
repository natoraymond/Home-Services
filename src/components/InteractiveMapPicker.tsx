"use client";

import React, { useState, useEffect } from "react";
import { GEO_HIERARCHY } from "@/data/geoHierarchy";

interface InteractiveMapPickerProps {
  latitude?: number;
  longitude?: number;
  onSelectCoordinates: (lat: number, lng: number) => void;
  selectedCountry?: string;
  selectedState?: string;
  selectedLga?: string;
  selectedStreet?: string;
  onSelectLocationHierarchy?: (country: string, state: string, lga: string, lat: number, lng: number) => void;
}

export default function InteractiveMapPicker({
  latitude = 6.6018,
  longitude = 3.3515,
  onSelectCoordinates,
  selectedCountry = "Nigeria",
  selectedState = "Lagos",
  selectedLga = "Ikeja",
  onSelectLocationHierarchy,
}: InteractiveMapPickerProps) {
  const [currentLat, setCurrentLat] = useState<number>(latitude);
  const [currentLng, setCurrentLng] = useState<number>(longitude);
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Sync state if parent props change
  useEffect(() => {
    if (latitude && longitude) {
      setCurrentLat(latitude);
      setCurrentLng(longitude);
    }
  }, [latitude, longitude]);

  // Find currently selected country and state object from hierarchy
  const activeCountryObj =
    GEO_HIERARCHY.find(
      (c) => c.name.toLowerCase() === (selectedCountry || "").toLowerCase()
    ) || GEO_HIERARCHY[0];

  const activeStateList = activeCountryObj.states || [];

  const activeStateObj =
    activeStateList.find(
      (s) => s.name.toLowerCase() === (selectedState || "").toLowerCase()
    ) || activeStateList[0];

  const activeLgaList = activeStateObj?.lgas || [];

  // Handlers for Country, State, LGA selection on the map picker
  const handleMapCountrySelect = (countryName: string) => {
    const cObj = GEO_HIERARCHY.find((c) => c.name === countryName);
    if (!cObj) return;
    const defaultState = cObj.states[0];
    const defaultLga = defaultState?.lgas[0];

    const newLat = defaultLga ? defaultLga.lat : defaultState ? defaultState.lat : cObj.lat;
    const newLng = defaultLga ? defaultLga.lng : defaultState ? defaultState.lng : cObj.lng;

    setCurrentLat(newLat);
    setCurrentLng(newLng);
    setZoomLevel(12);

    if (onSelectLocationHierarchy) {
      onSelectLocationHierarchy(
        cObj.name,
        defaultState ? defaultState.name : "",
        defaultLga ? defaultLga.name : "",
        newLat,
        newLng
      );
    } else {
      onSelectCoordinates(newLat, newLng);
    }
  };

  const handleMapStateSelect = (stateName: string) => {
    const sObj = activeStateList.find((s) => s.name === stateName);
    if (!sObj) return;
    const defaultLga = sObj.lgas[0];
    const newLat = defaultLga ? defaultLga.lat : sObj.lat;
    const newLng = defaultLga ? defaultLga.lng : sObj.lng;

    setCurrentLat(newLat);
    setCurrentLng(newLng);
    setZoomLevel(13);

    if (onSelectLocationHierarchy) {
      onSelectLocationHierarchy(
        activeCountryObj.name,
        sObj.name,
        defaultLga ? defaultLga.name : "",
        newLat,
        newLng
      );
    } else {
      onSelectCoordinates(newLat, newLng);
    }
  };

  const handleMapLgaSelect = (lgaName: string) => {
    const lObj = activeLgaList.find((l) => l.name === lgaName);
    if (!lObj) return;

    setCurrentLat(lObj.lat);
    setCurrentLng(lObj.lng);
    setZoomLevel(15);

    if (onSelectLocationHierarchy) {
      onSelectLocationHierarchy(
        activeCountryObj.name,
        activeStateObj ? activeStateObj.name : selectedState,
        lObj.name,
        lObj.lat,
        lObj.lng
      );
    } else {
      onSelectCoordinates(lObj.lat, lObj.lng);
    }
  };

  // Search Address/Landmark on OpenStreetMap reverse
  const handleMapSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
          searchQuery
        )}&limit=1&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      );

      if (!res.ok) throw new Error("Search service unavailable");
      const results = await res.json();

      if (results && results.length > 0) {
        const item = results[0];
        const newLat = parseFloat(item.lat);
        const newLng = parseFloat(item.lon);
        setCurrentLat(newLat);
        setCurrentLng(newLng);
        setZoomLevel(15);
        onSelectCoordinates(newLat, newLng);
      } else {
        setSearchError("Location not found on map. Try another query.");
      }
    } catch {
      setSearchError("Failed to lookup location. Please try clicking or panning.");
    } finally {
      setIsSearching(false);
    }
  };

  // Pan controls
  const adjustPin = (deltaLat: number, deltaLng: number) => {
    const nLat = Number((currentLat + deltaLat).toFixed(5));
    const nLng = Number((currentLng + deltaLng).toFixed(5));
    setCurrentLat(nLat);
    setCurrentLng(nLng);
    onSelectCoordinates(nLat, nLng);
  };

  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${currentLat},${currentLng}&hl=en&z=${zoomLevel}&output=embed`;

  return (
    <div className="space-y-3.5 bg-slate-900 text-white rounded-2xl p-4 border border-slate-700 shadow-xl">
      {/* Title & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-black uppercase tracking-wider text-amber-400">
            Interactive Google Map Selector
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Coordinates: {currentLat.toFixed(4)}, {currentLng.toFixed(4)}
        </span>
      </div>

      {/* THREE DIRECT SELECTORS LINKED TO GOOGLE MAP: Country, State, LGA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
            1. Select Country
          </label>
          <select
            value={activeCountryObj.name}
            onChange={(e) => handleMapCountrySelect(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 font-medium cursor-pointer"
          >
            {GEO_HIERARCHY.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
            2. Select State / Region
          </label>
          <select
            value={activeStateObj?.name || ""}
            onChange={(e) => handleMapStateSelect(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 font-medium cursor-pointer"
          >
            {activeStateList.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
            3. Select LGA / District
          </label>
          <select
            value={selectedLga || activeLgaList[0]?.name || ""}
            onChange={(e) => handleMapLgaSelect(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 font-medium cursor-pointer"
          >
            {activeLgaList.map((l) => (
              <option key={l.name} value={l.name}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Search Bar */}
      <form onSubmit={handleMapSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search specific street, landmark, or area on map..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
        >
          {isSearching ? "Searching..." : "Fly Map Pin"}
        </button>
      </form>

      {searchError && (
        <div className="text-[11px] text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-800">
          {searchError}
        </div>
      )}

      {/* Embedded Google Map Frame */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-700 shadow-inner bg-slate-950">
        <iframe
          title="Google Map Location Selector"
          src={googleMapEmbedUrl}
          className="w-full h-full border-0"
          loading="lazy"
        />

        {/* Floating Active Target Location Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] text-white flex items-center gap-2 pointer-events-none shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-semibold">
            {selectedCountry} • {selectedState} • {selectedLga}
          </span>
        </div>

        {/* Directional Micro-Pan Controls */}
        <div className="absolute bottom-3 right-3 flex flex-col items-center bg-slate-900/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-xl space-y-1">
          <button
            type="button"
            title="Pan North"
            onClick={() => adjustPin(0.003, 0)}
            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center font-bold cursor-pointer"
          >
            ▲
          </button>
          <div className="flex gap-1">
            <button
              type="button"
              title="Pan West"
              onClick={() => adjustPin(0, -0.003)}
              className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center font-bold cursor-pointer"
            >
              ◀
            </button>
            <button
              type="button"
              title="Pan East"
              onClick={() => adjustPin(0, 0.003)}
              className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center font-bold cursor-pointer"
            >
              ▶
            </button>
          </div>
          <button
            type="button"
            title="Pan South"
            onClick={() => adjustPin(-0.003, 0)}
            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center font-bold cursor-pointer"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Footer controls: Zoom and help */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 pt-1">
        <span>📍 Selecting Country, State, or LGA repositions the Google Map automatically.</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 1, 19))}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
          >
            Zoom +
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 1, 3))}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
          >
            Zoom -
          </button>
        </div>
      </div>
    </div>
  );
}
