import { Hero } from '@/components/home/Hero';
import { TrustSection } from '@/components/home/TrustSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { EngineeredIndiaSection } from '@/components/home/EngineeredIndiaSection';
import { CTASection } from '@/components/home/CTASection';
import About from '@/components/home/About';

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
