import type { Metadata } from "next";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "Raycom Home Services | Expert Repairs, Maintenance & Improvements",
  description: "Trusted local residential & commercial home services: plumbing, electrical, HVAC, roofing, renovations, and routine maintenance with guaranteed satisfaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-900">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
