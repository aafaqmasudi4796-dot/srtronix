'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

import { products, productCategories } from '@/data/products';
import { Product } from '@/types/product';

interface ProductsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductsMegaMenu({
  isOpen,
  onClose,
}: ProductsMegaMenuProps) {
  const [hoveredProduct, setHoveredProduct] = useState<Product>(products[0]);

  if (!isOpen || !products.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5
        z-50 w-[92vw] max-w-5xl overflow-hidden rounded-2xl
        border border-[#4A7EB8]/30 bg-[#090a0f]/[98%] p-4 sm:p-5
        text-white shadow-2xl shadow-black/90 backdrop-blur-2xl"
    >
      {/* Top Header */}
      <div className="mb-3.5 flex flex-col gap-2 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7bb0ed]">
            <Sparkles className="h-3.5 w-3.5 text-[#4A7EB8]" />
            <span>Explore SR TRONIX Instruments</span>
          </div>

          <p className="mt-0.5 text-[11px] text-neutral-400">
            Move your cursor over any product to preview its details.
          </p>
        </div>

        <Link
          href="/products"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7bb0ed] transition-colors hover:text-white"
        >
          <span>Open Full Catalog</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12 lg:gap-5">
        {/* Product List */}
        <div className="lg:col-span-7">
          <div className="mb-1.5 flex items-center justify-between px-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            <span>Our Products</span>
            <span className="hidden sm:inline">Category / Key Specification</span>
          </div>

          <div className="max-h-[360px] space-y-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
            {products.map((product) => {
              const isSelected = hoveredProduct.id === product.id;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredProduct(product)}
                  onFocus={() => setHoveredProduct(product)}
                  className={`group relative flex items-center justify-between gap-2.5 overflow-hidden rounded-xl border px-2.5 py-1.5 transition-all duration-150 ${isSelected
                    ? 'border-[#4A7EB8]/60 bg-[#4A7EB8]/15 text-white shadow-md shadow-[#4A7EB8]/20'
                    : 'border-white/[0.06] bg-white/[0.02] text-neutral-300 hover:border-[#4A7EB8]/30 hover:bg-[#4A7EB8]/[0.05]'
                    }`}
                >
                  {/* Active Product Indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-product-indicator"
                      className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-[#4A7EB8]"
                      transition={{ duration: 0.18 }}
                    />
                  )}

                  {/* Product Name and Thumbnail */}
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/50 p-1">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="32px"
                        className="object-contain p-0.5"
                      />
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`truncate text-xs font-semibold transition-colors ${isSelected
                          ? 'text-[#7bb0ed]'
                          : 'group-hover:text-white'
                          }`}
                      >
                        {product.name}
                      </div>

                      <div className="mt-0.5 truncate text-[9.5px] text-neutral-500 sm:hidden">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  {/* Category and Specification */}
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9.5px] font-medium text-neutral-400">
                      {product.category}
                    </span>

                    <span className="max-w-[120px] truncate text-right font-mono text-[9.5px] text-neutral-400">
                      {product.keySpecs[0]?.value}
                    </span>

                    <ChevronRight
                      className={`h-3.5 w-3.5 transition-all duration-200 ${isSelected
                        ? 'translate-x-0.5 text-[#7bb0ed]'
                        : 'text-neutral-600 group-hover:text-neutral-300'
                        }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dynamic Product Preview */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredProduct.id}
              initial={{ opacity: 0, y: 6, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.99 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex h-full flex-col justify-between rounded-xl border border-[#4A7EB8]/30 bg-gradient-to-br from-neutral-900/90 via-[#0a121e]/90 to-black p-3.5 sm:p-4 shadow-xl shadow-black/60"
            >
              <div>
                {/* Product Badge */}
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4A7EB8]/40 bg-[#0f2a4a] px-2.5 py-0.5 text-[10px] font-semibold text-[#7bb0ed]">
                    <Sparkles className="h-3 w-3 text-[#4A7EB8]" />
                    {hoveredProduct.badge || hoveredProduct.category}
                  </span>

                  <span className="text-[9px] font-mono tracking-wider text-neutral-500">
                    SR TRONIX
                  </span>
                </div>

                {/* Product Image */}
                <Link
                  href={`/products/${hoveredProduct.slug}`}
                  onClick={onClose}
                  className="group relative my-2 block aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-black/60 p-2"
                >
                  <Image
                    src={hoveredProduct.image}
                    alt={hoveredProduct.name}
                    fill
                    quality={100}
                    unoptimized={true}
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-contain p-1 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  />

                  <div className="absolute bottom-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black/70 text-neutral-400 transition-all group-hover:border-[#4A7EB8]/50 group-hover:text-[#7bb0ed]">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>

                {/* Product Name */}
                <Link
                  href={`/products/${hoveredProduct.slug}`}
                  onClick={onClose}
                  className="group"
                >
                  <h3 className="text-sm font-bold text-white transition-colors group-hover:text-[#7bb0ed]">
                    {hoveredProduct.name}
                  </h3>
                </Link>

                {/* Description */}
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-neutral-400">
                  {hoveredProduct.shortDescription}
                </p>

                {/* Specifications */}
                <div className="mt-3 grid grid-cols-2 gap-1.5 border-t border-white/[0.07] pt-2.5">
                  {hoveredProduct.keySpecs.slice(0, 4).map((spec, index) => (
                    <div
                      key={`${spec.label}-${index}`}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-1.5"
                    >
                      <div className="truncate text-[8.5px] font-semibold uppercase tracking-wider text-[#7bb0ed]">
                        {spec.label}
                      </div>

                      <div className="mt-0.5 truncate text-[10px] font-semibold text-neutral-200">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center gap-2 border-t border-white/[0.07] pt-2.5">
                <Link
                  href={`/products/${hoveredProduct.slug}`}
                  onClick={onClose}
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#4A7EB8] px-3 py-2 text-xs font-bold text-white shadow-md shadow-[#4A7EB8]/25 transition-all hover:bg-[#3d6ea4] hover:shadow-lg hover:shadow-[#4A7EB8]/35 active:scale-[0.98]"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href={`/contact?product=${encodeURIComponent(
                    hoveredProduct.name
                  )}`}
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-neutral-300 transition-all hover:border-[#4A7EB8]/40 hover:bg-white/[0.08] hover:text-[#7bb0ed]"
                >
                  Inquire
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Category Links */}
      <div className="mt-3.5 flex flex-col gap-2.5 border-t border-white/[0.07] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[9.5px] font-semibold uppercase tracking-wider text-neutral-500">
            Categories:
          </span>

          {productCategories.slice(1).map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              onClick={onClose}
              className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[9.5px] text-neutral-400 transition-colors hover:border-[#4A7EB8]/40 hover:bg-[#4A7EB8]/10 hover:text-[#7bb0ed]"
            >
              {category}
            </Link>
          ))}
        </div>

        <Link
          href="/products"
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#7bb0ed] transition-colors hover:text-white"
        >
          <span>Complete Catalog ({products.length})</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
