'use client';

// Animation system: SVG Lightning Bolts + CSS pulse rings + speed lines
// Selected for: Explosive/Kinetic (Axis 1, hard right) + Raw/Street-level (Axis 2, right of center)
// Source adapted from: C:\Projects\codys-complete-junk-removal\src\components\sections\HeroEffects.tsx
// Brand colors: var(--primary) red, var(--primary-muted) — zero hardcoded hex
// Pattern: hero-server-client-animation-split.md

import { useEffect, useState } from 'react';

// ── Lightning bolts (SVG paths — deterministic, no JS randomness)
const BOLTS = [
  {
    id: 1, left: '5%',  top: '10%', rotate: -8,
    delay: '0s',   dur: '4.2s',
    path: 'M14 0 L5 30 L13 30 L0 66',
  },
  {
    id: 2, left: '91%', top: '8%',  rotate: 10,
    delay: '1.6s', dur: '3.8s',
    path: 'M10 0 L3 22 L9 22 L0 50',
  },
  {
    id: 3, left: '3%',  top: '60%', rotate: -14,
    delay: '0.9s', dur: '5.1s',
    path: 'M8 0 L2 18 L7 18 L0 42',
  },
  {
    id: 4, left: '94%', top: '55%', rotate: 18,
    delay: '2.4s', dur: '4.6s',
    path: 'M16 0 L6 36 L15 36 L0 80',
  },
  {
    id: 5, left: '48%', top: '2%',  rotate: 0,
    delay: '3.1s', dur: '3.2s',
    path: 'M6 0 L1 14 L5 14 L0 32',
  },
  {
    id: 6, left: '20%', top: '85%', rotate: -6,
    delay: '1.2s', dur: '4.9s',
    path: 'M11 0 L3 26 L9 26 L0 56',
  },
  {
    id: 7, left: '78%', top: '80%', rotate: 12,
    delay: '2.9s', dur: '3.6s',
    path: 'M9 0 L3 20 L8 20 L0 46',
  },
];

// ── Floating micro-particles (deterministic modulo positioning — no Math.random())
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 97}%`,
  top: `${(i * 53 + 17) % 90}%`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  delay: `${(i * 0.41) % 5}s`,
  dur: `${3 + (i * 0.31) % 4}s`,
  // Alternate between primary red and near-white — no hardcoded blue
  opacity: 0.25 + (i % 5) * 0.07,
  isPrimary: i % 3 !== 2,
}));

// ── Pulse rings (3 expanding concentric rings)
const RINGS = [
  { delay: '0s',   dur: '5s', cx: '50%', cy: '50%' },
  { delay: '1.7s', dur: '5s', cx: '28%', cy: '68%' },
  { delay: '3.2s', dur: '5s', cx: '72%', cy: '32%' },
];

export default function HeroEffects() {
  const [show, setShow] = useState(false);

  // Respect prefers-reduced-motion: check on mount, skip render entirely if true
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ── Breathing central glow (radial gradient, red) ── */}
      <div
        className="absolute inset-0 hero-glow-breathe"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(215, 43, 43, 0.14) 0%, transparent 70%)',
        }}
      />

      {/* ── Scan-line sweep ── */}
      <div
        className="hero-scanline bg-gradient-to-r from-transparent via-[var(--primary-muted)] to-transparent"
      />

      {/* ── Speed lines (motorsport accent — CSS class already in globals.css) ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Three speed lines, offset, staggered — thin red streaks */}
        <div
          className="speed-line speed-line-delay-1 absolute"
          style={{
            top: '18%',
            left: 0,
            width: '30%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--primary-muted), transparent)',
          }}
        />
        <div
          className="speed-line speed-line-delay-2 absolute"
          style={{
            top: '38%',
            left: 0,
            width: '22%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--primary-muted), transparent)',
          }}
        />
        <div
          className="speed-line speed-line-delay-3 absolute"
          style={{
            top: '62%',
            left: 0,
            width: '18%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(215,43,43,0.3), transparent)',
          }}
        />
      </div>

      {/* ── SVG Lightning bolts ── */}
      {BOLTS.map((b) => (
        <svg
          key={b.id}
          className="absolute hero-bolt"
          style={{
            left: b.left,
            top: b.top,
            transform: `rotate(${b.rotate}deg)`,
            ['--delay' as string]: b.delay,
            ['--dur' as string]: b.dur,
            filter: 'drop-shadow(0 0 5px var(--primary)) drop-shadow(0 0 12px var(--primary-muted))',
            width: 26,
            height: 60,
          }}
          viewBox="0 0 18 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main bolt — primary red */}
          <path
            d={b.path}
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner bright core — near-white */}
          <path
            d={b.path}
            stroke="rgba(245,245,245,0.85)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.isPrimary ? 'var(--primary)' : 'var(--text-primary)',
            ['--delay' as string]: p.delay,
            ['--dur' as string]: p.dur,
            ['--p-opacity' as string]: String(p.opacity),
            boxShadow: p.isPrimary
              ? `0 0 ${p.size * 2}px var(--primary)`
              : `0 0 ${p.size * 2}px rgba(245,245,245,0.4)`,
          }}
        />
      ))}

      {/* ── Pulse rings ── */}
      {RINGS.map((r, i) => (
        <div
          key={i}
          className="absolute hero-ring border border-[var(--primary-muted)] rounded-full"
          style={{
            left: r.cx,
            top: r.cy,
            width: 1,
            height: 1,
            ['--delay' as string]: r.delay,
            ['--dur' as string]: r.dur,
          }}
        />
      ))}

      {/* ── Corner arc ── top-left ── */}
      <svg
        className="absolute top-0 left-0"
        style={{ width: 140, height: 140 }}
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M 0,60 Q 20,0 60,0"
          stroke="rgba(215,43,43,0.25)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 8"
          className="hero-arc-dash"
        />
        <path
          d="M 0,80 Q 30,10 80,0"
          stroke="rgba(215,43,43,0.15)"
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="3 10"
          className="hero-arc-dash-2"
        />
      </svg>

      {/* ── Corner arc ── top-right (mirrored) ── */}
      <svg
        className="absolute top-0 right-0"
        style={{ width: 140, height: 140, transform: 'scaleX(-1)' }}
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M 0,60 Q 20,0 60,0"
          stroke="rgba(215,43,43,0.2)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 8"
          className="hero-arc-dash"
        />
      </svg>
    </div>
  );
}
