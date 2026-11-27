import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustSection } from '@/components/home/TrustSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { EngineeredIndiaSection } from '@/components/home/EngineeredIndiaSection';
import { CTASection } from '@/components/home/CTASection';
import About from '@/components/home/About';
import { SITE_URL, DEFAULT_KEYWORDS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SRTRONIX | Smart Work Bench Stations, Oscilloscopes & Precision Lab Instruments',
  description:
    'SRTRONIX is an Indian manufacturer of electronic test equipment, customizable Smart Work Bench Stations, digital oscilloscopes, linear DC power supplies, and precision lab instruments in Bengaluru.',
  keywords: [
    ...DEFAULT_KEYWORDS,
    'smart work bench manufacturer India',
    'buy laboratory test equipment Bengaluru',
    'custom lab workbench for universities',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SRTRONIX | Smart Work Bench Stations & Precision Lab Instruments',
    description:
      'Engineered & assembled in India: Smart Work Bench Stations, digital oscilloscopes, linear DC power supplies, and laboratory test instruments.',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: '/assets/images/electronic_smart_work_station.jpg',
        width: 1200,
        height: 630,
        alt: 'SRTRONIX Smart Work Bench Station and Electronic Test Gear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRTRONIX | Smart Work Bench Stations & Precision Lab Instruments',
    description:
      'Engineered & assembled in India: Smart Work Bench Stations, digital oscilloscopes, linear DC power supplies, and laboratory test instruments.',
    images: ['/assets/images/electronic_smart_work_station.jpg'],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <FeaturedProducts />
      <EngineeredIndiaSection />
      <About />
      <CTASection />
    </>
  );
}
