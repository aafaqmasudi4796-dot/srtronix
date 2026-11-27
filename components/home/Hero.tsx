'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  MoveRight,
  Sparkles,
} from 'lucide-react';

interface WorkbenchSlide {
  id: string;
  image: string;
  categoryTag: string;
  titleBefore: string;
  highlight: string;
  titleAfter: string;
  description: string;
  badge: string;
  href: string;
}

const workbenchSlides: WorkbenchSlide[] = [
  {
    id: 'facility-cleanroom',
    image: '/assets/hero_slide_1_facility_uhd.jpg',
    categoryTag: 'ADVANCED R&D & ASSEMBLY • TEST CLEANROOM',
    titleBefore: 'Precision That ',
    highlight: 'Powers',
    titleAfter: ' Innovation.',
    description:
      'High-precision test infrastructure and automated cleanroom environments built for dependable electronic verification and manufacturing quality.',
    badge: 'R&D Assembly & Test Floor',
    href: '/about',
  },
  {
    id: 'rf-spectrum-analyzer',
    image: '/assets/hero_slide_2_spectrum_analyzer_uhd.jpg',
    categoryTag: 'RF SPECTRUM ANALYZERS • WIRELESS & IOT',
    titleBefore: 'Capture Every ',
    highlight: 'Signal',
    titleAfter: ' in Real Time.',
    description:
      'Real-time multi-band spectrum analysis, RF signal tracking, and wideband wireless testing for modern IoT and communications engineering.',
    badge: 'RF Explorer Spectrum Analyzer',
    href: '/products',
  },
  {
    id: 'oscilloscope-lab',
    image: '/assets/hero_slide_3_oscilloscope_lab_uhd.jpg',
    categoryTag: 'DIGITAL OSCILLOSCOPES • 70MHZ – 200MHZ',
    titleBefore: 'Engineered for ',
    highlight: 'Accuracy',
    titleAfter: ' & Reliability.',
    description:
      'Discover reliable benchtop and handheld digital oscilloscopes designed for accurate waveform analysis and traceable verification.',
    badge: 'Precision Calibration Lab',
    href: '/products?category=Oscilloscopes',
  },
  {
    id: 'smart-workbench',
    image: '/assets/hero_slide_4_smart_workbench_uhd.jpg',
    categoryTag: 'SMART WORKBENCH SYSTEMS • 5-IN-1',
    titleBefore: 'A ',
    highlight: 'Smarter',
    titleAfter: ' Way to Engineer.',
    description:
      'Transform your workspace with unified equipment integration, precision engineering, and dependable ESD-safe workbench technology.',
    badge: 'Smart Work Bench Station',
    href: '/products/electronic-smart-work-station',
  },
];

const SLIDE_INTERVAL = 4000;

interface CursorBadgeProps {
  name: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  initial: { x: number; y: number };
  animate: { x: number[]; y: number[] };
  duration: number;
  className?: string;
}

