import Link from 'next/link';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import { siteData } from '@/data/site';

// Ensure we always show exactly 3 slots; fill remaining with placeholders.
const PREVIEW_COUNT = 3;

export default function BlogPreview() {
  const posts = siteData.blog.posts.slice(0, PREVIEW_COUNT);
  const placeholderCount = Math.max(0, PREVIEW_COUNT - posts.length);

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: 'var(--bg-elevated)' }}
      aria-labelledby="blog-preview-heading"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            From The Blog
          </span>
          <h2
            id="blog-preview-heading"
            className="font-display font-black uppercase mt-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            Junk Removal Tips &amp; Local Guides
          </h2>
        </div>

        {/* Card grid — 1-col mobile / 3-col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Real post cards */}
          {posts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.1}>
              <article
                className="flex flex-col h-full p-6 md:p-8"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(245,245,245,0.08)',
                }}
              >
                {/* Category badge */}
                <span
                  className="inline-block self-start font-mono text-xs uppercase tracking-widest px-3 py-1 mb-4"
                  style={{
                    border: '1px solid var(--primary-muted)',
                    color: 'var(--primary)',
                    background: 'transparent',
                  }}
                >
                  {post.category}
                </span>

                {/* Title */}
                <h3
                  className="font-display font-extrabold uppercase mb-3 flex-none"
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    color: 'var(--text-primary)',
                    lineHeight: '1.2',
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="font-body flex-1 mb-6"
                  style={{
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    fontSize: '0.9375rem',
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Read more */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-body font-semibold transition-colors duration-150 mt-auto"
                  style={{ color: 'var(--primary)' }}
                  aria-label={`Read more: ${post.title}`}
                >
                  Read More &rarr;
                </Link>
              </article>
            </FadeUp>
          ))}

          {/* Placeholder cards for any missing slots */}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <FadeUp key={`placeholder-${i}`} delay={(posts.length + i) * 0.1}>
              <div
                className="flex flex-col items-center justify-center h-full min-h-[220px] p-8"
                style={{
                  background: 'var(--bg-card)',
                  border: '2px dashed var(--primary-muted)',
                }}
                aria-hidden="true"
              >
                <span
                  className="font-mono text-sm uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Coming Soon
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button variant="ghost" href="/blog" size="md">
            Visit The Blog
          </Button>
        </div>

      </div>
    </section>
  );
}
