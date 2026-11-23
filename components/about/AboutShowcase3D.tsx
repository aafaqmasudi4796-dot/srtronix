'use client';

import React from 'react';
import Image from 'next/image';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';
import { Sparkles } from 'lucide-react';

export function AboutShowcase3D() {
  return (
    <ThreeDCard
      maxTilt={14}
      depth={1.03}
      glowColor="rgba(74, 126, 184, 0.45)"
      className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/90"
    >
      <ThreeDLayer depth={45}>
        <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
          <Image
            src="/assets/hero_slide_2_smart_workbench_uhd.png"
            alt="SRTRONIX Smart Work Station Assembly"
            fill
            quality={95}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* 3D Floating Badge */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-950/90 text-[#7bb0ed] border border-[#4A7EB8]/60 shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
              <span>3D Modular Console</span>
            </span>
          </div>

          {/* Holographic light reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>
      </ThreeDLayer>

      <ThreeDLayer depth={25} className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>Customizable Workbench Console</span>
        <span className="font-mono text-[#7bb0ed] font-semibold bg-[#0f2a4a] px-2.5 py-0.5 rounded border border-[#4A7EB8]/40">
          SR-STATION-1500
        </span>
      </ThreeDLayer>
    </ThreeDCard>
  );
}

export default AboutShowcase3D;
