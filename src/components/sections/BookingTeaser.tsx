'use client';

import CalendlyWidget from '@/components/ui/CalendlyWidget';
import { siteData } from '@/data/site';

export default function BookingTeaser() {
  const { phone } = siteData.meta;

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p
          className="font-mono text-xs uppercase tracking-widest mb-4"
          style={{ color: 'var(--primary)' }}
        >
          Book Your Pickup
        </p>

        {/* Headline */}
        <h2
          className="font-display font-black uppercase mb-4 text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Schedule Online. We&apos;ll Be There.
        </h2>

        {/* Subtext */}
        <p
          className="font-body text-base md:text-lg mb-10 max-w-xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Pick a time that works. We confirm within the hour.
        </p>

        {/* Inline Calendly widget */}
        <div className="max-w-[800px] mx-auto w-full">
          <CalendlyWidget url={process.env.NEXT_PUBLIC_CALENDLY_URL ?? ''} className="w-full" />
        </div>

        {/* Phone fallback */}
        <p
          className="font-mono text-xs mt-6 text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          Or call: {phone}
        </p>
      </div>
    </section>
  );
}
