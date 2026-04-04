'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import { siteData } from '@/data/site';

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <main>
      {/* Page hero */}
      <section
        className="pt-24 pb-12"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--primary)' }}
            >
              Need Answers?
            </p>
            <h1
              className="font-display font-black uppercase text-4xl sm:text-5xl lg:text-6xl leading-none mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Frequently Asked Questions
            </h1>
            <p
              className="font-body text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Everything you need to know before booking.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Accordion */}
      <section
        className="pb-24"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.1}>
            <div className="rounded overflow-hidden">
              {siteData.faq.map((item, index) => {
                const isOpen = openIndex === index;
                const isLast = index === siteData.faq.length - 1;

                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderBottom: isLast
                        ? 'none'
                        : '1px solid rgba(245,245,245,0.08)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleToggle(index)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="font-display font-bold uppercase text-lg leading-snug"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className="shrink-0 transition-transform duration-250"
                        style={{
                          color: 'var(--primary)',
                          transform: `rotate(${isOpen ? 180 : 0}deg)`,
                          transition: 'transform 0.25s ease',
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
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p
                            className="font-body text-base pb-5 px-6 pr-8"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section
        className="py-12"
        style={{ backgroundColor: 'var(--bg-elevated)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2
              className="font-display font-black uppercase text-3xl sm:text-4xl mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Still have questions?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" href="/contact" size="lg">
                Contact Us
              </Button>
              <Button variant="ghost" href="/booking" size="lg">
                Book a Pickup
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
