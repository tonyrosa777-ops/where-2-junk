import type { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: 'Customer Reviews | Where2 Junk Removal Manchester NH',
  description:
    '32 real reviews from Manchester, NH homeowners. See what customers say about Where2 Junk Removal Services LLC.',
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
