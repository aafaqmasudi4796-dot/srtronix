// components/products/ProductCatalogView.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Check, ArrowRight, Filter } from "lucide-react";
import { products, productCategories } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";

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

        {/* 3D PRODUCT GRID */}
        <section className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
