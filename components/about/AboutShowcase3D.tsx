'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export function AboutShowcase3D() {
  return (
    <div className="relative w-full select-none group">
      {/* Subtle Ambient Backlight Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#4A7EB8]/20 via-blue-600/10 to-[#7bb0ed]/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

      {/* High-Definition Laboratory Facility Showcase Card */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#4A7EB8]/30 bg-slate-900/90 shadow-2xl shadow-black/80 transition-all duration-300 hover:border-[#4A7EB8]/60 hover:shadow-[#4A7EB8]/20">
        <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] xl:h-[450px] bg-slate-950 overflow-hidden">
          <Image
            src="/assets/about_laboratory_assembly_showcase.jpg"
            alt="SRTRONIX R&D Engineering Assembly and Electronic Testing Facility - Bengaluru, India"
            fill
            priority
            quality={100}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
          />

          {/* Floating Facility Badge */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-full bg-slate-950/90 text-[#7bb0ed] border border-[#4A7EB8]/60 shadow-lg backdrop-blur-md">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#7bb0ed] animate-pulse" />
              <span>R&amp;D Assembly &amp; Testing Facility</span>
            </span>
          </div>

          {/* Top Right Calibration Badge */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 pointer-events-none hidden sm:inline-flex">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-full bg-slate-950/85 text-emerald-400 border border-emerald-500/30 shadow-lg backdrop-blur-md">
              <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" />
              <span>Precision Calibrated</span>
            </span>
          </div>

          {/* Subtle Bottom Vignette */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
        </div>

        {/* Bottom Test Floor Status Bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-900/95 border-t border-slate-800 text-xs sm:text-sm text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Cpu className="w-4 h-4 text-[#7bb0ed] shrink-0" />
            <span className="text-slate-200 font-semibold truncate">Integrated Workbench Test Floor</span>
          </div>
          <span className="font-mono text-[#7bb0ed] font-bold bg-[#0f2a4a] px-2.5 sm:px-3 py-1 rounded-lg border border-[#4A7EB8]/40 shadow-sm text-[11px] sm:text-xs shrink-0">
            SR-LAB-FLOOR
          </span>
        </div>
      </div>
    </div>
  );
}

export default AboutShowcase3D; 
