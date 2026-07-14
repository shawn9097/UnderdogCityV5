import Link from 'next/link';
import type { ReactNode } from 'react';

const base =
  'inline-flex items-center justify-center whitespace-nowrap px-8 py-4 font-display uppercase tracking-engraved text-sm md:text-base transition-colors duration-300 select-none';

const styles = {
  primary:
    'bg-charcoal text-gold-bright border border-gold hover:text-gold-glow hover:border-gold-bright cta-pulse',
  secondary:
    'bg-transparent text-bone border border-gold/60 hover:border-gold-bright hover:text-gold-bright',
  // Solid tarnished-gold fill, void text — the strongest, most obviously
  // clickable treatment. Used where a CTA must not read as secondary.
  solid:
    'bg-gold text-void border border-gold hover:bg-gold-bright hover:border-gold-bright',
  // True outline: transparent field, gilded edge + text. Pairs with `solid`
  // as an equally-clickable counterpart (the slow candlelit pulse balances
  // the visual weight of a filled button).
  outline:
    'bg-transparent text-gold-bright border border-gold-bright hover:bg-gold-bright/10 cta-pulse',
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
