'use client';

import React from 'react';
import Image from 'next/image';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';
import { Sparkles } from 'lucide-react';

export function AboutShowcase3D() {
  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* 3D FLOATING OSCILLOSCOPE - COMPLETELY BORDERLESS & SEAMLESS WITH PAGE BACKGROUND */}
      <ThreeDCard
        maxTilt={12}
        depth={1.03}
        glowColor="rgba(74, 126, 184, 0.3)"
        rimBorder={false}
        pedestal={false}
        className="w-full flex items-center justify-center bg-transparent border-0 shadow-none"
      >
        <ThreeDLayer depth={45}>
          <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center p-2 sm:p-4 bg-transparent">
            {/* Atmospheric Ambient Glow (No Lines, No Borders) */}
            <div className="absolute inset-0 bg-radial from-[#4A7EB8]/15 via-transparent to-transparent pointer-events-none blur-3xl" />

            {/* Enlarged Oscilloscope Image (Borderless, Seamless Dark Background) */}
            <div className="relative w-full h-full max-w-[700px] flex items-center justify-center transition-transform duration-500 hover:scale-105">
              <Image
                src="/assets/about_oscilloscope_dso2d15_clean.png"
                alt="SRTRONIX Digital Storage Oscilloscope"
                fill
                priority
                quality={100}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
              />
            </div>

            {/* Floating Spec Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#121216]/90 text-[#7bb0ed] shadow-lg backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
                <span>Dual-Channel Benchtop Oscilloscope</span>
              </span>
            </div>
          </div>
        </ThreeDLayer>
      </ThreeDCard>
    </div>
  );
}

export default AboutShowcase3D;
