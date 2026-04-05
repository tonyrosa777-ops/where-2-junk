'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { prefersReducedMotion } from '@/lib/utils';

interface Props {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  end,
  duration = 1800,
  decimals = 0,
  suffix = '',
  prefix = '',
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const spanRef = useRef<HTMLSpanElement>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (!inView || !spanRef.current) return;
    if (reduced) {
      spanRef.current.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      if (spanRef.current) {
        spanRef.current.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration, decimals, suffix, prefix, reduced]);

  return (
    <span ref={ref} className={className}>
      <span ref={spanRef}>{prefix}0{suffix}</span>
    </span>
  );
}
