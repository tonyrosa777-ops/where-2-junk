'use client';

import React, { useState, useRef, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

interface TierFeature {
  text: string;
  included: boolean;
}

interface Tier {
  id: string;
  label: string;
  name: string;
  price: number;
  deposit: number;
  recommended: boolean;
  badge?: string;
  cta: string;
  features: TierFeature[];
}

interface ComparisonRow {
  label: string;
  starter: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
}

interface ComparisonGroup {
  category: string;
  rows: ComparisonRow[];
}

// ── Data ──────────────────────────────────────────────────────────────────

const tiers: Tier[] = [
  {
    id: 'starter',
    label: 'STARTER',
    name: 'Local Presence',
    price: 1500,
    deposit: 750,
    recommended: false,
    cta: 'Start with Starter',
    features: [
      { text: 'Custom homepage with animated hero', included: true },
      { text: 'Core pages: Services, About, Contact, FAQ', included: true },
      { text: 'Testimonials page (32 real reviews)', included: true },
      { text: 'Mobile-first responsive design', included: true },
      { text: 'Click-to-call + contact form', included: true },
      { text: 'Deployed free to Vercel', included: true },
      { text: 'Blog (10 SEO articles)', included: false },
      { text: 'Interactive lead quiz', included: false },
      { text: 'Automated booking calendar', included: false },
      { text: 'Photo gallery (unlimited photos)', included: false },
      { text: 'Online shop', included: false },
    ],
  },
  {
    id: 'pro',
    label: 'PRO',
    name: 'Full Lead Machine',
    price: 3000,
    deposit: 1500,
    recommended: true,
    badge: 'Most Popular',
    cta: 'Get the Pro Site',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Blog (10 local SEO articles)', included: true },
      { text: 'Interactive lead quiz → booking', included: true },
      { text: 'Automated booking calendar', included: true },
      { text: 'Service area city pages (8 cities)', included: true },
      { text: 'Schema markup (LocalBusiness + Article)', included: true },
      { text: 'Photo gallery (unlimited photos)', included: true },
      { text: 'Online shop', included: false },
      { text: 'Training call on launch', included: false },
    ],
  },
  {
    id: 'premium',
    label: 'PREMIUM',
    name: 'Complete Brand Platform',
    price: 5500,
    deposit: 2750,
    recommended: false,
    cta: 'Build the Full Stack',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Online shop — a full second revenue stream', included: true },
      { text: 'Printful print-on-demand + Stripe checkout', included: true },
      { text: 'Training call on launch', included: true },
      { text: '3 revision rounds', included: true },
      { text: '30-day post-launch support', included: true },
    ],
  },
];

const comparisonGroups: ComparisonGroup[] = [
  {
    category: 'Foundation',
    rows: [
      { label: 'Custom homepage with animated hero', starter: true, pro: true, premium: true },
      { label: 'Mobile-first responsive design', starter: true, pro: true, premium: true },
      { label: 'Core pages (About, Contact, FAQ)', starter: true, pro: true, premium: true },
      { label: 'Testimonials page (32 reviews)', starter: true, pro: true, premium: true },
      { label: 'Click-to-call + contact form', starter: true, pro: true, premium: true },
      { label: 'Deployed free to Vercel', starter: true, pro: true, premium: true },
    ],
  },
  {
    category: 'Content & Conversion',
    rows: [
      { label: 'Blog (10 local SEO articles)', starter: false, pro: true, premium: true },
      { label: 'Interactive lead quiz → booking', starter: false, pro: true, premium: true },
      { label: 'Automated booking calendar', starter: false, pro: true, premium: true },
      { label: 'Service area city pages (8)', starter: false, pro: true, premium: true },
      { label: 'Photo gallery page', starter: false, pro: true, premium: true },
      { label: 'Schema markup + AEO optimization', starter: false, pro: true, premium: true },
    ],
  },
  {
    category: 'Commerce & Growth',
    rows: [
      { label: 'Photo gallery (unlimited photos)', starter: false, pro: true, premium: true },
      { label: 'Online shop + Stripe checkout', starter: false, pro: false, premium: true },
    ],
  },
  {
    category: 'Support',
    rows: [
      { label: 'Delivery timeline', starter: '14 days', pro: '14 days', premium: '21 days' },
      { label: 'Post-launch support', starter: '48hr email', pro: '7 days', premium: '30 days' },
      { label: 'Training call on launch', starter: false, pro: false, premium: true },
      { label: 'Revision rounds', starter: '1', pro: '2', premium: '3' },
    ],
  },
];

