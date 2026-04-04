import type { Metadata } from 'next';
import { siteData } from '@/data/site';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Junk Removal FAQ | Where2 Junk Removal Manchester NH',
  description:
    'Common questions about junk removal in Manchester, NH. Pricing, same-day service, accepted items, licensing, and more.',
};

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteData.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  );
}
