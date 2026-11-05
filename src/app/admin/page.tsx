"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookingRequest,
  INITIAL_BOOKINGS,
  INITIAL_TECHNICIANS,
  Technician,
} from "@/data/adminData";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "dispatch" | "technicians" | "map">("overview");
  const [bookings, setBookings] = useState<BookingRequest[]>(INITIAL_BOOKINGS);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(INITIAL_BOOKINGS[0]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAssignTech, setSelectedAssignTech] = useState<string>("");

  // Fetch real-time data from database on load
  React.useEffect(() => {
    async function loadData() {
      try {
        const [bookingsRes, techsRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/technicians"),
        ]);
        const bookingsJson = await bookingsRes.json();
        const techsJson = await techsRes.json();

        if (bookingsJson.success && bookingsJson.data) {
          setBookings(bookingsJson.data);
          if (bookingsJson.data.length > 0) {
            setSelectedBooking(bookingsJson.data[0]);
          }
        }

        if (techsJson.success && techsJson.data) {
          setTechnicians(techsJson.data);
        }
      } catch {
        // Fallback to initial
      }
    }
    loadData();
  }, []);

  // Stats calculations
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const inProgressCount = bookings.filter((b) => b.status === "In-Progress").length;
  const completedCount = bookings.filter((b) => b.status === "Completed").length;
  const availableTechs = technicians.filter((t) => t.status === "Available").length;

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "All" ? true : b.status === statusFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.lga.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Update status handler
  const handleUpdateStatus = async (bookingId: string, newStatus: BookingRequest["status"]) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Fallback
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Assign technician handler
  const handleAssignTechnician = async (bookingId: string, techName: string) => {
    if (!techName) return;

    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedTechnician: techName, status: "Assigned" }),
      });

      const matchedTech = technicians.find((t) => t.name === techName);
      if (matchedTech) {
        await fetch("/api/technicians", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: matchedTech.id, status: "On-Job" }),
        });
      }
    } catch {
      // Fallback
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, assignedTechnician: techName, status: "Assigned" }
          : b
      )
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) =>
        prev ? { ...prev, assignedTechnician: techName, status: "Assigned" } : null
      );
    }
    setTechnicians((prev) =>
      prev.map((t) => (t.name === techName ? { ...t, status: "On-Job" } : t))
    );
    setSelectedAssignTech("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">RAYCOM</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Admin Console
                </span>
              </div>
              <span className="text-xs text-slate-400 block -mt-1">Dispatch & Operations Center</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            GPS Dispatch Server Online
          </span>

          <Link
            href="/"
            className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg border border-slate-700 transition-colors"
          >
            ← Back to Main Site
          </Link>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "bookings"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Customer Quotes & Orders ({totalBookings})
            </button>
            <button
              onClick={() => setActiveTab("dispatch")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "dispatch"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              GPS Map & Live Dispatch
            </button>
            <button
              onClick={() => setActiveTab("technicians")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "technicians"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              Technicians Directory ({technicians.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const sampleNew: BookingRequest = {
                  id: `RC-${Math.floor(7100 + Math.random() * 900)}`,
                  customerName: "Mrs. Folashade Adeleke",
                  phone: "+234 802 999 1122",
                  service: "Washing of GP Tanks",
                  country: "Nigeria",
                  state: "Lagos",
                  lga: "Ikeja (Allen, GRA, Maryland)",
                  street: "Toyin Street, Ikeja",
                  houseAddress: "Flat 4, Adebola Court",
                  latitude: 6.598,
                  longitude: 3.354,
                  preferredDate: "2026-11-03",
                  urgency: "Emergency",
                  status: "Pending",
                  quotedAmount: "₦75,000",
                  createdAt: "Just now",
                  notes: "Urgent GP tank de-sludging and chlorination.",
                };
                setBookings([sampleNew, ...bookings]);
                setSelectedBooking(sampleNew);
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>+ Simulate Incoming Quote</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Requests</span>
            <div className="text-3xl font-black text-white mt-1">{totalBookings}</div>
            <div className="text-[11px] text-slate-400 mt-1">Across 36 States & FCT</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-amber-900/40 shadow-sm">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pending Quotes</span>
            <div className="text-3xl font-black text-amber-300 mt-1">{pendingCount}</div>
            <div className="text-[11px] text-amber-400/80 mt-1">Requires immediate follow-up</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-blue-900/40 shadow-sm">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Active In-Progress</span>
            <div className="text-3xl font-black text-blue-300 mt-1">{inProgressCount}</div>
            <div className="text-[11px] text-blue-400/80 mt-1">Dispatched to field teams</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-900/40 shadow-sm">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Available Techs</span>
            <div className="text-3xl font-black text-emerald-300 mt-1">{availableTechs}</div>
            <div className="text-[11px] text-emerald-400/80 mt-1">Ready for assignment</div>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & TAB 2: BOOKINGS */}
        {(activeTab === "overview" || activeTab === "bookings") && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Filter by customer, ID, state, LGA, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status:</span>
                {["All", "Pending", "Assigned", "In-Progress", "Completed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Table + Detail Drawer Split */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Bookings Table */}
              <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4">Quote ID</th>
                        <th className="py-3 px-4">Customer & Contact</th>
                        <th className="py-3 px-4">Requested Service</th>
                        <th className="py-3 px-4">Location (State / LGA)</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredBookings.map((b) => (
                        <tr
                          key={b.id}
                          onClick={() => setSelectedBooking(b)}
                          className={`hover:bg-slate-800/60 cursor-pointer transition-colors ${
                            selectedBooking?.id === b.id ? "bg-slate-800/90" : ""
                          }`}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                            {b.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{b.customerName}</div>
                            <div className="text-slate-400 text-[11px]">{b.phone}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-200">{b.service}</span>
                            <span className="block text-[11px] text-slate-400">{b.quotedAmount}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-200">{b.state}</div>
                            <div className="text-slate-400 text-[11px] truncate max-w-[140px]">{b.lga}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                b.status === "Pending"
                                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                                  : b.status === "Assigned"
                                  ? "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                                  : b.status === "In-Progress"
                                  ? "bg-purple-400/20 text-purple-300 border border-purple-400/30"
                                  : "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBooking(b);
                                setActiveTab("dispatch");
                              }}
                              className="px-2.5 py-1 rounded bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Map Pin 📍
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredBookings.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-slate-500">
                            No requests found matching your filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Selected Booking Detailed Card & Controls */}
              {selectedBooking && (
                <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-5 shadow-lg sticky top-20">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                        {selectedBooking.id}
                      </span>
                      <h3 className="text-lg font-bold text-white">{selectedBooking.customerName}</h3>
                      <p className="text-xs text-slate-400">{selectedBooking.phone}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        selectedBooking.status === "Pending"
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                          : selectedBooking.status === "Assigned"
                          ? "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                          : selectedBooking.status === "In-Progress"
                          ? "bg-purple-400/20 text-purple-300 border border-purple-400/30"
                          : "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                      }`}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>

                  {/* Service & Quote Info */}
                  <div className="grid grid-cols-2 gap-2.5 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Service</span>
                      <div className="font-bold text-xs text-blue-400">{selectedBooking.service}</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Quoted Fee</span>
                      <div className="font-extrabold text-sm text-amber-300">{selectedBooking.quotedAmount}</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Date</span>
                      <div className="text-xs text-slate-300">{selectedBooking.preferredDate}</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Urgency</span>
                      <div className="text-xs font-bold text-red-400">{selectedBooking.urgency}</div>
                    </div>
                  </div>

                  {/* Address & GPS Coordinates */}
                  <div className="space-y-1.5 text-xs bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      📍 Service Location
                    </span>
                    <div className="text-slate-200">
                      <strong>Address:</strong> {selectedBooking.houseAddress}, {selectedBooking.street}
                    </div>
                    <div className="text-slate-300">
                      <strong>LGA / District:</strong> {selectedBooking.lga}
                    </div>
                    <div className="text-slate-300">
                      <strong>State & Country:</strong> {selectedBooking.state}, {selectedBooking.country}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400 pt-1">
                      GPS Locked: {selectedBooking.latitude.toFixed(4)}, {selectedBooking.longitude.toFixed(4)}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedBooking.notes && (
                    <div className="text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Customer Notes</span>
                      <p className="text-slate-300 leading-relaxed italic">{selectedBooking.notes}</p>
                    </div>
                  )}

                  {/* Dispatch Technician Assignment */}
                  <div className="border-t border-slate-800 pt-3 space-y-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Assign Technician
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedAssignTech || selectedBooking.assignedTechnician || ""}
                        onChange={(e) => setSelectedAssignTech(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                      >
                        <option value="">Select Technician...</option>
                        {technicians.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name} ({t.specialty.split("&")[0]} • {t.status})
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssignTechnician(selectedBooking.id, selectedAssignTech)}
                        disabled={!selectedAssignTech}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
                      >
                        Assign
                      </button>
                    </div>
                  </div>

                  {/* Status Toggle Actions */}
                  <div className="border-t border-slate-800 pt-3 space-y-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Update Order Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleUpdateStatus(selectedBooking.id, "In-Progress")}
                        className="py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Start Job
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedBooking.id, "Completed")}
                        className="py-2 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Mark Completed
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE GPS MAP & DISPATCH */}
        {activeTab === "dispatch" && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live GPS Dispatch Radar
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pinpointed locations of current customer quotes and mobile technician hubs.
                  </p>
                </div>

                {selectedBooking && (
                  <div className="flex items-center gap-2 text-xs bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Inspecting:</span>
                    <span className="font-bold text-amber-400">{selectedBooking.id}</span>
                    <span className="text-white">({selectedBooking.customerName})</span>
                  </div>
                )}
              </div>

              {/* Embedded Google Map Focused on Selected Booking or Center */}
              <div className="relative w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950">
                <iframe
                  title="Admin GPS Dispatch Map"
                  src={`https://maps.google.com/maps?q=${
                    selectedBooking ? selectedBooking.latitude : 6.6018
                  },${
                    selectedBooking ? selectedBooking.longitude : 3.3515
                  }&hl=en&z=14&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />

                {/* Overlay Dispatch Details Banner */}
                {selectedBooking && (
                  <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-2xl max-w-sm text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-amber-400 font-bold">{selectedBooking.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-[10px]">
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">{selectedBooking.customerName}</div>
                    <div className="text-slate-300">
                      {selectedBooking.houseAddress}, {selectedBooking.street}, {selectedBooking.lga},{" "}
                      {selectedBooking.state}
                    </div>
                    <div className="text-blue-400 font-semibold">{selectedBooking.service}</div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Coordinates: {selectedBooking.latitude.toFixed(4)}, {selectedBooking.longitude.toFixed(4)}
                    </div>
                    <div className="pt-1">
                      <a
                        href={`https://maps.google.com/?q=${selectedBooking.latitude},${selectedBooking.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                      >
                        Open in Google Maps Navigation →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Select Carousel of All Customer Locations */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quick Focus on Active Customer Requests:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {bookings.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className={`px-3 py-2 rounded-xl text-left border text-xs shrink-0 transition-all cursor-pointer ${
                        selectedBooking?.id === b.id
                          ? "bg-blue-600 text-white border-blue-400 shadow-md"
                          : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{b.customerName}</span>
                        <span className="font-mono text-[10px] text-amber-300">({b.id})</span>
                      </div>
                      <div className="text-[11px] opacity-80 truncate max-w-[200px]">
                        {b.state} • {b.lga.split(" ")[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TECHNICIANS DIRECTORY */}
        {activeTab === "technicians" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Technician Workforce Directory</h3>
                <p className="text-xs text-slate-400">
                  Certified technicians available for GP Tank Washing, Deep Cleaning, Plumbing & Electrical.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {technicians.map((t) => (
                <div key={t.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{t.id}</span>
                      <h4 className="text-base font-bold text-white">{t.name}</h4>
                      <p className="text-xs text-blue-400">{t.specialty}</p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.status === "Available"
                          ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                          : t.status === "On-Job"
                          ? "bg-purple-400/20 text-purple-300 border border-purple-400/30"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <strong>Coverage Base:</strong> {t.lga}, {t.state}
                    </div>
                    <div>
                      <strong>Phone:</strong> {t.phone}
                    </div>
                    <div>
                      <strong>Rating:</strong> ⭐ {t.rating} / 5.0 ({t.completedJobs} jobs completed)
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTechnicians((prev) =>
                          prev.map((tech) =>
                            tech.id === t.id
                              ? {
                                  ...tech,
                                  status: tech.status === "Available" ? "On-Job" : "Available",
                                }
                              : tech
                          )
                        );
                      }}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Toggle Status
                    </button>
                    <a
                      href={`tel:${t.phone}`}
                      className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                    >
                      Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

