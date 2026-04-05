'use client';

import FadeUp from '@/components/animations/FadeUp';
import EmojiIcon from '@/components/ui/EmojiIcon';
import { siteData } from '@/data/site';

const WHY_US_ICONS: Record<string, string> = {
  zap: '⚡',
  'dollar-sign': '💵',
  'shield-check': '🛡️',
  leaf: '♻️',
};

export default function WhyChooseUs() {
  const items = siteData.whyUs;

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: 'var(--bg-base)' }}
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeUp className="text-center mb-12 md:mb-16">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            Why Where2 Junk
          </span>
          <h2
            id="why-us-heading"
            className="font-display font-black uppercase mt-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            The Junk Removal Company Manchester Actually Needed
          </h2>
        </FadeUp>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => {
            const emoji = WHY_US_ICONS[item.icon] ?? '⚡';

            return (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full p-6 md:p-8"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(245,245,245,0.08)',
                  }}
                >
                  {/* Icon */}
                  <EmojiIcon emoji={emoji} size="md" className="mb-5" />

                  {/* Title */}
                  <h3
                    className="font-display font-extrabold uppercase mb-3"
                    style={{
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body"
                    style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
                  >
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
