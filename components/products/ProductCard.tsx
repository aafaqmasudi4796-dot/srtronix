'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <ThreeDCard
      maxTilt={14}
      depth={1.03}
      glowColor="rgba(74, 126, 184, 0.45)"
      className={`group relative flex flex-col bg-slate-900/75 rounded-2xl border border-slate-800/90 hover:border-[#4A7EB8]/70 shadow-xl shadow-black/60 transition-colors duration-300 overflow-hidden ${
        featured ? 'ring-1 ring-[#4A7EB8]/50 shadow-[#4A7EB8]/10' : ''
      }`}
    >
      {/* 3D FLOATING TOP BADGES */}
      <ThreeDLayer depth={45} className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-slate-950/95 text-[#7bb0ed] border border-[#4A7EB8]/60 shadow-lg shadow-black/80 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#7bb0ed] animate-pulse" />
            <span>{product.badge}</span>
          </span>
        ) : (
          <span />
        )}
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700/60 shadow-md backdrop-blur-md">
          {product.category}
        </span>
      </ThreeDLayer>

      {/* 3D FLOATING PRODUCT IMAGE AREA */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full aspect-[4/3] bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950/95 border-b border-slate-800/80 overflow-hidden block [transform-style:preserve-3d]"
      >
        {/* Holographic Ambient Light Pedestal */}
        <div className="absolute inset-x-8 bottom-3 h-8 rounded-full bg-[#4A7EB8]/20 blur-xl group-hover:bg-[#4A7EB8]/40 transition-colors duration-500 pointer-events-none" />

        {/* 3D Instrument Image Levitating in Space */}
        <ThreeDLayer depth={50} className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            quality={100}
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
          />
        </ThreeDLayer>

        {/* 3D Subtle Scanline Sweep on Hover */}
        <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#7bb0ed]/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scanline-3d pointer-events-none" />
      </Link>

      {/* 3D CARD CONTENT */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 bg-slate-900/40 [transform-style:preserve-3d]">
        <ThreeDLayer depth={25} className="mb-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-[#7bb0ed] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </ThreeDLayer>

        {/* 3D Elevated Key Specs Pills */}
        <ThreeDLayer depth={35} className="my-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          {product.keySpecs.slice(0, 4).map((spec, i) => (
            <div
              key={i}
              className="bg-slate-950/70 rounded-lg p-2.5 border border-slate-800/80 shadow-inner group-hover:border-[#4A7EB8]/30 transition-colors"
            >
              <div className="text-[10px] uppercase font-semibold text-[#7bb0ed] tracking-wide">
                {spec.label}
              </div>
              <div className="font-semibold text-slate-200 truncate text-[11px] sm:text-xs">
                {spec.value}
              </div>
            </div>
          ))}
        </ThreeDLayer>

        {/* 3D Footer Actions */}
        <ThreeDLayer depth={30} className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <Button
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            variant="secondary"
            size="sm"
            className="text-xs font-semibold shadow-md"
          >
            Inquire Now
          </Button>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#7bb0ed] transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-800/80"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ThreeDLayer>
      </div>
    </ThreeDCard>
  );
}

export default ProductCard;
