import { NextResponse } from 'next/server';
import { getSyncProducts } from '@/lib/printful';
import seededProducts from '@/lib/printful-seeded-products.json';

export async function GET() {
  try {
    const storeId = seededProducts.storeId as number;
    if (!storeId) throw new Error('No store ID configured');
    const products = await getSyncProducts(storeId);
    return NextResponse.json(products);
  } catch (err) {
    console.error('Printful products fetch error:', err);
    return NextResponse.json(seededProducts.products);
  }
}
