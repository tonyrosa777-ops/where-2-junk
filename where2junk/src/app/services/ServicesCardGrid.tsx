'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Home, TreePine, HardHat, CheckCircle } from 'lucide-react';
import StaggerContainer, { staggerItem } from '@/components/animations/StaggerContainer';
import { siteData } from '@/data/site';

const iconMap: Record<string, React.ElementType> = {
  'trash-2': Trash2,
  home: Home,
  'tree-pine': TreePine,
  'hard-hat': HardHat,
};

export default function ServicesCardGrid() {
  const services = siteData.services;

  return (
    <StaggerContainer
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      staggerDelay={0.1}
    >
      {services.map((service) => {
        const Icon = iconMap[service.icon] ?? Trash2;
        return (
          <motion.div
            key={service.slug}
            variants={staggerItem}
            className="flex flex-col p-6 md:p-8"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(245,245,245,0.08)',
            }}
          >
            {/* Icon box */}
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
            <h2
              className="font-display font-black uppercase mb-3"
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                color: 'var(--text-primary)',
              }}
            >
              {service.title}
            </h2>

            {/* Description */}
            <p
              className="font-body flex-1 mb-5"
              style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
            >
              {service.description}
            </p>

            {/* Feature list — first 3 */}
            <ul className="mb-6 space-y-2">
              {service.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: 'var(--primary)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Learn More link */}
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-1 font-body font-semibold transition-colors duration-150"
              style={{ color: 'var(--primary)' }}
              aria-label={`Learn more about ${service.title}`}
            >
              Learn More →
            </Link>
          </motion.div>
        );
      })}
    </StaggerContainer>
  );
}
