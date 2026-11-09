import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceIcon } from "@/components/ServiceModal";
import ServiceDetailInteractive from "@/components/ServiceDetailInteractive";
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
          <ServiceDetailInteractive service={service} otherServices={otherServices} />
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

