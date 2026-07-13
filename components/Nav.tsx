import Link from 'next/link';
import { CrownMark } from '@/components/EngravedRule';

const LINKS = [
  { label: 'Serial', href: '/serial' },
  { label: 'Music', href: '/music' },
  { label: 'Community', href: '/community' },
  { label: 'The Halo', href: '/halo' },
] as const;

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-5 md:flex-row md:justify-between"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-sm uppercase tracking-monument text-bone transition-colors duration-300 hover:text-gold-bright"
        >
          <CrownMark className="h-3.5 w-6 text-gold" />
          Underdog City
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 md:gap-x-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="whitespace-nowrap font-display text-xs uppercase tracking-engraved text-bone-muted transition-colors duration-300 hover:text-gold-bright md:text-sm"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
