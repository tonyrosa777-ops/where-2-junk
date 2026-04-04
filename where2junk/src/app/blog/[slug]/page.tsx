import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} | Where2 Junk Removal Manchester NH`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* TODO: Build blog post page — Sanity CMS integration in blog phase */}
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-display font-black uppercase text-[var(--text-primary)]">
          {slug}
        </h1>
      </div>
    </main>
  );
}
