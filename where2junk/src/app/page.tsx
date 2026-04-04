import type { Metadata } from 'next';
import { siteData } from '@/data/site';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: siteData.seo.defaultTitle,
  description: siteData.seo.defaultDescription,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* ── Section 1: Hero ── */}
      <Hero />

      {/*
        Remaining homepage sections — built in Stage 1D:
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
    </main>
  );
}
