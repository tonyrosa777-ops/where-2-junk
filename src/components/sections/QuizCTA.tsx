'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { siteData } from '@/data/site';

const MAX_PILLS = 4;

export default function QuizCTA() {
  const { headline, subheadline, steps } = siteData.quiz;
  const pillOptions = steps[0].options.slice(0, MAX_PILLS);

  return (
    <section
      className="py-16 md:py-20"
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--primary-muted)',
        borderBottom: '1px solid var(--primary-muted)',
      }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p
          className="font-mono text-xs uppercase tracking-widest mb-4"
          style={{ color: 'var(--primary)' }}
        >
          Find Your Service
        </p>

        {/* Headline */}
        <h2
          className="font-display font-black uppercase mb-4 text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {headline}
        </h2>

        {/* Subheadline */}
        <p
          className="font-body text-base md:text-lg mb-10 max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subheadline}
        </p>

        {/* Problem option pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {pillOptions.map((option) => (
            <Link
              key={option.value}
              href="/quiz"
              className="inline-block px-5 py-2.5 rounded-full font-body text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-card)]"
              style={{
                border: '1px solid var(--primary-muted)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--primary)';
                el.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--primary-muted)';
                el.style.color = 'var(--text-secondary)';
              }}
            >
              {option.label}
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <Button variant="primary" size="lg" href="/quiz">
          Start the Quiz — 60 Seconds
        </Button>
      </div>
    </section>
  );
}
