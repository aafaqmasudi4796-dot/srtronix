'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';

// Real high-definition images for the smart workbench preview
const defaultSlides = [
  {
    image: '/assets/SRTRONIX Smart Workbench Station.png',
    title: 'Smart Workbench – Flagship System',
    description: 'Customizable 5‑in‑1 laboratory bench stations with integrated instrumentation.',
  },
  {
    image: '/assets/images/benchtop_oscilloscope.png',
    title: 'Advanced Oscilloscope Module',
    description: 'High‑bandwidth scope with decoding and analysis capabilities.',
  },
  {
    image: '/assets/images/dc_power_supply.png',
    title: 'Precision Power Supply',
    description: 'Linear DC supply with low ripple and high accuracy.',
  },
];

export function CatalogPreview() {
  const [activeSlide, setActiveSlide] = useState(0);

  const workbenchSlides = defaultSlides;

  // Navigation helpers
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? workbenchSlides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === workbenchSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative mx-auto w-full max-w-6xl [perspective:1400px]">
      <ThreeDCard
        maxTilt={10}
        depth={1.02}
        glowColor="rgba(74, 126, 184, 0.4)"
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0f172a] via-[#090e17] to-slate-950 shadow-2xl shadow-black/80"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A7EB8]/15 via-transparent to-blue-600/10 pointer-events-none" />

        <div className="relative aspect-[16/9] sm:aspect-[16/7]">
          {/* 3D Elevated Slide Image */}
          <ThreeDLayer depth={40} className="w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* 3D Holographic Pedestal Glow */}
                <div className="absolute inset-x-20 bottom-4 h-10 rounded-full bg-[#4A7EB8]/30 blur-2xl pointer-events-none" />

                <Image
                  src={workbenchSlides[activeSlide].image}
                  alt={workbenchSlides[activeSlide].title}
                  fill
                  priority
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-contain p-4 sm:p-8 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                />
              </motion.div>
            </AnimatePresence>
          </ThreeDLayer>

          {/* 3D Elevated Premium badge */}
          <ThreeDLayer depth={60} className="absolute left-4 top-4 z-20 pointer-events-none sm:left-6 sm:top-6">
            <div className="rounded-full border border-[#4A7EB8]/60 bg-[#0f2a4a]/95 px-4 py-2 text-xs font-semibold tracking-wide text-[#7bb0ed] backdrop-blur-md shadow-xl flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
              <span>SRTRONIX • 3D FLAGSHIP SYSTEM</span>
            </div>
          </ThreeDLayer>

          {/* Previous / Next buttons */}
          <ThreeDLayer depth={50} className="absolute inset-0 pointer-events-none">
            <button
              onClick={prevSlide}
              aria-label="Previous image"
              className="pointer-events-auto absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white backdrop-blur-md transition hover:border-[#4A7EB8] hover:bg-[#0f2a4a] sm:left-6 sm:h-12 sm:w-12 shadow-xl cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next image"
              className="pointer-events-auto absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white backdrop-blur-md transition hover:border-[#4A7EB8] hover:bg-[#0f2a4a] sm:right-6 sm:h-12 sm:w-12 shadow-xl cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>

            {/* Slide indicators */}
            <div className="pointer-events-auto absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {workbenchSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'w-8 bg-[#4A7EB8] shadow-md shadow-[#4A7EB8]/50'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </ThreeDLayer>
        </div>

        {/* Text bar */}
        <ThreeDLayer depth={30} className="border-t border-white/10 bg-slate-950/90 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {workbenchSlides[activeSlide].title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {workbenchSlides[activeSlide].description}
            </p>
          </div>
          <span className="font-mono text-xs text-[#7bb0ed] font-semibold bg-[#0f2a4a] px-3 py-1 rounded-full border border-[#4A7EB8]/40">
            0{activeSlide + 1} / 0{workbenchSlides.length}
          </span>
        </ThreeDLayer>
      </ThreeDCard>
    </div>
  );
}

export default CatalogPreview;
