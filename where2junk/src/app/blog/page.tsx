import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Where2 Junk Removal Manchester NH',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* TODO: Build blog page */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-display font-black uppercase text-[var(--text-primary)]">
          Blog
        </h1>
      </div>
    </main>
  );
}
