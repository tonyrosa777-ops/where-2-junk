import type { Metadata } from 'next';
import { siteData } from '@/data/site';

export const metadata: Metadata = {
  title: siteData.seo.defaultTitle,
  description: siteData.seo.defaultDescription,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/*
        Homepage sections — built in Stage 1D:
        1. HeroSection
        2. TrustBar
        3. ServicesGrid
        4. HowItWorks
        5. WhyChooseUs
        6. StatsCounter
        7. ServiceAreasSection
        8. TestimonialsCarousel (3-4 featured)
        9. Quiz CTA inline
        10. Blog preview
        11. Booking teaser (Calendly inline)
        12. FinalCTABanner
      */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 px-4">
          <p className="font-mono text-sm uppercase tracking-widest text-[var(--primary)]">
            Where2 Junk Removal Services LLC
          </p>
          <h1 className="font-display font-black uppercase text-6xl text-[var(--text-primary)]">
            You Point, We Haul!
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Manchester, NH — Scaffold complete. Build in progress.
          </p>
          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            <a
              href="/booking"
              className="px-8 py-4 bg-[var(--primary)] text-white font-display font-bold uppercase tracking-wide hover:bg-[var(--accent)] transition-colors"
            >
              Book Now
            </a>
            <a
              href="/services"
              className="px-8 py-4 border border-[var(--primary-muted)] text-[var(--text-primary)] font-display font-bold uppercase tracking-wide hover:border-[var(--primary)] transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
