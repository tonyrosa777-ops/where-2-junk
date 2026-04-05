'use client';

/**
 * Where2Logo — animated SVG wordmark
 * Inspired by the business card: red speed lines, 3 stars, red "2" box, JUNK REMOVAL sub-text
 * Speed lines loop continuously; stars twinkle in sequence
 */
export default function Where2Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 162 44"
      height="36"
      aria-label="Where2 Junk Removal"
      role="img"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <style>{`
          @keyframes w2-speed {
            0%   { stroke-dashoffset: 60; opacity: 0; }
            15%  { opacity: 1; }
            70%  { opacity: 0.7; }
            100% { stroke-dashoffset: -8; opacity: 0; }
          }
          @keyframes w2-twinkle {
            0%, 100% { opacity: 0.35; }
            50%       { opacity: 1; }
          }
          .w2-l1 {
            stroke-dasharray: 44;
            animation: w2-speed 2.2s ease-in-out infinite;
          }
          .w2-l2 {
            stroke-dasharray: 32;
            animation: w2-speed 2.2s ease-in-out 0.2s infinite;
          }
          .w2-l3 {
            stroke-dasharray: 54;
            animation: w2-speed 2.2s ease-in-out 0.1s infinite;
          }
          .w2-s1 { animation: w2-twinkle 2.4s ease-in-out infinite; }
          .w2-s2 { animation: w2-twinkle 2.4s ease-in-out 0.8s infinite; }
          .w2-s3 { animation: w2-twinkle 2.4s ease-in-out 1.6s infinite; }
        `}</style>
      </defs>

      {/* ── Speed lines (left, race-inspired) ── */}
      <line
        className="w2-l1"
        x1="0" y1="6" x2="44" y2="6"
        stroke="#D72B2B" strokeWidth="2.5" strokeLinecap="round"
      />
      <line
        className="w2-l3"
        x1="0" y1="11" x2="54" y2="11"
        stroke="#D72B2B" strokeWidth="1.2" strokeLinecap="round"
      />
      <line
        className="w2-l2"
        x1="0" y1="15" x2="32" y2="15"
        stroke="#D72B2B" strokeWidth="0.7" strokeLinecap="round"
      />

      {/* ── Three stars (twinkling, sequential) ── */}
      <text className="w2-s1" x="57"  y="15" fontSize="8" fill="white" textAnchor="middle">★</text>
      <text className="w2-s2" x="67"  y="15" fontSize="8" fill="white" textAnchor="middle">★</text>
      <text className="w2-s3" x="77"  y="15" fontSize="8" fill="white" textAnchor="middle">★</text>

      {/* ── WHERE (white, bold display) ── */}
      <text
        x="0" y="41"
        fontSize="28"
        fontWeight="900"
        fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
        fill="#ffffff"
        letterSpacing="-0.5"
      >
        WHERE
      </text>

      {/* ── 2 — red filled box, white numeral (matches card) ── */}
      <rect x="88" y="16" width="23" height="27" fill="#D72B2B" rx="1" />
      <text
        x="99.5" y="40"
        fontSize="24"
        fontWeight="900"
        fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
        fill="#ffffff"
        textAnchor="middle"
      >
        2
      </text>

      {/* ── Vertical divider ── */}
      <line
        x1="117" y1="18" x2="117" y2="42"
        stroke="rgba(215,43,43,0.45)" strokeWidth="1"
      />

      {/* ── JUNK (right sub-text, upper) ── */}
      <text
        x="122" y="31"
        fontSize="12"
        fontWeight="900"
        fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
        fill="#ffffff"
        letterSpacing="2"
      >
        JUNK
      </text>

      {/* ── REMOVAL (right sub-text, lower) ── */}
      <text
        x="122" y="42"
        fontSize="8"
        fontWeight="400"
        fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
        fill="rgba(245,245,245,0.45)"
        letterSpacing="2"
      >
        REMOVAL
      </text>
    </svg>
  );
}
