import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceIcon } from "@/components/ServiceModal";
import CleaningPackagesSection from "@/components/CleaningPackagesSection";
import TankPackagesSection from "@/components/TankPackagesSection";
import { servicesData } from "@/data/services";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found - Raycom Home Services" };
  }
  return {
    title: `${service.title} | Raycom Home Services`,
    description: service.shortDesc,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = servicesData.filter((s) => s.slug !== slug);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-900">
      <Header />

      {/* Hero Banner for Service */}
      <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/services"
                className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                Services
                <span>/</span>
              </Link>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                {service.category}
              </span>
              {service.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-300 border border-white/20">
                  {service.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
                <ServiceIcon name={service.iconName} className="w-9 h-9" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {service.title}
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              {service.shortDesc}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block">Starting At</span>
                <span className="text-2xl font-black text-amber-400">{service.pricingStarting}</span>
              </div>
              <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block">Typical Duration</span>
                <span className="text-lg font-bold text-white">{service.durationEstimate}</span>
              </div>
              <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block">Workmanship</span>
                <span className="text-lg font-bold text-emerald-400">100% Guaranteed</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/#book"
                className="px-8 py-4 rounded-xl text-base font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 text-center shadow-lg transition-transform hover:scale-[1.02]"
              >
                Book This Service Now
              </Link>
              <a
                href="tel:18005557292"
                className="px-8 py-4 rounded-xl text-base font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 text-center transition-colors flex items-center justify-center gap-2"
              >
                Call (800) 555-RAYCOM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column (8 cols): Deep details, steps, features, faqs */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Description */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Service Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-4">
                  Professional Care with Raycom Standards
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              {/* Core Features */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Service Highlights & Capabilities</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="font-semibold text-slate-800 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* If House Cleaning, render Enugu State Pricing & Packages Breakdown */}
              {service.slug === "house-cleaning" && (
                <div className="border-t border-slate-200 pt-8">
                  <CleaningPackagesSection showTitle={true} />
                </div>
              )}

              {/* If Washing of GP Tanks, render All Sizes & Tag Prices */}
              {service.slug === "washing-gp-tanks" && (
                <div className="border-t border-slate-200 pt-8">
                  <TankPackagesSection showTitle={true} />
                </div>
              )}

              {/* What is Included */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Scope of Work & Inclusions</h3>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <ul className="space-y-3">
                    {service.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step by Step Execution Process */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Our 4-Step Standard Operating Procedure</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {service.processSteps.map((step, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                        Phase {i + 1}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs for this Service */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {service.faqs.map((faq, i) => (
                      <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="text-base font-bold text-slate-900 mb-1.5">{faq.q}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Quick Booking Box + Other services */}
            <div className="lg:col-span-4 space-y-8">
              {/* Sticky Booking CTA Card */}
              <div className="sticky top-28 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Ready to Schedule?</span>
                  <h3 className="text-2xl font-bold mt-1">Book {service.title}</h3>
                  <p className="text-xs text-slate-300 mt-2">
                    Fast response, certified background-checked technicians, and zero hidden costs.
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Base Estimate</span>
                    <span className="font-bold text-white">{service.pricingStarting}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Availability</span>
                    <span className="font-bold text-emerald-400">Same-Day / Scheduled</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Warranty</span>
                    <span className="font-bold text-amber-300">30-Day Workmanship</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/#book"
                    className="block text-center w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all"
                  >
                    Request Free Assessment
                  </Link>
                  <a
                    href="tel:18005557292"
                    className="block text-center w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
                  >
                    Direct Line: (800) 555-RAYCOM
                  </a>
                </div>

                <div className="pt-2 border-t border-white/10 text-center">
                  <span className="text-xs text-slate-400">Licensed, Bonded & Insured #RC-8492</span>
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Other Raycom Services</h4>
                <div className="space-y-2">
                  {otherServices.map((other) => (
                    <Link
                      key={other.id}
                      href={`/services/${other.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold text-slate-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ServiceIcon name={other.iconName} className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                        <span>{other.title}</span>
                      </div>
                      <span className="text-xs text-slate-400 group-hover:text-blue-600">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner CTA */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Need Quick Assistance with {service.title}?</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Contact Raycom Home Services today. Our team is available 24/7 for both emergencies and scheduled visits.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/#book"
              className="px-6 py-3 rounded-xl font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors text-sm"
            >
              Get Free Estimate
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors text-sm"
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

