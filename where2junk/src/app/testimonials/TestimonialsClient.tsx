'use client';
import { useState, useMemo } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteData } from '@/data/site';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';

const ITEMS_PER_PAGE = 8;

const SERVICE_LABELS: Record<string, string> = {
  all: 'All Reviews',
  'junk-removal': 'Junk Removal',
  'garage-cleanout': 'Garage Cleanout',
  'yard-waste-removal': 'Yard Waste',
  'construction-debris-removal': 'Construction',
};

const FILTER_SLUGS = [
  'all',
  'junk-removal',
  'garage-cleanout',
  'yard-waste-removal',
  'construction-debris-removal',
];

const featuredTestimonial = siteData.testimonials[0];

export default function TestimonialsClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? siteData.testimonials
        : siteData.testimonials.filter((t) => t.service === activeFilter),
    [activeFilter]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const pageItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleFilterChange(slug: string) {
    setActiveFilter(slug);
    setCurrentPage(1);
  }

  function handlePrev() {
    setCurrentPage((p) => Math.max(1, p - 1));
  }

  function handleNext() {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }

  return (
    <main>
      {/* ── 1. PAGE HERO ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-base)' }} className="pt-24 pb-12">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase tracking-[0.12em] mb-4"
              style={{ color: 'var(--primary)' }}
            >
              Customer Reviews
            </p>
            <h1
              className="font-display font-black uppercase leading-none mb-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              What Manchester Homeowners Say About Us
            </h1>
            {/* Aggregate star row */}
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-current"
                  style={{ color: 'var(--primary)' }}
                />
              ))}
              <span
                className="font-mono text-xs uppercase tracking-widest ml-2"
                style={{ color: 'var(--text-muted)' }}
              >
                5.0 &middot; 32 Reviews
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. FEATURED QUOTE ───────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-elevated)' }} className="py-12">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.1}>
            <blockquote
              className="border-l-4 pl-8"
              style={{ borderColor: 'var(--primary)' }}
            >
              <p
                className="font-display font-black uppercase text-2xl md:text-3xl leading-tight mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                &ldquo;{featuredTestimonial.text}&rdquo;
              </p>
              <footer>
                <span
                  className="font-display font-bold uppercase text-sm tracking-wide"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {featuredTestimonial.name}
                </span>
                <span
                  className="font-mono text-xs ml-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  &mdash; {featuredTestimonial.location}
                </span>
              </footer>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. FILTER BAR ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-base)' }} className="py-6">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Filter reviews by service"
          >
            {FILTER_SLUGS.map((slug) => {
              const isActive = activeFilter === slug;
              return (
                <button
                  key={slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(slug)}
                  className="font-mono text-xs uppercase tracking-widest px-4 py-2 flex-shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  style={
                    isActive
                      ? {
                          background: 'var(--primary)',
                          color: '#ffffff',
                          border: '1px solid var(--primary)',
                        }
                      : {
                          background: 'var(--bg-card)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--primary-muted)',
                        }
                  }
                >
                  {SERVICE_LABELS[slug]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIALS GRID ────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-base)' }} className="pb-16">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          {pageItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageItems.map((t, i) => (
                <FadeUp key={t.id} delay={i * 0.05}>
                  <div
                    className="flex flex-col p-6 h-full"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--primary-muted)',
                    }}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, si) => (
                        <Star
                          key={si}
                          size={14}
                          className="fill-current"
                          style={{ color: 'var(--primary)' }}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p
                      className="font-body text-sm leading-relaxed flex-1 mb-4"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Footer */}
                    <div className="flex items-end justify-between gap-2 mt-auto">
                      <div>
                        <p
                          className="font-display font-bold uppercase text-sm"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="font-mono text-xs mt-0.5"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {t.location}
                        </p>
                      </div>
                      <Badge variant="muted" className="text-[10px] flex-shrink-0">
                        {t.service.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          ) : (
            <p
              className="font-mono text-sm text-center py-16"
              style={{ color: 'var(--text-muted)' }}
            >
              No reviews found for this service.
            </p>
          )}
        </div>
      </section>

      {/* ── 5. PAGINATION ───────────────────────────────────────────── */}
      {totalPages > 1 && (
        <section style={{ background: 'var(--bg-base)' }} className="pb-12">
          <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              {/* Prev */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-10 h-10 flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--primary-muted)',
                  color: 'var(--text-secondary)',
                }}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page indicator */}
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                Page {currentPage} of {totalPages}
              </span>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-10 h-10 flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--primary-muted)',
                  color: 'var(--text-secondary)',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. BOTTOM CTA ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-elevated)' }} className="py-16">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2
              className="font-display font-black uppercase leading-none mb-6"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              Ready to Add Your Name to the List?
            </h2>
            <Button variant="primary" href="/booking" size="lg">
              Book Your Pickup
            </Button>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
