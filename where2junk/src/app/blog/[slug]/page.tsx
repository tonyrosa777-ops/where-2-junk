import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteData } from '@/data/site';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';

type Post = (typeof siteData.blog.posts)[number] & { body: string };

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteData.blog.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = siteData.blog.posts.find((p) => p.slug === slug) as Post | undefined;
  if (!post) return {};
  return {
    title: `${post.title} | Where2 Junk Removal Manchester NH`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = siteData.blog.posts.find((p) => p.slug === slug) as Post | undefined;
  if (!post) notFound();

  // Related posts: same category, excluding current, max 2
  const related = siteData.blog.posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2) as Post[];
  const fallbackRelated = related.length < 2
    ? (siteData.blog.posts.filter((p) => p.slug !== post.slug).slice(0, 2 - related.length) as Post[])
    : [];
  const showRelated = [...related, ...fallbackRelated].slice(0, 2);

  return (
    <main style={{ background: 'var(--bg-base)' }}>
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Organization',
              name: 'Where2 Junk Removal Services LLC',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Where2 Junk Removal Services LLC',
              url: 'https://where2junk.com',
            },
          }),
        }}
      />
      {/* Cover image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/9', background: 'var(--bg-card)' }}>
        <Image
          src={`/images/blog/${post.slug}.jpg`}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Article header */}
      <section className="pt-12 pb-8" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ maxWidth: '72ch' }}>
            <FadeUp>
              {/* Back link */}
              <Link href="/blog" className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest mb-6 transition-colors"
                style={{ color: 'var(--text-muted)' }}>
                &larr; Back to Blog
              </Link>
              {/* Category */}
              <span className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1 mb-5"
                style={{ border: '1px solid var(--primary-muted)', color: 'var(--primary)' }}>
                {post.category}
              </span>
              {/* H1 */}
              <h1 className="font-display font-black uppercase leading-none mb-5"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                {post.title}
              </h1>
              {/* Meta */}
              <p className="font-mono text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                {post.readTime} read &middot; Published {post.publishedAt}
              </p>
              {/* Excerpt */}
              <p className="font-body text-lg italic mb-8" style={{ color: 'var(--text-secondary)', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                {post.excerpt}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="pb-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          {/* Author credit */}
          <p className="font-mono text-xs mt-10 pt-6" style={{ borderTop: '1px solid rgba(245,245,245,0.08)', color: 'var(--text-muted)' }}>
            Written by the Where2 Junk Crew &middot; Manchester, NH
          </p>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16" style={{ background: 'var(--primary)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display font-black uppercase text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Ready to Schedule a Pickup?
            </h2>
            <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 font-display font-black uppercase tracking-wide text-lg"
              style={{ background: '#ffffff', color: 'var(--primary)' }}>
              Book Online Now
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Related posts */}
      {showRelated.length > 0 && (
        <section className="py-16" style={{ background: 'var(--bg-elevated)' }}>
          <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-black uppercase mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-primary)' }}>
              More From the Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {showRelated.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  className="flex flex-col p-6 transition-colors"
                  style={{ background: 'var(--bg-card)', border: '1px solid rgba(245,245,245,0.08)' }}>
                  <span className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--primary)' }}>
                    {p.category}
                  </span>
                  <h3 className="font-display font-bold uppercase mb-2"
                    style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                    {p.title}
                  </h3>
                  <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {p.excerpt.slice(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
