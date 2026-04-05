import type { Metadata } from 'next';
import { siteData } from '@/data/site';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import ServiceFAQAccordion from './ServiceFAQAccordion';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteData.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = siteData.services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = siteData.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const phoneRaw = siteData.meta.phoneRaw;
  const phone = siteData.meta.phone;

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.description,
            provider: {
              '@type': 'LocalBusiness',
              name: 'Where2 Junk Removal Services LLC',
              url: 'https://where2junk.com',
            },
            areaServed: { '@type': 'State', name: 'New Hampshire' },
          }),
        }}
      />

      {/* ─── Service Hero ───────────────────────────────────────── */}
      <section
        className="pt-24 pb-16"
        style={{ background: 'var(--bg-base)' }}
        aria-labelledby="service-detail-heading"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            {service.shortTitle}
          </span>
          <h1
            id="service-detail-heading"
            className="font-display font-black uppercase mt-3"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.0,
            }}
          >
            {service.title}
          </h1>
          <p
            className="mt-5 font-body text-lg max-w-xl"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
          >
            {service.description}
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button variant="primary" href="/booking" size="lg">
              Book Now
            </Button>
            <a
              href={`tel:+${phoneRaw}`}
              className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wide transition-colors duration-200"
              style={{ color: 'var(--text-primary)', fontSize: '1rem' }}
            >
              Or Call {phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Features Section ───────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'var(--bg-elevated)' }}
        aria-labelledby="features-heading"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            What&apos;s Included
          </span>
          <h2
            id="features-heading"
            className="font-display font-black uppercase mt-3 mb-8"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            Everything We Handle On This Job
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                  style={{ color: 'var(--primary)' }}
                  aria-hidden="true"
                />
                <span
                  className="font-body"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── FAQ Section ────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'var(--bg-base)' }}
        aria-labelledby="faq-heading"
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            Common Questions
          </span>
          <h2
            id="faq-heading"
            className="font-display font-black uppercase mt-3 mb-8"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            {service.title} — FAQ
          </h2>

          <ServiceFAQAccordion faqs={service.faqs} />
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
            Ready to Schedule?
          </h2>
          <Button
            variant="secondary"
            href="/booking"
            size="lg"
            className="bg-white text-[var(--primary)] border-white hover:bg-white/90 hover:border-white/90"
          >
            Book Online Now
          </Button>
        </div>
      </section>

    </main>
  );
}
