'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';
import { ThreeDCard, ThreeDLayer } from '@/components/ui/ThreeDCard';

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
    <section className="border-b border-slate-800/80 bg-[#09090b] py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <Container>
        <div className="mb-10 sm:mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            badge="3D FEATURED INSTRUMENTS"
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

        {/* 3D FEATURED PRODUCTS GRID */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {featuredItems.map((product) => (
            <ThreeDCard
              key={product.id}
              maxTilt={12}
              depth={1.03}
              glowColor="rgba(74, 126, 184, 0.45)"
              className="group relative flex flex-col rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 sm:p-6 shadow-xl shadow-black/60 transition-colors duration-300 hover:border-[#4A7EB8]/70"
            >
              {/* 3D HEADER BADGE */}
              <ThreeDLayer depth={45} className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#4A7EB8]/60 bg-[#0f2a4a]/90 px-3 py-1 text-xs font-semibold text-[#7bb0ed] shadow-md backdrop-blur-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#7bb0ed] animate-pulse" />
                  <span>{product.badge || product.category}</span>
                </span>

                <span className="font-mono text-[11px] text-slate-500 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  SR-LAB 3D
                </span>
              </ThreeDLayer>

              {/* 3D FLOATING IMAGE */}
              <ThreeDLayer depth={55} className="mb-6">
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name} details`}
                  className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 p-3 sm:p-4 shadow-inner"
                >
                  {/* Holographic Pedestal Glow */}
                  <div className="absolute inset-x-8 bottom-2 h-7 rounded-full bg-[#4A7EB8]/25 blur-lg group-hover:bg-[#4A7EB8]/45 transition-colors pointer-events-none" />

                  <Image
                    src={product.image}
                    alt={`${product.name} - ${product.category} by SRTRONIX Instruments`}
                    fill
                    quality={100}
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                  />
                </Link>
              </ThreeDLayer>

              {/* 3D PRODUCT DETAILS */}
              <div className="flex flex-1 flex-col [transform-style:preserve-3d]">
                <ThreeDLayer depth={30} className="w-fit">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-[#7bb0ed]">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {product.shortDescription}
                  </p>
                </ThreeDLayer>

                {/* 3D PRODUCT SPECIFICATIONS */}
                <ThreeDLayer depth={35} className="mt-4">
                  <ul className="space-y-2 text-xs text-slate-400">
                    {product.keySpecs.slice(0, 3).map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800/70">
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
                </ThreeDLayer>

                {/* 3D ACTION BUTTONS */}
                <ThreeDLayer depth={40} className="mt-auto flex items-center justify-between gap-3 border-t border-slate-800/90 pt-5 sm:pt-6">
                  <Button
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    size="sm"
                    className="text-xs font-semibold shadow-md"
                  >
                    Inquire Now
                  </Button>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-[#7bb0ed] py-1 px-2 rounded-lg hover:bg-slate-800/80"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </ThreeDLayer>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProducts;
