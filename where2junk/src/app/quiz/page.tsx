import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz | Where2 Junk Removal Manchester NH',
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* TODO: Build quiz page */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-display font-black uppercase text-[var(--text-primary)]">
          Quiz
        </h1>
      </div>
    </main>
  );
}
