'use client';

import { Trash2, Home, TreePine, HardHat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StaggerContainer, { staggerItem } from '@/components/animations/StaggerContainer';
import Button from '@/components/ui/Button';
import { siteData } from '@/data/site';

const iconMap: Record<string, React.ElementType> = {
  'trash-2': Trash2,
  home: Home,
  'tree-pine': TreePine,
  'hard-hat': HardHat,
};

export default function ServicesGrid() {
  const services = siteData.services;

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: 'var(--bg-base)' }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            Our Services
          </span>
          <h2
            id="services-heading"
            className="font-display font-black uppercase mt-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            Everything Hauled, Nothing Left Behind
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto font-body"
            style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.6' }}
          >
            Residential and commercial junk removal in Manchester, NH. Same-day available. Upfront
            pricing on every job.
          </p>
        </div>

        {/* Cards grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          staggerDelay={0.1}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Trash2;

            return (
              <motion.div
                key={service.slug}
                variants={staggerItem}
                whileHover={{ boxShadow: '0 4px 24px rgba(215,43,43,0.15)' }}
                className="group relative flex flex-col p-6 md:p-8 transition-shadow duration-200"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(245,245,245,0.08)',
                  outline: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(245,245,245,0.08)';
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-12 h-12 mb-5 shrink-0"
                  style={{
                    border: '1px solid var(--primary-muted)',
                    color: 'var(--primary)',
                  }}
                >
                  <Icon size={22} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-extrabold uppercase mb-3"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="font-body flex-1 mb-6"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
                >
                  {service.description}
                </p>

                {/* Learn More link */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 font-body font-semibold transition-colors duration-150"
                  style={{ color: 'var(--primary)' }}
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button variant="primary" href="/services" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
