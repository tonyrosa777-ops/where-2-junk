import type { Metadata } from 'next';
import { Barlow_Condensed, Barlow, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCallBar from '@/components/layout/StickyCallBar';

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
        <Header />
        {children}
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
