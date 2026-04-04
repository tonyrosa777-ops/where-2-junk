import type { Metadata } from 'next';
import { siteData } from '@/data/site';
import { notFound } from 'next/navigation';

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

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* TODO: Build service detail page */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-display font-black uppercase text-[var(--text-primary)]">
          {service.title}
        </h1>
      </div>
    </main>
  );
}
