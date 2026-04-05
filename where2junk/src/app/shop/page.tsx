import type { Metadata } from 'next';
import ShopClient from '@/components/shop/ShopClient';

export const metadata: Metadata = {
  title: 'Shop | Where2 Junk — Manchester NH Gear',
  description: 'Rep the crew. WHERE2JUNK branded gear — tees, hoodies, hats, and more. Print-on-demand, shipped direct.',
};

export default function ShopPage() {
  return (
    <main>
      <ShopClient />
    </main>
  );
}
