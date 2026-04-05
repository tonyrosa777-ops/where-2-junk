'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Menu, ShoppingBag } from 'lucide-react';
import { siteData } from '@/data/site';
import MobileNav from './MobileNav';
import { useCart } from '@/lib/cart';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const areasDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const { count, openCart } = useCart();

  const MORE_LABELS = new Set(['Gallery', 'FAQ', 'Pricing', 'Shop']);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (areasDropdownRef.current && !areasDropdownRef.current.contains(e.target as Node)) {
        setAreasOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        style={{ background: 'var(--bg-elevated)' }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled ? 'backdrop-blur-sm shadow-lg py-2' : 'py-3'
        }`}
        data-scrolled={scrolled}
      >
        <style>{`
          [data-scrolled="true"] { border-color: var(--primary-muted); }
          [data-scrolled="false"] { border-color: rgba(245,245,245,0.08); }
        `}</style>

        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-0 select-none">
              <span
                className="font-display font-black uppercase text-xl tracking-tight leading-none"
                style={{ color: 'var(--text-primary)' }}
              >
                WHERE
              </span>
              <span
                className="font-display font-black uppercase text-xl tracking-tight leading-none"
                style={{ color: 'var(--primary)' }}
              >
                2
              </span>
              <span
                className="font-display font-black uppercase text-xl tracking-tight leading-none ml-1"
                style={{ color: 'var(--text-primary)' }}
              >
                JUNK
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {siteData.nav.links.filter(l => !MORE_LABELS.has(l.label)).map((link) => {
                if (link.label === 'Services') {
                  return (
                    <div key={link.href} ref={dropdownRef} className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-1 px-3 py-2 transition-colors font-display font-black uppercase text-sm tracking-widest"
                        style={{ color: servicesOpen ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => {
                          if (!servicesOpen) e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                        />
                      </Link>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 z-50 border"
                            style={{
                              background: 'var(--bg-card)',
                              borderColor: 'var(--primary-muted)',
                            }}
                          >
                            <p
                              className="px-4 pt-4 pb-2 font-mono text-xs uppercase tracking-widest"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              All Services
                            </p>
                            <div className="pb-2">
                              {siteData.services.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-2 px-4 py-2.5 transition-colors group"
                                  style={{ color: 'var(--text-secondary)' }}
                                  onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = 'var(--text-primary)';
                                    el.style.background = 'rgba(215,43,43,0.08)';
                                  }}
                                  onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = 'var(--text-secondary)';
                                    el.style.background = 'transparent';
                                  }}
                                >
                                  <span
                                    className="w-1.5 h-1.5 flex-shrink-0"
                                    style={{ background: 'var(--primary)' }}
                                  />
                                  <span className="font-body text-sm">{service.shortTitle}</span>
                                </Link>
                              ))}
                            </div>
                            <div
                              className="border-t px-4 py-3"
                              style={{ borderColor: 'rgba(245,245,245,0.08)' }}
                            >
                              <Link
                                href="/services"
                                onClick={() => setServicesOpen(false)}
                                className="font-display font-black uppercase text-xs tracking-widest transition-colors"
                                style={{ color: 'var(--primary)' }}
                                onMouseEnter={(e) =>
                                  ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')
                                }
                                onMouseLeave={(e) =>
                                  ((e.currentTarget as HTMLElement).style.color = 'var(--primary)')
                                }
                              >
                                View All Services →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.label === 'Service Areas') {
                  return (
                    <div key={link.href} ref={areasDropdownRef} className="relative"
                      onMouseEnter={() => setAreasOpen(true)}
                      onMouseLeave={() => setAreasOpen(false)}
                    >
                      <Link
                        href="/areas"
                        onClick={() => setAreasOpen(false)}
                        className="flex items-center gap-1 px-3 py-2 transition-colors font-display font-black uppercase text-sm tracking-widest"
                        style={{ color: areasOpen ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => {
                          if (!areasOpen) e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${areasOpen ? 'rotate-180' : ''}`}
                        />
                      </Link>

                      <AnimatePresence>
                        {areasOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 z-50 border"
                            style={{
                              background: 'var(--bg-card)',
                              borderColor: 'var(--primary-muted)',
                            }}
                          >
                            <p
                              className="px-4 pt-4 pb-2 font-mono text-xs uppercase tracking-widest"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              Areas We Serve
                            </p>
                            <div className="pb-2">
                              {siteData.serviceAreas.map((area) => (
                                <Link
                                  key={area.slug}
                                  href={`/areas/${area.slug}`}
                                  onClick={() => setAreasOpen(false)}
                                  className="flex items-center gap-2 px-4 py-2.5 transition-colors"
                                  style={{ color: 'var(--text-secondary)' }}
                                  onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = 'var(--text-primary)';
                                    el.style.background = 'rgba(215,43,43,0.08)';
                                  }}
                                  onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = 'var(--text-secondary)';
                                    el.style.background = 'transparent';
                                  }}
                                >
                                  <span
                                    className="w-1.5 h-1.5 flex-shrink-0"
                                    style={{ background: 'var(--primary)' }}
                                  />
                                  <span className="font-body text-sm">{area.city}, NH</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 font-display font-black uppercase text-sm tracking-widest transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* More dropdown */}
              <div ref={moreDropdownRef} className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 px-3 py-2 transition-colors font-display font-black uppercase text-sm tracking-widest"
                  style={{ color: moreOpen ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => { if (!moreOpen) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  aria-label="More navigation links"
                >
                  <Menu size={16} />
                  <ChevronDown size={13} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-48 z-50 border"
                      style={{ background: 'var(--bg-card)', borderColor: 'var(--primary-muted)' }}
                    >
                      <p className="px-4 pt-4 pb-2 font-mono text-xs uppercase tracking-widest"
                        style={{ color: 'var(--text-muted)' }}>
                        More
                      </p>
                      <div className="pb-2">
                        {siteData.nav.links.filter(l => MORE_LABELS.has(l.label)).map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMoreOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.color = 'var(--text-primary)';
                              el.style.background = 'rgba(215,43,43,0.08)';
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.color = 'var(--text-secondary)';
                              el.style.background = 'transparent';
                            }}
                          >
                            <span className="w-1.5 h-1.5 flex-shrink-0" style={{ background: 'var(--primary)' }} />
                            <span className="font-body text-sm">{link.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Side — Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:+${siteData.meta.phoneRaw}`}
                className="flex items-center gap-2 font-mono font-medium text-sm transition-colors"
                style={{ color: 'var(--primary)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--primary)')
                }
              >
                <Phone size={14} />
                {siteData.meta.phone}
              </a>
              <button
                onClick={openCart}
                className="relative flex items-center justify-center w-9 h-9 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                aria-label={`Cart (${count} items)`}
              >
                <ShoppingBag size={18} />
                {count > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] font-bold"
                    style={{ background: 'var(--primary)', color: '#fff' }}
                  >
                    {count}
                  </span>
                )}
              </button>
              <motion.a
                href={siteData.nav.cta.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 font-display font-black uppercase text-sm tracking-widest transition-all duration-150"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'var(--accent)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'var(--primary)')
                }
              >
                {siteData.nav.cta.label}
              </motion.a>
            </div>

            {/* Mobile Right */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={`tel:+${siteData.meta.phoneRaw}`}
                className="flex items-center justify-center w-9 h-9"
                style={{ background: 'var(--primary)', color: 'var(--text-primary)' }}
                aria-label={`Call ${siteData.meta.phone}`}
              >
                <Phone size={16} />
              </a>
              <button
                onClick={() => setMobileOpen(true)}
                className="flex items-center justify-center w-9 h-9 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')
                }
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
