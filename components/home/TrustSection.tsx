import React from 'react';
import { Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function TrustSection() {
  return (
    <section className="pt-6 sm:pt-3 pb-8 sm:pb-12 md:pb-14 bg-[#09090b] border-b border-slate-800/80">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Trust Banner - Exact layout from reference image */}
          <div className="flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0f2a4a]/40 via-slate-900/80 to-[#0f2a4a]/40 border border-[#4A7EB8]/30 shadow-md text-center space-y-2">
            {/* 5 Stars Centered: 4 Full + 1 Partial (Half-Filled for 4.5 Rating) */}
            <div className="flex items-center justify-center gap-1.5 text-amber-400">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                />
              ))}

              {/* 5th Star: 50% Partially Filled */}
              <div className="relative inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
                {/* Empty / Muted Star Base */}
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/30 fill-amber-400/20" />
                {/* 50% Clipped Filled Overlay */}
                <div className="absolute inset-y-0 left-0 overflow-hidden w-[50%]">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 max-w-none" />
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Trusted by 1,200+ Engineers &amp; Labs Worldwide
            </h3>

            {/* Subtitle / Details */}
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              Rated 4.5/5 · Quality Assured · Expert Support
            </p>
          </div>

          {/* Value props badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-slate-800/80 text-center">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold text-white">0.05%</div>
              <div className="text-xs text-slate-400 font-medium">Precision Tolerance</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium">Domestic Assembly</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold text-white">1500 mm</div>
              <div className="text-xs text-slate-400 font-medium">Custom Heavy Bench</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold text-white">SCPI</div>
              <div className="text-xs text-slate-400 font-medium">Full Lab Automation</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TrustSection;
