import type { Metadata } from 'next';
import Link from 'next/link';
import { siteData } from '@/data/site';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return siteData.serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = siteData.serviceAreas.find((a) => a.slug === city);
  if (!area) return {};
  return {
    title: area.seo.title,
    description: area.seo.description,
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = siteData.serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  const { meta } = siteData;

  // Nearby areas that exist in our serviceAreas list (safe to link)
  const nearby = area.nearbyAreas
    .map((name) => siteData.serviceAreas.find((a) => a.city === name))
    .filter((a): a is (typeof siteData.serviceAreas)[number] => Boolean(a));

  // Cities in nearbyAreas that we don't serve yet (render as plain text)
  const nearbyUnserved = area.nearbyAreas.filter(
    (name) => !siteData.serviceAreas.find((a) => a.city === name)
  );

  return (
    <main style={{ background: 'var(--bg-base)' }}>
      {/* ── LocalBusiness Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: meta.name,
            telephone: meta.phone,
            email: meta.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: meta.address.street,
              addressLocality: meta.address.city,
              addressRegion: meta.address.state,
              postalCode: meta.address.zip,
              addressCountry: 'US',
            },
            areaServed: { '@type': 'City', name: area.city },
            url: `https://${meta.domain}/areas/${area.slug}`,
            openingHours: 'Mo-Sa 07:00-19:00',
          }),
        }}
      />

      {/* ── 1. City Hero ── */}
      <section
        className="pt-24 pb-16"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--primary)' }}
            >
              {area.city}, {area.county} County, {area.state}
            </p>
            <h1
              className="font-display font-black uppercase leading-none mb-6"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Junk Removal in {area.city}, NH
            </h1>
            <p
              className="font-body text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {area.description}
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="lg" href="/booking">
                Book a Pickup in {area.city}
              </Button>
              <a
                href={`tel:+${meta.phoneRaw}`}
                className="font-mono font-medium text-base transition-colors duration-200"
                style={{ color: 'var(--primary)' }}
              >
                {meta.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. Services Section ── */}
      <section
        className="py-16"
        style={{ background: 'var(--bg-elevated)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--primary)' }}
            >
              What We Haul in {area.city}
            </p>
            <h2
              className="font-display font-black uppercase mb-10"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              Every Job. Every Load.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteData.services.map((service, i) => (
              <FadeUp key={service.slug} delay={i * 0.08}>
                <div
                  className="flex flex-col p-6 md:p-8 h-full"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(245,245,245,0.08)',
                  }}
                >
                  <h3
                    className="font-display font-extrabold uppercase mb-3"
                    style={{
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="font-body flex-1 mb-5"
                    style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
                  >
                    {service.description.slice(0, 120)}
                    {service.description.length > 120 ? '…' : ''}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 font-body font-semibold transition-colors duration-150"
                    style={{ color: 'var(--primary)' }}
                  >
                    Learn More &rarr;
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Local Trust Section ── */}
      <section
        className="py-16"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2
              className="font-display font-black uppercase mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              Manchester-Based. {area.city}-Ready.
            </h2>
            <p
              className="font-body text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              We operate out of Manchester and serve {area.city} on a regular schedule.
              No franchise call centers, no bait-and-switch pricing. Joshua and his crew
              show up on time, quote it straight, and haul everything out clean.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {['Licensed & Insured', 'Same-Day Available', 'Upfront Pricing', 'Local Crew'].map(
                (trust) => (
                  <div
                    key={trust}
                    className="p-4 text-center"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--primary-muted)',
                    }}
                  >
                    <p
                      className="font-mono text-xs uppercase tracking-widest"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {trust}
                    </p>
                  </div>
                )
              )}
            </div>

            <Button variant="primary" size="lg" href="/booking">
              Book for {area.city}
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* ── 4. Nearby Areas ── */}
      {(nearby.length > 0 || nearbyUnserved.length > 0) && (
        <section
          className="py-12"
          style={{ background: 'var(--bg-elevated)' }}
        >
          <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--primary)' }}
            >
              Also Serving
            </p>
            <h2
              className="font-display font-black uppercase mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                color: 'var(--text-primary)',
              }}
            >
              We Cover the Whole Region
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearby.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="inline-block px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
                  style={{
                    border: '1px solid var(--primary-muted)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {a.city}, NH
                </Link>
              ))}
              {nearbyUnserved.map((name) => (
                <span
                  key={name}
                  className="inline-block px-4 py-2 font-mono text-xs uppercase tracking-widest"
                  style={{
                    border: '1px solid rgba(245,245,245,0.08)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {name}, NH
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. CTA Banner ── */}
      <section
        className="py-16"
        style={{ background: 'var(--primary)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2
              className="font-display font-black uppercase text-white mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.01em' }}
            >
              Ready to Clear Out in {area.city}?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-4 font-display font-black uppercase tracking-wide text-lg transition-colors duration-200 w-full sm:w-auto"
                style={{ background: '#ffffff', color: 'var(--primary)' }}
              >
                Book Online Now
              </a>
              <a
                href={`tel:+${meta.phoneRaw}`}
                className="inline-flex items-center justify-center px-8 py-4 font-display font-black uppercase tracking-wide text-lg transition-colors duration-200 w-full sm:w-auto"
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid rgba(255,255,255,0.6)',
                }}
                aria-label={`Call us at ${meta.phone}`}
              >
                {meta.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
