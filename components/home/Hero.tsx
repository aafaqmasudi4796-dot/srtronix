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

const SLIDE_INTERVAL = 3000;

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
      className="relative isolate w-full min-h-screen min-h-[100dvh] overflow-hidden bg-[#09090b] text-white flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. FULL-SCREEN BACKGROUND SLIDE IMAGE WITH CINEMATIC CROSSFADE */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id + '-bg'}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.badge}
              fill
              priority
              quality={100}
              unoptimized={true}
              sizes="100vw"
              className="object-cover object-center brightness-100 contrast-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Multi-Stop Contrast Overlays for Perfect Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/75 md:via-[#09090b]/55 to-[#09090b]/25 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(74,126,184,0.18)_0%,transparent_65%)] pointer-events-none" />
      </div>

      {/* PREV SLIDE BUTTON (LEFT EDGE) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-md shadow-2xl transition-all duration-200 hover:bg-[#4A7EB8] hover:border-[#4A7EB8] hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>

      {/* NEXT SLIDE BUTTON (RIGHT EDGE) */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-md shadow-2xl transition-all duration-200 hover:bg-[#4A7EB8] hover:border-[#4A7EB8] hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>

      {/* 2. MAIN CONTENT WRAPPER: STEPPER + HERO TEXT + RIGHT FLOATING SPEC CAPSULE */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pt-28 sm:pt-36 pb-8 sm:pb-12 flex-1 flex items-center">
        <div className="flex items-center gap-6 sm:gap-10 lg:gap-14 w-full">

          {/* LEFT VERTICAL STEPPER BAR */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 relative py-4">
            {/* Vertical connecting line */}
            <div className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-white/10 via-white/25 to-white/10" />

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
                        <span className="absolute -inset-2 rounded-full bg-[#4A7EB8]/35 blur-sm animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5a93d3] to-[#4A7EB8] border-2 border-white text-white font-mono font-bold text-xs flex items-center justify-center shadow-lg shadow-[#4A7EB8]/50">
                          0{index + 1}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-black/60 border border-white/25 text-slate-300 group-hover:text-white group-hover:border-white/60 font-mono text-[11px] flex items-center justify-center transition-all duration-300 backdrop-blur-md">
                        0{index + 1}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN GRID: TEXT CONTENT (LEFT) + RIGHT FLOATING GLASS CAPSULE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">

            {/* SLIDE TEXT CONTENT (LEFT-CENTER) */}
            <div className="lg:col-span-8 relative z-20 space-y-6">

              {/* Collaborative Cursor Badge */}
              <CursorBadge
                name="Instrumentation Desk"
                color="#4A7EB8"
                bgClass="bg-[#0f2a4a]/90"
                borderClass="border-[#4A7EB8]/60"
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
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f2a4a]/90 border border-[#4A7EB8]/70 text-[#7bb0ed] font-bold text-xs tracking-wider uppercase shadow-xl backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#5B96DC] fill-[#5B96DC]" />
                    <span>{currentSlide.categoryTag}</span>
                  </div>

                  {/* HIGH-IMPACT HEADLINE */}
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                    <span className="text-white">
                      {currentSlide.titleBefore}
                    </span>
                    <span className="font-serif italic font-normal tracking-normal text-[#7bb0ed] drop-shadow-[0_4px_20px_rgba(74,126,184,0.5)]">
                      {currentSlide.highlight}
                    </span>
                    <span className="text-white">
                      {currentSlide.titleAfter}
                    </span>
                  </h1>

                  {/* DESCRIPTION */}
                  <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    {currentSlide.description}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Link
                      href={currentSlide.href}
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#4A7EB8] px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-[#3d6ea4] hover:shadow-2xl hover:shadow-[#4A7EB8]/50 hover:-translate-y-0.5 text-center"
                    >
                      <span>Explore Instrument</span>
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>

                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-black/40 px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black text-center"
                    >
                      <span>Talk to Our Team</span>
                      <MoveRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  {/* TRUST LINE */}
                  <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-semibold tracking-wider text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    <span className="text-[#7bb0ed] font-bold">• Traceable Calibration</span>
                    <span>• Heavy-Duty Steel Construction</span>
                    <span>• Direct Factory Warranty</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE FLOATING FEATURE CAPSULE */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id + '-feature-card'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="rounded-2xl border border-white/20 bg-slate-950/70 backdrop-blur-xl p-6 space-y-4 max-w-sm shadow-2xl shadow-black/80"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs font-bold text-[#7bb0ed] tracking-wider uppercase">
                      ACTIVE SYSTEM
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      CALIBRATED
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {currentSlide.badge}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Precision engineered for industrial research labs, universities, and electronics manufacturing.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono">Slide 0{activeSlide + 1} / 0{workbenchSlides.length}</span>
                    <Link
                      href={currentSlide.href}
                      className="text-[#7bb0ed] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      View Specs <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>

      {/* 3. BOTTOM CONTROLS & PROGRESS */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-6 sm:pb-8">
        <div className="pt-4 border-t border-white/15 flex items-center justify-between backdrop-blur-xs">

          {/* Slide Indicator, Progress Bar & Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-white">
              0{activeSlide + 1}
            </span>
            <span className="text-white/40 font-mono">/</span>
            <span className="text-slate-400 font-mono text-sm">
              0{workbenchSlides.length}
            </span>

            {/* 3-Second Cycle Progress Bar in Logo Blue */}
            <div className="w-28 sm:w-36 h-1 bg-white/20 rounded-full overflow-hidden ml-3">
              <motion.div
                key={activeSlide}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#4A7EB8] via-[#7bb0ed] to-[#4A7EB8] rounded-full"
              />
            </div>
          </div>

          {/* Active slide badge & pagination pills */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              {workbenchSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? 'w-8 bg-[#4A7EB8]'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <div className="text-xs font-mono text-slate-300 bg-black/50 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
              {currentSlide.badge}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
