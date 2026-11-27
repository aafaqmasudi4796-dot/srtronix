import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/contact/ContactForm';
import { companyDetails } from '@/data/products';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact SRTRONIX | Quotes, Technical Inquiries & Lab Workbench Orders',
  description:
    'Contact SRTRONIX Instruments in Bengaluru, Karnataka. Request official quotations, custom Smart Work Bench Station specifications, university lab packages, and prompt technical support.',
  keywords: [
    'contact SRTRONIX',
    'test equipment quote India',
    'smart workbench price inquiry',
    'laboratory instruments supplier Bengaluru',
    'SRTRONIX address phone email',
    'electronic lab equipment quotation',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact SRTRONIX Instruments | Lab Test Equipment & Workbenches',
    description:
      'Connect with our instrumentation team in Bengaluru, Karnataka for test equipment quotations and custom Smart Work Bench Stations.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [
      {
        url: '/assets/contact_owon_spectrum_oscilloscope_uhd.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact SRTRONIX Instruments - Bengaluru Facility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SRTRONIX Instruments | Lab Test Equipment & Workbenches',
    description:
      'Connect with our instrumentation team in Bengaluru, Karnataka for test equipment quotations and custom Smart Work Bench Stations.',
    images: ['/assets/contact_owon_spectrum_oscilloscope_uhd.jpg'],
  },
};

export default function ContactPage() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    companyDetails.address
  )}`;

  return (
    <div className="bg-[#09090b] text-slate-200">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ]}
      />
      {/* Contact Hero with Oscilloscope Background - Full Screen Height */}
      <section className="relative min-h-screen min-h-[100dvh] flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-slate-800 overflow-hidden">
        {/* Clean Static Hero Background (No 3D Motion) */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
          <Image
            src="/assets/contact_owon_spectrum_oscilloscope_uhd.jpg"
            alt="SRTRONIX OWON XDS3000 Oscilloscope & XSA1000 Spectrum Analyzer Testing Laboratory"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center brightness-105 contrast-105"
          />
          {/* Ambient Lighting & Contrast Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-[#09090b]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-[#09090b]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(74,126,184,0.12)_0%,transparent_60%)] pointer-events-none" />
        </div>

        {/* Contact Hero Content - Shifted to Left Side */}
        <Container className="relative z-10">
          <div className="max-w-2xl sm:max-w-3xl text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f2a4a]/90 border border-[#4A7EB8]/60 text-[#7bb0ed] text-xs font-semibold uppercase tracking-wider shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#4A7EB8]" />
              <span>DIRECT INSTRUMENTATION DESK</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.14] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Let&apos;s Talk About <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A7EB8] via-[#7bb0ed] to-[#4A7EB8]">
                Your Requirements.
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal pt-1 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Looking for precision test and measurement instruments or customized Smart Work Bench solutions? Our engineering team is ready to help you find the right solution.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section id="inquire" className="py-12 sm:py-16 md:py-20 scroll-mt-24 sm:scroll-mt-28">
        <Container>
          {/* 2-Column Layout: Form on Left/Center, Info Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="p-12 text-center text-slate-500 font-mono text-sm border border-slate-800 rounded-2xl bg-slate-900/40">
                    Loading inquiry form...
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Contact Card */}
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 sm:p-8 space-y-6 shadow-xl shadow-black/50">
                <h2 className="text-xl font-bold text-white">
                  Official Contact Information
                </h2>

                <ul className="space-y-5 text-sm text-slate-300">
                  {/* Physical Address */}
                  <li className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-[#4A7EB8]" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        Registered Facility &amp; Office
                      </div>
                      <div className="font-medium text-slate-100 leading-relaxed text-xs sm:text-sm">
                        {companyDetails.address}
                      </div>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#7bb0ed] hover:text-white pt-1"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </li>

                  {/* Telephone */}
                  <li className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-[#4A7EB8]" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        Direct Telephone
                      </div>
                      <div>
                        <a
                          href={`tel:${companyDetails.phone}`}
                          className="font-mono font-bold text-base text-white hover:text-[#7bb0ed] transition-colors"
                        >
                          {companyDetails.phone}
                        </a>
                      </div>
                      <div className="text-xs text-slate-400">
                        Direct line for sales inquiries &amp; technical consultation
                      </div>
                    </div>
                  </li>


                  {/* Email Address */}
                  <li className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 shrink-0 mt-0.5">
                      <Mail className="w-5 h-5 text-[#4A7EB8]" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        Email Communication
                      </div>
                      <div>
                        <a
                          href={`mailto:${companyDetails.email}`}
                          className="font-semibold text-white hover:text-[#7bb0ed] transition-colors"
                        >
                          {companyDetails.email}
                        </a>
                      </div>
                      <div className="text-xs text-slate-400">
                        Technical support: {companyDetails.supportEmail}
                      </div>
                    </div>
                  </li>

                  {/* Business Hours */}
                  <li className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-[#4A7EB8]" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        Operating Hours
                      </div>
                      <div className="font-semibold text-white text-xs sm:text-sm">
                        {companyDetails.workingHours}
                      </div>
                      <div className="text-xs text-slate-400">
                        Indian Standard Time (IST)
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Corporate Identification Card */}
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-3 shadow-xl shadow-black/50">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7bb0ed] uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-[#4A7EB8]" />
                  <span>Corporate Registration</span>
                </div>
                <h3 className="font-bold text-white text-sm">
                  {companyDetails.legalName}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Incorporated under the Ministry of Corporate Affairs (MCA), Government of India. Providing traceable test, measurement, and laboratory instrumentation.
                </p>
                <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GST Invoicing Available for Institutions &amp; Companies</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
