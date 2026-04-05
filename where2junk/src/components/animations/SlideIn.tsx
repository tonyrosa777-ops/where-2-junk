'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { prefersReducedMotion } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.4,
  threshold = 0.2,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const reduced = prefersReducedMotion();
  const x = direction === 'left' ? -32 : 32;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
