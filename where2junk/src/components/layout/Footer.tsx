'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { siteData } from '@/data/site';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-elevated)' }}>
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-0 select-none mb-4 inline-flex">
              <span
                className="font-display font-black uppercase text-2xl tracking-tight leading-none"
                style={{ color: 'var(--text-primary)' }}
              >
                WHERE
              </span>
              <span
                className="font-display font-black uppercase text-2xl tracking-tight leading-none"
                style={{ color: 'var(--primary)' }}
              >
                2
              </span>
              <span
                className="font-display font-black uppercase text-2xl tracking-tight leading-none ml-1"
                style={{ color: 'var(--text-primary)' }}
              >
                JUNK
              </span>
            </Link>

            {/* Tagline */}
            <p
              className="font-body text-sm mb-3 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {siteData.meta.tagline}
            </p>

            {/* Faith Statement */}
            <p
              className="font-mono text-xs uppercase tracking-widest mb-6 italic"
              style={{ color: 'var(--text-muted)' }}
            >
              &ldquo;{siteData.meta.faithStatement}&rdquo;
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href={siteData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-colors"
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  border: '1px solid rgba(245,245,245,0.08)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--text-primary)';
                  el.style.borderColor = 'var(--primary-muted)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--text-secondary)';
                  el.style.borderColor = 'rgba(245,245,245,0.08)';
                }}
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {siteData.social.instagram && (
                <a
                  href={siteData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-colors"
                  style={{
                    background: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    border: '1px solid rgba(245,245,245,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'var(--text-primary)';
                    el.style.borderColor = 'var(--primary-muted)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'var(--text-secondary)';
                    el.style.borderColor = 'rgba(245,245,245,0.08)';
                  }}
                  aria-label="Instagram"
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
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3
              className="font-display font-black uppercase text-sm tracking-widest mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Our Services
            </h3>
            <ul className="space-y-2">
              {siteData.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-2 font-body text-sm transition-colors group"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--primary)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')
                    }
                  >
                    <span
                      className="w-1 h-1 flex-shrink-0 transition-colors"
                      style={{ background: 'var(--primary-muted)' }}
                    />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3
              className="font-display font-black uppercase text-sm tracking-widest mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Service Areas
            </h3>
            <ul className="space-y-2">
              {siteData.serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="flex items-center gap-2 font-body text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--primary)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')
                    }
                  >
                    <span
                      className="w-1 h-1 flex-shrink-0"
                      style={{ background: 'var(--primary-muted)' }}
                    />
                    {area.city}, {area.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3
              className="font-display font-black uppercase text-sm tracking-widest mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:+${siteData.meta.phoneRaw}`}
                className="flex items-center gap-2.5 font-mono font-medium text-sm transition-colors"
                style={{ color: 'var(--primary)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--primary)')
                }
              >
                <Phone size={14} style={{ color: 'var(--primary)' }} />
                {siteData.meta.phone}
              </a>
              <a
                href={`mailto:${siteData.meta.email}`}
                className="flex items-center gap-2.5 font-body text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')
                }
              >
                <Mail size={14} style={{ color: 'var(--primary)' }} />
                {siteData.meta.email}
              </a>
              <div
                className="flex items-start gap-2.5 font-body text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <MapPin
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: 'var(--primary)' }}
                />
                <span>{siteData.meta.address.full}</span>
              </div>
              <div
                className="flex items-start gap-2.5 font-body text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Clock
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: 'var(--primary)' }}
                />
                <div>
                  <p>{siteData.meta.hours.weekdays}</p>
                  <p>{siteData.meta.hours.saturday}</p>
                  <p>{siteData.meta.hours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(245,245,245,0.08)' }}
        >
          <p
            className="font-body text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            &copy; {new Date().getFullYear()} Where2 Junk Removal Services LLC. All rights reserved.
          </p>
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Manchester, NH &middot; Licensed &amp; Insured
          </p>
        </div>

      </div>
    </footer>
  );
}
