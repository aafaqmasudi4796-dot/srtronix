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
  Cpu,
  Layers,
  Wrench,
  CheckCircle2,
} from 'lucide-react';

interface HomeMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HomeSectionItem {
  id: string;
  name: string;
  category: string;
  spec: string;
  description: string;
  image: string;
  href: string;
  badge: string;
}

const homeSections: HomeSectionItem[] = [
  {
    id: 'workbench-hero',
    name: 'Smart Work Bench Station',
    category: 'Integrated Console',
    spec: '1500 × 1330 × 800 mm • 5 Instruments in 1',
    description:
      'All-in-one customizable laboratory workbench combining Oscilloscope, DC Power Supply, DMM, LCR meter, and Transistor Tester into a single M.S. console.',
    image: '/assets/images/electronic_smart_work_station.jpg',
    href: '/#catalog-section',
    badge: 'Flagship Platform',
  },
  {
    id: 'featured-scope',
    name: 'Handheld Oscilloscope HDS272S',
    category: 'Field & Lab Scope',
    spec: '70 MHz Dual-Channel • 20,000-count DMM',
    description:
      'Multi-functional handheld tool combining dual-channel oscilloscope with high-accuracy digital multimeter and 6-hour rechargeable battery.',
    image: '/assets/images/handheld_oscilloscope.png',
    href: '/products/handheld-oscilloscope-hds272s',
    badge: 'Core Featured',
  },
  {
    id: 'featured-power',
    name: 'Linear DC Power Supply MPS-200',
    category: 'Regulated Power',
    spec: '0–30V / 0–6A • 180W Max Output',
    description:
      'High-accuracy program-controlled linear DC power supply with ultra-low ripple, OVP/OCP protections, and multi-line digital LED panel.',
    image: '/assets/images/dc_power_supply.png',
    href: '/products/dc-power-supply-mps-200',
    badge: 'Core Featured',
  },
  {
    id: 'engineered-india',
    name: 'Engineered & Assembled in India',
    category: 'Domestic Assembly',
    spec: 'Direct from Lucknow, Uttar Pradesh',
    description:
      'Every SRTRONIX instrument is crafted from durable mild steel, quality components, and NABL-traceable calibration standards.',
    image: '/assets/images/electronic_smart_work_station.jpg',
    href: '/about',
    badge: 'Craftsmanship',
  },
  {
    id: 'catalog-preview',
    name: 'Complete Instruments Catalog',
    category: '11 Bench Instruments',
    spec: 'Scopes, Loads, Power & LCR Meters',
    description:
      'Browse through all 11 professional test and measurement instruments with detailed engineering specifications and quotation forms.',
    image: '/assets/images/benchtop_oscilloscope.png',
    href: '/products',
    badge: 'Catalog',
  },
  {
    id: 'contact-inquiry',
    name: 'Direct Consultation & Quotes',
    category: 'Commercial Desk',
    spec: 'Official GST Invoicing & Quotations',
    description:
      'Connect directly with our engineering team for institutional bulk orders, customized workbench sizing, or technical inquiries.',
    image: '/assets/images/power_supply_multimeter_spm.jpg',
    href: '/contact',
    badge: 'Support',
  },
];

export function HomeMegaMenu({ isOpen, onClose }: HomeMegaMenuProps) {
  const [hoveredSection, setHoveredSection] = useState<HomeSectionItem>(homeSections[0]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.99 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl mt-2.5 z-50 bg-[#09090b]/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/95 p-6 text-white overflow-hidden"
    >
      {/* Top Banner Bar */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-wide uppercase">
          <Sparkles className="w-4 h-4" />
          <span>Home Navigation • Platform Sections &amp; Core Highlights</span>
        </div>
        <Link
          href="/"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span>Jump to Homepage Top</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main 2-Column Split: All Sections on Left (one line each), Dynamic Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (7 cols): All Home Sections in a neat single-line-per-item list */}
        <div className="lg:col-span-7 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-1 flex items-center justify-between">
            <span>Home Section / Core Instrument</span>
            <span className="hidden sm:inline">Category &amp; Benchmark</span>
          </div>

          <div className="space-y-1">
            {homeSections.map((item) => {
              const isSelected = hoveredSection.id === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredSection(item)}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 border ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-600/70 shadow-md shadow-amber-950/40 text-white'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  {/* Left: Icon & Section Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-8 h-8 rounded-lg bg-slate-950 border border-slate-800/80 p-0.5 shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="32px"
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate group-hover:text-amber-300 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-500 sm:hidden truncate">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {/* Right: Category badge + Spec on one single line */}
                  <div className="hidden sm:flex items-center gap-2.5 shrink-0 ml-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-amber-300 border border-slate-700/60 font-medium">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono max-w-[170px] truncate text-right">
                      {item.spec}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isSelected
                          ? 'text-amber-400 translate-x-0.5'
                          : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): Dynamic Live Section Preview Card */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredSection.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.16 }}
              className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/70 border border-amber-800/40 shadow-xl shadow-black/80"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/60">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {hoveredSection.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    SRTRONIX HOME
                  </span>
                </div>

                <Link
                  href={hoveredSection.href}
                  onClick={onClose}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-4 my-2 block group"
                >
                  <Image
                    src={hoveredSection.image}
                    alt={hoveredSection.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  />
                </Link>

                <Link href={hoveredSection.href} onClick={onClose} className="block mt-2">
                  <h3 className="font-bold text-base text-white hover:text-amber-300 transition-colors">
                    {hoveredSection.name}
                  </h3>
                </Link>

                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {hoveredSection.description}
                </p>

                <div className="mt-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-[11px] text-amber-300 font-mono">
                  {hoveredSection.spec}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <Link
                  href={hoveredSection.href}
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors shadow-md shadow-amber-950/40"
                >
                  <span>Explore Section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
                >
                  <span>Inquire</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Shortcuts */}
      <div className="mt-4 pt-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
          <span className="text-slate-500 uppercase font-semibold">Quick links:</span>
          <Link href="/products" onClick={onClose} className="hover:text-white transition-colors">
            • All Instruments
          </Link>
          <Link href="/about" onClick={onClose} className="hover:text-white transition-colors">
            • About Facility
          </Link>
          <Link href="/contact" onClick={onClose} className="hover:text-white transition-colors">
            • Direct Support
          </Link>
        </div>

        <Link
          href="/"
          onClick={onClose}
          className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 text-xs"
        >
          <span>Homepage Overview</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

