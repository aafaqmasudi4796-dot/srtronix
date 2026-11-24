'use client';

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Box,
  Layers,
  Cpu,
} from 'lucide-react';

export function AboutShowcase3D() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 sm:inset-10 z-50 flex flex-col bg-[#0b111a] rounded-2xl shadow-2xl border border-[#4A7EB8]/60 overflow-hidden'
          : 'w-full rounded-2xl overflow-hidden border border-[#4A7EB8]/30 shadow-2xl bg-gradient-to-b from-[#0f172a] to-[#090d16]'
      }`}
    >
      {/* 3D VIEWER HEADER TOOLBAR */}
      <div className="px-4 py-3 bg-[#0d1522] border-b border-slate-800 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0f2a4a] border border-[#4A7EB8]/40 flex items-center justify-center text-[#7bb0ed]">
            <Box className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wide uppercase text-[12px]">
                Interactive 3D Oscilloscope
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                WebGL Active
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Click &amp; drag to rotate · Scroll to zoom · Inspect internal circuits
            </p>
          </div>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleReset}
            title="Reset 3D Scene"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Reset</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Expand Mode' : 'Expand 3D Viewport'}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-cyan-300" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 3D CANVAS VIEWPORT (IFRAME EMBED) */}
      <div
        className={`relative w-full ${
          isFullscreen ? 'flex-1 min-h-[500px]' : 'h-[440px] sm:h-[480px] lg:h-[500px]'
        } bg-[#0b111a] overflow-hidden`}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0b111a] text-slate-400 gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-[#4A7EB8]/30 border-t-[#4A7EB8] animate-spin" />
            <span className="text-xs font-mono text-slate-300 tracking-wider">
              Initializing 3D Oscilloscope Geometry...
            </span>
          </div>
        )}

        {/* 3D WebGL Three.js Oscilloscope Simulation */}
        <iframe
          key={iframeKey}
          src="/oscilloscope-3d.html"
          title="SRTRONIX Interactive 3D Oscilloscope Viewer"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0 block"
          allow="accelerometer; gyroscope"
        />

        {/* Floating Feature Pills */}
        <div className="absolute top-3 left-3 pointer-events-none hidden sm:flex items-center gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-slate-900/80 text-[#7bb0ed] border border-[#4A7EB8]/50 shadow-md backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#7bb0ed]" />
            <span>Dual-Channel Benchtop</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-slate-900/80 text-cyan-300 border border-cyan-500/30 shadow-md backdrop-blur-md">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>X-Ray PCB Mode</span>
          </span>
        </div>
      </div>

      {/* FOOTER SPECS BAR */}
      <div className="p-3 sm:p-4 bg-[#0d1522] border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Layers className="w-3.5 h-3.5 text-[#4A7EB8]" />
            <span>100 MHz Bandwidth</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">1 GS/s Real-Time Sampling</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">2 Channels + Trigger</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[#7bb0ed] font-semibold bg-[#0f2a4a] px-2.5 py-0.5 rounded border border-[#4A7EB8]/40 text-[11px]">
            SR-DSO-1100
          </span>
        </div>
      </div>
    </div>
  );
}

export default AboutShowcase3D;
