import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductCatalogView } from '@/components/products/ProductCatalogView';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, DEFAULT_KEYWORDS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Electronic Test & Measurement Instruments Catalog | SRTRONIX',
  description:
    'Browse the full SRTRONIX catalog: customizable Smart Work Bench Stations, benchtop & handheld digital oscilloscopes, regulated linear DC power supplies, LCR meters, and electronic test equipment engineered in India.',
  keywords: [
    ...DEFAULT_KEYWORDS,
    'test instruments catalog',
    'buy oscilloscopes India',
    'linear DC power supply models',
    'benchtop test equipment catalog',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Electronic Test & Measurement Instruments Catalog | SRTRONIX',
    description:
      'Explore digital oscilloscopes, linear DC power supplies, smart workbench stations, and electronic test gear engineered in India.',
    url: `${SITE_URL}/products`,
    type: 'website',
    images: [
      {
        url: '/assets/images/electronic_smart_work_station.jpg',
        width: 1200,
        height: 630,
        alt: 'SRTRONIX Complete Test and Measurement Instruments Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electronic Test & Measurement Instruments Catalog | SRTRONIX',
    description:
      'Explore digital oscilloscopes, linear DC power supplies, smart workbench stations, and electronic test gear engineered in India.',
    images: ['/assets/images/electronic_smart_work_station.jpg'],
  },
};

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ]}
      />
      <Suspense
        fallback={
          <div className="py-24 text-center text-slate-500 font-mono text-sm">
            Loading SRTRONIX Instrument Catalog...
          </div>
        }
      >
        <ProductCatalogView />
      </Suspense>
    </>
  );
}
