'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Download,
  PhoneCall,
  Check,
} from 'lucide-react';
import { Product } from '@/types/product';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { companyDetails } from '@/data/products';

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#09090b] pt-24 sm:pt-28 pb-12 sm:pb-16 text-slate-200">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#7bb0ed] transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/products" className="hover:text-[#7bb0ed] transition-colors">
            Products
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#7bb0ed] transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Top Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 pb-14 border-b border-slate-800">
          {/* Left Column: Static Clean Image Showcase / Gallery (No 3D Tilt) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="group relative aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/80">
              {/* High-Definition Instrument Image */}
              <div className="w-full h-full relative flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                />
              </div>

              {/* Elevated Badges */}
              {product.badge && (
                <div className="absolute top-4 left-4 pointer-events-none">
                  <div className="bg-[#0f2a4a]/95 text-[#7bb0ed] text-xs font-semibold px-3 py-1 rounded-full border border-[#4A7EB8]/60 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#7bb0ed] animate-pulse" />
                    <span>{product.badge}</span>
                  </div>
                </div>
              )}

              <div className="absolute top-4 right-4 pointer-events-none">
                <div className="bg-slate-950/90 text-slate-200 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A7EB8]" />
                  <span>Ultra HD</span>
                </div>
              </div>

              {/* Ambient Pedestal Glow */}
              <div className="absolute inset-x-12 bottom-3 h-8 rounded-full bg-[#4A7EB8]/20 blur-xl pointer-events-none" />
            </div>

            {/* Gallery thumbnails note */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Engineered &amp; Assembled in India</span>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-[#7bb0ed] font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Details & Purchasing Inquiry */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f2a4a]/70 border border-[#4A7EB8]/60 text-[#7bb0ed] text-xs font-semibold">
                <span>{product.category}</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Key Specs Matrix */}
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Highlights &amp; Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.keySpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-slate-900/80 border border-slate-800"
                    >
                      <div className="text-[11px] font-medium text-[#7bb0ed] uppercase tracking-wide">
                        {spec.label}
                      </div>
                      <div className="font-bold text-white text-sm mt-0.5">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquire CTA Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#0f2a4a]/60 via-slate-900/90 to-[#0f2a4a]/40 border border-[#4A7EB8]/40 space-y-4 shadow-xl shadow-black/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs uppercase font-bold text-[#7bb0ed] tracking-wider">
                    Institutional &amp; Commercial Inquiries
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Official quote, custom options, and technical support
                  </div>
                </div>
                <div className="self-start sm:self-auto">
                  <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
                    Direct OEM Supply
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  size="lg"
                  className="w-full sm:w-auto flex-1 font-semibold shadow-md shadow-[#4A7EB8]/30 justify-center"
                >
                  <span>INQUIRE NOW FOR THIS INSTRUMENT</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>

                <Button
                  href={`tel:${companyDetails.phone}`}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                >
                  <PhoneCall className="w-4 h-4 mr-1 text-[#7bb0ed]" />
                  <span>Call Sales</span>
                </Button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Fast response within 24 hours</span>
                <span>GST Invoicing &amp; Warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Technical Specifications & Features Tabs */}
        <div className="py-14 border-b border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Technical Specifications Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Technical Specifications
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Verified parameters and performance benchmarks for {product.name}.
                </p>
              </div>

              <div className="space-y-6">
                {product.fullSpecs.map((group, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-xl overflow-hidden shadow-md bg-slate-900/40"
                  >
                    <div className="bg-slate-800/80 px-4 py-2.5 border-b border-slate-800">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        {group.category}
                      </h3>
                    </div>
                    <dl className="divide-y divide-slate-800/60">
                      {group.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm hover:bg-slate-800/30 transition-colors"
                        >
                          <dt className="font-semibold text-slate-400 sm:col-span-1">
                            {item.label}
                          </dt>
                          <dd className="text-slate-100 sm:col-span-2 font-mono sm:font-sans font-medium">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Key Features & Applications */}
            <div className="lg:col-span-5 space-y-8">
              {/* Features List */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white">
                  Key Instrument Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7EB8] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supported Applications */}
              {product.applications && product.applications.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4 shadow-md">
                  <h3 className="text-lg font-bold text-white">
                    Target Applications &amp; Lab Settings
                  </h3>
                  <div className="space-y-2">
                    {product.applications.map((app, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm text-slate-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A7EB8] shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-14 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Related Instruments
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Other precision equipment frequently paired with {product.name}.
                </p>
              </div>
              <Button href="/products" variant="outline" size="sm">
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
