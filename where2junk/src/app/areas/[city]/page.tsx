import type { Metadata } from 'next';
import { siteData } from '@/data/site';
import { notFound } from 'next/navigation';

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

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      {/* TODO: Build city service area page */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-display font-black uppercase text-[var(--text-primary)]">
          Junk Removal in {area.city}, {area.state}
        </h1>
      </div>
    </main>
  );
}
