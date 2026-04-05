'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: ReadonlyArray<FAQ>;
}

export default function ServiceFAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y" style={{ borderColor: 'var(--primary-muted)' }}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            style={{ background: 'var(--bg-card)' }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className="font-body font-semibold"
                style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}
              >
                {faq.question}
              </span>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300"
                style={{
                  color: 'var(--primary)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="px-6 pb-5 font-body"
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
                      borderTop: '1px solid var(--primary-muted)',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
