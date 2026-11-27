/**
 * Central Site & SEO Configuration for SRTRONIX
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://srtronix.vercel.app';

export const SITE_NAME = 'SRTRONIX Instruments';
export const SITE_LEGAL_NAME = 'SRTRONIX Instruments Private Limited';

export const DEFAULT_KEYWORDS = [
  'electronic test equipment',
  'test and measurement instruments',
  'laboratory instruments India',
  'smart work bench station',
  'electronic smart work station',
  'custom lab workbench',
  'digital oscilloscope',
  'benchtop oscilloscope',
  'handheld oscilloscope',
  'mixed signal oscilloscope',
  'linear DC power supply',
  'regulated laboratory power supply',
  'programmable DC power supply',
  'LCR meter',
  'component tester',
  'digital multimeter',
  'true RMS multimeter',
  'clamp multimeter',
  'DC electronic load',
  'arbitrary waveform generator',
  'power meter',
  'ESD safe laboratory bench',
  'NABL traceable calibration',
  'hardware engineering test gear',
  'SRTRONIX',
  'SRTRONIX Instruments',
  'Bengaluru test instruments manufacturer',
];

export function getAbsoluteUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
