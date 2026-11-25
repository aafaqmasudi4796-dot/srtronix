'use client';

import React from 'react';
import Image from 'next/image';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';

export function AboutShowcase3D() {
  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* 3D FLOATING OSCILLOSCOPE - COMPLETELY BORDERLESS & SEAMLESS WITH PAGE */}
      <ThreeDCard
        maxTilt={12}
        depth={1.03}
        glowColor="rgba(74, 126, 184, 0.3)"
        rimBorder={false}
        pedestal={false}
        className="w-full flex items-center justify-center bg-transparent"
      >
        <ThreeDLayer depth={45}>
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center p-2 sm:p-4">
            {/* Atmospheric Ambient Aura (No Lines, No Borders) */}
            <div className="absolute inset-0 bg-radial from-[#4A7EB8]/15 via-transparent to-transparent pointer-events-none blur-3xl" />

            {/* Enlarged Oscilloscope Image Floating Seamlessly on Page */}
            <div className="relative w-full h-full max-w-[660px] max-h-[480px] flex items-center justify-center hover:scale-105 transition-transform duration-500">
              <Image
                src="/assets/about_oscilloscope_dso2d15_clean.png"
                alt="Hantek DSO2D15 Digital Storage Oscilloscope with Waveform Generator"
                fill
                priority
                quality={100}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>
        </ThreeDLayer>
      </ThreeDCard>
    </div>
  );
}

export default AboutShowcase3D;
