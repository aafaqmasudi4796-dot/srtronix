
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

import logo from "../../public/assets/logo.jpeg";
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';
import { ProductsMegaMenu } from './ProductsMegaMenu';
import { MobileMenu } from './MobileMenu';

type ActiveMenu = 'none' | 'products';

export function Navbar() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('none');
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Trigger high-tech oscilloscope laser sweep on route shifting
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 650);
    return () => clearTimeout(timer);
  }, [pathname]);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus when route changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu('none');
    setIsMobileMenuOpen(false);
  }

  // Track window scroll to switch navbar from transparent to solid black with white border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // Open menu
  const handleMenuEnter = (menu: ActiveMenu) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setActiveMenu(menu);
  };

  // Close menu after a short delay
  const handleMenuLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setActiveMenu('none');
    }, 180);
  };

  // Handle smooth scroll directly to inquiry form when clicking "Inquire Now"
  const handleInquireClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/contact') {
      e.preventDefault();
      const el = document.getElementById('inquire');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#inquire');
      }
    }
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/', menuKey: 'none' as ActiveMenu },
    { name: 'Products', href: '/products', menuKey: 'products' as ActiveMenu },
    { name: 'About', href: '/about', menuKey: 'none' as ActiveMenu },
    { name: 'Contact', href: '/contact', menuKey: 'none' as ActiveMenu },
  ];

  return (
    <>
      {/* SCROLL-DYNAMIC NAVBAR: Transparent at initial stage, solid black with thin white lower border on scroll */}

      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-black border-b border-white shadow-lg shadow-black/60'
            : 'bg-transparent border-b border-transparent shadow-none'
        }`}
      >
        {/* Oscilloscope Route Shifting Laser Sweep */}
        <AnimatePresence>
          {isNavigating && (
            <motion.div
              key={pathname}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#7bb0ed] to-transparent shadow-[0_0_12px_#7bb0ed] z-50"
            />
          )}
        </AnimatePresence>

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3.5 py-2 sm:px-6 sm:py-2.5">

          {/* OFFICIAL SR-TRONIX LOGO */}

          <Link
            href="/"
            className="group flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.03]"
            aria-label="SR-TRONIX Home"
          >
            <Image
              src={logo.src}
              alt="SR-TRONIX - Test and Measurement"
              width={440}
              height={110}
              priority
              quality={100}
              className="h-7 xs:h-8 sm:h-12 md:h-14 w-auto max-w-[115px] xs:max-w-[135px] sm:max-w-[200px] md:max-w-[220px] rounded-md object-contain"
            />
          </Link>

          {/* DESKTOP NAVIGATION WITH ANIMATED SLIDING PILL */}

          <nav
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              const hasSubmenu = link.menuKey !== 'none';
              const isCurrentOpen = activeMenu === link.menuKey;

              // HOME, ABOUT, CONTACT
              if (!hasSubmenu) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => {
                      handleMenuEnter('none');
                      setHoveredNav(link.name);
                    }}
                    className="relative rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors duration-200"
                  >
                    {/* Active sliding pill */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0f2a4a]/90 via-[#173b64]/95 to-[#0f2a4a]/90 border border-[#7bb0ed]/50 shadow-[0_0_16px_rgba(123,176,237,0.3)] z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active bottom laser accent */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-laser"
                        className="absolute -bottom-[1px] inset-x-2.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#7bb0ed] to-transparent shadow-[0_0_8px_#7bb0ed] z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover preview capsule when not active */}
                    {hoveredNav === link.name && !isActive && (
                      <motion.span
                        layoutId="navbar-hover-capsule"
                        className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/10 z-0"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive
                          ? 'font-semibold text-white drop-shadow-[0_0_8px_rgba(123,176,237,0.5)]'
                          : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              }

              // PRODUCTS MEGA MENU
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    handleMenuEnter(link.menuKey);
                    setHoveredNav(link.name);
                  }}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={link.href}
                    aria-expanded={isCurrentOpen}
                    className="group relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors duration-200"
                  >
                    {/* Active sliding pill */}
                    {(isActive || isCurrentOpen) && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0f2a4a]/90 via-[#173b64]/95 to-[#0f2a4a]/90 border border-[#7bb0ed]/50 shadow-[0_0_16px_rgba(123,176,237,0.3)] z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active bottom laser accent */}
                    {(isActive || isCurrentOpen) && (
                      <motion.span
                        layoutId="navbar-active-laser"
                        className="absolute -bottom-[1px] inset-x-2.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#7bb0ed] to-transparent shadow-[0_0_8px_#7bb0ed] z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover preview capsule when not active */}
                    {hoveredNav === link.name && !isActive && !isCurrentOpen && (
                      <motion.span
                        layoutId="navbar-hover-capsule"
                        className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/10 z-0"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive || isCurrentOpen
                          ? 'font-semibold text-white drop-shadow-[0_0_8px_rgba(123,176,237,0.5)]'
                          : 'text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      {link.name}
                    </span>

                    <ChevronDown
                      className={`relative z-10 h-3.5 w-3.5 transition-transform duration-200 ${
                        isCurrentOpen
                          ? 'rotate-180 text-amber-400'
                          : isActive
                          ? 'text-[#7bb0ed]'
                          : 'text-neutral-300 group-hover:text-white'
                      }`}
                    />
                  </Link>

                  {/* PRODUCTS MEGA MENU */}
                  {link.menuKey === 'products' && (
                    <ProductsMegaMenu
                      isOpen={activeMenu === 'products'}
                      onClose={() => setActiveMenu('none')}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* ACTION BUTTONS */}

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

            {/* WHATSAPP */}

            <a
              href="https://wa.me/917022429004?text=Hello%20SRTRONIX,%20I%20would%20like%20to%20inquire%20about%20your%20test%20and%20measurement%20instruments."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp (+91 70224 29004)"
              className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-emerald-300 transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-500/20"
            >
              <WhatsAppIcon className="h-4 w-4 fill-current transition-transform duration-200 group-hover:scale-110" />

              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* INQUIRY BUTTON (Visible on all screens with responsive sizing) */}

            <Link
              href="/contact#inquire"
              onClick={handleInquireClick}
              className="group inline-flex items-center gap-1 sm:gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-black shadow-lg shadow-orange-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/20 active:translate-y-0"
            >
              <span className="hidden xs:inline">Inquire Now</span>
              <span className="xs:hidden">Inquire</span>

              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={
                isMobileMenuOpen ? 'Close navigation' : 'Open navigation'
              }
              aria-expanded={isMobileMenuOpen}
              className="rounded-xl border border-white/20 bg-black/20 p-1.5 sm:p-2 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/50 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

export default Navbar;
