import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { ProductDetails } from '@/components/products/ProductDetails';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, getAbsoluteUrl, DEFAULT_KEYWORDS } from '@/lib/site';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | SRTRONIX',
      description: 'The requested precision test instrument could not be found.',
    };
  }

  // Construct a rich meta description with key specifications
  const specsSnippet = product.keySpecs
    ?.slice(0, 3)
    .map((s) => `${s.label}: ${s.value}`)
    .join('; ');

  const metaDescription = `${product.name} by SRTRONIX (${product.category}). ${product.shortDescription} ${specsSnippet ? `Key specs: ${specsSnippet}.` : ''} Inquire for official pricing & custom configurations.`;

  const canonicalUrl = `/products/${product.slug}`;
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : getAbsoluteUrl(product.image);

  return {
    title: `${product.name} | ${product.category} - SRTRONIX`,
    description: metaDescription,
    keywords: [
      product.name,
      product.category,
      'SRTRONIX',
      'SRTRONIX Instruments',
      ...(product.keySpecs?.map((s) => s.value) || []),
      ...DEFAULT_KEYWORDS.slice(0, 8),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | ${product.category} - SRTRONIX`,
      description: metaDescription,
      url: `${SITE_URL}${canonicalUrl}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1000,
          height: 750,
          alt: `${product.name} - ${product.category} by SRTRONIX Instruments`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${product.category} - SRTRONIX`,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find related products in the same category or fallback to other featured products
  const related = products
    .filter((p) => p.slug !== slug && (p.category === product.category || p.featured))
    .slice(0, 3);

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ]}
      />
      <ProductDetails product={product} relatedProducts={related} />
    </>
  );
}
