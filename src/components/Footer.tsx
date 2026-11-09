import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                R
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Raycom Home Services</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trusted residential and commercial property maintenance, water tank washing, deep house cleaning, and repairs.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Specialized Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/house-cleaning" className="hover:text-white transition-colors">Deep House Cleaning</Link></li>
              <li><Link href="/services/washing-gp-tanks" className="hover:text-white transition-colors">Washing of GP Tanks</Link></li>
              <li><Link href="/services/plumbing-services" className="hover:text-white transition-colors">Plumbing & Drainage</Link></li>
              <li><Link href="/services/electrical-services" className="hover:text-white transition-colors">Electrical Repairs</Link></li>
              <li><Link href="/services/hvac-services" className="hover:text-white transition-colors">HVAC & Heating</Link></li>
              <li><Link href="/services/remodeling-handyman" className="hover:text-white transition-colors">Remodeling & Handyman</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services" className="hover:text-white transition-colors">All Services Catalog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Raycom</Link></li>
              <li><Link href="/#testimonials" className="hover:text-white transition-colors">Customer Reviews</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">Guarantee Policy</Link></li>
              <li><Link href="/admin" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">Admin Dashboard →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Emergency Contact</h4>
            <p className="text-xs text-slate-400 mb-2">Available 24 hours a day, 7 days a week.</p>
            <p className="text-base font-extrabold text-amber-400">(800) 555-RAYCOM</p>
            <p className="text-xs text-slate-500 mt-1">support@raycomhomeservices.com</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Raycom Home Services Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-400">Licensing #RC-8492</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

