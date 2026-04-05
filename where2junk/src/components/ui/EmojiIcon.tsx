interface EmojiIconProps {
  emoji: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function EmojiIcon({ emoji, size = 'md', className = '' }: EmojiIconProps) {
  const sizes = {
    sm: { container: '40px', font: '1.125rem' },
    md: { container: '56px', font: '1.5rem' },
    lg: { container: '72px', font: '2rem' },
  };
  const s = sizes[size];
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 transition-all duration-200 ${className}`}
      style={{
        width: s.container,
        height: s.container,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--bg-card), var(--bg-elevated))',
        border: '1.5px solid var(--primary-muted)',
        fontSize: s.font,
        lineHeight: 1,
      }}
    >
      {emoji}
    </div>
  );
}
