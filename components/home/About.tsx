'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Microscope,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
} from 'lucide-react';

interface FannedCardItem {
  id: string;
  category: string;
  title: string;
  spec: string;
  image: string;
  href: string;
  accentColor: string;
  tagColor: string;
}

const fannedCards: FannedCardItem[] = [
  {
    id: 'oscilloscope',
    category: 'BENCHTOP ANALYSIS',
    title: 'Digital Storage Oscilloscope',
    spec: 'Real-time Waveform Capture • Low Noise',
    image: '/assets/hero_slide_1_oscilloscope_uhd.png',
    href: '/products?category=Oscilloscopes',
    accentColor: '#38bdf8',
    tagColor: 'bg-sky-950/90 text-sky-300 border-sky-800/80',
  },
  {
    id: 'workbench',
    category: 'FLAGSHIP SYSTEM',
    title: 'Smart Workbench Station',
    spec: '5-in-1 Integrated Modular Lab Console',
    image: '/assets/hero_slide_2_smart_workbench_uhd.png',
    href: '/products/electronic-smart-work-station',
    accentColor: '#f97316',
    tagColor: 'bg-orange-950/90 text-orange-300 border-orange-800/80',
  },
  {
    id: 'power-supply',
    category: 'PRECISION POWER',
    title: 'Linear DC Power Supply',
    spec: '0–30V / 5A • Ultra-Low Ripple & Noise',
    image: '/assets/hero_slide_4_power_supply_uhd.png',
    href: '/products/dc-power-supply-mps-200',
    accentColor: '#c084fc',
    tagColor: 'bg-purple-950/90 text-purple-300 border-purple-800/80',
  },
];

