import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--bg-card)] border border-transparent p-6 md:p-8',
        hover && 'hover:border-[var(--primary-muted)] transition-colors duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}
