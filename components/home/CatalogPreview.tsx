'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Placeholder data for the smart workbench slides. Replace with real data if available.
const defaultSlides = [
  {
    image: '/assets/image.png',
    title: 'Smart Workbench – Flagship System',
    description: 'Customizable 5‑in‑1 laboratory bench stations with integrated instrumentation.',
  },
  {
    image: '/assets/image.png',
    title: 'Advanced Oscilloscope Module',
    description: 'High‑bandwidth scope with decoding and analysis capabilities.',
  },
  {
    image: '/assets/image.png',
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#08080b]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-600/10" />

      <div className="relative aspect-[16/9] sm:aspect-[16/7]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={workbenchSlides[activeSlide].image}
              alt={workbenchSlides[activeSlide].title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain p-3 sm:p-6"
            />
          </motion.div>
        </AnimatePresence>

        {/* Premium purple badge */}
        <div className="absolute left-4 top-4 z-10 rounded-full border border-purple-500/40 bg-purple-950/70 px-4 py-2 text-xs font-semibold tracking-wide text-purple-200 backdrop-blur-md sm:left-6 sm:top-6">
          SRTRONIX • FLAGSHIP SYSTEM
        </div>

        {/* Previous / Next */}
        <button
          onClick={prevSlide}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:border-purple-400 hover:bg-purple-700 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:border-purple-400 hover:bg-purple-700 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {workbenchSlides.map((slide, index) => (
            <button
              key={
                `${slide.image}-${index}`
              }
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-8 bg-purple-500' : 'w-3 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 px-5 py-5 text-left sm:px-8">
        <motion.div
          key={`caption-${activeSlide}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {workbenchSlides[activeSlide].title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
            {workbenchSlides[activeSlide].description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
