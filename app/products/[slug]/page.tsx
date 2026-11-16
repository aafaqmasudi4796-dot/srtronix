import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { ProductDetails } from '@/components/products/ProductDetails';

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
    };
  }

  return {
    title: `${product.name} | Technical Specs & Inquiries`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | SRTRONIX Instruments`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
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

  return <ProductDetails product={product} relatedProducts={related} />;
}

