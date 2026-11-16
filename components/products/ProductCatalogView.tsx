// components/products/ProductCatalogView.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Check, ArrowRight, Filter } from "lucide-react";
import { products, productCategories } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ProductCatalogView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full bg-[#09090b] text-slate-100 min-h-screen">
      <Container size="wide" className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
        {/* CATALOG HEADER */}
        <div className="max-w-3xl mb-8 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f2a4a]/80 border border-[#4A7EB8]/40 text-[#7bb0ed] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#4A7EB8]" />
            <span>SRTRONIX Instrument Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Precision Test &amp; Measurement Equipment
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            Explore our complete range of smart workbench systems, digital oscilloscopes, linear DC power supplies, and calibration instruments engineered &amp; assembled in India.
          </p>
        </div>

        {/* CATEGORY FILTER TABS (Scrollable on mobile) */}
        <div className="mb-8 sm:mb-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#4A7EB8]" />
            <span>Filter:</span>
          </span>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#4A7EB8] text-white shadow-md shadow-[#4A7EB8]/30"
                    : "border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* PRODUCT GRID */}
        <section className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col rounded-2xl border border-neutral-800/90 bg-neutral-900/30 p-4 sm:p-5 transition-all duration-300 hover:border-[#4A7EB8]/60 hover:bg-neutral-900/60 hover:shadow-xl hover:shadow-[#4A7EB8]/10"
            >
              {/* Product Image Area - Full Ultra HD */}
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View ${product.name}`}
                className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950/80 p-2 flex items-center justify-center block"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                />

                {/* Subtle category tag badge on image */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="rounded-md border border-[#4A7EB8]/30 bg-neutral-950/90 px-2 py-0.5 text-[10px] font-medium text-[#7bb0ed] backdrop-blur-xs">
                    {product.category}
                  </span>
                </div>

                {product.badge && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="rounded-md border border-amber-500/30 bg-amber-950/80 px-2 py-0.5 text-[10px] font-medium text-amber-300 backdrop-blur-xs">
                      {product.badge}
                    </span>
                  </div>
                )}
              </Link>

              {/* Title and Icon */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link href={`/products/${product.slug}`}>
                  <h2 className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-[#7bb0ed]">
                    {product.name}
                  </h2>
                </Link>
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`Open ${product.name}`}
                  className="p-1 text-neutral-400 transition-all duration-200 group-hover:text-[#4A7EB8] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed transition-colors group-hover:text-neutral-300 line-clamp-3 mb-4">
                {product.description}
              </p>

              {/* Key Specs Pills */}
              {product.keySpecs && product.keySpecs.length > 0 && (
                <div className="mb-4 mt-auto pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-1.5 text-xs">
                  {product.keySpecs.slice(0, 2).map((spec, i) => (
                    <div
                      key={i}
                      className="bg-neutral-950/60 rounded-lg p-2 border border-neutral-800/60"
                    >
                      <div className="text-[10px] uppercase font-semibold text-[#7bb0ed] tracking-wider truncate">
                        {spec.label}
                      </div>
                      <div className="font-semibold text-slate-200 truncate text-[11px]">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-auto pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                <Button
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  size="sm"
                  className="text-xs font-semibold"
                >
                  Inquire Now
                </Button>

                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-[#7bb0ed] transition-colors py-1.5 px-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No instruments found in this category.
          </div>
        )}
      </Container>
    </div>
  );
}
