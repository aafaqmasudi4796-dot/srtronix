import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Zap,
  Microscope,
  ArrowRight,
  Factory,
  MapPin,
  Headphones,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { companyDetails, productCategories } from '@/data/products';
import { AboutShowcase3D } from '@/components/about/AboutShowcase3D';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About SRTRONIX | Precision Laboratory Test Instruments & Smart Workbenches',
  description:
    'Learn about SRTRONIX Instruments Private Limited in Bengaluru, India. We engineer and assemble customizable Smart Work Bench Stations, digital oscilloscopes, and precision electronic laboratory instruments.',
  keywords: [
    'about SRTRONIX',
    'SRTRONIX Instruments Private Limited',
    'test equipment manufacturer India',
    'smart work bench factory Bengaluru',
    'laboratory instruments assembly India',
    'electronic measurement instruments company',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About SRTRONIX | Precision Lab Instruments & Smart Workbenches',
    description:
      'Engineering precision, empowering innovation. Designed, engineered, and assembled in Bengaluru, India.',
    url: `${SITE_URL}/about`,
    type: 'website',
    images: [
      {
        url: '/assets/about_laboratory_assembly_showcase.jpg',
        width: 1200,
        height: 630,
        alt: 'SRTRONIX R&D Engineering Assembly and Electronic Testing Facility in Bengaluru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SRTRONIX | Precision Lab Instruments & Smart Workbenches',
    description:
      'Engineering precision, empowering innovation. Designed, engineered, and assembled in Bengaluru, India.',
    images: ['/assets/about_laboratory_assembly_showcase.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#09090b] text-slate-200">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />
      {/* Hero Section with Laboratory Background - Full Screen Height */}
      <section className="relative min-h-screen min-h-[100dvh] flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-slate-800 overflow-hidden">
        {/* Clean Static Hero Background (No 3D Motion) */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
          <Image
            src="/assets/about_fsv_spectrum_analyzer_hero_uhd.jpg"
            alt="SRTRONIX FSV Signal and Spectrum Analyzer Precision Laboratory Workbench"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center brightness-105 contrast-105"
          />
          {/* Ambient Lighting & Contrast Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/85 via-[#09090b]/45 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-[#09090b]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(74,126,184,0.12)_0%,transparent_60%)] pointer-events-none" />
        </div>

        {/* Hero Content - Left Aligned with high-contrast mobile text protection */}
        <Container className="relative z-10">
          <div className="max-w-2xl sm:max-w-3xl text-left space-y-4 sm:space-y-5 rounded-2xl p-4 sm:p-0 bg-[#09090b]/30 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-white/5 sm:border-transparent">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f2a4a]/95 text-[#7bb0ed] text-xs font-semibold tracking-wider uppercase border border-[#4A7EB8]/80 shadow-lg backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7EB8] animate-pulse" />
              <span>ABOUT SRTRONIX</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.14] drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              Engineering Precision. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A7EB8] via-[#7bb0ed] to-[#4A7EB8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                Empowering Innovation.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-100 sm:text-slate-200 leading-relaxed font-normal pt-1 max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              SRTRONIX is an Indian manufacturer of professional electronic test and measurement instruments, specializing in integrated Smart Work Bench Stations and benchtop scientific equipment.
            </p>
          </div>
        </Container>
      </section>

      {/* Company Overview Section */}
      <section className="py-8 sm:py-10 border-b border-slate-800 overflow-hidden">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Company Overview Text - On the Left Side */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f2a4a] text-[#7bb0ed] text-xs font-semibold tracking-wider uppercase border border-[#4A7EB8]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A7EB8] animate-pulse" />
                <span>WHO WE ARE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Dedicated to Advancing Laboratory Testing Across India &amp; Worldwide
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Operating under <strong className="text-white font-semibold">{companyDetails.legalName}</strong>, SRTRONIX delivers reliable, high-precision test instrumentation designed to solve the everyday challenges faced by hardware engineers, educators, researchers, and manufacturing test technicians.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                From our flagship fully integrated Smart Work Bench Stations that condense multiple discrete instruments into a clean, unified M.S. workspace, to our portable handheld oscilloscopes and high-accuracy linear DC power supplies, every instrument is calibrated for dependable real-world performance.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#7bb0ed]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Domestic Assembly</div>
                    <div className="text-slate-400 text-xs mt-0.5">Bengaluru, India</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Headphones className="w-4 h-4 text-[#7bb0ed]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Direct Support</div>
                    <div className="text-slate-400 text-xs mt-0.5">Prompt technical &amp; warranty care</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laboratory Assembly Showcase - Perfectly fills right 6 columns without dead gap */}
            <div className="lg:col-span-6 w-full">
              <AboutShowcase3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Our Engineering Approach */}
      <section className="py-14 sm:py-20 bg-slate-950/70 border-b border-slate-800">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Our Engineering Approach
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Principles that govern the design, assembly, and testing of our instruments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Principle 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 flex items-center justify-center">
                <Microscope className="w-5 h-5 text-[#4A7EB8]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Precision &amp; Accuracy
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We calibrate instruments to strict tolerances—from 0.05% basic accuracy in our LCR testing modules to millivolt resolution in linear power supplies—ensuring that every measurement is dependable.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#4A7EB8]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Reliability &amp; Quality
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Utilizing durable mild steel enclosures, comprehensive circuit protections (OVP, OCP, OTP), and 2-pole MCBs, our instruments are engineered for long service lives in high-use environments.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f2a4a] text-[#7bb0ed] border border-[#4A7EB8]/40 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-[#4A7EB8]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Practical Laboratory Solutions
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We design with real engineer workflows in mind: lockable caster wheels, integrated cable-free instrument racks, intuitive control knobs, and versatile SCPI/Modbus automation interfaces.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Engineered & Assembled in India */}
      <section className="py-14 sm:py-20 bg-[#09090b] border-b border-slate-800">
        <Container>
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#0f2a4a]/80 via-slate-900 to-black text-white p-6 sm:p-10 lg:p-14 relative overflow-hidden border border-[#4A7EB8]/40 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#4A7EB8]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7bb0ed] text-xs font-semibold uppercase tracking-wider border border-white/20">
                <Factory className="w-3.5 h-3.5 text-[#4A7EB8]" />
                <span>Made in India</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                PROUDLY ENGINEERED &amp; ASSEMBLED IN INDIA
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
                Every SRTRONIX instrument is designed, engineered, and assembled in India with meticulous attention to detail, using high-quality components and modern craftsmanship. We focus on creating elegant, durable, and reliable lab workbench gear that brings absolute accuracy to engineers and institutions across India.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 sm:gap-6 text-xs text-[#7bb0ed]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Meticulous Quality Assembly
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Institutional Support Across India
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Standardized Calibration Protocols
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Expertise Section */}
      <section className="py-12 sm:py-16 bg-slate-950/60 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Product Expertise
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Providing instrumentation across specialized electronic testing domains.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {productCategories.slice(1).map((cat, i) => (
              <Link
                key={i}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-[#4A7EB8]/60 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0f2a4a]/80 text-[#7bb0ed] border border-[#4A7EB8]/40 flex items-center justify-center group-hover:bg-[#4A7EB8] group-hover:text-white transition-colors">
                    <Zap className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#7bb0ed] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-[#7bb0ed] transition-colors">
                  {cat}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Final About CTA */}
      <section className="py-12 sm:py-16 bg-[#09090b] text-center">
        <Container>
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Let&apos;s Build Better Testing Solutions.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Whether you are upgrading an engineering laboratory or outfitting a university workspace, our team is here to assist.
            </p>
            <div className="pt-2">
              <Button href="/contact" size="lg" className="font-semibold w-full sm:w-auto justify-center">
                <span>Contact Our Team</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
