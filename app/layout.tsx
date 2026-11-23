
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AIChatbot } from '@/components/chat/AIChatbot';
import { ThreeDBackground } from '@/components/ui/ThreeDBackground';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.srtronix.com'),

  title: {
    default: 'SRTRONIX | Smart Work Bench Stations & Lab Instruments',
    template: '%s | SRTRONIX',
  },

  description:
    'Discover customizable Smart Work Bench Stations & high-fidelity professional lab test instruments by SRTRONIX. Oscilloscopes, DC power supplies, LCR meters, and electronic test gear engineered and assembled in India.',

  keywords: [
    'smart work bench station',
    'electronic smart work station',
    'laboratory instruments',
    'digital oscilloscope',
    'benchtop oscilloscope',
    'handheld oscilloscope',
    'linear DC power supply',
    'LCR meter',
    'DC electronic load',
    'power meter',
    'waveform generator',
    'SRTRONIX',
    'test and measurement India',
  ],

  authors: [{ name: 'SRTRONIX Instruments Private Limited' }],
  creator: 'SRTRONIX Instruments Private Limited',
  publisher: 'SRTRONIX Instruments Private Limited',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.srtronix.com',
    siteName: 'SRTRONIX Instruments',
    title: 'SRTRONIX | Smart Work Bench Stations & Lab Instruments',
    description:
      'Professional electronic test and measurement instruments engineered & assembled in India.',
    images: [
      {
        url: '/assets/images/electronic_smart_work_station.jpg',
        width: 1200,
        height: 630,
        alt: 'SRTRONIX Smart Work Bench Station',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SRTRONIX | Smart Work Bench Stations & Lab Instruments',
    description:
      'Professional electronic test and measurement instruments engineered & assembled in India.',
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
