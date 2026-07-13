import type { Metadata } from 'next';
import GoldButton from '@/components/GoldButton';
import EngravedRule from '@/components/EngravedRule';
import Reveal from '@/components/Reveal';
import { ALBUM_TITLE, HALO_LINES, RELEASE_DATE_DISPLAY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'The Halo',
  description: `Above us, the Halo. Below it, everything they threw away. The debut album ${ALBUM_TITLE} arrives ${RELEASE_DATE_DISPLAY}.`,
};

/*
  LORE LAW: the four lines in HALO_LINES are the ONLY approved world copy.
  Several plot elements are secret — do not add lore text to this page.
*/
export default function HaloPage() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-2xl flex-col justify-center px-6 pt-36 text-center">
      <h1 className="sr-only">The Halo</h1>

      <div className="space-y-14">
        {HALO_LINES.map((line, i) => (
          <Reveal key={line} delay={i * 0.18}>
            <p className="engraved font-display text-xl uppercase leading-relaxed tracking-engraved text-bone md:text-3xl">
              {line}
            </p>
            {i < HALO_LINES.length - 1 && (
              <EngravedRule className="mx-auto mt-14 max-w-[10rem] opacity-60" />
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4} className="mt-20">
        <GoldButton href="/community" variant="primary">
          Claim Your Key
        </GoldButton>
      </Reveal>
    </div>
  );
}
