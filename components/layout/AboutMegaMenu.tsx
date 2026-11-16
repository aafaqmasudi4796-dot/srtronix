
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Factory,
  Microscope,
  Building2,
  Award,
  Globe2,
  Zap,
} from 'lucide-react';

interface AboutMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AboutSectionItem {
  id: string;
  name: string;
  category: string;
  highlight: string;
  description: string;
  image: string;
  href: string;
  badge: string;
  icon: React.ElementType;
}

const aboutSections: AboutSectionItem[] = [
  {
    id: 'corporate-overview',
    name: 'Corporate Profile',
    category: 'Company Profile',
    highlight: 'SRTRONIX Instruments Private Limited',
    description:
      'Discover our company, our engineering capabilities and our commitment to delivering reliable electronic test and measurement solutions.',
    image: '/assets/images/electronic_smart_work_station.jpg',
    href: '/about',
    badge: 'Company Overview',
    icon: Building2,
  },
  {
    id: 'engineering-approach',
    name: 'Precision Engineering',
    category: 'Engineering',
    highlight: 'Accuracy • Performance • Reliability',
    description:
      'Our engineering approach focuses on precision, durable construction and dependable performance for professional testing environments.',
    image: '/assets/images/benchtop_oscilloscope.png',
    href: '/about',
    badge: 'Our Engineering',
    icon: Zap,
  },
  {
    id: 'made-in-india',
    name: 'Made in India',
    category: 'Manufacturing',
    highlight: 'Facility in Lucknow, Uttar Pradesh',
    description:
      'Explore our domestic engineering and assembly capabilities, supporting laboratories, industries and educational institutions.',
    image: '/assets/images/electronic_smart_work_station.jpg',
    href: '/about',
    badge: 'Indian Engineering',
    icon: Factory,
  },
  {
    id: 'calibration-standards',
    name: 'Quality & Standards',
    category: 'Quality Assurance',
    highlight: 'Quality-Focused Testing Solutions',
    description:
      'We emphasize product quality, calibration practices and dependable instrument performance across our product portfolio.',
    image: '/assets/images/lcr2000_series.png',
    href: '/about',
    badge: 'Quality Assurance',
    icon: ShieldCheck,
  },
  {
    id: 'product-expertise',
    name: 'Technical Expertise',
    category: 'Our Products',
    highlight: 'Oscilloscopes • Meters • Power Supplies',
    description:
      'Explore our range of electronic test instruments designed for research laboratories, academic institutions and industrial applications.',
    image: '/assets/images/oel85_series.png',
    href: '/products',
    badge: 'Our Expertise',
    icon: Microscope,
  },
  {
    id: 'direct-support',
    name: 'Customer Support',
    category: 'Client Services',
    highlight: 'Technical Assistance & Institutional Support',
    description:
      'Connect with our team for technical assistance, product information, quotations and institutional procurement requirements.',
    image: '/assets/images/dc_power_supply.png',
    href: '/contact',
    badge: 'Client Support',
    icon: Award,
  },
];

