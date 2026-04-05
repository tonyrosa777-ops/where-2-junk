'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Menu } from 'lucide-react';
import { siteData } from '@/data/site';
import MobileNav from './MobileNav';
import Where2Logo from './Where2Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            <Link href="/" className="flex items-center select-none" aria-label="Where2 Junk Removal — Home">
              <Where2Logo />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {siteData.nav.links.map((link) => {
                if (link.label === 'Services') {
                  return (
                    <div key={link.href} ref={dropdownRef} className="relative">
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
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
                      </button>

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
