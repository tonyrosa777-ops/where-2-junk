import { ShieldCheck, Zap, DollarSign, Leaf } from 'lucide-react';

const signals = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Zap, label: 'Same-Day Available' },
  { icon: DollarSign, label: 'No Surprise Pricing' },
  { icon: Leaf, label: 'Eco-Friendly Disposal' },
] as const;

export default function TrustBar() {
  return (
    <section
      aria-label="Trust signals"
      style={{ background: 'var(--bg-elevated)' }}
      className="border-b border-white/5"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop: single row with dividers | Mobile: 2×2 grid */}
        <ul className="grid grid-cols-2 gap-y-3 gap-x-4 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-0 list-none m-0 p-0">
          {signals.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              className="flex items-center gap-2 justify-center sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              {/* Divider between items on desktop */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden sm:block mr-6 select-none"
                  style={{ color: 'var(--primary-muted)' }}
                >
                  ·
                </span>
              )}
              <Icon
                size={16}
                aria-hidden="true"
                style={{ color: 'var(--primary)' }}
                className="flex-shrink-0"
              />
              <span
                className="font-mono text-sm uppercase tracking-wide"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
