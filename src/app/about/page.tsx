import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { servicesData } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceModal";

export const metadata: Metadata = {
  title: "About Us | Raycom Home Services - Nigeria's Leading Maintenance & Care",
  description:
    "Learn everything about Raycom Home Services. Dedicated to high-standard deep house cleaning, specialized GP water tank washing, certified plumbing, electrical engineering, HVAC climate control, and home remodeling across Nigeria and beyond.",
};

export default function AboutPage() {
  const companyMilestones = [
    {
      year: "2018",
      title: "Founding & Mission",
      desc: "Established with a clear objective: bringing licensed, professional accountability, safety gear, and hospital-grade sanitization to Nigerian homes and commercial facilities.",
    },
    {
      year: "2020",
      title: "Specialized GP Tank Division",
      desc: "Pioneered industrial-grade GP water tank rotary pressure washing, motorized desludging, and food-grade chlorine disinfection across residential and elevated tower structures.",
    },
    {
      year: "2022",
      title: "GPS-Tracked Dispatch Network",
      desc: "Launched real-time GPS logistics mapping across 36 Nigerian states and FCT, connecting certified technicians with homeowners in under 60 minutes for emergencies.",
    },
    {
      year: "2024",
      title: "Nationwide Standards & 10,000+ Homes",
      desc: "Expanded to Enugu State, Lagos, Abuja, Port Harcourt, and surrounding regions with a 100% background-checked technician roster and 30-day workmanship guarantee.",
    },
  ];

  const corePillars = [
    {
      icon: "🛡️",
      title: "100% Vetted & Certified",
      desc: "Every Raycom technician undergoes identity verification, police background checks, and rigorous continuous trade certifications.",
    },
    {
      icon: "⚡",
      title: "Rapid GPS Dispatch",
      desc: "Whether dealing with a burst pipe, contaminated water tank, or emergency power trip, our fleet is routed directly via satellite GPS.",
    },
    {
      icon: "💎",
      title: "Transparent Tag Pricing",
      desc: "Zero hidden costs or sudden estimates. From our 200–1,200 gallon GP tank tag prices to duplex deep cleaning rates, everything is upfront.",
    },
    {
      icon: "🌿",
      title: "Hospital-Grade & Eco-Safe",
      desc: "We use non-toxic, pet-safe, and biodegradable chemicals alongside industrial HEPA filtration vacuums and food-grade sanitizers.",
    },
    {
      icon: "🤝",
      title: "30-Day Workmanship Warranty",
      desc: "If any repair or maintenance service does not meet 100% satisfaction, we return and rectify it free of charge with zero hassle.",
    },
    {
      icon: "📞",
      title: "24/7 Live Operational Support",
      desc: "Round-the-clock emergency dispatch lines and client assistance for residential estates, corporate headquarters, and private homes.",
    },
  ];

  const leadershipStats = [
    { value: "12,500+", label: "Homes & Tanks Cleaned" },
    { value: "99.4%", label: "Client Satisfaction Score" },
    { value: "36 States", label: "Nationwide Coverage & FCT" },
    { value: "45 Mins", label: "Average Emergency Dispatch" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 inline-block mb-4">
              Everything About Raycom Home Services
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Nigeria&apos;s Most Trusted Partner in Home Care & Maintenance
            </h1>
            <p className="text-base sm:text-xl text-slate-300 mt-6 leading-relaxed">
              Raycom Home Services was founded to solve a fundamental challenge: providing transparent, certified, reliable, and hygienic property maintenance for modern families, commercial buildings, and estates.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link
                href="/services"
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                Explore All Services →
              </Link>
              <a
                href="tel:18005557292"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call (800) 555-RAYCOM</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Stats */}
      <section className="bg-slate-900 border-y border-slate-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {leadershipStats.map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-4xl font-black text-amber-400 tracking-tight">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are & Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Setting the Gold Standard for Nigerian Property Care
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                At <strong>Raycom Home Services</strong>, we believe every homeowner and business owner deserves peace of mind. For too long, finding trustworthy technicians, clean water tank sanitizers, or meticulous house cleaners meant dealing with unpredictable pricing, unverified artisans, and substandard equipment.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Raycom changed that narrative. We introduced formal engineering standards to domestic maintenance: equipped with hospital-grade disinfectants, heavy-duty rotary jet scrubbers, HEPA vacuum filters, and calibrated diagnostic meters, our crews handle every property with surgical precision and utmost respect.
              </p>

              <div className="pt-2 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-extrabold text-slate-900 text-sm">Our Vision</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    To be Africa’s benchmark for reliable, tech-enabled home facility services, clean water solutions, and living space sanitation.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-extrabold text-slate-900 text-sm">Our Mission</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Delivering pristine living environments, crystal-clean water tanks, and durable electrical and plumbing repairs with complete transparency.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 p-8 sm:p-10 text-white shadow-2xl overflow-hidden border border-slate-800 space-y-6">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
                    R
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Raycom Quality Guarantee</h3>
                    <span className="text-xs text-amber-300">Reg #RC-8492 • Licensed, Bonded & Insured</span>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <strong className="block text-white">Full Safety Protocol & Insurance</strong>
                      <span className="text-xs text-slate-300">Technicians covered with comprehensive liability and fall-arrest rigging for elevated tank stanchions.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <strong className="block text-white">Specialized Equipment & Chemistry</strong>
                      <span className="text-xs text-slate-300">Biofilm cleaners, food-grade chlorine, high-pressure washers, rotary jet scrubbers, and industrial submersibles.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <strong className="block text-white">Seamless Booking & GPS Dispatch</strong>
                      <span className="text-xs text-slate-300">Integrated client portals, transparent price tags, and instant dispatch notifications directly to your phone.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-xs font-semibold text-amber-300">Serving Residential Estates, Commercial Towers & Private Residences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Core Pillars of Raycom Home Services */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Why We Are Different
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Six Pillars Behind Raycom&apos;s Excellence
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Built on uncompromising standards, continuous technician training, and respect for every client&apos;s home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, i) => (
              <div
                key={i}
                className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-2xl flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Overview of All Raycom Offerings */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Complete Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Professional Services & Capabilities
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Raycom provides full lifecycle support for your home. Explore our specialized services below.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-blue-500 hover:bg-white transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ServiceIcon name={srv.iconName} className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-1">
                    {srv.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{srv.shortDesc}</p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">From</span>
                    <span className="text-sm font-extrabold text-slate-900">{srv.pricingStarting}</span>
                  </div>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-xs font-bold text-blue-600 group-hover:text-blue-700 hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey & Milestones */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              Growth & Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Journey of Continuous Excellence
            </h2>
            <p className="text-base text-slate-300">
              How Raycom grew into Nigeria&apos;s most reliable name in domestic engineering and tank washing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyMilestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden"
              >
                <span className="text-4xl font-black text-amber-400/30 block mb-2">{m.year}</span>
                <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Experience Raycom Standards */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">Ready for Unmatched Property Care?</h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied Nigerian families and estate managers who trust Raycom for water tank sanitization, deep house cleaning, and 24/7 technical dispatch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/#book"
              className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition-all"
            >
              Get Free Estimate & Dispatch Now →
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

