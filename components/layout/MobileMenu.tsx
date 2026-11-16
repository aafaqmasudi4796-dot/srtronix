'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { companyDetails, products } from '@/data/products';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string; menuKey?: string }[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedMenu(expandedMenu === key ? null : key);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden"
          />

          {/* Slide-down panel */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[53px] sm:top-[61px] z-50 bg-black border-b border-white shadow-2xl md:hidden"
          >
            <div className="px-4 py-5 sm:px-6 sm:py-6 space-y-4 max-h-[calc(100dvh-4.5rem)] overflow-y-auto">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href));
                  const menuKey = link.menuKey || link.name.toLowerCase();
                  const isExpanded = expandedMenu === menuKey;

                  if (menuKey === 'products') {
                    return (
                      <div key={link.name} className="flex flex-col">
                        <div
                          className={`relative flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#0f2a4a] to-[#16385e]/80 text-white font-semibold border border-[#7bb0ed]/40 shadow-lg shadow-[#0f2a4a]/50'
                              : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          <Link href={link.href} onClick={onClose} className="flex-1 flex items-center gap-2">
                            <span>{link.name}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7bb0ed] shadow-[0_0_6px_#7bb0ed]" />
                            )}
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleExpand('products')}
                            className="p-1 rounded text-slate-400 hover:text-white"
                            aria-label="Toggle products"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-[#7bb0ed]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Collapsible products list */}
                        {isExpanded && (
                          <div className="pl-4 pr-1 py-2 space-y-1.5 my-1 border-l-2 border-[#4A7EB8]/60 ml-3">
                            <Link
                              href="/products"
                              onClick={onClose}
                              className="block py-1 text-xs font-bold text-[#7bb0ed] uppercase tracking-wider"
                            >
                              Explore All Products →
                            </Link>
                            {products.map((p) => (
                              <Link
                                key={p.id}
                                href={`/products/${p.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-2 py-1.5 text-xs text-slate-300 hover:text-[#7bb0ed]"
                              >
                                <div className="relative w-5 h-5 rounded bg-slate-900 shrink-0">
                                  <Image
                                    src={p.image}
                                    alt={p.name}
                                    fill
                                    sizes="20px"
                                    className="object-contain"
                                  />
                                </div>
                                <span className="truncate">{p.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={onClose}
                      className={`relative flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0f2a4a] to-[#16385e]/80 text-white font-semibold border border-[#7bb0ed]/40 shadow-lg shadow-[#0f2a4a]/50'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#7bb0ed] shadow-[0_0_8px_#7bb0ed]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2 space-y-2">
                <a
                  href="https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20would%20like%20to%20inquire%20about%20your%20test%20and%20measurement%20instruments."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-950/40"
                >
                  <span className="font-semibold">Chat on WhatsApp (+91 70224 29004)</span>
                </a>

                <Link
                  href="/contact#inquire"
                  onClick={(e) => {
                    onClose();
                    if (pathname === '/contact') {
                      e.preventDefault();
                      setTimeout(() => {
                        document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '#inquire');
                      }, 100);
                    }
                  }}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-white text-neutral-900 font-bold hover:bg-neutral-100 transition-colors shadow-md"
                >
                  <span>Inquire / Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Contact Info */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <a href={`tel:${companyDetails.phone}`} className="hover:text-purple-300">
                    {companyDetails.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <a href={`mailto:${companyDetails.email}`} className="hover:text-purple-300">
                    {companyDetails.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{companyDetails.address}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
