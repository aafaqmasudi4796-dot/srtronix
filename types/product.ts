export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  badge?: string;
  shortDescription: string;
  description: string;
  image: string;
  featured?: boolean;
  inCatalogPreview?: boolean;
  keySpecs: ProductSpec[];
  fullSpecs: {
    category: string;
    items: ProductSpec[];
  }[];
  features: string[];
  applications?: string[];
}

export type ProductCategory =
  | 'All'
  | 'Smart Workbench Systems'
  | 'Oscilloscopes'
  | 'DC Power Supplies'
  | 'Multimeters'
  | 'LCR Meters'
  | 'Electronic Loads'
  | 'Waveform Generators'
  | 'Power Meters';

