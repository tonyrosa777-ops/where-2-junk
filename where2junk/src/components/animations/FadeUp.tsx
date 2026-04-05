'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { prefersReducedMotion } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.4,
  threshold = 0.2,
  className,
}: Props) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const reduced = prefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
