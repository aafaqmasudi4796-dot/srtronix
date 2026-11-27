
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { companyDetails, productCategories } from '@/data/products';
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#4A7EB8]/30 bg-gradient-to-br from-[#050816] via-[#09152b] to-[#160B2D] text-slate-300">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#4A7EB8]/20 blur-[130px]" />
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[400px] rounded-full bg-[#4A7EB8]/15 blur-[120px]" />
      </div>

      {/* TOP QUALITY BANNER */}
      <div className="relative border-b border-white/10 bg-gradient-to-r from-[#0f2a4a]/85 via-[#09152b] to-[#0f2a4a]/60 py-6">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-xs sm:text-sm md:flex-row">
            <div className="flex items-center gap-2 font-medium text-[#7bb0ed]">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#4A7EB8]" />
              <span>{companyDetails.trustBadge}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 sm:gap-6">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Engineered in India
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4A7EB8]" />
                Industry Calibration Standards
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* MAIN FOOTER */}
      <Container className="relative pb-12 pt-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* BRAND INFO */}
          <div className="space-y-4 lg:col-span-4">

            {/* UPDATED LOGO */}
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/assets/logo.jpeg"
                alt="SRTRONIX Instruments Private Limited - Precision Test & Measurement Equipment"
                width={290}
                height={90}
                priority
                className="h-auto w-[220px] object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {companyDetails.shortAbout}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#4A7EB8]/30 bg-gradient-to-r from-[#4A7EB8]/15 to-[#4A7EB8]/5 px-3 py-2 text-xs font-mono text-[#7bb0ed]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                {companyDetails.legalName}
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-[#7bb0ed]">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products Catalog', href: '/products' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact & Inquiries', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-[#7bb0ed]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#4A7EB8]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCT CATEGORIES */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-[#7bb0ed]">
              Instruments Catalog
            </h3>

            <ul className="space-y-3 text-sm">
              {productCategories.slice(1, 7).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="group flex items-center justify-between gap-3 text-slate-400 transition-colors duration-300 hover:text-white"
                  >
                    <span>{cat}</span>

                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-[#4A7EB8] group-hover:text-[#7bb0ed]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT DETAILS */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-[#4A7EB8]">
              Contact Desk
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">

              {/* ADDRESS */}
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4A7EB8]" />

                <span className="text-xs leading-relaxed sm:text-sm">
                  Swati Building, 72/2 Main Road, Opp. Singapura Garden,
                  Lakshmipura, Bengaluru, Karnataka - 560013
                </span>
              </li>

              {/* PHONE */}
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#4A7EB8]" />

                <a
                  href={`tel:${companyDetails.phone}`}
                  className="font-mono text-xs transition-colors hover:text-[#7bb0ed] sm:text-sm"
                >
                  {companyDetails.phone}
                </a>
              </li>

              {/* WHATSAPP */}
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="h-4 w-4 shrink-0 fill-current text-emerald-400" />

                <a
                  href="https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20would%20like%20to%20inquire%20about%20your%20test%20and%20measurement%20instruments."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300 sm:text-sm"
                >
                  Chat on WhatsApp (+91 70224 29004)
                </a>
              </li>

              {/* EMAIL */}
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-slate-400" />

                <a
                  href={`mailto:${companyDetails.email}`}
                  className="text-xs transition-colors hover:text-slate-300 sm:text-sm"
                >
                  {companyDetails.email}
                </a>
              </li>

              {/* WORKING HOURS */}
              <li className="flex items-center gap-2.5 text-xs text-slate-500">
                <Clock className="h-4 w-4 shrink-0 text-[#4A7EB8]" />

                <span>{companyDetails.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p className="text-center sm:text-left">
            © {currentYear} {companyDetails.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <Link
              href="/about"
              className="transition-colors hover:text-[#7bb0ed]"
            >
              Craftsmanship
            </Link>

            <Link
              href="/products"
              className="transition-colors hover:text-[#7bb0ed]"
            >
              All Test Gear
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-white-300"
            >
              Support
            </Link>
          </div>
        </div>
      </Container>

      {/* BOTTOM GRADIENT LINE */}
      <div className="relative h-[3px] w-full bg-gradient-to-r from-[#4A7EB8] via-purple-500 to-[#7bb0ed]" />
    </footer>
  );
}

export default Footer;
