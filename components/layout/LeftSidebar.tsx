
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="w-full bg-[#09090b] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="SR TRONIX"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold tracking-wide text-white">
              SR TRONIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-5 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
