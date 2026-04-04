import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Where2 Junk Removal | Manchester NH',
  description:
    'Contact Where2 Junk Removal. Call, email, or fill out the form. Same-day response. Manchester, NH.',
};

export default function ContactPage() {
  return <ContactClient />;
}
