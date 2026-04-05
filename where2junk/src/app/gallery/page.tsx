import type { Metadata } from 'next';
import GalleryGrid from './GalleryGrid';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Our Work | Where2 Junk Removal — Manchester, NH',
  description:
    'Browse real jobs from Where2 Junk Removal in Manchester, NH. Garage cleanouts, estate cleanouts, construction debris, yard waste removal. Before and after photos.',
};

export default function GalleryPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="pt-24 pb-12 md:pt-32 md:pb-16"
        style={{ background: 'var(--bg-base)' }}
        aria-label="Gallery page hero"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--primary)' }}
            >
              Manchester, NH &middot; Licensed &amp; Insured
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
              Jobs We Have Hauled
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-body text-lg mt-4 max-w-xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Every job is someone&apos;s space back. Here is the proof.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Gallery Grid (client) */}
      <section
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-base)' }}
        aria-label="Photo gallery"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{ background: 'var(--bg-elevated)' }}
        aria-label="Book a pickup CTA"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <FadeUp>
            <h2
              className="font-display font-black uppercase leading-tight text-3xl md:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Ready to Clear Your Space?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Button variant="primary" size="lg" href="/booking">
              Book a Pickup
            </Button>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
