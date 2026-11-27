import React from 'react';
import { SITE_URL, SITE_NAME, SITE_LEGAL_NAME, getAbsoluteUrl } from '@/lib/site';
import { companyDetails } from '@/data/products';
import { Product } from '@/types/product';

/**
 * Organization & WebSite JSON-LD Schema (Rendered in Root Layout)
 */
export function RootJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_LEGAL_NAME,
        alternateName: [SITE_NAME, 'SRTRONIX'],
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: getAbsoluteUrl('/assets/images/electronic_smart_work_station.jpg'),
          caption: 'SRTRONIX Instruments',
        },
        image: getAbsoluteUrl('/assets/images/electronic_smart_work_station.jpg'),
        description:
          'SRTRONIX is an Indian manufacturer of electronic test and measurement instruments, customizable Smart Work Bench Stations, digital oscilloscopes, and regulated laboratory DC power supplies.',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Swati Building, 72/2 Main Road, Opp. Singapura Garden, Lakshmipura',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          postalCode: '560013',
          addressCountry: 'IN',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-7022429004',
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-7022429004',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        email: companyDetails.email,
        sameAs: [
          'https://wa.me/917022429004',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'SRTRONIX',
        alternateName: 'SRTRONIX Instruments',
        description:
          'Smart Work Bench Stations & Laboratory Test Instruments Engineered in India',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en-IN',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/products?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList JSON-LD Schema
 */
export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : getAbsoluteUrl(item.path),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Product JSON-LD Schema for Product Detail Pages
 */
export function ProductJsonLd({ product }: { product: Product }) {
  const productUrl = getAbsoluteUrl(`/products/${product.slug}`);
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : getAbsoluteUrl(product.image);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [imageUrl],
    description: product.description || product.shortDescription,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'SRTRONIX',
    },
    manufacturer: {
      '@type': 'Organization',
      name: SITE_LEGAL_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: '0',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        valueAddedTaxIncluded: true,
      },
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_LEGAL_NAME,
      },
    },
    additionalProperty: product.keySpecs?.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
