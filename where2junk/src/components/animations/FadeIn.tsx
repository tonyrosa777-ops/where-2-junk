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

export default function FadeIn({
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
      initial={{ opacity: reduced ? 1 : 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
