import Link from 'next/link';
import type { ReactNode } from 'react';

const base =
  'inline-flex items-center justify-center px-8 py-4 font-display uppercase tracking-engraved text-sm md:text-base transition-colors duration-300 select-none';

const styles = {
  primary:
    'bg-charcoal text-gold-bright border border-gold hover:text-gold-glow hover:border-gold-bright cta-pulse',
  secondary:
    'bg-transparent text-bone border border-gold/60 hover:border-gold-bright hover:text-gold-bright',
} as const;

type Props = {
  href: string;
  variant?: keyof typeof styles;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

export default function GoldButton({
  href,
  variant = 'primary',
  children,
  external,
  className = '',
}: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
