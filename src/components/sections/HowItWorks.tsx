import { CalendarDays, Truck, MousePointerClick, CheckCircle, type LucideIcon } from 'lucide-react';
import ScaleIn from '@/components/animations/ScaleIn';
import { siteData } from '@/data/site';

// Map the icon string values from siteData to Lucide components
const iconMap: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  truck: Truck,
  'hand-pointing': MousePointerClick,
  'check-circle': CheckCircle,
};

export default function HowItWorks() {
  const steps = siteData.howItWorks;

  return (
    <section
      aria-labelledby="how-it-works-heading"
      style={{ background: 'var(--bg-elevated)' }}
      className="py-16 md:py-24"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary)' }}
          >
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="font-display font-black uppercase text-4xl md:text-5xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Four Steps. Zero Hassle.
          </h2>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] ?? CheckCircle;

            return (
              <ScaleIn key={step.step} delay={i * 0.1}>
                <div
                  className="relative rounded-lg p-6 h-full flex flex-col"
                  style={{ background: 'var(--bg-card)' }}
                >
                  {/* Ghost step number — behind the content */}
                  <span
                    aria-hidden="true"
                    className="font-display font-black text-6xl leading-none select-none absolute top-4 right-4"
                    style={{ color: 'var(--primary)', opacity: 0.15 }}
                  >
                    {step.step}
                  </span>

                  {/* Icon */}
                  <div
                    className="mb-4 w-10 h-10 flex items-center justify-center rounded-md flex-shrink-0"
                    style={{ background: 'rgba(215, 43, 43, 0.12)' }}
                  >
                    <Icon
                      size={20}
                      aria-hidden="true"
                      style={{ color: 'var(--primary)' }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-black uppercase text-xl mb-2 relative z-10"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body text-sm leading-relaxed relative z-10"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </ScaleIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
