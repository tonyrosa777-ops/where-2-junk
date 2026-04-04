import type { Metadata } from 'next';
import { siteData } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import ScaleIn from '@/components/animations/ScaleIn';
import SlideIn from '@/components/animations/SlideIn';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Joshua Ortega | Where2 Junk Removal Manchester NH',
  description:
    'Meet Joshua Ortega, owner of Where2 Junk Removal Services LLC. Manchester-born, licensed & insured, built on transparency and faith.',
};

const { about } = siteData;

export default function AboutPage() {
  return (
    <main>
      {/* ── 1. Page Hero ─────────────────────────────────────────── */}
      <section
        className="pt-24 pb-16 md:pt-32 md:pb-20"
        style={{ background: 'var(--bg-base)' }}
        aria-label="About page hero"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--primary)' }}
            >
              Manchester, NH &mdash; Since 2025
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-display font-black uppercase leading-none mt-4"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: 'var(--text-primary)',
              }}
            >
              {about.headline}
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. Story Section ─────────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'var(--bg-elevated)' }}
        aria-label="Joshua's story"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-16 items-start">

            {/* Left: photo placeholder — same pattern as AboutTeaser.tsx */}
            <div className="w-full flex-shrink-0">
              <div
                className="w-full flex flex-col items-center justify-center gap-3"
                style={{
                  aspectRatio: '4/5',
                  background: 'var(--bg-card)',
                  border: '2px solid var(--primary-muted)',
                }}
              >
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

            {/* Right: story text */}
            <SlideIn direction="right" className="flex flex-col justify-center">
              <p
                className="font-body text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {about.story}
              </p>
            </SlideIn>

          </div>
        </div>
      </section>

      {/* ── 3. Values Grid ───────────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'var(--bg-base)' }}
        aria-label="Our commitments"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--primary)' }}
            >
              Our Commitments
            </span>
            <h2
              className="font-display font-black uppercase leading-tight mt-3 text-3xl md:text-4xl lg:text-5xl"
              style={{ color: 'var(--text-primary)' }}
            >
              How We Show Up Every Time
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((value, index) => (
              <ScaleIn key={value} delay={index * 0.1}>
                <div
                  className="flex items-center justify-center p-8 text-center"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--primary-muted)',
                    minHeight: '8rem',
                  }}
                >
                  <p
                    className="font-display font-black uppercase text-lg leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {value}
                  </p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Faith Statement ───────────────────────────────────── */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'var(--bg-elevated)' }}
        aria-label="Faith statement"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <blockquote>
              <p
                className="font-display italic leading-snug"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: 'var(--primary)',
                }}
              >
                &ldquo;{about.faithStatement}&rdquo;
              </p>
              <footer
                className="font-mono text-sm mt-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {about.faithVerse}
              </footer>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* ── 5. CTA Banner ────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'var(--primary)' }}
        aria-label="Book a pickup CTA"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
          <FadeUp>
            <h2
              className="font-display font-black uppercase leading-tight text-3xl md:text-4xl lg:text-5xl"
              style={{ color: 'var(--text-primary)' }}
            >
              You Point, We Haul
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <Button
              variant="secondary"
              size="lg"
              href="/booking"
              className="!bg-white !border-white !text-[var(--primary)] hover:!bg-white/90"
            >
              {about.ctaText}
            </Button>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
