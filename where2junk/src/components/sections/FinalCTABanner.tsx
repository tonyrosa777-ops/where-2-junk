'use client';
import FadeUp from '@/components/animations/FadeUp';
import { siteData } from '@/data/site';

export default function FinalCTABanner() {
  const { phone, phoneRaw, faithStatement } = siteData.meta;

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'var(--primary)' }}
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>

          {/* Headline */}
          <h2
            id="final-cta-heading"
            className="font-display font-black uppercase text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', letterSpacing: '-0.01em' }}
          >
            Ready to Clear It Out?
          </h2>

          {/* Subtext */}
          <p
            className="mt-4 mb-10 mx-auto font-body"
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.125rem',
              lineHeight: '1.6',
              maxWidth: '36rem',
            }}
          >
            Book online in 60 seconds. We handle the rest.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* Primary: white bg, red text */}
            <a
              href="/booking"
              className="inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 px-8 py-4 text-lg w-full sm:w-auto"
              style={{
                background: '#FFFFFF',
                color: 'var(--primary)',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#F5F5F5';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#FFFFFF';
              }}
            >
              Book Online Now
            </a>

            {/* Secondary: white ghost — phone */}
            <a
              href={`tel:+${phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 px-8 py-4 text-lg w-full sm:w-auto"
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                border: '2px solid rgba(255,255,255,0.6)',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FFFFFF';
                (e.currentTarget as HTMLAnchorElement).style.background =
                  'rgba(255,255,255,0.12)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(255,255,255,0.6)';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
              aria-label={`Call us at ${phone}`}
            >
              {phone}
            </a>
          </div>

          {/* Faith statement */}
          <p
            className="mt-8 font-mono text-sm italic"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {faithStatement}
          </p>

        </FadeUp>
      </div>
    </section>
  );
}