export function AboutMegaMenu({
  isOpen,
  onClose,
}: AboutMegaMenuProps) {
  const [hoveredItem, setHoveredItem] = useState(aboutSections[0]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="
          absolute top-full left-1/2 -translate-x-1/2
          mt-4 z-50 w-[95vw] max-w-6xl
          overflow-hidden rounded-[22px]
          border border-[#8f7040]/30
          bg-[#10100f]/[98%]
          text-white shadow-[0_25px_90px_rgba(0,0,0,0.85)]
          backdrop-blur-2xl
        "
      >
        {/* TOP HEADER */}

        <div className="relative px-7 pt-6 pb-5 border-b border-white/[0.07]">

          <div className="absolute top-0 left-0 w-48 h-[2px] bg-gradient-to-r from-[#e9b967] to-transparent" />

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="
                flex h-12 w-12 items-center justify-center
                rounded-xl border border-[#c69a54]/30
                bg-gradient-to-br from-[#c69a54]/20 to-[#8b642e]/5
              ">
                <Building2 className="h-6 w-6 text-[#e9bd75]" />
              </div>

              <div>

                {/* INCREASED COMPANY BRANDING SIZE */}

                <p className="
                  text-sm sm:text-base
                  uppercase tracking-[0.28em]
                  text-[#e9bd75] font-bold
                ">
                  DISCOVER SR-TRONIX
                </p>

                {/* INCREASED MAIN HEADING SIZE */}

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                  Engineering Excellence
                </h2>

                <p className="mt-1 text-xs text-neutral-500">
                  Precision instruments. Reliable engineering. Trusted solutions.
                </p>

              </div>

            </div>

            <Link
              href="/about"
              onClick={onClose}
              className="
                hidden sm:inline-flex items-center gap-2
                rounded-lg border border-[#b18a4d]/40
                px-4 py-2.5 text-xs font-semibold
                text-[#e7bd7c] transition-all
                hover:bg-[#c69a54]/10 hover:border-[#d7ae70]
              "
            >
              Company Profile
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* LEFT NAVIGATION */}

          <div className="lg:col-span-7 p-6 lg:p-7">

            <div className="flex items-center justify-between mb-5">

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#c49b60] font-bold">
                  Explore Our Company
                </p>

                <h3 className="text-sm font-semibold text-neutral-200 mt-1">
                  Corporate Information
                </h3>
              </div>

              <span className="text-[10px] text-neutral-600 font-mono">
                01 — 06
              </span>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {aboutSections.map((item) => {

                const isSelected = hoveredItem.id === item.id;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredItem(item)}
                    onFocus={() => setHoveredItem(item)}
                    className={`
                      group relative flex gap-3 p-4
                      min-h-[105px] rounded-xl
                      border transition-all duration-200
                      ${isSelected
                        ? 'bg-[#b88b4b]/[0.12] border-[#c69a54]/60 shadow-[0_5px_25px_rgba(198,154,84,0.08)]'
                        : 'bg-[#1a1a18] border-white/[0.06] hover:border-[#c69a54]/40 hover:bg-[#22211e]'
                      }
                    `}
                  >

                    <div className={`
                      shrink-0 flex items-center justify-center
                      w-10 h-10 rounded-lg border
                      transition-all duration-200
                      ${isSelected
                        ? 'bg-[#c69a54]/20 border-[#c69a54]/40 text-[#f1c987]'
                        : 'bg-black/40 border-white/[0.08] text-neutral-500 group-hover:text-[#d8ad6b]'
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center justify-between gap-2">

                        <span className={`
                          text-[13px] font-semibold transition-colors
                          ${isSelected
                            ? 'text-[#f1c987]'
                            : 'text-neutral-200 group-hover:text-white'
                          }
                        `}>
                          {item.name}
                        </span>

                        <ChevronRight className={`
                          w-4 h-4 shrink-0 transition-all
                          ${isSelected
                            ? 'text-[#d9ad6b] translate-x-0.5'
                            : 'text-neutral-700 group-hover:text-[#d9ad6b]'
                          }
                        `} />

                      </div>

                      <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-600">
                        {item.category}
                      </p>

                      <p className="mt-2 text-[10px] leading-relaxed text-neutral-500 line-clamp-1">
                        {item.highlight}
                      </p>

                    </div>

                    {isSelected && (
                      <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-[#d9ad6b]" />
                    )}

                  </Link>
                );
              })}

            </div>
          </div>

          {/* RIGHT FEATURED PREVIEW */}

          <div className="
            lg:col-span-5 p-6 lg:p-7
            bg-gradient-to-br from-[#1b1915] via-[#141411] to-[#10100f]
            border-t lg:border-t-0 lg:border-l border-white/[0.07]
          ">

            <div className="flex items-center justify-between mb-4">

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#c49b60] font-bold">
                  Featured Insight
                </p>

                <p className="text-xs text-neutral-500 mt-1">
                  Get to know our capabilities
                </p>
              </div>

              <Sparkles className="w-5 h-5 text-[#c69a54]" />

            </div>

            <AnimatePresence mode="wait">

              <motion.div
                key={hoveredItem.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >

                {/* IMAGE */}

                <Link
                  href={hoveredItem.href}
                  onClick={onClose}
                  className="
                    relative block w-full aspect-[16/10]
                    overflow-hidden rounded-xl
                    bg-[#080808] border border-[#c69a54]/20
                    group
                  "
                >

                  <Image
                    src={hoveredItem.image}
                    alt={hoveredItem.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="
                      object-contain p-4
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />

                  <div className="
                    absolute inset-0 pointer-events-none
                    bg-gradient-to-t from-black/65 via-transparent to-transparent
                  " />

                  <span className="
                    absolute bottom-3 left-3
                    rounded-md border border-[#d2a45f]/40
                    bg-black/70 backdrop-blur-md
                    px-3 py-1.5 text-[10px] font-semibold
                    uppercase tracking-wider text-[#f1c987]
                  ">
                    {hoveredItem.badge}
                  </span>

                  <span className="
                    absolute top-3 right-3
                    flex items-center justify-center
                    w-8 h-8 rounded-full
                    bg-black/60 border border-white/10
                    text-white
                  ">
                    <ArrowRight className="w-4 h-4" />
                  </span>

                </Link>

                {/* DESCRIPTION */}

                <div className="mt-5">

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {hoveredItem.name}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-neutral-400">
                    {hoveredItem.description}
                  </p>

                  <div className="
                    mt-4 p-3 rounded-lg
                    border border-[#c69a54]/20
                    bg-[#c69a54]/[0.06]
                  ">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#c69a54] font-bold">
                      Key Highlight
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#e5c18b]">
                      {hoveredItem.highlight}
                    </p>
                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex items-center gap-3 mt-5">

                  <Link
                    href={hoveredItem.href}
                    onClick={onClose}
                    className="
                      flex-1 inline-flex items-center justify-center
                      gap-2 rounded-lg
                      bg-gradient-to-r from-[#c69a54] to-[#e4bd7c]
                      px-4 py-3 text-xs font-bold text-[#15110b]
                      transition-all duration-200
                      hover:brightness-110 hover:-translate-y-0.5
                    "
                  >
                    Explore More
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="
                      inline-flex items-center justify-center
                      gap-2 rounded-lg border border-white/10
                      bg-white/[0.04] px-4 py-3
                      text-xs font-semibold text-neutral-300
                      transition-all hover:bg-white/10 hover:text-white
                    "
                  >
                    Contact Us
                  </Link>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

        {/* BOTTOM COMPANY STRIP */}

        <div className="
          flex flex-wrap items-center justify-between
          gap-4 px-6 lg:px-7 py-4
          border-t border-white/[0.07]
          bg-black/40
        ">

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

            <div className="flex items-center gap-2 text-[10px] text-neutral-400">
              <Factory className="w-3.5 h-3.5 text-[#c69a54]" />
              <span>Lucknow, Uttar Pradesh</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c69a54]" />
              <span>Quality-Focused Solutions</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-neutral-400">
              <Globe2 className="w-3.5 h-3.5 text-[#c69a54]" />
              <span>Serving Industries & Institutions</span>
            </div>

          </div>

          <Link
            href="/about"
            onClick={onClose}
            className="
              inline-flex items-center gap-2
              text-[11px] font-semibold
              text-[#d9ad6b] hover:text-[#f1c987]
              transition-colors
            "
          >
            View Complete Profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}

export default AboutMegaMenu;
