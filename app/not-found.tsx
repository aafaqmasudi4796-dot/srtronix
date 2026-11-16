import Link from 'next/link';
import { ArrowLeft, Home, Package } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 bg-[#09090b] text-center text-slate-200">
      <Container>
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/80 text-purple-300 flex items-center justify-center font-mono font-bold text-2xl border border-purple-800/60 shadow-lg shadow-purple-950/40">
            404
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Instrument Not Located
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The page or instrument blueprint you requested does not exist or has been relocated within our catalog.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" size="md" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <Button href="/products" variant="outline" size="md" className="gap-2">
              <Package className="w-4 h-4" />
              <span>Explore Products</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
