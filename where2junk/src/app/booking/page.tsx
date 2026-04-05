import type { Metadata } from 'next';
import { siteData } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import { BookingCalendar } from '@/components/ui/BookingCalendar';

export const metadata: Metadata = {
  title: 'Book Junk Removal Online | Where2 Junk Removal Manchester NH',
  description:
    'Schedule your junk removal pickup in 60 seconds. Where2 Junk serves Manchester, NH and surrounding areas. Same-day available.',
};

const { meta } = siteData;

const trustItems = ['Licensed & Insured', 'Same-Day Available', 'Upfront Pricing'] as const;

export default function BookingPage() {
  return (
    <main>
      {/* ── 1. Page Hero ─────────────────────────────────────────── */}
      <section
        className="pt-24 pb-12 md:pt-32 md:pb-16"
        style={{ background: 'var(--bg-base)' }}
        aria-label="Booking page hero"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--primary)' }}
            >
              Online Booking
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-display font-black uppercase leading-none mt-4"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: 'var(--text-primary)',
              }}
            >
              Schedule Your Pickup
            </h1>
          </FadeUp>

          <FadeUp delay={0.18}>
            <p
              className="font-body text-lg mt-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Pick a time that works. We confirm within the hour.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. Booking Calendar ──────────────────────────────────── */}
      <section
        className="pb-6"
        style={{ background: 'var(--bg-base)' }}
        aria-label="Booking calendar"
      >
        <div className="max-w-[800px] mx-auto w-full px-4">
          <BookingCalendar />
        </div>
      </section>

      {/* ── 3. Fallback / Phone Row ──────────────────────────────── */}
      <section
        className="pb-10"
        style={{ background: 'var(--bg-base)' }}
        aria-label="Phone fallback"
      >
        <p
          className="font-mono text-sm text-center mt-6"
          style={{ color: 'var(--text-muted)' }}
        >
          Or call us:{' '}
          <a
            href={`tel:+${meta.phoneRaw}`}
            style={{ color: 'var(--primary)' }}
          >
            {meta.phone}
          </a>
        </p>
      </section>

      {/* ── 4. Trust Strip ───────────────────────────────────────── */}
      <section
        className="py-10"
        style={{ background: 'var(--bg-elevated)' }}
        aria-label="Trust indicators"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
              {trustItems.map((item, index) => (
                <span key={item} className="flex items-center gap-4">
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item}
                  </span>
                  {index < trustItems.length - 1 && (
                    <span
                      className="hidden sm:inline font-mono text-xs mx-2"
                      style={{ color: 'var(--text-muted)' }}
                      aria-hidden="true"
                    >
                      &middot;
                    </span>
                  )}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
