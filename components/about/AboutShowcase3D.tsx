'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';
import {
  Sparkles,
  Activity,
  Box,
  Layers,
  Cpu,
  RotateCcw,
  Maximize2,
  Minimize2,
  Waves,
} from 'lucide-react';

export function AboutShowcase3D() {
  const [viewMode, setViewMode] = useState<'photo' | 'simulation'>('photo');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <div className={`relative transition-all duration-300 ${
      isFullscreen
        ? 'fixed inset-4 sm:inset-10 z-50 flex flex-col bg-[#0b111a] rounded-2xl shadow-2xl border border-[#4A7EB8]/60 overflow-hidden'
        : 'w-full'
    }`}>
      {/* HIGH-TECH VIEW MODE SWITCHER */}
      <div className="mb-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shadow-md">
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'photo'
                ? 'bg-[#4A7EB8] text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Oscilloscope Showcase</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('simulation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'simulation'
                ? 'bg-[#4A7EB8] text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive 3D Simulator</span>
          </button>
        </div>

        {/* Viewport Control Buttons */}
        <div className="flex items-center gap-1.5">
          {viewMode === 'simulation' && (
            <button
              type="button"
              onClick={() => setIframeKey((k) => k + 1)}
              title="Reset 3D Scene"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            title={isFullscreen ? 'Exit Expand Mode' : 'Expand View'}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-cyan-300" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* VIEWPORT CONTAINER */}
      <AnimatePresence mode="wait">
        {viewMode === 'photo' ? (
          /* 3D TILT CARD SHOWCASE WITH UPLOADED OSCILLOSCOPE IMAGE */
          <motion.div
            key="photo-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <ThreeDCard
              maxTilt={12}
              depth={1.03}
              glowColor="rgba(74, 126, 184, 0.45)"
              className="rounded-2xl border border-slate-800 shadow-2xl bg-gradient-to-b from-slate-900/95 via-[#0b121e] to-slate-950 overflow-hidden"
            >
              <ThreeDLayer depth={45}>
                <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-gradient-to-b from-[#0e1726] via-[#090d16] to-[#05080f] overflow-hidden flex items-center justify-center p-4 sm:p-8">
                  {/* High-tech oscilloscope grid background */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(74, 126, 184, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(74, 126, 184, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Radial center instrument backlight glow */}
                  <div className="absolute inset-0 bg-radial from-[#4A7EB8]/20 via-transparent to-transparent pointer-events-none blur-xl" />

                  {/* 3D Levitating Oscilloscope Image */}
                  <div className="relative w-full h-full max-w-[480px] max-h-[300px] flex items-center justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/assets/about_oscilloscope_dso2d15_clean.png"
                      alt="Hantek DSO2D15 Digital Storage Oscilloscope with Waveform Generator"
                      fill
                      priority
                      quality={95}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>

                  {/* Top-Left Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-950/85 text-[#7bb0ed] border border-[#4A7EB8]/60 shadow-lg backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
                      <span>150 MHz · 1 GSa/s Dual-Channel</span>
                    </span>
                  </div>

                  {/* Top-Right Floating Feature Pill */}
                  <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none hidden sm:inline-flex">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-lg backdrop-blur-md">
                      <Waves className="w-3 h-3 text-emerald-400" />
                      <span>Built-in AWG Generator</span>
                    </span>
                  </div>

                  {/* Specular Light Sweep Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </ThreeDLayer>

              {/* Bottom Specifications Ribbon */}
              <ThreeDLayer
                depth={25}
                className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Hantek DSO2D15 Digital Storage Oscilloscope</span>
                  <span className="text-slate-500 hidden sm:inline">•</span>
                  <span className="text-slate-400 hidden sm:inline">2CH + Signal Generator</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#7bb0ed] font-semibold bg-[#0f2a4a] px-2.5 py-0.5 rounded border border-[#4A7EB8]/40">
                    DSO2D15 / 150MHz
                  </span>
                </div>
              </ThreeDLayer>
            </ThreeDCard>
          </motion.div>
        ) : (
          /* INTERACTIVE 3D WEBGL OSCILLOSCOPE SIMULATOR */
          <motion.div
            key="simulation-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={`w-full rounded-2xl overflow-hidden border border-[#4A7EB8]/40 shadow-2xl bg-[#0b111a] ${
              isFullscreen ? 'flex-1 min-h-[500px]' : 'h-[440px] sm:h-[480px] lg:h-[500px]'
            }`}
          >
            <iframe
              key={iframeKey}
              src="/oscilloscope-3d.html"
              title="SRTRONIX Interactive 3D Oscilloscope Simulator"
              className="w-full h-full border-0 block"
              allow="accelerometer; gyroscope"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AboutShowcase3D;
