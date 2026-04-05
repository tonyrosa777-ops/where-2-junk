import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function formatPhone(raw: string): string {
  // e.g. "16034063724" → "(603) 406-3724"
  const digits = raw.replace(/\D/g, '');
  const local = digits.startsWith('1') ? digits.slice(1) : digits;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}
