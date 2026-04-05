'use client';

/**
 * HeroAnimation — Where2 Junk right-column animated visual
 *
 * Pattern: Sylvia Rich StStephensCrest (SVG self-draw) + HeroParticles (canvas)
 * Brand: red #D72B2B, white, black — motorsport/junk removal
 *
 * Sequence:
 *   0.0s  Speed lines begin looping
 *   0.3s  Truck body path draws (stroke-dasharray, 1.8s)
 *   1.8s  Windshield fills, debris fades in
 *   2.0s  Wheels draw (circles)
 *   2.5s  Hub caps pop
 *   2.8s  Tagline fades in
 *   3.0s  Glow ring starts pulsing
 */

import { useEffect, useRef } from 'react';

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Canvas: concentrated sparks + horizontal speed-line streaks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (REDUCED) return;

    const sync = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);

    // Motes — red sparks + white debris squares floating upward
    const N = 90;
    const motes = Array.from({ length: N }, (_, i) => ({
      x: Math.random() * 400,
      y: Math.random() * 500,
      r: 0.5 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(0.2 + Math.random() * 0.55),
      op: 0,
      tgt: 0.08 + Math.random() * 0.4,
      red: i % 3 !== 2,
      sq: i % 4 === 0,
      rot: Math.random() * Math.PI * 2,
      rv: (Math.random() - 0.5) * 0.035,
    }));

    // Streaks — horizontal speed lines
    const streaks = Array.from({ length: 5 }, () => ({
      x: -150,
      y: 40 + Math.random() * 420,
      len: 50 + Math.random() * 110,
      spd: 2 + Math.random() * 3.5,
      op: 0,
      phase: Math.random(),
    }));

    // Glimmers — 4-point star flashes
    const glimmers: { x: number; y: number; sz: number; life: number; max: number }[] = [];
    let gt = 0;

    function tick() {
      if (!canvas || !ctx) return;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Motes
      for (const m of motes) {
        m.x += m.vx; m.y += m.vy; m.rot += m.rv;
        if (Math.random() < 0.004) m.tgt = 0.06 + Math.random() * 0.4;
        m.op += (m.tgt - m.op) * 0.02;
        if (m.y < -6) { m.y = h + 4; m.x = Math.random() * w; }
        if (m.x < -6) m.x = w + 4;
        if (m.x > w + 6) m.x = -4;
        ctx.save();
        ctx.globalAlpha = m.op;
        ctx.fillStyle = m.red ? '#D72B2B' : '#F5F5F5';
        if (m.sq) {
          ctx.translate(m.x, m.y); ctx.rotate(m.rot);
          ctx.fillRect(-m.r, -m.r, m.r * 2, m.r * 2);
        } else {
          ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }

      // Streaks
      for (const s of streaks) {
        s.x += s.spd;
        if (s.x > w + 20) {
          s.x = -s.len - 10;
          s.y = 40 + Math.random() * (h - 80);
          s.len = 50 + Math.random() * 110;
          s.spd = 2 + Math.random() * 3.5;
        }
        const mid = s.x + s.len / 2;
        const fade = Math.max(0, 1 - Math.abs(mid - w / 2) / (w * 0.8));
        ctx.save();
        ctx.globalAlpha = fade * 0.32;
        const g = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y);
        g.addColorStop(0, 'transparent');
        g.addColorStop(0.35, '#D72B2B');
        g.addColorStop(1, 'transparent');
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len, s.y); ctx.stroke();
        ctx.restore();
      }

      // Glimmers
      gt++;
      if (gt > 50 && glimmers.length < 4) {
        glimmers.push({ x: 20 + Math.random() * (w - 40), y: 20 + Math.random() * (h - 40), sz: 3 + Math.random() * 5, life: 0, max: 40 + Math.random() * 30 });
        gt = 0;
      }
      for (let i = glimmers.length - 1; i >= 0; i--) {
        const gl = glimmers[i];
        gl.life++;
        const p = gl.life / gl.max;
        const f = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7;
        const s = gl.sz * f;
        ctx.save();
        ctx.translate(gl.x, gl.y);
        ctx.globalAlpha = f * 0.8;
        ctx.strokeStyle = '#D72B2B'; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -s * 2); ctx.lineTo(0, s * 2);
        ctx.moveTo(-s * 2, 0); ctx.lineTo(s * 2, 0);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        if (gl.life >= gl.max) glimmers.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    const onVis = () => { if (document.hidden) cancelAnimationFrame(rafRef.current); else rafRef.current = requestAnimationFrame(tick); };
    document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return (
    <div className="relative w-full" style={{ aspectRatio: '4/5', maxWidth: '420px' }} aria-hidden="true">

      {/* Canvas layer — sparks + streaks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* SVG — self-drawing truck + speed lines + tagline */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 240 300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <style>{`
            /* ── Truck body draws itself ── */
            @keyframes w2-draw {
              from { stroke-dashoffset: 560; opacity: 1; }
              to   { stroke-dashoffset: 0;   opacity: 1; }
            }
            /* ── Wheel circles draw ── */
            @keyframes w2-wheel {
              from { stroke-dashoffset: 185; }
              to   { stroke-dashoffset: 0; }
            }
            /* ── Elements fade + rise in ── */
            @keyframes w2-rise {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            /* ── Hub cap pop ── */
            @keyframes w2-pop {
              0%   { transform: scale(0); opacity: 0; }
              70%  { transform: scale(1.25); opacity: 1; }
              100% { transform: scale(1);  opacity: 1; }
            }
            /* ── Glow ring breathe (infinite after draw) ── */
            @keyframes w2-breathe {
              0%, 100% { opacity: 0.12; r: 72; }
              50%       { opacity: 0.28; r: 80; }
            }
            /* ── Speed lines loop ── */
            @keyframes w2-streak {
              0%   { stroke-dashoffset: 90;  opacity: 0; }
              20%  { opacity: 0.85; }
              80%  { opacity: 0.55; }
              100% { stroke-dashoffset: -15; opacity: 0; }
            }

            .w2-body   { stroke-dasharray: 560; stroke-dashoffset: 560; opacity: 0;
                         animation: w2-draw 1.9s cubic-bezier(0.4,0,0.2,1) 0.35s forwards; }
            .w2-wheel  { stroke-dasharray: 185; stroke-dashoffset: 185;
                         animation: w2-wheel 0.7s ease-out 2.0s forwards; }
            .w2-wheel2 { stroke-dasharray: 185; stroke-dashoffset: 185;
                         animation: w2-wheel 0.7s ease-out 2.1s forwards; }
            .w2-hub    { transform-origin: 72px 218px;
                         animation: w2-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) 2.5s both; }
            .w2-hub2   { transform-origin: 168px 218px;
                         animation: w2-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) 2.6s both; }
            .w2-glass  { animation: w2-rise 0.5s ease-out 1.85s both; }
            .w2-debris { animation: w2-rise 0.6s ease-out 2.05s both; }
            .w2-tag    { animation: w2-rise 0.8s ease-out 2.85s both; }
            .w2-glow   { animation: w2-breathe 3s ease-in-out 3.1s infinite; }

            .w2-sl1 { stroke-dasharray: 70;
                      animation: w2-streak 2.0s ease-in-out infinite; }
            .w2-sl2 { stroke-dasharray: 48;
                      animation: w2-streak 2.0s ease-in-out 0.28s infinite; }
            .w2-sl3 { stroke-dasharray: 85;
                      animation: w2-streak 2.0s ease-in-out 0.14s infinite; }
          `}</style>

          {/* Clipping mask so glow stays inside */}
          <radialGradient id="glow-grad" cx="50%" cy="74%" r="38%">
            <stop offset="0%" stopColor="#D72B2B" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#D72B2B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Ambient glow underneath truck ── */}
        <ellipse cx="120" cy="230" rx="90" ry="18" fill="url(#glow-grad)" opacity="0.4" />

        {/* ── Speed lines (left side, looping) ── */}
        <line className="w2-sl1" x1="8"  y1="88"  x2="78"  y2="88"  stroke="#D72B2B" strokeWidth="2.8" strokeLinecap="round" />
        <line className="w2-sl3" x1="8"  y1="96"  x2="92"  y2="96"  stroke="#D72B2B" strokeWidth="1.2" strokeLinecap="round" />
        <line className="w2-sl2" x1="8"  y1="103" x2="62"  y2="103" stroke="#D72B2B" strokeWidth="0.7" strokeLinecap="round" />

        {/* ── Three stars (right of speed lines) ── */}
        <text x="100" y="101" fontSize="9" fill="white" textAnchor="middle" opacity="0.7">★</text>
        <text x="113" y="101" fontSize="9" fill="white" textAnchor="middle" opacity="0.7">★</text>
        <text x="126" y="101" fontSize="9" fill="white" textAnchor="middle" opacity="0.7">★</text>

        {/* ── Truck body — single continuous path, draws itself ── */}
        {/*
          Side profile:
          front bumper → up front face → step to hood → up hood edge →
          across hood → up windshield → roof → rear window →
          cab back → step UP to bed → bed top → tailgate bottom
        */}
        <path
          className="w2-body"
          d="
            M 28 230
            L 28 195
            L 40 195
            L 40 155
            L 62 155
            L 88 118
            L 140 115
            L 144 140
            L 144 195
            L 144 172
            L 212 172
            L 212 230
          "
          stroke="#D72B2B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Windshield (glass fill) ── */}
        <path
          className="w2-glass"
          d="M 46 154 L 66 128 L 102 125 L 102 154 Z"
          fill="rgba(215,43,43,0.12)"
          stroke="#D72B2B"
          strokeWidth="1.2"
          opacity="0"
        />

        {/* ── Bed interior line ── */}
        <line
          className="w2-glass"
          x1="144" y1="185" x2="212" y2="185"
          stroke="#D72B2B" strokeWidth="1" opacity="0"
          style={{ animationDelay: '2.0s' }}
        />

        {/* ── Debris in truck bed ── */}
        <g className="w2-debris" opacity="0">
          <rect x="152" y="153" width="10" height="14" stroke="rgba(245,245,245,0.55)" strokeWidth="1.2" fill="none" transform="rotate(12, 157, 160)" />
          <rect x="168" y="150" width="8"  height="10" stroke="rgba(245,245,245,0.45)" strokeWidth="1"   fill="none" transform="rotate(-8, 172, 155)" />
          <rect x="183" y="154" width="12" height="9"  stroke="rgba(245,245,245,0.38)" strokeWidth="1"   fill="none" transform="rotate(5, 189, 158)" />
          <rect x="160" y="142" width="7"  height="8"  stroke="rgba(215,43,43,0.6)"   strokeWidth="1"   fill="none" transform="rotate(-15, 163, 146)" />
        </g>

        {/* ── Front wheel ── */}
        <circle className="w2-wheel"  cx="72"  cy="218" r="28" stroke="#D72B2B" strokeWidth="2.5" />
        <circle className="w2-wheel"  cx="72"  cy="218" r="18" stroke="rgba(215,43,43,0.4)" strokeWidth="1" />
        <g className="w2-hub">
          <circle cx="72" cy="218" r="7" fill="#D72B2B" opacity="0" />
        </g>

        {/* ── Rear wheel ── */}
        <circle className="w2-wheel2" cx="168" cy="218" r="28" stroke="#D72B2B" strokeWidth="2.5" />
        <circle className="w2-wheel2" cx="168" cy="218" r="18" stroke="rgba(215,43,43,0.4)" strokeWidth="1" />
        <g className="w2-hub2">
          <circle cx="168" cy="218" r="7" fill="#D72B2B" opacity="0" />
        </g>

        {/* ── Glow ring — breathes after draw completes ── */}
        <circle className="w2-glow" cx="120" cy="185" r="72" stroke="#D72B2B" strokeWidth="0.8" opacity="0" />

        {/* ── Ground line ── */}
        <line
          className="w2-tag"
          x1="18" y1="248" x2="222" y2="248"
          stroke="rgba(215,43,43,0.3)" strokeWidth="0.8" opacity="0"
        />

        {/* ── Tagline ── */}
        <text
          className="w2-tag"
          x="120" y="266"
          fontSize="10"
          fontWeight="700"
          fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
          fill="#D72B2B"
          textAnchor="middle"
          letterSpacing="3.5"
          opacity="0"
        >
          YOU POINT, WE HAUL
        </text>
      </svg>
    </div>
  );
}
