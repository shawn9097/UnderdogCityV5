import type { Metadata } from 'next';
import Countdown from '@/components/Countdown';
import ClaimKeyForm from '@/components/ClaimKeyForm';
import GoldButton from '@/components/GoldButton';
import SectionHeading from '@/components/SectionHeading';
import KintsugiVeins from '@/components/KintsugiVeins';
import Reveal from '@/components/Reveal';
import { CrownMark } from '@/components/EngravedRule';
import {
  ALBUM_TITLE,
  MUSIC_TENANT_LINE,
  PRESAVE_URL,
  RELEASE_DATE_DISPLAY,
  TRACKLIST,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'The Music',
  description: `${ALBUM_TITLE} — the debut Underdog City album. Fourteen tracks. The vault opens ${RELEASE_DATE_DISPLAY}.`,
};

const ROMAN = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII',
  'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV',
] as const;

/*
  POST-RELEASE: this page will hold streaming links per track.
  Plan: each <li> below gains a row of service links (Spotify / Apple / YT)
  sourced from a per-track map in lib/constants.ts.
*/
export default function MusicPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-36">
      <SectionHeading eyebrow="The Music" title="The Vault" />

      <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,340px)_1fr] md:gap-14">
        {/* Album panel */}
        <Reveal>
          <div className="border border-gold/40 bg-charcoal p-2">
            {/* <!-- ALBUM ART HERE --> TODO(shawn): replace this engraved
                placeholder panel with the final album artwork via next/image. */}
            <div className="relative flex aspect-square flex-col items-center justify-center border border-gold/25 px-6 text-center">
              <KintsugiVeins className="pointer-events-none absolute inset-x-0 top-6 h-16 w-full opacity-50" />
              <CrownMark className="h-6 w-10 text-gold" />
              <p className="engraved mt-6 font-display text-2xl uppercase leading-snug tracking-engraved text-gold-bright">
                Throne
                <br />
                at the
                <br />
                Bottom
              </p>
              <p className="mt-6 font-display text-[10px] uppercase tracking-monument text-bone-muted">
                Debut album · {RELEASE_DATE_DISPLAY}
              </p>
              <KintsugiVeins flip className="pointer-events-none absolute inset-x-0 bottom-6 h-14 w-full opacity-40" />
            </div>
          </div>
        </Reveal>

        {/* Tracklist */}
        <Reveal delay={0.1}>
          <h3 className="sr-only">Tracklist</h3>
          <ol className="divide-y divide-gold/15 border-y border-gold/30">
            {TRACKLIST.map((track, i) => (
              <li key={track} className="flex items-baseline gap-5 px-2 py-3.5">
                <span className="w-10 shrink-0 text-right font-display text-xs tracking-engraved text-gold">
                  {ROMAN[i]}
                </span>
                <span className="font-display text-sm uppercase tracking-engraved text-bone md:text-base">
                  {track}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* CTAs */}
      <Reveal className="mt-20 text-center">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GoldButton href={PRESAVE_URL} variant="primary" external>
            Presave the Album
          </GoldButton>
          <GoldButton href="#claim" variant="secondary">
            Claim Your Key
          </GoldButton>
        </div>
        <p className="mx-auto mt-8 max-w-xl font-body text-sm leading-relaxed text-bone-muted">
          {MUSIC_TENANT_LINE}
        </p>
      </Reveal>

      {/* Countdown */}
      <section className="pt-24 text-center">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-monument text-gold">
            The vault opens in
          </p>
          <div className="rule-engraved mx-auto mt-8 max-w-2xl" />
          <Countdown className="py-10" />
          <div className="rule-engraved mx-auto max-w-2xl" />
        </Reveal>
      </section>

      {/* Claim */}
      <section id="claim" className="mx-auto max-w-lg scroll-mt-24 pt-20">
        <ClaimKeyForm source="music" />
      </section>
    </div>
  );
}
