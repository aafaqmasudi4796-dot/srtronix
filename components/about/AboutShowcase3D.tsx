'use client';

import React from 'react';
import Image from 'next/image';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';
import { Sparkles, Activity, Radio } from 'lucide-react';

export function AboutShowcase3D() {
  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* 3D FLOATING ENLARGED SPECTRUM ANALYZER CARD */}
      <ThreeDCard
        maxTilt={10}
        depth={1.03}
        glowColor="rgba(74, 126, 184, 0.45)"
        rimBorder={true}
        pedestal={true}
        className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/90"
      >
        <ThreeDLayer depth={35}>
          <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[490px] xl:h-[530px] bg-slate-950 overflow-hidden">
            <Image
              src="/assets/about_fsv_spectrum_analyzer_showcase.jpg"
              alt="SRTRONIX FSV Signal and Spectrum Analyzer Precision Laboratory Workbench"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* 3D Floating Instrument Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-950/90 text-[#7bb0ed] border border-[#4A7EB8]/60 shadow-lg backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
                <span>FSV Signal &amp; Spectrum Analyzer</span>
              </span>
            </div>

            {/* Top Right Frequency Range Badge */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:inline-flex">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-950/85 text-emerald-400 border border-emerald-500/30 shadow-lg backdrop-blur-md">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>9 kHz – 13.6 GHz</span>
              </span>
            </div>

            {/* Holographic Subtle Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </ThreeDLayer>

        <ThreeDLayer
          depth={20}
          className="px-5 py-3.5 bg-slate-900/95 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#7bb0ed]" />
            <span className="text-slate-300 font-medium sm:text-sm">Real-Time RF Signal &amp; Spectrum Analysis</span>
          </div>
          <span className="font-mono text-[#7bb0ed] font-bold bg-[#0f2a4a] px-3 py-1 rounded-lg border border-[#4A7EB8]/40 shadow-sm text-xs">
            FSV-13.6GHz
          </span>
        </ThreeDLayer>
      </ThreeDCard>
    </div>
  );
}

export default AboutShowcase3D;
