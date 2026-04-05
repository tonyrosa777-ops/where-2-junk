'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { prefersReducedMotion } from '@/lib/utils';

interface Props {
  text: string;
  type?: 'words' | 'chars';
  stagger?: number;
  className?: string;
  wordClassName?: string;
}

export default function RevealText({
  text,
  type = 'words',
  stagger = 0.06,
  className,
  wordClassName,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const reduced = prefersReducedMotion();
  const items = type === 'words' ? text.split(' ') : text.split('');

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClassName ?? ''}`}
          style={{ marginRight: type === 'words' ? '0.25em' : undefined }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: i * stagger, ease: 'easeOut' }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
}
