import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Junk Removal FAQ | Where2 Junk Removal Manchester NH',
  description:
    'Common questions about junk removal in Manchester, NH. Pricing, same-day service, accepted items, licensing, and more.',
};

export default function FaqPage() {
  return <FAQClient />;
}
