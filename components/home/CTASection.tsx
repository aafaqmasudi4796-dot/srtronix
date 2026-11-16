import React from 'react';
import { ArrowRight, Phone, Mail, FileText } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { companyDetails } from '@/data/products';

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#09090b] relative overflow-hidden">
      <Container>
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0f2a4a]/70 via-slate-900/90 to-black text-white p-5 sm:p-8 md:p-12 lg:p-16 overflow-hidden border border-[#4A7EB8]/30 shadow-2xl shadow-black">
          {/* Subtle decorative glow accents */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#4A7EB8]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#7bb0ed]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#7bb0ed] text-xs font-semibold uppercase tracking-wider border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7EB8]" />
              <span>Direct Laboratory Consultation</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Looking for the Right Test &amp; Measurement Solution?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
              Connect with our team to find the right instrumentation for your laboratory, research, education, or industrial application.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                href="/contact"
                size="lg"
                className="bg-[#4A7EB8] text-white hover:bg-[#3d6ea4] font-semibold shadow-lg hover:shadow-xl transition-all justify-center"
              >
                <span>CONTACT SRTRONIX</span>
                <ArrowRight className="w-4 h-4 ml-1 text-white" />
              </Button>

              <Button
                href={`tel:${companyDetails.phone}`}
                variant="outline"
                size="lg"
                className="bg-slate-900/80 text-white border-slate-700 hover:bg-slate-800 justify-center"
              >
                <Phone className="w-4 h-4 mr-1 text-[#7bb0ed]" />
                <span>Call {companyDetails.phone}</span>
              </Button>
            </div>

            {/* Quick response note */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#7bb0ed]" />
                Custom Quotations Within 24 Hours
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#7bb0ed]" />
                {companyDetails.email}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
