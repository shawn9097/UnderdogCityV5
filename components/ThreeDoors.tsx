import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { CrownMark } from '@/components/EngravedRule';
import { RELEASE_DATE_DISPLAY, SERIAL_TEASER } from '@/lib/constants';

const DOORS = [
  {
    title: 'The Serial',
    desc: 'The story, chapter by chapter.',
    teaser: `“${SERIAL_TEASER}”`,
    href: '/serial',
  },
  {
    title: 'The Music',
    desc: `Fourteen tracks. The vault opens ${RELEASE_DATE_DISPLAY}.`,
    teaser: null,
    href: '/music',
  },
  {
    title: 'The Community',
    desc: 'Now Accepting Tenants.',
    teaser: null,
    href: '/community',
  },
] as const;

/**
 * Three engraved doors — heavy reliquary panels, not cards.
 * Double-framed in tarnished gold, crowned with the broken-crown mark.
 */
export default function ThreeDoors() {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
      {DOORS.map((door, i) => (
        <Reveal key={door.href} delay={i * 0.12}>
          <Link
            href={door.href}
            className="group flex h-full flex-col border border-gold/40 bg-charcoal p-2 transition-colors duration-300 hover:border-gold-bright"
          >
            <div className="flex h-full flex-col items-center border border-gold/25 px-6 py-10 text-center transition-colors duration-300 group-hover:border-gold/50">
              <CrownMark className="h-5 w-8 text-gold transition-colors duration-300 group-hover:text-gold-bright" />
              <h3 className="engraved mt-6 font-display text-2xl uppercase tracking-engraved text-bone group-hover:text-gold-bright">
                {door.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-5 h-px w-12 bg-gold/50 transition-colors duration-300 group-hover:bg-gold-bright/70"
              />
              <p className="mt-5 font-body text-sm leading-relaxed text-bone-muted">
                {door.desc}
              </p>
              {door.teaser && (
                <p className="mt-4 font-body text-sm italic leading-relaxed text-bone/80">
                  {door.teaser}
                </p>
              )}
              <span className="mt-auto pt-8 font-display text-xs uppercase tracking-monument text-gold transition-colors duration-300 group-hover:text-gold-glow">
                Enter
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