export function About() {
  const [activeCardIndex, setActiveCardIndex] = useState(1); // starts with flagship workbench (index 1)
  const [isHoveredAll, setIsHoveredAll] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setHoveredCardId(null);
    setActiveCardIndex((prev) => (prev === 0 ? fannedCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setHoveredCardId(null);
    setActiveCardIndex((prev) => (prev + 1) % fannedCards.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#09090b] border-t border-b border-slate-800/80 pt-14 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12"
    >
      {/* Background Blueprint Dot Grid & Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#4A7EB8]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[550px] w-[550px] rounded-full bg-purple-600/8 blur-[160px]" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20 relative">

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="relative z-10 lg:col-span-5 space-y-7"
          >
            {/* FLOATING COLLABORATIVE CURSOR BADGE */}
            <motion.div
              initial={{ x: 10, y: -10 }}
              animate={{ x: [10, 26, -5, 10], y: [-10, -26, 0, -10] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -top-12 right-2 hidden sm:flex items-center gap-1.5 select-none"
            >
              <svg
                className="h-4 w-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] shrink-0 text-[#4A7EB8]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
              </svg>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide shadow-2xl backdrop-blur-md border bg-[#0f2a4a]/90 border-[#4A7EB8]/60 text-[#7bb0ed]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4A7EB8] animate-pulse" />
                Instrumentation Specialist
              </span>
            </motion.div>

            {/* EYEBROW PILL */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f2a4a]/80 border border-[#4A7EB8]/40 text-xs font-semibold uppercase tracking-wider text-[#7bb0ed] shadow-md backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#4A7EB8]" />
              <span>About SRTRONIX Instruments</span>
            </div>

            {/* HIGH-CONTRAST EDITORIAL HEADLINE */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-sm">
              Empowering Innovation Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A7EB8] via-[#7bb0ed] to-[#4A7EB8]">
                Precision Technology.
              </span>
            </h2>

            {/* DESCRIPTIONS */}
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              SRTRONIX is an Indian manufacturer of professional electronic test and measurement instruments, specialized in integrated Smart Work Bench Stations, high-fidelity oscilloscopes, and regulated laboratory power supplies.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-slate-400">
              We empower hardware engineering teams, university research laboratories, and industrial testing facilities across India with rugged, ESD-safe, and NABL-traceable measurement gear.
            </p>

            {/* HIGH-IMPACT STAT TILES */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">1,200+</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Labs Served</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#7bb0ed] font-mono tracking-tight">5-in-1</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#4A7EB8] shrink-0" />
                  <span>Flagship Bench</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono tracking-tight">100%</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>India Assembled</span>
                </div>
              </div>
            </div>

            {/* DUAL CTA BUTTONS - SINGLE LINE */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 pt-2 flex-nowrap">
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full bg-white px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-xl shadow-white/10 transition-all duration-300 hover:bg-slate-200 hover:-translate-y-0.5 hover:shadow-2xl whitespace-nowrap shrink-0"
              >
                <span>Discover Our Company</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/products/electronic-smart-work-station"
                className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full border border-white/15 bg-white/5 px-4.5 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-[#4A7EB8]/60 hover:bg-[#0f2a4a]/40 hover:text-white whitespace-nowrap shrink-0"
              >
                <span>View Smart Station</span>
                <ArrowRight size={15} className="text-[#7bb0ed] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: 3D FANNED / STACKED CARDS WITH SLIDING CONTROLS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85 }}
            className="lg:col-span-7 relative min-h-[460px] sm:min-h-[520px] flex flex-col items-center justify-center"
            onMouseEnter={() => setIsHoveredAll(true)}
            onMouseLeave={() => {
              setIsHoveredAll(false);
              setHoveredCardId(null);
            }}
          >
            {/* AMBIENT BACKLIGHT BEHIND FANNED CARDS */}
            <div className="pointer-events-none absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-[#4A7EB8]/15 blur-3xl" />

            {/* FLOATING COLLABORATIVE CURSOR ON RIGHT */}
            <motion.div
              initial={{ x: -10, y: 15 }}
              animate={{ x: [-10, 8, -25, -10], y: [15, 30, 5, 15] }}
              transition={{
                duration: 5.4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -bottom-6 left-6 z-40 hidden sm:flex items-center gap-1.5 select-none"
            >
              <svg
                className="h-4 w-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] shrink-0 text-[#f97316]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
              </svg>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide shadow-2xl backdrop-blur-md border bg-orange-950/90 border-orange-500/50 text-orange-200">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Smart Bench V2
              </span>
            </motion.div>

            {/* FANNED CARDS DISPLAY WITH SWIPE SUPPORT */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-[540px] h-[360px] xs:h-[380px] sm:h-[440px] flex items-center justify-center select-none touch-pan-y"
            >
              {fannedCards.map((card, index) => {
                // Determine card slot relative to active: 0 = Center, 1 = Right, -1 = Left
                let offset = index - activeCardIndex;
                if (offset === 2) offset = -1;
                if (offset === -2) offset = 1;

                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                let x = 0;
                let rotate = 0;
                let y = isCenter ? -10 : 14;
                let scale = isCenter ? (isMobile ? 1.02 : 1.04) : (isMobile ? 0.88 : 0.92);
                let opacity = isCenter ? 1 : (isMobile ? 0.7 : 0.85);
                let zIndex = isCenter ? 40 : 10;

                if (isLeft) {
                  x = isMobile ? -50 : (isHoveredAll ? -120 : -78);
                  rotate = isMobile ? -6 : (isHoveredAll ? -16 : -12);
                } else if (isRight) {
                  x = isMobile ? 50 : (isHoveredAll ? 120 : 78);
                  rotate = isMobile ? 6 : (isHoveredAll ? 16 : 12);
                }

                if (!isMobile && hoveredCardId === card.id) {
                  y = -26;
                  scale = isCenter ? 1.07 : 0.98;
                  zIndex = 50;
                  opacity = 1;
                  rotate = 0;
                }

                return (
                  <motion.div
                    key={card.id}
                    animate={{
                      x,
                      y,
                      rotate,
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 26,
                      mass: 0.8,
                    }}
                    style={{ zIndex }}
                    onMouseEnter={() => {
                      if (!isMobile) setHoveredCardId(card.id);
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) setHoveredCardId(null);
                    }}
                    onClick={(e) => {
                      if (!isCenter) {
                        e.preventDefault();
                        e.stopPropagation();
                        setHoveredCardId(null);
                        setActiveCardIndex(index);
                      }
                    }}
                    className={`absolute w-[215px] xs:w-[245px] sm:w-[290px] h-[305px] xs:h-[340px] sm:h-[390px] rounded-3xl overflow-hidden border bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl shadow-black/90 cursor-pointer transition-colors duration-300 ${isCenter
                      ? 'border-white/30 shadow-[#4A7EB8]/20 ring-1 ring-white/10'
                      : 'border-slate-800 hover:border-slate-700'
                      }`}
                  >
                    <Link
                      href={card.href}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          e.stopPropagation();
                          setHoveredCardId(null);
                          setActiveCardIndex(index);
                        }
                      }}
                      className="block w-full h-full relative group"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-[62%] bg-slate-950 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={`${card.title} - ${card.category} by SRTRONIX Instruments`}
                          fill
                          sizes="(max-width: 768px) 240px, 290px"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />

                        {/* Top Category Tag */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-md ${card.tagColor}`}
                          >
                            {card.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Bottom Meta */}
                      <div className="p-4 sm:p-5 flex flex-col justify-between h-[38%] bg-slate-900/95 border-t border-slate-800/80">
                        <div>
                          <h3 className="font-bold text-white text-base sm:text-lg leading-snug group-hover:text-[#7bb0ed] transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-slate-400 text-xs mt-1 font-mono line-clamp-1">
                            {card.spec}
                          </p>
                        </div>

                        {/* Interactive Pill Link */}
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white transition-colors flex items-center gap-1">
                            <span>Explore Details</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#7bb0ed] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>

                          <span
                            className="w-2.5 h-2.5 rounded-full shadow-sm"
                            style={{ backgroundColor: card.accentColor }}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* SLIDING NAVIGATION CONTROLS & PAGINATION */}
            <div
              className="mt-7 sm:mt-9 flex items-center justify-center gap-5 relative z-40 select-none"
              onMouseEnter={() => {
                setHoveredCardId(null);
                setIsHoveredAll(false);
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous card"
                className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/95 text-white shadow-xl shadow-black/80 transition-all duration-200 hover:border-[#4A7EB8] hover:bg-[#0f2a4a] hover:text-[#7bb0ed] hover:scale-105 active:scale-95 cursor-pointer touch-manipulation z-40"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-x-0.5 text-slate-200 group-hover:text-[#7bb0ed]" />
              </button>

              {/* Interactive Dot Pagination */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-md">
                {fannedCards.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredCardId(null);
                      setActiveCardIndex(i);
                    }}
                    aria-label={`Switch to ${c.title}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${activeCardIndex === i
                      ? 'w-7 bg-[#4A7EB8] shadow-sm shadow-[#4A7EB8]/50'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next card"
                className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/95 text-white shadow-xl shadow-black/80 transition-all duration-200 hover:border-[#4A7EB8] hover:bg-[#0f2a4a] hover:text-[#7bb0ed] hover:scale-105 active:scale-95 cursor-pointer touch-manipulation z-40"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-0.5 text-slate-200 group-hover:text-[#7bb0ed]" />
              </button>
            </div>

            {/* QUALITY PROOF BADGES - SHIFTED TO THE RIGHT SIDE */}
            <div className="mt-6 sm:mt-8 flex flex-row items-center justify-center lg:justify-end gap-3.5 sm:gap-6 border-t border-slate-800/80 pt-5 w-full max-w-[560px] flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-300 whitespace-nowrap">
                  Heavy-Duty Build
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-[#4A7EB8]/10 border border-[#4A7EB8]/20 text-[#7bb0ed] shrink-0">
                  <Microscope size={15} />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-300 whitespace-nowrap">
                  100% Traceable Cal.
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <CheckCircle2 size={15} />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-300 whitespace-nowrap">
                  Direct Warranty
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;
