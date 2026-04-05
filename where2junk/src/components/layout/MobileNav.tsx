'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Phone } from 'lucide-react';
import { siteData } from '@/data/site';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.70)', backdropFilter: 'blur(2px)' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-50 overflow-y-auto flex flex-col"
            style={{ background: 'var(--bg-elevated)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-5 border-b flex-shrink-0"
              style={{ borderColor: 'rgba(245,245,245,0.08)' }}
            >
              <Link
                href="/"
                onClick={onClose}
                className="flex items-baseline gap-0 select-none"
              >
                <span
                  className="font-display font-black uppercase text-lg tracking-tight leading-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  WHERE
                </span>
                <span
                  className="font-display font-black uppercase text-lg tracking-tight leading-none"
                  style={{ color: 'var(--primary)' }}
                >
                  2
                </span>
                <span
                  className="font-display font-black uppercase text-lg tracking-tight leading-none ml-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  JUNK
                </span>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')
                }
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Phone CTA Bar */}
            <a
              href={`tel:+${siteData.meta.phoneRaw}`}
              onClick={onClose}
              className="flex items-center gap-3 p-5 flex-shrink-0 transition-opacity hover:opacity-90"
              style={{ background: 'var(--primary)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <Phone size={18} color="white" />
              </div>
              <div>
                <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {siteData.nav.stickyBar.callLabel}
                </p>
                <p
                  className="font-mono font-medium text-lg leading-tight"
                  style={{ color: 'white' }}
                >
                  {siteData.meta.phone}
                </p>
              </div>
            </a>

            {/* Primary Nav Links */}
            <nav className="p-4 flex-1">
              {siteData.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 mb-1 transition-colors font-display font-black uppercase tracking-widest text-sm"
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
                    className="w-1 h-4 flex-shrink-0"
                    style={{ background: 'var(--primary)' }}
                  />
                  {link.label}
                </Link>
              ))}

              {/* Services Sub-list */}
              <div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: 'rgba(245,245,245,0.08)' }}
              >
                <p
                  className="px-4 mb-3 font-mono text-xs uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Our Services
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {siteData.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2 px-3 py-2 transition-colors font-body text-sm"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = 'var(--primary)';
                        el.style.background = 'rgba(215,43,43,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = 'var(--text-muted)';
                        el.style.background = 'transparent';
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 flex-shrink-0"
                        style={{ background: 'var(--primary-muted)' }}
                      />
                      {service.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Bottom CTA */}
            <div
              className="p-4 border-t flex-shrink-0"
              style={{ borderColor: 'rgba(245,245,245,0.08)' }}
            >
              <motion.a
                href={siteData.nav.cta.href}
                onClick={onClose}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center w-full py-4 font-display font-black uppercase tracking-widest text-base transition-all duration-150"
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
                {siteData.nav.cta.label} →
              </motion.a>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t"
                style={{ borderColor: 'rgba(245,245,245,0.08)' }}
              >
                <a
                  href={siteData.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  Facebook
                </a>
                {siteData.social.instagram && (
                  <a
                    href={siteData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
