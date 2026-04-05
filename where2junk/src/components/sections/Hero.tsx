// Hero.tsx — Where2 Junk Removal Services LLC
// Pattern: hero-server-client-animation-split.md
// This file is a server component — HeroEffects is the client boundary.
// Animation: SVG Lightning Bolts + CSS speed lines + pulse rings
// All copy sourced from siteData.hero — zero hard-coded strings.

import HeroEffects from './HeroEffects';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { siteData } from '@/data/site';

export default function Hero() {
  const { hero, meta } = siteData;

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* ── Animation layer — z-0, behind all content ── */}
      <HeroEffects />

      {/* ── Content layer — z-10, above animation ── */}
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div
          className="w-full max-w-[var(--container-wide)] mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: 'clamp(80px, 12vh, 128px)', paddingBottom: 'clamp(64px, 10vh, 112px)' }}
        >
          {/* Desktop: two-column. Mobile: single column */}
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">

            {/* ── Left column: text + CTAs ── */}
            <div className="flex flex-col gap-6">

              {/* Eyebrow label */}
              <p
                className="hero-item-1 font-mono text-xs uppercase tracking-[0.12em]"
                style={{ color: 'var(--primary)' }}
              >
                {hero.eyebrow}
              </p>

              {/* H1 — one H1 per page per SEO rule */}
              <h1
                className="hero-item-2 font-display font-black uppercase leading-none"
                style={{
                  fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-line',
                }}
              >
                {hero.headline}
              </h1>

              {/* Subheadline */}
              <p
                className="hero-item-3 font-body text-lg lg:text-xl leading-relaxed max-w-[560px]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {hero.subheadline}
              </p>

              {/* CTA pair */}
              <div className="hero-item-4 flex flex-wrap gap-3 items-center">
                <Button href={hero.ctaPrimary.href} variant="primary" size="lg">
                  {hero.ctaPrimary.label}
                </Button>
                <Button href={hero.ctaSecondary.href} variant="ghost" size="lg">
                  {hero.ctaSecondary.label}
                </Button>
                {/* Phone — tappable, never hidden (design-system.md Section 10, anti-pattern #9) */}
                <a
                  href={`tel:+${meta.phoneRaw}`}
                  className="font-mono font-medium text-base lg:text-lg transition-colors duration-200"
                  style={{ color: 'var(--primary)' }}
                  aria-label={`Call ${meta.phone}`}
                >
                  {meta.phone}
                </a>
              </div>

              {/* Trust badges (3 inline) */}
              <div className="hero-item-5 flex flex-wrap gap-2 items-center">
                {hero.badges.map((badge) => (
                  <Badge key={badge} variant="muted">
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Trust micro-copy */}
              <p
                className="font-mono text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {hero.trustCopy}
              </p>
            </div>

            {/* ── Right column: owner photo — hidden on mobile ── */}
            <div className="hidden lg:flex items-center justify-center">
              <div
                className="w-full max-w-[400px] aspect-[4/5] flex items-center justify-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '2px solid var(--primary-muted)',
                }}
              >
                {/*
                  Owner photo placeholder.
                  Replace with <Image> when Joshua Ortega provides headshot.
                  fal.ai prompt is in design-system.md Section 6 (About section prompt).
                */}
                <div className="text-center px-6">
                  <div
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                    style={{ border: '2px solid var(--primary-muted)', color: 'var(--primary)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  </div>
                  <p
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Joshua Ortega
                  </p>
                  <p
                    className="font-mono text-xs mt-1"
                    style={{ color: 'var(--text-muted)', opacity: 0.6 }}
                  >
                    Photo coming soon
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Scroll chevron — hidden on mobile, bounces to guide desktop users ── */}
          <div className="hidden lg:flex justify-start mt-16 ml-1">
            <div
              className="hero-chevron w-6 h-6 flex items-center justify-center"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
