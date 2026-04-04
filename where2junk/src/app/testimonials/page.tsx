import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | Where2 Junk Removal Manchester NH',
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* TODO: Build testimonials page */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-display font-black uppercase text-[var(--text-primary)]">
          Testimonials
        </h1>
      </div>
    </main>
  );
}
