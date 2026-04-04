import type { Metadata } from 'next';
import Link from 'next/link';
import { siteData } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Junk Removal Blog | Where2 Junk Removal Manchester NH',
  description: 'Tips, guides, and local info about junk removal in Manchester, NH. From garage cleanouts to construction debris.',
};

export default function BlogPage() {
  const posts = siteData.blog.posts;
  return (
    <main style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section className="pt-24 pb-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--primary)' }}>
              From the Crew
            </p>
            <h1 className="font-display font-black uppercase leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Junk Removal Tips &amp; Local Guides
            </h1>
            <p className="font-body text-lg" style={{ color: 'var(--text-secondary)', maxWidth: '36rem' }}>
              Practical advice from the Where2 Junk crew. Manchester, NH and surrounding areas.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Post grid */}
      <section className="pb-24" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.06}>
                <article className="flex flex-col h-full p-6 md:p-8"
                  style={{ background: 'var(--bg-card)', border: '1px solid rgba(245,245,245,0.08)' }}>
                  {/* Category badge */}
                  <span className="inline-block self-start font-mono text-xs uppercase tracking-widest px-3 py-1 mb-4"
                    style={{ border: '1px solid var(--primary-muted)', color: 'var(--primary)' }}>
                    {post.category}
                  </span>
                  {/* Title */}
                  <h2 className="font-display font-extrabold uppercase mb-3 flex-none"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                    {post.title}
                  </h2>
                  {/* Excerpt */}
                  <p className="font-body flex-1 mb-4" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9375rem' }}>
                    {post.excerpt}
                  </p>
                  {/* Meta row */}
                  <p className="font-mono text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
                    {post.readTime} &middot; {post.publishedAt}
                  </p>
                  {/* Read more */}
                  <Link href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-body font-semibold transition-colors duration-150 mt-auto"
                    style={{ color: 'var(--primary)' }}>
                    Read More &rarr;
                  </Link>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--primary)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display font-black uppercase text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Ready to Book a Pickup?
            </h2>
            <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 font-display font-black uppercase tracking-wide text-lg"
              style={{ background: '#ffffff', color: 'var(--primary)' }}>
              Book Online Now
            </a>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
