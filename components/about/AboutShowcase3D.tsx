'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';
import {
  Sparkles,
  Activity,
  Box,
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
    <div
      className={`relative transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 sm:inset-10 z-50 flex flex-col bg-[#09090b] rounded-3xl shadow-2xl overflow-hidden'
          : 'w-full bg-transparent'
      }`}
    >
      {/* SEAMLESS VIEW MODE SWITCHER - MATCHES #09090b PAGE */}
      <div className="mb-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5 p-1 bg-[#121216]/80 rounded-2xl backdrop-blur-md shadow-md">
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'photo'
                ? 'bg-[#4A7EB8] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Oscilloscope Showcase</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('simulation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'simulation'
                ? 'bg-[#4A7EB8] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
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
              className="p-2 rounded-xl bg-[#121216]/80 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs flex items-center gap-1 shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            title={isFullscreen ? 'Exit Expand Mode' : 'Expand View'}
            className="p-2 rounded-xl bg-[#121216]/80 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shadow-md"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-cyan-300" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* VIEWPORT CONTAINER - BLENDS 100% SEAMLESSLY INTO #09090b */}
      <AnimatePresence mode="wait">
        {viewMode === 'photo' ? (
          /* SEAMLESS PHOTO SHOWCASE ON PAGE BACKGROUND (#09090b) */
          <motion.div
            key="photo-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <ThreeDCard
              maxTilt={10}
              depth={1.025}
              glowColor="rgba(74, 126, 184, 0.35)"
              rimBorder={false}
              pedestal={false}
              className="rounded-3xl bg-transparent overflow-hidden"
            >
              <ThreeDLayer depth={40}>
                {/* Image Display Canvas - Same Dark Black (#09090b) as the page */}
                <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] bg-[#09090b] overflow-hidden flex items-center justify-center p-2 sm:p-5">
                  {/* Subtle Atmospheric Instrument Glow */}
                  <div className="absolute inset-0 bg-radial from-[#4A7EB8]/15 via-transparent to-transparent pointer-events-none blur-3xl" />

                  {/* ENLARGED OSCILLOSCOPE DIRECTLY ON THE PAGE BACKGROUND */}
                  <div className="relative w-full h-full max-w-[650px] max-h-[460px] flex items-center justify-center hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/assets/about_oscilloscope_dso2d15_clean.png"
                      alt="Hantek DSO2D15 Digital Storage Oscilloscope with Waveform Generator"
                      fill
                      priority
                      quality={100}
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-contain p-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
                    />
                  </div>

                  {/* Floating Spec Badges (Soft Blur, Borderless) */}
                  <div className="absolute top-3 left-3 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#121216]/80 text-[#7bb0ed] shadow-lg backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
                      <span>150 MHz · 1 GSa/s Dual-Channel</span>
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-20 pointer-events-none hidden sm:inline-flex">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-semibold rounded-full bg-[#121216]/80 text-emerald-400 shadow-lg backdrop-blur-md">
                      <Waves className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Built-in AWG Generator</span>
                    </span>
                  </div>
                </div>
              </ThreeDLayer>

              {/* Seamless Bottom Information Ribbon */}
              <ThreeDLayer
                depth={20}
                className="px-4 py-3 bg-[#09090b] text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white tracking-wide">
                    Hantek DSO2D15 Digital Storage Oscilloscope
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-slate-400 hidden sm:inline">2CH + Signal Generator</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#7bb0ed] font-bold bg-[#0f2a4a]/80 px-3 py-1 rounded-lg text-[11px] shadow-sm">
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
            className={`w-full rounded-3xl overflow-hidden shadow-2xl bg-[#09090b] ${
              isFullscreen ? 'flex-1 min-h-[500px]' : 'h-[460px] sm:h-[500px] lg:h-[530px]'
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
