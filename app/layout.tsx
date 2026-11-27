
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AIChatbot } from '@/components/chat/AIChatbot';
import { ThreeDBackground } from '@/components/ui/ThreeDBackground';
import { SITE_URL, DEFAULT_KEYWORDS, SITE_LEGAL_NAME } from '@/lib/site';
import { RootJsonLd } from '@/components/seo/JsonLd';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: './',
  },

  title: {
    default: 'SRTRONIX | Smart Work Bench Stations & Precision Lab Instruments',
    template: '%s | SRTRONIX',
  },

  description:
    'Discover customizable Smart Work Bench Stations & high-fidelity professional lab test instruments by SRTRONIX. Digital oscilloscopes, linear DC power supplies, LCR meters, and electronic test gear engineered and assembled in India.',

  keywords: DEFAULT_KEYWORDS,

  authors: [{ name: SITE_LEGAL_NAME }],
  creator: SITE_LEGAL_NAME,
  publisher: SITE_LEGAL_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'SRTRONIX Instruments',
    title: 'SRTRONIX | Smart Work Bench Stations & Lab Instruments',
    description:
      'Professional electronic test and measurement instruments engineered & assembled in Bengaluru, India.',
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
    title: 'SRTRONIX | Smart Work Bench Stations & Lab Instruments',
    description:
      'Professional electronic test and measurement instruments engineered & assembled in Bengaluru, India.',
    images: ['/assets/images/electronic_smart_work_station.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased dark overflow-x-hidden">
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[#09090b] text-slate-100 overflow-x-hidden w-full relative"
      >
        <RootJsonLd />
        <ThreeDBackground />
        <Navbar />

        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          {children}
        </main>

        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
