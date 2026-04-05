import type { MetadataRoute } from 'next';
import { siteData } from '@/data/site';

const BASE = 'https://where2junk.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/booking',
    '/contact',
    '/faq',
    '/quiz',
    '/services',
    '/blog',
    '/testimonials',
    '/gallery',
    '/shop',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as
      | 'weekly'
      | 'monthly',
    priority: path === '' ? 1.0 : path === '/booking' ? 0.9 : 0.8,
  }));

  const services = siteData.services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const areas = siteData.serviceAreas.map((a) => ({
    url: `${BASE}/areas/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const posts = siteData.blog.posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...services, ...areas, ...posts];
}
