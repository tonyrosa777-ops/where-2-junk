'use client';

/**
 * HeroEffects — Where2 Junk hero background animation
 *
 * CONCEPT: Motorsport racing livery + junk removal
 * - Diagonal racing stripes: bold angular lines like race-car door livery
 * - Floating junk silhouettes: faint outlines of hauled items drifting upward
 * - Scan-line sweep: subtle horizontal light sweep
 * - Corner crosshairs: technical precision marks (no circles, no bolts)
 * - Zero lightning bolts, zero pulse rings
 */

import { useEffect, useState } from 'react';

// ── Diagonal racing stripes (motorsport livery angles)
const STRIPES = [
  // [x1%, y1%, x2%, y2%, opacity, width, delay, duration]
  { x1: -5,  y1: 0,   x2: 35,  y2: 100, op: 0.07, w: 48, delay: '0s',   dur: '8s'  },
  { x1: 5,   y1: 0,   x2: 45,  y2: 100, op: 0.04, w: 18, delay: '0.3s', dur: '8s'  },
  { x1: 55,  y1: 0,   x2: 90,  y2: 100, op: 0.05, w: 30, delay: '0.8s', dur: '8s'  },
  { x1: 62,  y1: 0,   x2: 100, y2: 100, op: 0.03, w: 14, delay: '0s',   dur: '8s'  },
  { x1: 72,  y1: 0,   x2: 108, y2: 100, op: 0.06, w: 22, delay: '1.2s', dur: '8s'  },
];

// ── Floating junk item silhouettes (SVG paths, deterministic positions)
// Items: sofa, TV box, refrigerator, mattress, cardboard box, old tire
const JUNK_ITEMS = [
  {
    id: 'sofa',
    // Simple sofa: seat + back + armrests
    path: 'M0 20 L0 8 Q0 0 8 0 L52 0 Q60 0 60 8 L60 20 L56 20 L56 14 L4 14 L4 20 Z M-2 20 L62 20 L62 28 L-2 28 Z',
    w: 62, h: 28,
    left: '8%', top: '22%', delay: '0s', dur: '18s', rotate: -6,
  },
  {
    id: 'tv',
    // Old boxy TV
    path: 'M0 0 L40 0 L40 30 L0 30 Z M4 4 L36 4 L36 24 L4 24 Z M15 30 L25 30 L28 38 L12 38 Z',
    w: 40, h: 38,
    left: '82%', top: '15%', delay: '2.5s', dur: '22s', rotate: 8,
  },
  {
    id: 'box',
    // Cardboard box with lid lines
    path: 'M0 8 L20 0 L40 8 L40 32 L20 40 L0 32 Z M0 8 L20 16 L40 8 M20 16 L20 40',
    w: 40, h: 40,
    left: '55%', top: '68%', delay: '1.2s', dur: '20s', rotate: 12,
  },
  {
    id: 'mattress',
    // Mattress rectangle with tufting lines
    path: 'M0 0 L70 0 L70 30 L0 30 Z M10 0 L10 30 M25 0 L25 30 M40 0 L40 30 M55 0 L55 30 M60 0 L60 30',
    w: 70, h: 30,
    left: '75%', top: '58%', delay: '3.8s', dur: '25s', rotate: -4,
  },
  {
    id: 'fridge',
    // Refrigerator rectangle with handle
    path: 'M0 0 L28 0 L28 50 L0 50 Z M3 3 L25 3 L25 28 L3 28 Z M22 10 L22 20',
    w: 28, h: 50,
    left: '18%', top: '62%', delay: '5s', dur: '28s', rotate: 3,
  },
  {
    id: 'tire',
    // Old tire (circle with inner ring)
    path: 'M18 0 A18 18 0 1 1 17.99 0 Z M12 6 A12 12 0 1 1 11.99 6 Z',
    w: 36, h: 36,
    left: '40%', top: '12%', delay: '7s', dur: '24s', rotate: 0,
  },
];

