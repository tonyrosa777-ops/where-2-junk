import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[var(--primary)] text-white',
  outline: 'border border-[var(--primary)] text-[var(--primary)] bg-transparent',
  muted: 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--primary-muted)]',
};

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-xs uppercase tracking-widest px-3 py-1',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
