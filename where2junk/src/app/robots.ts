import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/pricing', '/api/'],
      },
    ],
    sitemap: 'https://where2junk.com/sitemap.xml',
  };
}
