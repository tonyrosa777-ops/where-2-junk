import type { Metadata } from 'next';
import { siteData } from '@/data/site';

import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ServicesGrid from '@/components/sections/ServicesGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import StatsCounter from '@/components/sections/StatsCounter';
import AboutTeaser from '@/components/sections/AboutTeaser';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import QuizCTA from '@/components/sections/QuizCTA';
import BlogPreview from '@/components/sections/BlogPreview';
import BookingTeaser from '@/components/sections/BookingTeaser';
import FinalCTABanner from '@/components/sections/FinalCTABanner';

export const metadata: Metadata = {
  title: siteData.seo.defaultTitle,
  description: siteData.seo.defaultDescription,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
            name: siteData.meta.name,
            telephone: siteData.meta.phone,
            email: siteData.meta.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteData.meta.address.street,
              addressLocality: 'Manchester',
              addressRegion: 'NH',
              postalCode: siteData.meta.address.zip,
              addressCountry: 'US',
            },
            url: 'https://where2junk.com',
            openingHours: ['Mo-Sa 07:00-19:00'],
            priceRange: '$$',
            areaServed: [
              { '@type': 'City', name: 'Manchester' },
              { '@type': 'City', name: 'Nashua' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteData.meta.name,
            url: 'https://where2junk.com',
          }),
        }}
      />
      {/* 1 — bg-base */}
      <Hero />
      {/* 2 — bg-elevated */}
      <TrustBar />
      {/* 3 — bg-base */}
      <ServicesGrid />
      {/* 4 — bg-elevated */}
      <HowItWorks />
      {/* 5 — bg-base */}
      <WhyChooseUs />
      {/* 6 — primary accent */}
      <StatsCounter />
      {/* 7 — bg-elevated */}
      <AboutTeaser />
      {/* 8 — bg-base */}
      <TestimonialsCarousel />
      {/* 9 — bg-card border */}
      <QuizCTA />
      {/* 10 — bg-elevated */}
      <BlogPreview />
      {/* 11 — bg-base */}
      <BookingTeaser />
      {/* 12 — primary accent */}
      <FinalCTABanner />
    </main>
  );
}
