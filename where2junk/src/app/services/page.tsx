import type { Metadata } from 'next';
import Link from 'next/link';
import { siteData } from '@/data/site';
import ServicesCardGrid from './ServicesCardGrid';

export const metadata: Metadata = {
  title: 'Junk Removal Services Manchester NH | Where2 Junk',
  description:
    'Full-service junk removal in Manchester, NH. Household junk, garage cleanouts, yard waste, construction debris. Same-day available. Upfront pricing.',
};

export default function ServicesPage() {
  const phone = siteData.meta.phone;
  const phoneRaw = siteData.meta.phoneRaw;

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* ─── Page Hero ─────────────────────────────────────────── */}
      <section
        className="pt-24 pb-16"
        style={{ background: 'var(--bg-base)' }}
        aria-labelledby="services-page-heading"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            Manchester, NH
          </span>
          <h1
            id="services-page-heading"
            className="font-display font-black uppercase mt-3"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.05,
            }}
          >
            Every Job.
            <br />
            Every Load.
            <br />
            Handled.
          </h1>
          <p
            className="mt-5 font-body text-lg max-w-xl"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
          >
            Four services. One crew. Upfront pricing on all of it.
          </p>
        </div>
      </section>

      {/* ─── Services Grid ──────────────────────────────────────── */}
      <section
        className="pb-24"
        style={{ background: 'var(--bg-base)' }}
        aria-label="Services"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesCardGrid />
        </div>
      </section>

      {/* ─── Bottom CTA ─────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'var(--primary)' }}
        aria-label="Call to action"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display font-black uppercase text-white mb-8"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Ready to Clear It Out?
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
              href={`tel:+${phoneRaw}`}
              className="inline-flex items-center justify-center px-8 py-4 font-display font-bold uppercase tracking-wide transition-colors duration-200"
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
              }}
            >
              Call {phone}
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
