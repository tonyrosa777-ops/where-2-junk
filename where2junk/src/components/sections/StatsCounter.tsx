'use client';

import { siteData } from '@/data/site';
import CountUp from '@/components/animations/CountUp';

export default function StatsCounter() {
  return (
    <section
      className="py-12 md:py-16"
      style={{ background: 'var(--primary)' }}
      aria-label="Stats"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {siteData.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center py-6 px-4 relative"
            >
              {/* Vertical divider — hidden on first col, visible on desktop for cols 2–4 */}
              {i > 0 && (
                <span
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px"
                  style={{ background: 'rgba(255,255,255,0.25)' }}
                  aria-hidden="true"
                />
              )}

              <CountUp
                end={stat.value}
                suffix={stat.suffix}
                duration={1800}
                className="font-mono font-medium text-4xl md:text-5xl leading-none tracking-tight text-white"
              />

              <span
                className="font-body text-sm mt-2 leading-snug"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
