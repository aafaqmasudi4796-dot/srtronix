'use client';

import React from 'react';
import Image from 'next/image';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export function AboutShowcase3D() {
  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* 3D FLOATING ENLARGED LABORATORY FACILITY SHOWCASE */}
      <ThreeDCard
        maxTilt={8}
        depth={1.03}
        glowColor="rgba(74, 126, 184, 0.45)"
        rimBorder={true}
        pedestal={true}
        className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/90"
      >
        <ThreeDLayer depth={35}>
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] xl:h-[600px] bg-slate-950 overflow-hidden">
            <Image
              src="/assets/about_laboratory_assembly_showcase.jpg"
              alt="SRTRONIX R&D Engineering Assembly and Electronic Testing Facility"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* 3D Floating Facility Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-950/90 text-[#7bb0ed] border border-[#4A7EB8]/60 shadow-lg backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
                <span>R&amp;D Assembly &amp; Testing Facility</span>
              </span>
            </div>

            {/* Top Right Calibration Badge */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:inline-flex">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-950/85 text-emerald-400 border border-emerald-500/30 shadow-lg backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Precision Calibrated</span>
              </span>
            </div>

            {/* Holographic Subtle Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </ThreeDLayer>

        <ThreeDLayer
          depth={20}
          className="px-5 py-3.5 bg-slate-900/95 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#7bb0ed]" />
            <span className="text-slate-300 font-medium sm:text-sm">Integrated Workbench Test Floor</span>
          </div>
          <span className="font-mono text-[#7bb0ed] font-bold bg-[#0f2a4a] px-3 py-1 rounded-lg border border-[#4A7EB8]/40 shadow-sm text-xs">
            SR-LAB-FLOOR
          </span>
        </ThreeDLayer>
      </ThreeDCard>
    </div>
  );
}

export default AboutShowcase3D;