// ── Custom hook: scroll reveal ─────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Slider style helper ────────────────────────────────────────────────────

function sliderStyle(value: number, min: number, max: number): React.CSSProperties {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, var(--primary) ${pct}%, rgba(245,245,245,0.1) ${pct}%)`,
  };
}

// ── Cell renderer for comparison table ────────────────────────────────────

function ComparisonCell({ value, isPro }: { value: boolean | string; isPro: boolean }) {
  if (typeof value === 'string') {
    return (
      <span style={{ color: isPro ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: isPro ? 600 : 400 }}>
        {value}
      </span>
    );
  }
  if (value === true) {
    return (
      <span style={{ color: isPro ? 'var(--primary)' : 'rgba(245,245,245,0.65)', fontSize: '1.125rem', fontWeight: 700 }}>
        ✓
      </span>
    );
  }
  return <span style={{ color: 'rgba(245,245,245,0.22)' }}>—</span>;
}

// ── Page component ─────────────────────────────────────────────────────────

export default function PricingPage() {
  const [jobValue, setJobValue] = useState(600);
  const [clientsPerMonth, setClientsPerMonth] = useState(5);
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | 'premium'>('pro');

  const tierCards = useReveal(0.08);
  const roiSection = useReveal(0.08);
  const compTable = useReveal(0.05);
  const closingCta = useReveal(0.1);

  // ROI calculations
  const tierPriceMap = { starter: 1500, pro: 3000, premium: 5500 } as const;
  const tierPrice = tierPriceMap[selectedTier];
  const monthlyRevenue = jobValue * clientsPerMonth;
  const annualRevenue = monthlyRevenue * 12;
  const breakEvenMonths = monthlyRevenue > 0 ? Math.round((tierPrice / monthlyRevenue) * 10) / 10 : 0;
  const roi12 = tierPrice > 0 ? Math.round(((annualRevenue - tierPrice) / tierPrice) * 100) : 0;

  const tierLabel = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);

  return (
    <>
      {/* ── Inline animation styles ── */}
      <style>{`
        @keyframes rainbow-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cta-breathe {
          0%, 100% { box-shadow: 0 8px 32px rgba(215,43,43,0.45); }
          50%       { box-shadow: 0 8px 52px rgba(215,43,43,0.75); }
        }
        @keyframes pricing-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #D72B2B 0%, #FF6B00 25%, #FFD700 50%, #D72B2B 75%, #FF4444 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rainbow-shimmer 4s linear infinite;
        }
        .pricing-p1 { animation: pricing-fade-up 0.45s ease both 0.05s; }
        .pricing-p2 { animation: pricing-fade-up 0.45s ease both 0.18s; }
        .pricing-p3 { animation: pricing-fade-up 0.45s ease both 0.31s; }
        .pricing-p4 { animation: pricing-fade-up 0.45s ease both 0.44s; }
        .pricing-p5 { animation: pricing-fade-up 0.45s ease both 0.58s; }
        .cta-pro-btn {
          animation: cta-breathe 3s ease-in-out infinite;
        }
        .pricing-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
        .pricing-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          border: 2px solid #fff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(215,43,43,0.55);
        }
        .pricing-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          border: 2px solid #fff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(215,43,43,0.55);
        }
        .comparison-row:hover td {
          background: rgba(245,245,245,0.025);
        }
        .tier-selector-btn.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }
      `}</style>

      <main style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>

        {/* ══════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════ */}
        <section style={{
          paddingTop: 'clamp(80px, 12vw, 128px)',
          paddingBottom: 'clamp(64px, 8vw, 96px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(215,43,43,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
            {/* Badge */}
            <div className="pricing-p1" style={{
              display: 'inline-block',
              background: 'rgba(215,43,43,0.12)',
              border: '1px solid rgba(215,43,43,0.3)',
              borderRadius: '4px',
              padding: '6px 14px',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}>
              OPTIMUS BUILD SERVICES · WEBSITE PACKAGES
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
            }}>
              <div className="pricing-p2" style={{
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                color: 'var(--text-primary)',
                display: 'block',
              }}>
                A Website That
              </div>
              <div className="pricing-p3" style={{
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                display: 'block',
              }}>
                <span className="shimmer-text">Wins You Jobs</span>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="pricing-p4" style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.55,
              marginBottom: '40px',
            }}>
              Transparent pricing. No retainers. One investment that pays for itself.
            </p>

            {/* Price pills */}
            <div className="pricing-p5" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Starter', price: '$1,500' },
                { label: 'Pro', price: '$3,000', highlight: true },
                { label: 'Premium', price: '$5,500' },
              ].map(({ label, price, highlight }) => (
                <div key={label} style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: highlight ? '1px solid rgba(215,43,43,0.6)' : '1px solid rgba(245,245,245,0.12)',
                  background: highlight ? 'rgba(215,43,43,0.1)' : 'rgba(245,245,245,0.04)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  letterSpacing: '0.04em',
                  color: highlight ? 'var(--primary)' : 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}>
                  {label} · {price}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — PRICING TIER CARDS
        ══════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 24px' }}>
          <div
            ref={tierCards.ref}
            style={{
              maxWidth: 'var(--container-max)',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'start',
              opacity: tierCards.visible ? 1 : 0,
              transform: tierCards.visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.65s ease, transform 0.65s ease',
            }}
          >
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — ROI CALCULATOR
        ══════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px, 6vw, 96px) 24px' }}>
          <div
            ref={roiSection.ref}
            style={{
              maxWidth: 'var(--container-max)',
              margin: '0 auto',
              opacity: roiSection.visible ? 1 : 0,
              transform: roiSection.visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.65s ease, transform 0.65s ease',
            }}
          >
            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(215,43,43,0.12)',
                border: '1px solid rgba(215,43,43,0.3)',
                borderRadius: '4px',
                padding: '5px 12px',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--primary)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                ROI CALCULATOR
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                textTransform: 'uppercase',
                letterSpacing: '-0.015em',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                See What the Site Earns You
              </h2>
            </div>

            {/* Calculator card */}
            <div style={{
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(245,245,245,0.07)',
              borderRadius: '16px',
              padding: 'clamp(28px, 4vw, 48px)',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '48px',
                marginBottom: '36px',
              }}>
                {/* LEFT: Sliders + tier selector */}
                <div>
                  {/* Slider 1: Job value */}
                  <div style={{ marginBottom: '36px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                        Average Job Value
                      </label>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.375rem', color: 'var(--primary)' }}>
                        ${jobValue.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={2000}
                      step={50}
                      value={jobValue}
                      onChange={(e) => setJobValue(Number(e.target.value))}
                      className="pricing-range"
                      style={sliderStyle(jobValue, 200, 2000)}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                      Standard pickup: $300 · Full cleanout: $700 · Estate: $2,000+
                    </p>
                  </div>

                  {/* Slider 2: Clients per month */}
                  <div style={{ marginBottom: '36px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                        New Clients / Month
                      </label>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.375rem', color: 'var(--primary)' }}>
                        {clientsPerMonth}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={1}
                      value={clientsPerMonth}
                      onChange={(e) => setClientsPerMonth(Number(e.target.value))}
                      className="pricing-range"
                      style={sliderStyle(clientsPerMonth, 1, 20)}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                      Local ranked service sites typically see 5-12 new inquiries/month
                    </p>
                  </div>

                  {/* Tier selector */}
                  <div>
                    <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Package
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {(['starter', 'pro', 'premium'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTier(t)}
                          className={`tier-selector-btn${selectedTier === t ? ' active' : ''}`}
                          style={{
                            flex: 1,
                            padding: '9px 4px',
                            borderRadius: '8px',
                            border: '1px solid rgba(245,245,245,0.12)',
                            background: selectedTier === t ? 'var(--primary)' : 'transparent',
                            color: selectedTier === t ? '#fff' : 'var(--text-secondary)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.8125rem',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Output stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignContent: 'start' }}>
                  {[
                    { label: 'Monthly Revenue', value: `$${monthlyRevenue.toLocaleString()}`, sub: 'from website leads' },
                    { label: 'Annual Revenue', value: `$${annualRevenue.toLocaleString()}`, sub: '12-month projection' },
                    { label: 'Break Even', value: `${breakEvenMonths} mo`, sub: `at ${clientsPerMonth} clients/mo` },
                    { label: '12-Month ROI', value: `${roi12.toLocaleString()}%`, sub: 'return on investment', highlight: true },
                  ].map(({ label, value, sub, highlight }) => (
                    <div key={label} style={{
                      background: highlight ? 'rgba(215,43,43,0.08)' : 'var(--bg-card)',
                      border: highlight ? '1px solid rgba(215,43,43,0.3)' : '1px solid rgba(245,245,245,0.06)',
                      borderRadius: '12px',
                      padding: '20px 16px',
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        color: highlight ? 'var(--primary)' : 'var(--text-primary)',
                        lineHeight: 1,
                        marginBottom: '6px',
                      }}>
                        {value}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: highlight ? 'var(--primary)' : 'var(--text-secondary)', marginBottom: '4px' }}>
                        {label}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                        {sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom insight bar */}
              <div style={{
                borderTop: '1px solid rgba(245,245,245,0.07)',
                paddingTop: '24px',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 2vw, 1.0625rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '640px',
                  margin: '0 auto',
                }}>
                  A <strong style={{ color: 'var(--text-primary)' }}>{tierLabel} site at ${tierPrice.toLocaleString()}</strong> pays for itself in{' '}
                  <strong style={{ color: 'var(--primary)' }}>{breakEvenMonths} months.</strong>{' '}
                  After that, every client is pure profit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 — COMPARISON TABLE
        ══════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(48px, 6vw, 96px) 24px' }}>
          <div
            ref={compTable.ref}
            style={{
              maxWidth: 'var(--container-max)',
              margin: '0 auto',
              opacity: compTable.visible ? 1 : 0,
              transform: compTable.visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.65s ease, transform 0.65s ease',
            }}
          >
            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(215,43,43,0.12)',
                border: '1px solid rgba(215,43,43,0.3)',
                borderRadius: '4px',
                padding: '5px 12px',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--primary)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                FULL COMPARISON
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                textTransform: 'uppercase',
                letterSpacing: '-0.015em',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                Everything Side by Side
              </h2>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(245,245,245,0.07)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '540px' }}>
                {/* Table head */}
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(245,245,245,0.1)' }}>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-elevated)',
                      width: '44%',
                    }}>
                      Feature
                    </th>
                    {(['STARTER', 'PRO', 'PREMIUM'] as const).map((col) => (
                      <th key={col} style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: '0.875rem',
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: col === 'PRO' ? 'var(--primary)' : 'var(--text-primary)',
                        background: col === 'PRO' ? 'rgba(215,43,43,0.07)' : 'var(--bg-elevated)',
                        borderLeft: '1px solid rgba(245,245,245,0.07)',
                        width: '18.67%',
                      }}>
                        {col}
                        {col === 'PRO' && (
                          <span style={{
                            display: 'block',
                            fontSize: '0.625rem',
                            letterSpacing: '0.08em',
                            color: 'rgba(215,43,43,0.75)',
                            fontWeight: 700,
                            marginTop: '2px',
                          }}>
                            MOST POPULAR
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonGroups.map((group, gi) => (
                    <React.Fragment key={`group-${gi}`}>
                      {/* Category row */}
                      <tr style={{ background: 'rgba(245,245,245,0.025)' }}>
                        <td
                          colSpan={4}
                          style={{
                            padding: '10px 20px',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--primary)',
                            borderTop: gi > 0 ? '1px solid rgba(245,245,245,0.07)' : 'none',
                          }}
                        >
                          {group.category}
                        </td>
                      </tr>
                      {/* Data rows */}
                      {group.rows.map((row, ri) => (
                        <tr
                          key={`row-${gi}-${ri}`}
                          className="comparison-row"
                          style={{
                            borderBottom: '1px solid rgba(245,245,245,0.04)',
                            transition: 'background 0.15s ease',
                          }}
                        >
                          <td style={{
                            padding: '14px 20px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg-base)',
                          }}>
                            {row.label}
                          </td>
                          {(['starter', 'pro', 'premium'] as const).map((col) => (
                            <td key={col} style={{
                              padding: '14px 12px',
                              textAlign: 'center',
                              background: col === 'pro' ? 'rgba(215,43,43,0.04)' : 'var(--bg-base)',
                              borderLeft: '1px solid rgba(245,245,245,0.04)',
                            }}>
                              <ComparisonCell value={row[col]} isPro={col === 'pro'} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5 — CLOSING CTA
        ══════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(64px, 8vw, 112px) 24px' }}>
          <div
            ref={closingCta.ref}
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              textAlign: 'center',
              opacity: closingCta.visible ? 1 : 0,
              transform: closingCta.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.65s ease, transform 0.65s ease',
            }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 0.95,
              marginBottom: '20px',
            }}>
              Ready to Launch?
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '40px',
            }}>
              Pick your package, book a 20-minute build call, and we will have your site live within 14 days.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:hello@where2junk.com?subject=Pro Package Inquiry"
                className="cta-pro-btn"
                style={{
                  display: 'inline-block',
                  padding: '16px 36px',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.0625rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Book a Build Call
              </a>
              <a
                href="tel:16034063724"
                style={{
                  display: 'inline-block',
                  padding: '16px 36px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.0625rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(245,245,245,0.18)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,245,245,0.45)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245,245,245,0.18)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Call Josh
              </a>
            </div>

            {/* Faith statement */}
            <p style={{
              marginTop: '48px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
            }}>
              Here am I, send me. — Isaiah 6:8
            </p>
          </div>
        </section>

      </main>
    </>
  );
}

// ── Tier Card component ────────────────────────────────────────────────────

function TierCard({ tier }: { tier: Tier }) {
  const isPro = tier.recommended;

  return (
    <div style={{
      position: 'relative',
      background: 'var(--bg-elevated)',
      border: isPro ? '1.5px solid rgba(215,43,43,0.45)' : '1px solid rgba(245,245,245,0.07)',
      borderRadius: '16px',
      overflow: 'hidden',
      transform: isPro ? 'translateY(-10px)' : 'translateY(0)',
      boxShadow: isPro
        ? '0 0 60px rgba(215,43,43,0.1), 0 24px 48px rgba(0,0,0,0.4)'
        : '0 4px 24px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Rainbow top bar for Pro */}
      {isPro && (
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, #D72B2B, #FF6B00, #FFD700, #D72B2B)',
          flexShrink: 0,
        }} />
      )}

      {/* Most Popular badge */}
      {tier.badge && (
        <div style={{
          position: 'absolute',
          top: isPro ? '18px' : '12px',
          right: '16px',
          background: 'var(--primary)',
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.625rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: '999px',
        }}>
          {tier.badge}
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: '28px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tier label */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          color: isPro ? 'var(--primary)' : 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}>
          {tier.label}
        </div>

        {/* Tier name */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          color: 'var(--text-primary)',
          marginBottom: '16px',
          paddingRight: tier.badge ? '80px' : '0',
        }}>
          {tier.name}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.25rem, 5vw, 3rem)',
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}>
            ${tier.price.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            one-time
          </span>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(245,245,245,0.07)',
          margin: '20px 0',
        }} />

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1 }}>
          {tier.features.map((feat, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '7px 0',
              borderBottom: i < tier.features.length - 1 ? '1px solid rgba(245,245,245,0.04)' : 'none',
            }}>
              <span style={{
                flexShrink: 0,
                width: '18px',
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: feat.included ? (isPro ? 'var(--primary)' : 'rgba(245,245,245,0.55)') : 'rgba(245,245,245,0.18)',
                marginTop: '1px',
              }}>
                {feat.included ? '✓' : '—'}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: feat.included ? 'var(--text-secondary)' : 'var(--text-muted)',
                lineHeight: 1.45,
              }}>
                {feat.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          href={`mailto:hello@where2junk.com?subject=${tier.name} Package Inquiry`}
          className={isPro ? 'cta-pro-btn' : ''}
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '14px 24px',
            borderRadius: '8px',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '0.9375rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            ...(isPro
              ? {
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                }
              : {
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1.5px solid rgba(245,245,245,0.18)',
                }),
          }}
          onMouseEnter={(e) => {
            if (!isPro) {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.4)';
              e.currentTarget.style.background = 'rgba(245,245,245,0.04)';
            } else {
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isPro) {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.18)';
              e.currentTarget.style.background = 'transparent';
            } else {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          {tier.cta}
        </a>

        {/* Payment line */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-muted)',
          marginTop: '10px',
          marginBottom: 0,
        }}>
          ${tier.deposit.toLocaleString()} deposit · ${tier.deposit.toLocaleString()} on launch
        </p>
      </div>
    </div>
  );
}
