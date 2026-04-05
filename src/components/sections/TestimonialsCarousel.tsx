'use client';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteData } from '@/data/site';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const featured = siteData.testimonials.slice(0, 4);

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();

    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      style={{ background: 'var(--bg-base)' }}
      className="py-16 md:py-24"
      aria-label="Customer testimonials"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.12em] mb-4"
            style={{ color: 'var(--primary)' }}
          >
            WHAT CUSTOMERS SAY
          </p>
          <h2
            className="font-display font-black uppercase leading-none mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            Real People. Real Jobs. Real Results.
          </h2>
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
              5.0 · 32 Reviews
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {featured.map((t, i) => (
                <div
                  key={t.id}
                  /* Full-width on mobile, two-up on sm, three-up on lg */
                  className="flex-shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                    className="h-full flex flex-col rounded-sm p-6 md:p-8"
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
                          size={16}
                          className="fill-current flex-shrink-0"
                          style={{ color: 'var(--primary)' }}
                        />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p
                      className="font-body leading-relaxed text-sm md:text-base flex-1 mb-6"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Card footer */}
                    <div className="flex items-end justify-between gap-3 mt-auto">
                      <div>
                        <p
                          className="font-display font-bold uppercase text-sm tracking-wide"
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
                      <Badge variant="muted" className="flex-shrink-0 text-[10px]">
                        {t.service.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {/* Prev button */}
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              style={{
                background: 'transparent',
                border: '1px solid var(--text-muted)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--text-muted)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Carousel pages">
              {featured.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === selectedIndex}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  style={{
                    width: i === selectedIndex ? '20px' : '8px',
                    height: '8px',
                    background: i === selectedIndex ? 'var(--primary)' : 'var(--text-muted)',
                    border: 'none',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              style={{
                background: 'transparent',
                border: '1px solid var(--text-muted)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--text-muted)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Button variant="ghost" href="/testimonials" size="md">
            See All 32 Reviews &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
