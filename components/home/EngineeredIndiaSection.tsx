'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Cog, Factory } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function EngineeredIndiaSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-950/80 border-b border-slate-800 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Visual Showcase Left */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 shadow-2xl p-4 sm:p-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
                <Image
                  src="/assets/digital_oscilloscope_in_use.jpg"
                  alt="SRTRONIX Engineered and Assembled in India - Laboratory Instrumentation"
                  fill
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Quality Seal */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-200">Direct From Indian Assembly</span>
                </div>
                <span className="font-mono text-[#7bb0ed] font-medium">NABL & Traceable Cal.</span>
              </div>
            </div>
          </div>

          {/* Editorial Content Right */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f2a4a]/70 text-[#7bb0ed] text-xs font-semibold tracking-wider uppercase border border-[#4A7EB8]/40">
              <Factory className="w-3.5 h-3.5 text-[#4A7EB8]" />
              <span>National Engineering Pride</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              PROUDLY ENGINEERED &amp; ASSEMBLED IN INDIA
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed font-normal">
              Every SRTRONIX instrument is designed, engineered, and assembled in India with meticulous attention to detail, using high-quality components and modern craftsmanship. We focus on creating elegant, durable, and reliable lab workbench gear that brings absolute accuracy to engineers and institutions across India.
            </p>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-1">
                  <Cog className="w-4 h-4 text-[#4A7EB8]" />
                  <span>Robust Mechanical Fabrication</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Heavy-duty mild steel enclosures treated with electrostatic powder coating for lifetime laboratory resilience.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#4A7EB8]" />
                  <span>Direct Technical Backing</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Local engineering support, domestic spare parts availability, and institutional calibration warranty.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button href="/about" size="lg" className="font-semibold w-full sm:w-auto justify-center">
                <span>DISCOVER MORE</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
