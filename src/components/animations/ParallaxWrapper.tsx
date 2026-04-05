'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  speed?: number; // 0.1 = subtle, 0.3 = noticeable
  className?: string;
}

export default function ParallaxWrapper({ children, speed = 0.15, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
