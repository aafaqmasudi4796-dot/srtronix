'use client';

import React from 'react';
import Image from 'next/image';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';
import { Sparkles, Activity } from 'lucide-react';

export function AboutShowcase3D() {
  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* 3D FLOATING SPECTRUM ANALYZER CARD */}
      <ThreeDCard
        maxTilt={12}
        depth={1.03}
        glowColor="rgba(74, 126, 184, 0.45)"
        rimBorder={true}
        pedestal={true}
        className="w-full max-w-[620px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/80"
      >
        <ThreeDLayer depth={35}>
          <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
            <Image
              src="/assets/about_fsv_spectrum_analyzer_showcase.jpg"
              alt="SRTRONIX FSV Signal and Spectrum Analyzer Precision Laboratory Workbench"
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* 3D Floating Instrument Badge */}
            <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-950/90 text-[#7bb0ed] border border-[#4A7EB8]/60 shadow-lg backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
                <span>FSV Signal &amp; Spectrum Analyzer</span>
              </span>
            </div>

            {/* Holographic Subtle Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </ThreeDLayer>

        <ThreeDLayer
          depth={20}
          className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#7bb0ed]" />
            <span className="text-slate-400 font-medium">RF Spectrum Testing</span>
          </div>
          <span className="font-mono text-[#7bb0ed] font-semibold bg-[#0f2a4a] px-2.5 py-0.5 rounded border border-[#4A7EB8]/40">
            FSV-13.6GHz
          </span>
        </ThreeDLayer>
      </ThreeDCard>
    </div>
  );
}

export default AboutShowcase3D;
