import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductCatalogView } from '@/components/products/ProductCatalogView';

export const metadata: Metadata = {
  title: 'Our Products | Precision Laboratory Instruments',
  description:
    'Explore the complete range of SRTRONIX precision test and measurement instruments: digital oscilloscopes, linear DC power supplies, LCR meters, clamp meters, and custom smart work bench stations.',
  openGraph: {
    title: 'Our Products | SRTRONIX Lab Instruments',
    description:
      'Explore digital oscilloscopes, linear DC power supplies, smart work bench stations, and electronic test gear engineered in India.',
  },
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-500 font-mono text-sm">
          Loading SRTRONIX Instrument Catalog...
        </div>
      }
    >
      <ProductCatalogView />
    </Suspense>
  );
}

