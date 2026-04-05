import type { Metadata } from 'next';
import { Barlow_Condensed, Barlow, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCallBar from '@/components/layout/StickyCallBar';
import { CartProvider } from '@/lib/cart';
import CartDrawer from '@/components/shop/CartDrawer';

const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow-condensed',
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  display: 'swap',
});

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Where2 Junk Removal | Manchester, NH — You Point, We Haul!',
    template: '%s | Where2 Junk Removal Manchester NH',
  },
  description:
    'Fast, transparent junk removal in Manchester NH. Same-day available. Residential & commercial. House cleanouts, garage cleanouts, yard waste, construction debris. Book online now.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://where2junk.com'
  ),
  openGraph: {
    siteName: 'Where2 Junk Removal Services LLC',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <StickyCallBar />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
