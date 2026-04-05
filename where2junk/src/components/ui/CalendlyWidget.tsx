'use client';

import { useEffect } from 'react';

interface Props {
  url?: string;
  className?: string;
}

export default function CalendlyWidget({
  url = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '',
  className = '',
}: Props) {
  useEffect(() => {
    if (!url) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  if (!url) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--bg-card)] border border-[var(--primary-muted)] rounded ${className}`}
        style={{ minWidth: '320px', height: '700px' }}
      >
        <div className="text-center space-y-3 p-8">
          <p className="font-mono text-sm uppercase tracking-widest text-[var(--primary)]">
            Booking Calendar
          </p>
          <p className="text-[var(--text-secondary)] text-sm">
            Calendly URL not configured yet.
          </p>
          <p className="text-[var(--text-muted)] text-xs">
            Set NEXT_PUBLIC_CALENDLY_URL in .env.local
          </p>
          <a
            href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '6034063724'}`}
            className="inline-block mt-4 px-6 py-3 bg-[var(--primary)] text-white font-display font-bold uppercase text-sm tracking-wide hover:bg-[var(--accent)] transition-colors"
          >
            Call to Book: (603) 406-3724
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`calendly-inline-widget ${className}`}
      data-url={url}
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
}
