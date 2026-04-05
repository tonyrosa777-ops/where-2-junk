'use client';

/**
 * HeroAnimation — Where2 Junk hero right-column
 *
 * "Bigger, more interesting, luxurious, powerful"
 * - Larger 320×400 viewBox, detailed truck: wheel spokes, grille slats,
 *   glass fills, headlight, door line, running board, bed stake pockets
 * - Headlight beam (pulsing) + exhaust puffs (drifting right)
 * - Dual outer breathing rings + faint "2" racing watermark
 * - 150 motes + ground dust + 10 streaks + 8-point glimmers
 */

import { useEffect, useRef } from 'react';

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (REDUCED) return;

    const sync = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);

    // ── Motes (red sparks + white debris squares, float upward)
    const N = 150;
    const motes = Array.from({ length: N }, (_, i) => ({
      x:   Math.random(),
      y:   Math.random(),
      r:   0.4 + Math.random() * 2.8,
      vx:  (Math.random() - 0.5) * 0.0005,
      vy:  -(0.0004 + Math.random() * 0.0012),
      op:  0,
      tgt: 0.08 + Math.random() * 0.48,
      red: i % 3 !== 2,
      sq:  i % 5 === 0,
      rot: Math.random() * Math.PI * 2,
      rv:  (Math.random() - 0.5) * 0.038,
    }));

    // ── Ground dust (drifts left near base of truck)
    const dust = Array.from({ length: 24 }, () => ({
      x:   Math.random(),
      y:   0.76 + Math.random() * 0.16,
      r:   1.5 + Math.random() * 4,
      vx:  -(0.0003 + Math.random() * 0.0008),
      op:  0,
      tgt: 0.025 + Math.random() * 0.08,
    }));

    // ── Speed streaks
    const streaks = Array.from({ length: 10 }, () => ({
      x:   -0.3,
      y:   0.12 + Math.random() * 0.72,
      len: 0.18 + Math.random() * 0.30,
      spd: 0.005 + Math.random() * 0.009,
      w:   0.6  + Math.random() * 2.4,
    }));

    // ── Glimmers (4-point + 8-point stars)
    const glimmers: {
      x: number; y: number; sz: number; life: number; max: number; bright: boolean;
    }[] = [];
    let gt = 0;

    function tick() {
      if (!canvas || !ctx) return;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Dust
      for (const d of dust) {
        d.x += d.vx;
        if (Math.random() < 0.003) d.tgt = 0.02 + Math.random() * 0.08;
        d.op += (d.tgt - d.op) * 0.012;
        if (d.x < -0.06) { d.x = 1.06; d.y = 0.74 + Math.random() * 0.18; }
        ctx.save();
        ctx.globalAlpha = d.op;
        ctx.fillStyle = '#D72B2B';
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // Motes
      for (const m of motes) {
        m.x += m.vx; m.y += m.vy; m.rot += m.rv;
        if (Math.random() < 0.004) m.tgt = 0.05 + Math.random() * 0.5;
        m.op += (m.tgt - m.op) * 0.02;
        if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
        if (m.x < -0.02) m.x = 1.02;
        if (m.x > 1.02)  m.x = -0.02;
        ctx.save();
        ctx.globalAlpha = m.op;
        ctx.fillStyle = m.red ? '#D72B2B' : '#F5F5F5';
        if (m.sq) {
          ctx.translate(m.x * w, m.y * h); ctx.rotate(m.rot);
          ctx.fillRect(-m.r, -m.r, m.r * 2, m.r * 2);
        } else {
          ctx.beginPath(); ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }

      // Streaks
      for (const s of streaks) {
        s.x += s.spd;
        if (s.x > 1.15) {
          s.x = -s.len - 0.05;
          s.y   = 0.12 + Math.random() * 0.72;
          s.len = 0.18 + Math.random() * 0.30;
          s.spd = 0.005 + Math.random() * 0.009;
        }
        const px   = s.x * w;
        const plen = s.len * w;
        const mid  = px + plen / 2;
        const fade = Math.max(0, 1 - Math.abs(mid - w * 0.35) / (w * 0.75));
        ctx.save();
        ctx.globalAlpha = fade * 0.44;
        const g = ctx.createLinearGradient(px, s.y * h, px + plen, s.y * h);
        g.addColorStop(0,    'transparent');
        g.addColorStop(0.38, '#D72B2B');
        g.addColorStop(1,    'transparent');
        ctx.strokeStyle = g;
        ctx.lineWidth = s.w;
        ctx.beginPath(); ctx.moveTo(px, s.y * h); ctx.lineTo(px + plen, s.y * h); ctx.stroke();
        ctx.restore();
      }

      // Glimmers
      gt++;
      if (gt > 28 && glimmers.length < 8) {
        glimmers.push({
          x:      12 + Math.random() * (w - 24),
          y:      12 + Math.random() * (h * 0.87 - 24),
          sz:     3.5 + Math.random() * 8.5,
          life:   0,
          max:    42 + Math.random() * 42,
          bright: Math.random() > 0.62,
        });
        gt = 0;
      }
      for (let i = glimmers.length - 1; i >= 0; i--) {
        const gl = glimmers[i];
        gl.life++;
        const p = gl.life / gl.max;
        const f = p < 0.28 ? p / 0.28 : 1 - (p - 0.28) / 0.72;
        const s = gl.sz * f;
        ctx.save();
        ctx.translate(gl.x, gl.y);
        // 4-point star
        ctx.globalAlpha = f * (gl.bright ? 1.0 : 0.7);
        ctx.strokeStyle = '#D72B2B'; ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(0, -s * 2.5); ctx.lineTo(0, s * 2.5);
        ctx.moveTo(-s * 2.5, 0); ctx.lineTo(s * 2.5, 0);
        ctx.stroke();
        // diagonal cross (8-point for bright glimmers)
        if (gl.bright) {
          ctx.globalAlpha = f * 0.42;
          ctx.strokeStyle = 'rgba(215,43,43,0.5)'; ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-s * 1.7, -s * 1.7); ctx.lineTo( s * 1.7,  s * 1.7);
          ctx.moveTo( s * 1.7, -s * 1.7); ctx.lineTo(-s * 1.7,  s * 1.7);
          ctx.stroke();
        }
        ctx.globalAlpha = f * (gl.bright ? 1 : 0.85);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(0, 0, s * 0.44, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        if (gl.life >= gl.max) glimmers.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: '4/5', maxWidth: '520px' }}
      aria-hidden="true"
    >
      {/* Canvas layer — motes, streaks, dust, glimmers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* SVG layer — self-drawing detailed truck */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <style>{`
            /* ── Draw animations ── */
            @keyframes w2-draw {
              from { stroke-dashoffset: 880; opacity: 1; }
              to   { stroke-dashoffset: 0;   opacity: 1; }
            }
            @keyframes w2-whl {
              from { stroke-dashoffset: 228; }
              to   { stroke-dashoffset: 0;   }
            }
            @keyframes w2-spk {
              from { stroke-dashoffset: 75; }
              to   { stroke-dashoffset: 0;  }
            }
            @keyframes w2-rise {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0);   }
            }
            @keyframes w2-pop {
              0%   { transform: scale(0);    opacity: 0; }
              68%  { transform: scale(1.28); opacity: 1; }
              100% { transform: scale(1);    opacity: 1; }
            }
            @keyframes w2-breathe {
              0%, 100% { opacity: 0.06; }
              50%       { opacity: 0.22; }
            }
            @keyframes w2-streak {
              0%   { stroke-dashoffset: 120; opacity: 0;   }
              18%  { opacity: 0.95; }
              82%  { opacity: 0.6;  }
              100% { stroke-dashoffset: -18; opacity: 0;   }
            }
            @keyframes w2-hlight {
              0%, 100% { opacity: 0.5;  }
              50%       { opacity: 0.85; }
            }
            @keyframes w2-exhaust {
              0%   { opacity: 0;    transform: translateX(0)    scale(0.4); }
              35%  { opacity: 0.45; }
              100% { opacity: 0;    transform: translateX(24px) scale(2.4); }
            }

            /* ── Applied classes ── */
            .w2-body {
              stroke-dasharray: 880; stroke-dashoffset: 880; opacity: 0;
              animation: w2-draw 2.4s cubic-bezier(0.4,0,0.2,1) 0.3s forwards;
            }
            .w2-whl {
              stroke-dasharray: 228; stroke-dashoffset: 228;
              animation: w2-whl 0.85s ease-out 2.2s forwards;
            }
            .w2-whl2 {
              stroke-dasharray: 228; stroke-dashoffset: 228;
              animation: w2-whl 0.85s ease-out 2.35s forwards;
            }
            .w2-spk {
              stroke-dasharray: 75; stroke-dashoffset: 75;
              animation: w2-spk 0.42s ease-out 2.85s forwards;
            }
            .w2-spk2 {
              stroke-dasharray: 75; stroke-dashoffset: 75;
              animation: w2-spk 0.42s ease-out 2.92s forwards;
            }
            .w2-hub {
              transform-box: fill-box; transform-origin: center;
              animation: w2-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) 3.1s both;
            }
            .w2-hub2 {
              transform-box: fill-box; transform-origin: center;
              animation: w2-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) 3.2s both;
            }
            .w2-glass {
              animation: w2-rise 0.6s ease-out 2.1s both;
            }
            .w2-det {
              animation: w2-rise 0.5s ease-out 2.45s both;
            }
            .w2-bed {
              animation: w2-rise 0.5s ease-out 2.6s both;
            }
            .w2-dbr {
              animation: w2-rise 0.7s ease-out 2.72s both;
            }
            .w2-tag {
              animation: w2-rise 0.9s ease-out 3.25s both;
            }
            .w2-glow {
              animation: w2-breathe 3.8s ease-in-out 3.3s infinite;
            }
            .w2-hl {
              animation: w2-hlight 2.4s ease-in-out 3.0s infinite;
            }
            .w2-ex1 {
              transform-box: fill-box; transform-origin: center;
              animation: w2-exhaust 1.6s ease-out 3.05s infinite;
            }
            .w2-ex2 {
              transform-box: fill-box; transform-origin: center;
              animation: w2-exhaust 1.6s ease-out 3.42s infinite;
            }
            .w2-ex3 {
              transform-box: fill-box; transform-origin: center;
              animation: w2-exhaust 1.6s ease-out 3.78s infinite;
            }

            .w2-sl1 { stroke-dasharray: 115; animation: w2-streak 2.1s ease-in-out          infinite; }
            .w2-sl2 { stroke-dasharray: 76;  animation: w2-streak 2.1s ease-in-out 0.30s    infinite; }
            .w2-sl3 { stroke-dasharray: 130; animation: w2-streak 2.1s ease-in-out 0.16s    infinite; }
            .w2-sl4 { stroke-dasharray: 58;  animation: w2-streak 2.1s ease-in-out 0.46s    infinite; }
          `}</style>

          {/* Radial glow beneath truck */}
          <radialGradient id="rg-truck-glow" cx="46%" cy="80%" r="52%">
            <stop offset="0%"   stopColor="#D72B2B" stopOpacity="0.45" />
            <stop offset="48%"  stopColor="#D72B2B" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#D72B2B" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* ── Ambient glow pool under truck ── */}
        <ellipse cx="168" cy="312" rx="155" ry="20" fill="url(#rg-truck-glow)" />

        {/* ── Outer breathing rings ── */}
        <circle className="w2-glow" cx="168" cy="215" r="138" stroke="#D72B2B" strokeWidth="0.55" />
        <circle className="w2-glow" cx="168" cy="215" r="110" stroke="#D72B2B" strokeWidth="0.3"
          style={{ animationDelay: '0.45s' }} />

        {/* ── Headlight beam (from truck front face) ── */}
        <path
          className="w2-hl"
          d="M 24 238 L 0 215 L 0 262 Z"
          fill="rgba(255,140,140,0.1)"
          opacity="0"
        />

        {/* ── Speed lines (mid-height, emanating left) ── */}
        <line className="w2-sl1" x1="6"  y1="158" x2="108" y2="158" stroke="#D72B2B" strokeWidth="3.6" strokeLinecap="round" />
        <line className="w2-sl3" x1="6"  y1="170" x2="122" y2="170" stroke="#D72B2B" strokeWidth="1.5" strokeLinecap="round" />
        <line className="w2-sl2" x1="6"  y1="180" x2="88"  y2="180" stroke="#D72B2B" strokeWidth="0.9" strokeLinecap="round" />
        <line className="w2-sl4" x1="6"  y1="188" x2="100" y2="188" stroke="#D72B2B" strokeWidth="0.5" strokeLinecap="round" />

        {/* ── Stars (above cab roof at y=108) ── */}
        <text x="152" y="92" fontSize="11" fill="white" textAnchor="middle" opacity="0.58">★</text>
        <text x="168" y="92" fontSize="11" fill="white" textAnchor="middle" opacity="0.58">★</text>
        <text x="184" y="92" fontSize="11" fill="white" textAnchor="middle" opacity="0.58">★</text>

        {/* ── Racing number watermark ── */}
        <text
          x="192" y="300"
          fontSize="220" fontWeight="900"
          fontFamily="'Barlow Condensed','Arial Narrow',sans-serif"
          fill="#D72B2B" textAnchor="middle" opacity="0.028"
        >2</text>

        {/* ── Exhaust puffs (drift right from rear of dump box) ── */}
        <circle className="w2-ex1" cx="298" cy="302" r="7"   fill="rgba(215,43,43,0.25)" />
        <circle className="w2-ex2" cx="297" cy="297" r="5"   fill="rgba(245,245,245,0.18)" />
        <circle className="w2-ex3" cx="299" cy="305" r="8.5" fill="rgba(215,43,43,0.18)" />

        {/* ── Vertical exhaust stack on cab roof ── */}
        <rect
          className="w2-det"
          x="148" y="80" width="5" height="28" rx="1"
          stroke="#D72B2B" strokeWidth="1"
          fill="rgba(215,43,43,0.08)"
          opacity="0"
        />

        {/*═══════════════════════════════════════════════════════
          DUMP TRUCK BODY — matches reference photo shape
          Tall vertical front face, boxy cab, large dump box

          Ground:   y = 310
          Cab:      x=22→158  (136px: bumper + hood + cab)
          Dump box: x=168→298 (130px tall rectangular cargo box)
          Wheels:   front cx=80  cy=278 r=32
                    rear  cx=248 cy=278 r=32
        ═══════════════════════════════════════════════════════*/}
        <path
          className="w2-body"
          d="
            M 22 310
            L 22 210
            L 38 210
            L 38 192
            L 95 174
            L 102 112
            L 106 108
            L 154 108
            L 158 114
            L 158 218
            L 168 218
            L 168 116
            L 298 116
            L 298 310
          "
          stroke="#D72B2B"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Windshield glass (large, nearly vertical — dump truck style) ── */}
        <path
          className="w2-glass"
          d="M 95 174 L 102 112 L 154 108 L 154 172 Z"
          fill="rgba(215,43,43,0.1)"
          stroke="#D72B2B"
          strokeWidth="1.2"
          opacity="0"
        />

        {/* ── Dual headlights on front face ── */}
        <g className="w2-det" opacity="0">
          <rect x="23" y="226" width="14" height="9"  rx="1.5"
            stroke="#D72B2B" strokeWidth="1.2" fill="rgba(255,200,200,0.22)" />
          <rect x="23" y="239" width="14" height="7"  rx="1"
            stroke="rgba(215,43,43,0.55)" strokeWidth="1" fill="rgba(255,200,200,0.1)" />
        </g>

        {/* ── Grille horizontal bars (dump truck / heavy-duty style) ── */}
        <g className="w2-det" opacity="0">
          <line x1="25" y1="250" x2="36" y2="250" stroke="rgba(215,43,43,0.62)" strokeWidth="1.1" />
          <line x1="25" y1="256" x2="36" y2="256" stroke="rgba(215,43,43,0.62)" strokeWidth="1.1" />
          <line x1="25" y1="262" x2="36" y2="262" stroke="rgba(215,43,43,0.62)" strokeWidth="1.1" />
          <line x1="25" y1="268" x2="36" y2="268" stroke="rgba(215,43,43,0.5)"  strokeWidth="0.9" />
          <line x1="25" y1="274" x2="36" y2="274" stroke="rgba(215,43,43,0.38)" strokeWidth="0.8" />
        </g>

        {/* ── Door panel line + handle ── */}
        <g className="w2-det" opacity="0">
          <line x1="95" y1="188" x2="158" y2="188"
            stroke="rgba(215,43,43,0.38)" strokeWidth="0.9" />
          <rect x="118" y="183" width="16" height="4" rx="2"
            stroke="rgba(215,43,43,0.52)" strokeWidth="0.9" fill="none" />
        </g>

        {/* ── Cab step / running board ── */}
        <line
          className="w2-det"
          x1="98" y1="234" x2="158" y2="234"
          stroke="rgba(215,43,43,0.28)" strokeWidth="2"
          opacity="0"
        />

        {/* ── Dump box: bottom edge + vertical reinforcement ribs ── */}
        <g className="w2-bed" opacity="0">
          {/* Elevated bottom edge of dump box (shows it sits on chassis) */}
          <line x1="168" y1="224" x2="298" y2="224"
            stroke="rgba(215,43,43,0.42)" strokeWidth="1.4" />
          {/* Vertical ribs across the dump box side */}
          <line x1="202" y1="116" x2="202" y2="224" stroke="rgba(215,43,43,0.3)" strokeWidth="0.9" />
          <line x1="236" y1="116" x2="236" y2="224" stroke="rgba(215,43,43,0.3)" strokeWidth="0.9" />
          <line x1="268" y1="116" x2="268" y2="224" stroke="rgba(215,43,43,0.3)" strokeWidth="0.9" />
          {/* Hydraulic ram hint (diagonal brace from cab back to box front) */}
          <line x1="158" y1="176" x2="168" y2="218"
            stroke="rgba(215,43,43,0.35)" strokeWidth="1" />
        </g>

        {/* ── Debris in dump box (sticking above box top at y=116) ── */}
        <g className="w2-dbr" opacity="0">
          <rect x="182" y="98"  width="14" height="20" rx="0.5"
            stroke="rgba(245,245,245,0.52)" strokeWidth="1.2" fill="none"
            transform="rotate(12,189,108)" />
          <rect x="208" y="95"  width="11" height="18" rx="0.5"
            stroke="rgba(215,43,43,0.62)"  strokeWidth="1.1" fill="none"
            transform="rotate(-9,213,104)" />
          <rect x="236" y="100" width="13" height="17" rx="0.5"
            stroke="rgba(245,245,245,0.44)" strokeWidth="1.1" fill="none"
            transform="rotate(15,242,108)" />
          <rect x="258" y="96"  width="10" height="16" rx="0.5"
            stroke="rgba(245,245,245,0.38)" strokeWidth="1"   fill="none"
            transform="rotate(-12,263,104)" />
          <rect x="278" y="99"  width="12" height="19" rx="0.5"
            stroke="rgba(215,43,43,0.5)"   strokeWidth="1"   fill="none"
            transform="rotate(8,284,108)" />
        </g>

        {/* ══ FRONT WHEEL  cx=80 cy=278 r=32 ══ */}
        <circle className="w2-whl"  cx="80" cy="278" r="32" stroke="#D72B2B" strokeWidth="2.8" />
        <circle className="w2-whl"  cx="80" cy="278" r="21" stroke="rgba(215,43,43,0.35)" strokeWidth="1.2" />
        <line className="w2-spk" x1="80"  y1="246" x2="80"  y2="308" stroke="#D72B2B" strokeWidth="1.3" />
        <line className="w2-spk" x1="48"  y1="278" x2="112" y2="278" stroke="#D72B2B" strokeWidth="1.3" />
        <line className="w2-spk" x1="57"  y1="255" x2="103" y2="301" stroke="#D72B2B" strokeWidth="1" strokeOpacity="0.55" />
        <line className="w2-spk" x1="103" y1="255" x2="57"  y2="301" stroke="#D72B2B" strokeWidth="1" strokeOpacity="0.55" />
        <g className="w2-hub">
          <circle cx="80" cy="278" r="8"   fill="#D72B2B" />
          <circle cx="80" cy="278" r="4"   fill="#0d0d0d" />
        </g>

        {/* ══ REAR WHEEL  cx=248 cy=278 r=32 ══ */}
        <circle className="w2-whl2" cx="248" cy="278" r="32" stroke="#D72B2B" strokeWidth="2.8" />
        <circle className="w2-whl2" cx="248" cy="278" r="21" stroke="rgba(215,43,43,0.35)" strokeWidth="1.2" />
        <line className="w2-spk2" x1="248" y1="246" x2="248" y2="308" stroke="#D72B2B" strokeWidth="1.3" />
        <line className="w2-spk2" x1="216" y1="278" x2="280" y2="278" stroke="#D72B2B" strokeWidth="1.3" />
        <line className="w2-spk2" x1="225" y1="255" x2="271" y2="301" stroke="#D72B2B" strokeWidth="1" strokeOpacity="0.55" />
        <line className="w2-spk2" x1="271" y1="255" x2="225" y2="301" stroke="#D72B2B" strokeWidth="1" strokeOpacity="0.55" />
        <g className="w2-hub2">
          <circle cx="248" cy="278" r="8"   fill="#D72B2B" />
          <circle cx="248" cy="278" r="4"   fill="#0d0d0d" />
        </g>

        {/* ── Ground line ── */}
        <line
          className="w2-tag"
          x1="10" y1="313" x2="308" y2="313"
          stroke="rgba(215,43,43,0.25)" strokeWidth="0.8"
          opacity="0"
        />

        {/* ── Ground reflection haze ── */}
        <ellipse
          className="w2-tag"
          cx="160" cy="317" rx="148" ry="5.5"
          fill="rgba(215,43,43,0.05)"
          opacity="0"
        />

        {/* ── Tagline ── */}
        <text
          className="w2-tag"
          x="160" y="336"
          fontSize="12"
          fontWeight="700"
          fontFamily="'Barlow Condensed','Arial Narrow',sans-serif"
          fill="#D72B2B"
          textAnchor="middle"
          letterSpacing="4.2"
          opacity="0"
        >
          YOU POINT, WE HAUL
        </text>

        {/* ── URL sub-tagline ── */}
        <text
          className="w2-tag"
          x="160" y="352"
          fontSize="7.5"
          fontWeight="400"
          fontFamily="'Barlow Condensed','Arial Narrow',sans-serif"
          fill="rgba(215,43,43,0.45)"
          textAnchor="middle"
          letterSpacing="5.5"
          opacity="0"
          style={{ animationDelay: '3.35s' }}
        >
          WHERE2JUNK.COM
        </text>
      </svg>
    </div>
  );
}