function CursorBadge({
  name,
  color,
  bgClass,
  borderClass,
  textClass,
  initial,
  animate,
  duration,
  className,
}: CursorBadgeProps) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={`pointer-events-none absolute z-30 flex items-center gap-1.5 select-none ${className || ''}`}
    >
      <svg
        className="h-4 w-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ color }}
      >
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
      </svg>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide shadow-xl backdrop-blur-md border ${bgClass} ${borderClass} ${textClass}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
        {name}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = workbenchSlides[activeSlide];

  const goToSlide = useCallback((newIndex: number) => {
    setDirection(newIndex > activeSlide ? 1 : -1);
    setActiveSlide(newIndex);
  }, [activeSlide]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveSlide((prev) =>
      prev === 0 ? workbenchSlides.length - 1 : prev - 1
    );
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveSlide((prev) =>
      prev === workbenchSlides.length - 1 ? 0 : prev + 1
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timeout = window.setTimeout(() => {
      setDirection(1);
      setActiveSlide((prev) =>
        prev === workbenchSlides.length - 1 ? 0 : prev + 1
      );
    }, SLIDE_INTERVAL);

    return () => window.clearTimeout(timeout);
  }, [activeSlide, isPaused]);

  return (
    <section
      id="home"
      className="relative isolate w-full overflow-hidden bg-[#09090b] text-white flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Clean Dark Atmosphere */}
      <div className="absolute inset-0 bg-[#09090b] pointer-events-none" />

      {/* MAIN WRAPPER WITH VERTICAL STEPPER + CONTENT + ROTATING APERTURE */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-16 sm:pt-20 pb-2 sm:pb-5">
        <div className="flex items-center gap-6 sm:gap-10 lg:gap-14">

          {/* LEFT VERTICAL STEPPER BAR */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 relative py-4">
            {/* Vertical connecting line */}
            <div className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-white/10 via-white/20 to-white/10" />

            {/* Stepper Nodes */}
            <div className="relative z-10 flex flex-col items-center gap-7">
              {workbenchSlides.map((slide, index) => {
                const isActive = activeSlide === index;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.categoryTag}`}
                    className="group relative flex items-center justify-center transition-all duration-300"
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeStepperIndicator"
                        className="relative flex items-center justify-center"
                      >
                        {/* Outer Glow Ring */}
                        <span className="absolute -inset-2 rounded-full bg-[#4A7EB8]/25 blur-sm animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5a93d3] to-[#4A7EB8] border-2 border-white text-white font-mono font-bold text-xs flex items-center justify-center shadow-lg shadow-[#4A7EB8]/40">
                          0{index + 1}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-900/90 border border-white/25 text-slate-400 group-hover:text-white group-hover:border-white/60 font-mono text-[11px] flex items-center justify-center transition-all duration-300 backdrop-blur-md">
                        0{index + 1}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN GRID: TEXT CONTENT (LEFT) + APERTURE SHOWCASE (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1">

            {/* SLIDE TEXT CONTENT (LEFT-CENTER) */}
            <div className="lg:col-span-6 relative z-20 space-y-6">

              {/* Collaborative Cursor Badge */}
              <CursorBadge
                name="Instrumentation Desk"
                color="#4A7EB8"
                bgClass="bg-[#0f2a4a]/85"
                borderClass="border-[#4A7EB8]/50"
                textClass="text-[#7bb0ed]"
                initial={{ x: 10, y: -10 }}
                animate={{ x: [10, 24, -4, 10], y: [-10, -25, 0, -10] }}
                duration={5.2}
                className="hidden sm:flex -top-8 right-6"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id + '-content'}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  {/* EYEBROW PILL */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A7EB8]/20 border border-[#4A7EB8]/60 text-white font-bold text-xs sm:text-xs tracking-wide uppercase shadow-lg shadow-[#4A7EB8]/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#5B96DC] fill-[#5B96DC]" />
                    <span>{currentSlide.categoryTag}</span>
                  </div>

                  {/* HIGH-IMPACT HEADLINE */}
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.14] tracking-tight">
                    <span className="text-[#4A7EB8]">
                      {currentSlide.titleBefore}
                    </span>
                    <span className="font-serif italic font-normal tracking-normal text-white">
                      {currentSlide.highlight}
                    </span>
                    <span className="text-[#4A7EB8]">
                      {currentSlide.titleAfter}
                    </span>
                  </h1>

                  {/* DESCRIPTION */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                    {currentSlide.description}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Link
                      href={currentSlide.href}
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#4A7EB8] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-[#3d6ea4] hover:shadow-xl hover:shadow-[#4A7EB8]/30 hover:-translate-y-0.5 text-center"
                    >
                      <span>Explore Instrument</span>
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>

                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black text-center"
                    >
                      <span>Talk to Our Team</span>
                      <MoveRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  {/* TRUST LINE */}
                  <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] font-medium tracking-wider text-slate-400">
                    <span className="text-[#4A7EB8] font-semibold">• Traceable Calibration</span>
                    <span>• Heavy-Duty Steel Construction</span>
                    <span>• Direct Factory Warranty</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CIRCULAR APERTURE SHOWCASE (RIGHT - ORIGINAL SLIDE STYLE WITH STATIC CRISP IMAGES) */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-4 sm:py-6">

              {/* SLIDE PREV BUTTON */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-0 sm:left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white backdrop-blur-md shadow-2xl transition-all duration-200 hover:bg-[#4A7EB8] hover:border-[#4A7EB8] hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Collaborative Cursor Badge near lens */}
              <CursorBadge
                name="Precision Showcase"
                color="#f97316"
                bgClass="bg-orange-950/85"
                borderClass="border-orange-500/50"
                textClass="text-orange-200"
                initial={{ x: -10, y: 15 }}
                animate={{ x: [-10, 10, -25, -10], y: [15, 30, 5, 15] }}
                duration={4.8}
                className="hidden sm:flex -bottom-4 right-10"
              />

              {/* ROTATING DIAL BASE */}
              <div className="relative w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] flex items-center justify-center">

                {/* AMBIENT GLOW & PEDESTAL */}
                <div className="pointer-events-none absolute -inset-8 sm:-inset-12 rounded-full bg-gradient-to-tr from-[#4A7EB8]/25 via-blue-600/15 to-purple-600/10 blur-2xl" />

                {/* OUTER DIAL WHEEL */}
                <motion.div
                  animate={{ rotate: activeSlide * 90 }}
                  transition={{
                    type: 'spring',
                    stiffness: 110,
                    damping: 20,
                  }}
                  className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-white/20 pointer-events-none"
                >
                  {/* Dial notches */}
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-400 shadow-md shadow-orange-400" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#4A7EB8] shadow-md shadow-[#4A7EB8]" />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-md shadow-purple-400" />
                </motion.div>

                {/* CIRCULAR APERTURE MASK (The Slide Portal) */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-white/20 bg-slate-950 shadow-2xl shadow-black/90">

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentSlide.id + '-lens'}
                      custom={direction}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'linear' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* CLEAN STATIC SLIDE IMAGE (NO MOTION / NO ROTATE / NO ZOOM) */}
                      <div className="relative w-full h-full">
                        <Image
                          src={currentSlide.image}
                          alt={`${currentSlide.badge} - ${currentSlide.categoryTag} by SRTRONIX Instruments`}
                          fill
                          priority
                          quality={100}
                          unoptimized={true}
                          sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 480px"
                          className="object-cover object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
                        />
                      </div>

                      {/* Aperture Inner Radial Vignette & Gloss */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
                      <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* FLOATING PRODUCT BADGE ON LENS */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide.id + '-badge'}
                      initial={{ y: 16, opacity: 0, scale: 0.92 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 12, opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.45, delay: 0.18, ease: 'easeOut' }}
                      className="absolute bottom-6 inset-x-6 z-20 flex justify-center pointer-events-none"
                    >
                      <div className="px-4 py-2 rounded-full bg-slate-950/85 border border-white/20 backdrop-blur-md text-xs font-semibold text-white shadow-xl flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4A7EB8] animate-ping" />
                        <span className="font-mono">{currentSlide.badge}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                </div>

                {/* ACCENT RING */}
                <div className="absolute -inset-1 rounded-full border-t-2 border-r-2 border-[#4A7EB8]/70 pointer-events-none" />
              </div>

              {/* SLIDE NEXT BUTTON */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-0 sm:right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white backdrop-blur-md shadow-2xl transition-all duration-200 hover:bg-[#4A7EB8] hover:border-[#4A7EB8] hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM CONTROLS & PROGRESS */}
        <div className="hidden sm:flex mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/10 items-center justify-between">

          {/* Slide Indicator, Progress Bar & Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-white">
              0{activeSlide + 1}
            </span>
            <span className="text-white/40 font-mono">/</span>
            <span className="text-slate-400 font-mono text-sm">
              0{workbenchSlides.length}
            </span>

            {/* Cycle Progress Bar in Logo Blue */}
            <div className="w-28 sm:w-36 h-1 bg-white/15 rounded-full overflow-hidden ml-3">
              <motion.div
                key={activeSlide}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#4A7EB8] via-[#75a8e4] to-[#4A7EB8] rounded-full"
              />
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {currentSlide.badge}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
