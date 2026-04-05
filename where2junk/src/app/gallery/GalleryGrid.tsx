'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const GALLERY_ITEMS = [
  { file: 'gallery-01', alt: 'Loaded junk removal truck ready for haul', category: 'all' },
  { file: 'gallery-02', alt: 'Cluttered garage before cleanout', category: 'garage' },
  { file: 'gallery-03', alt: 'Empty garage after cleanout', category: 'garage' },
  { file: 'gallery-04', alt: 'Construction debris removal at renovation site', category: 'construction' },
  { file: 'gallery-05', alt: 'Yard waste and storm debris removal', category: 'yard' },
  { file: 'gallery-06', alt: 'Furniture removal from residential home', category: 'estate' },
  { file: 'gallery-07', alt: 'Sorted donation items during cleanout', category: 'estate' },
  { file: 'gallery-08', alt: 'Before and after basement cleanout', category: 'garage' },
];

const FILTERS = [
  { label: 'All Jobs', value: 'all' },
  { label: 'Garage & Basement', value: 'garage' },
  { label: 'Construction', value: 'construction' },
  { label: 'Yard Waste', value: 'yard' },
  { label: 'Estate & Home', value: 'estate' },
];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className="px-4 py-2 font-body text-sm transition-all duration-150"
            style={{
              border: '1px solid',
              borderColor:
                activeFilter === f.value
                  ? 'var(--primary)'
                  : 'rgba(245,245,245,0.15)',
              background:
                activeFilter === f.value
                  ? 'rgba(215,43,43,0.12)'
                  : 'transparent',
              color:
                activeFilter === f.value
                  ? 'var(--text-primary)'
                  : 'var(--text-muted)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
        layout
      >
        <AnimatePresence mode="popLayout">
        {filtered.map((item, i) => (
          <motion.div
            key={item.file}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="relative overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={`/images/gallery/${item.file}.jpg`}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p
          className="text-center py-16 font-body"
          style={{ color: 'var(--text-muted)' }}
        >
          No photos in this category yet.
        </p>
      )}
    </div>
  );
}
