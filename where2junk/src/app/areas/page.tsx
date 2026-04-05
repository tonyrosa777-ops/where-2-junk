import type { Metadata } from 'next';
import Link from 'next/link';
import { siteData } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';

export const metadata: Metadata = {
  title: 'Service Areas | Where2 Junk Removal Manchester NH',
  description:
    'Where2 Junk Removal serves Manchester and surrounding NH communities. Fast, reliable junk removal near you. Same-day available.',
};

export default function AreasPage() {
  const { serviceAreas, meta } = siteData;

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <style>{`
        .area-card:hover {
          border-color: var(--primary-muted) !important;
          background: var(--bg-elevated) !important;
        }
      `}</style>

      {/* ─── Page Hero ─────────────────────────────────────────── */}
      <section className="pt-24 pb-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--primary)' }}
            >
              Southern New Hampshire
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1
              className="font-display font-black uppercase mt-3"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                lineHeight: 1.05,
              }}
            >
              Areas We Serve
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="mt-5 font-body text-lg max-w-xl"
              style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
            >
              Manchester-based. NH-wide reach. Same-day service available across all locations.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── Areas Grid ─────────────────────────────────────────── */}
      <section className="pb-24" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="area-card group flex flex-col gap-3 p-6 border transition-all duration-200"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'rgba(245,245,245,0.08)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 flex-shrink-0"
                      style={{ background: 'var(--primary)' }}
                    />
                    <span
                      className="font-display font-black uppercase text-sm tracking-widest"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {area.city}, NH
                    </span>
                  </div>
                  {area.description && (
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {area.description}
                    </p>
                  )}
                  <span
                    className="font-mono text-xs uppercase tracking-widest mt-auto transition-colors"
                    style={{ color: 'var(--primary)' }}
                  >
                    View service area →
                  </span>
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── Bottom CTA ─────────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--primary)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display font-black uppercase text-white mb-8"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Not Sure If We Cover Your Area?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 font-display font-bold uppercase tracking-wide transition-colors duration-200"
              style={{ background: 'white', color: 'var(--primary)' }}
            >
              Book Online Now
            </Link>
            <a
              href={`tel:+${meta.phoneRaw}`}
              className="inline-flex items-center justify-center px-8 py-4 font-display font-bold uppercase tracking-wide"
              style={{ background: 'transparent', color: 'white', border: '2px solid white' }}
            >
              Call {meta.phone}
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
