import type { Metadata } from 'next';
import ClaimKeyForm from '@/components/ClaimKeyForm';
import KintsugiVeins from '@/components/KintsugiVeins';
import EngravedRule from '@/components/EngravedRule';
import Reveal from '@/components/Reveal';
import {
  ALBUM_TITLE,
  COMMUNITY_HOOK,
  RELEASE_DATE_DISPLAY,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'The Community',
  description: `${COMMUNITY_HOOK} Tenants hear ${ALBUM_TITLE} early, before ${RELEASE_DATE_DISPLAY}, read the chapters first, and get the hidden lore.`,
};

const PERKS = [
  {
    title: 'The Album, Early',
    desc: `Hear ${ALBUM_TITLE} on-site before release day. The vault opens for Tenants first.`,
  },
  {
    title: 'Chapters First',
    desc: 'Every chapter of the serial reaches Tenants before anyone else.',
  },
  {
    title: 'Hidden Lore',
    desc: 'Pieces of the world that are never posted anywhere public.',
  },
] as const;

/*
  NOTE: never display a live member/tenant count on this page (or anywhere).
  Social-proof numbers are banned until further notice.
*/
export default function CommunityPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 pt-36">
      <Reveal className="text-center">
        <p className="font-display text-xs uppercase tracking-monument text-gold">
          The Community
        </p>
        <h1 className="engraved mt-3 font-display text-3xl uppercase tracking-engraved text-gold-bright md:text-5xl">
          {COMMUNITY_HOOK}
        </h1>
        <EngravedRule className="mx-auto mt-6 max-w-xs" />
      </Reveal>

      {/* Prominent capture — the page's one job */}
      <Reveal className="mt-14">
        <div className="relative border border-gold/40 bg-charcoal p-2">
          <div className="border border-gold/25 px-6 py-12 md:px-12">
            <KintsugiVeins className="pointer-events-none absolute inset-x-2 top-2 h-12 w-[calc(100%-1rem)] opacity-40" />
            <p className="text-center font-body text-sm leading-relaxed text-bone-muted">
              A key costs nothing but an address.
            </p>
            <ClaimKeyForm source="community" className="mx-auto mt-6 max-w-lg" />
          </div>
        </div>
      </Reveal>

      {/* What a Tenant holds */}
      <section className="mt-20">
        <h2 className="sr-only">What a Tenant gets</h2>
        <ul className="space-y-6">
          {PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 0.1}>
              <li className="border-l border-gold/50 py-1 pl-6">
                <h3 className="engraved font-display text-lg uppercase tracking-engraved text-bone">
                  {perk.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-bone-muted">
                  {perk.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
