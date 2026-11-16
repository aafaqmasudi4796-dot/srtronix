'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';

export function FeaturedProducts() {
  const featuredIds = [
    'handheld-oscilloscope-hds272s',
    'dc-power-supply-mps-200',
    'electronic-smart-work-station',
  ];

  const featuredItems = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter((product) => product !== undefined);

  return (
    <section className="border-b border-slate-800/80 bg-[#09090b] py-12 sm:py-16 md:py-20">
      <Container>
        <div className="mb-10 sm:mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            badge="FEATURED INSTRUMENTS"
            title="Core Laboratory Solutions"
            description="High-precision instruments engineered for daily testing accuracy, laboratory durability, and field service agility."
          />

          <Button
            href="/products"
            variant="outline"
            className="self-start md:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {featuredItems.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-2 hover:border-[#4A7EB8]/60 hover:shadow-[#4A7EB8]/20"
            >
              {/* HEADER BADGE */}
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#4A7EB8]/50 bg-[#0f2a4a]/80 px-2.5 py-1 text-xs font-semibold text-[#7bb0ed]">
                  {product.badge || product.category}
                </span>

                <span className="font-mono text-[11px] text-slate-500">
                  SR-LAB
                </span>
              </div>

              {/* CLICKABLE IMAGE - Full Ultra HD */}
              <Link
                href={`/products/${product.slug}`}
                aria-label={`View ${product.name} details`}
                className="relative mb-6 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2 sm:p-3"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                />
              </Link>

              {/* PRODUCT DETAILS */}
              <div className="flex flex-1 flex-col">
                <Link
                  href={`/products/${product.slug}`}
                  className="w-fit"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-[#7bb0ed]">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {product.shortDescription}
                </p>

                {/* PRODUCT SPECIFICATIONS */}
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                  {product.keySpecs.slice(0, 3).map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#4A7EB8]" />

                      <span>
                        <strong className="font-semibold text-slate-200">
                          {spec.label}:
                        </strong>{' '}
                        {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ACTION BUTTONS */}
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-800 pt-5 sm:pt-6">
                  <Button
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    size="sm"
                    className="text-xs font-semibold"
                  >
                    Inquire Now
                  </Button>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-[#7bb0ed]"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* FULL CARD CLICK AREA */}
              <Link
                href={`/products/${product.slug}`}
                aria-label={`Open ${product.name}`}
                className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7EB8]"
              />

              {/* Keep action buttons above the full-card link */}
              <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 h-10">
                <div className="pointer-events-auto flex h-full items-center justify-between">
                  <span className="h-full w-[45%]" />
                  <span className="h-full w-[45%]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProducts;
