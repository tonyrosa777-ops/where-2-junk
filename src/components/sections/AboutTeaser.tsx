'use client';

import { siteData } from '@/data/site';
import Button from '@/components/ui/Button';
import SlideIn from '@/components/animations/SlideIn';

export default function AboutTeaser() {
  const { about } = siteData;

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: 'var(--bg-elevated)' }}
      aria-label={`About ${about.ownerName}`}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left: photo placeholder — 45% on desktop */}
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <div
              className="w-full flex flex-col items-center justify-center gap-3"
              style={{
                aspectRatio: '4/5',
                background: 'var(--bg-card)',
                border: '2px solid var(--primary-muted)',
              }}
            >
              {/* Person icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16"
                style={{ color: 'var(--text-muted)' }}
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>

              <div className="text-center">
                <p
                  className="font-mono text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {about.ownerName}
                </p>
                <p
                  className="font-mono text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Photo coming soon
                </p>
              </div>
            </div>
          </div>

          {/* Right: text column — 55% on desktop */}
          <SlideIn direction="right" className="w-full lg:w-[55%] flex flex-col gap-5">

            {/* Eyebrow */}
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--primary)' }}
            >
              About Joshua
            </span>

            {/* Headline */}
            <h2
              className="font-display font-black uppercase text-3xl md:text-4xl lg:text-5xl leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {about.headline}
            </h2>

            {/* Story */}
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {about.story}
            </p>

            {/* Faith statement */}
            <p
              className="font-body text-sm italic"
              style={{ color: 'var(--text-muted)' }}
            >
              &ldquo;{about.faithStatement}&rdquo;{' '}
              <span className="not-italic">{about.faithVerse}</span>
            </p>

            {/* CTA */}
            <div className="pt-2">
              <Button variant="primary" href="/about" size="lg">
                {about.ctaText}
              </Button>
            </div>

          </SlideIn>
        </div>
      </div>
    </section>
  );
}
