/**
 * A thin chiseled divider: gold line flanking a small engraved crown mark.
 * Hand-drawn SVG — deliberately jagged, like the broken crown.
 */
export default function EngravedRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-gold/60" />
      <CrownMark className="h-4 w-6 text-gold" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/60 to-gold/60" />
    </div>
  );
}

export function CrownMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 12 L3 5 L7 8.5 L10.5 2 L12 4.5 L13.5 2 L17 8.5 L21 5 L22 12 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
