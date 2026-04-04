'use client';

import Link from 'next/link';
import { Phone, Calendar } from 'lucide-react';
import { siteData } from '@/data/site';

export default function StickyCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-[var(--bg-elevated)] border-t border-[var(--primary-muted)]">
      <a
        href={`tel:${siteData.meta.phoneRaw}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-[var(--text-primary)] font-display font-bold uppercase text-sm tracking-wide active:bg-[var(--bg-card)] transition-colors"
      >
        <Phone size={18} className="text-[var(--primary)]" />
        {siteData.nav.stickyBar.callLabel}
      </a>
      <div className="w-px bg-[var(--primary-muted)]" />
      <Link
        href="/booking"
        className="flex-1 flex items-center justify-center gap-2 py-4 bg-[var(--primary)] text-white font-display font-bold uppercase text-sm tracking-wide active:bg-[var(--accent)] transition-colors"
      >
        <Calendar size={18} />
        {siteData.nav.stickyBar.bookLabel}
      </Link>
    </div>
  );
}