// ── Corner crosshairs (technical precision marks — no circles)
const CORNERS = [
  { x: 0,   y: 0,   rx: 1, ry: 1 },  // top-left
  { x: 100, y: 0,   rx: -1, ry: 1 }, // top-right
  { x: 0,   y: 100, rx: 1, ry: -1 }, // bottom-left
  { x: 100, y: 100, rx: -1, ry: -1 },// bottom-right
];

export default function HeroEffects() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ── Subtle radial glow (centered, very low opacity) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(215,43,43,0.09) 0%, transparent 65%)',
        }}
      />

      {/* ── Scan-line sweep (single horizontal bar, repeating) ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(215,43,43,0.25) 50%, transparent 100%)',
          animation: 'hero-scan 6s linear infinite',
        }}
      />

      {/* ── Racing stripe diagonals (SVG, full-screen) ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {STRIPES.map((s, i) => (
          <line
            key={i}
            x1={`${s.x1}%`} y1={`${s.y1}%`}
            x2={`${s.x2}%`} y2={`${s.y2}%`}
            stroke="#D72B2B"
            strokeWidth={`${s.w * 0.01}`}
            opacity={s.op}
            style={{
              transformOrigin: 'center',
              animation: `hero-stripe-fade ${s.dur} ease-in-out ${s.delay} infinite alternate`,
            }}
          />
        ))}
      </svg>

      {/* ── Floating junk silhouettes ── */}
      {JUNK_ITEMS.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: item.left,
            top: item.top,
            transform: `rotate(${item.rotate}deg)`,
            animation: `hero-junk-drift ${item.dur} ease-in-out ${item.delay} infinite alternate`,
            opacity: 0,
          }}
        >
          <svg
            viewBox={`0 0 ${item.w} ${item.h}`}
            width={item.w * 1.2}
            height={item.h * 1.2}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={item.path} stroke="rgba(215,43,43,0.18)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      ))}

      {/* ── Corner crosshairs ── */}
      {CORNERS.map((c, i) => (
        <svg
          key={i}
          className="absolute"
          width="28" height="28"
          style={{
            left: c.x === 0 ? 16 : 'auto',
            right: c.x === 100 ? 16 : 'auto',
            top: c.y === 0 ? 16 : 'auto',
            bottom: c.y === 100 ? 16 : 'auto',
            opacity: 0.22,
          }}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* L-shaped crosshair */}
          <line
            x1={c.rx > 0 ? 0 : 28} y1={c.ry > 0 ? 0 : 28}
            x2={c.rx > 0 ? 12 : 16} y2={c.ry > 0 ? 0 : 28}
            stroke="#D72B2B" strokeWidth="1.5" strokeLinecap="square"
          />
          <line
            x1={c.rx > 0 ? 0 : 28} y1={c.ry > 0 ? 0 : 28}
            x2={c.rx > 0 ? 0 : 28} y2={c.ry > 0 ? 12 : 16}
            stroke="#D72B2B" strokeWidth="1.5" strokeLinecap="square"
          />
          {/* Center dot */}
          <circle
            cx={c.rx > 0 ? 0 : 28} cy={c.ry > 0 ? 0 : 28}
            r="2" fill="#D72B2B"
          />
        </svg>
      ))}

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes hero-scan {
          0%   { transform: translateY(0); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes hero-stripe-fade {
          from { opacity: var(--stripe-op, 0.04); }
          to   { opacity: calc(var(--stripe-op, 0.04) * 2.2); }
        }
        @keyframes hero-junk-drift {
          0%   { opacity: 0;    transform: translateY(0px)   rotate(var(--item-rot, 0deg)); }
          15%  { opacity: 0.65; }
          85%  { opacity: 0.4;  }
          100% { opacity: 0;    transform: translateY(-30px) rotate(var(--item-rot, 0deg)); }
        }
      `}</style>
    </div>
  );
}
