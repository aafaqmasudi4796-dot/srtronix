'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <div
      className={`group relative flex flex-col bg-slate-900/60 rounded-xl border border-slate-800/90 hover:border-[#4A7EB8]/60 hover:shadow-xl hover:shadow-[#4A7EB8]/20 transition-all duration-300 overflow-hidden ${
        featured ? 'ring-1 ring-[#4A7EB8]/40' : ''
      }`}
    >
      {/* Top badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-slate-950/90 text-[#7bb0ed] border border-[#4A7EB8]/50 shadow-xs backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-[#4A7EB8]" />
            {product.badge}
          </span>
        ) : (
          <span />
        )}
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/50 backdrop-blur-xs">
          {product.category}
        </span>
      </div>

      {/* Product Image Area - Full Ultra HD */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full aspect-[4/3] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950/80 border-b border-slate-800/80 overflow-hidden block"
      >
        <div className="absolute inset-0 flex items-center justify-center p-2.5 sm:p-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            quality={100}
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-1 group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 bg-slate-900/40">
        <div className="mb-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-[#7bb0ed] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Key Specs Pills */}
        <div className="my-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          {product.keySpecs.slice(0, 4).map((spec, i) => (
            <div
              key={i}
              className="bg-slate-800/60 rounded-md p-2 border border-slate-700/50"
            >
              <div className="text-[10px] uppercase font-semibold text-[#7bb0ed] tracking-wide">
                {spec.label}
              </div>
              <div className="font-semibold text-slate-200 truncate text-[11px] sm:text-xs">
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <Button
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            variant="secondary"
            size="sm"
            className="text-xs font-semibold"
          >
            Inquire Now
          </Button>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-[#7bb0ed] transition-colors py-1.5 px-2 rounded-md hover:bg-slate-800"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
