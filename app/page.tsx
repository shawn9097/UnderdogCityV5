import Hero from '@/components/Hero';
import ThreeDoors from '@/components/ThreeDoors';
import Countdown from '@/components/Countdown';
import ClaimKeyForm from '@/components/ClaimKeyForm';
import SectionHeading from '@/components/SectionHeading';
import KintsugiVeins from '@/components/KintsugiVeins';
import Reveal from '@/components/Reveal';
import { ALBUM_TITLE, COMMUNITY_HOOK, RELEASE_DATE_DISPLAY } from '@/lib/constants';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* THREE DOORS */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24">
        <KintsugiVeins className="pointer-events-none absolute -top-4 left-1/2 h-16 w-full max-w-3xl -translate-x-1/2 opacity-70" />
        <SectionHeading eyebrow="Choose a door" title="Enter the City" />
        <div className="mt-14">
          <ThreeDoors />
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="mx-auto max-w-4xl px-6 pt-28 text-center">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-monument text-gold">
            {ALBUM_TITLE} · {RELEASE_DATE_DISPLAY}
          </p>
          <div className="rule-engraved mx-auto mt-8 max-w-2xl" />
          <Countdown className="py-10" />
          <div className="rule-engraved mx-auto max-w-2xl" />
        </Reveal>
      </section>

      {/* CLAIM YOUR KEY */}
      <section id="claim" className="relative mx-auto max-w-3xl scroll-mt-24 px-6 pt-28">
        <KintsugiVeins flip className="pointer-events-none absolute -top-6 left-1/2 h-14 w-full max-w-2xl -translate-x-1/2 opacity-60" />
        <Reveal>
          <div className="border border-gold/40 bg-charcoal p-2">
            <div className="border border-gold/25 px-6 py-12 text-center md:px-12">
              <h2 className="engraved font-display text-2xl uppercase tracking-engraved text-gold-bright md:text-4xl">
                {COMMUNITY_HOOK}
              </h2>
              <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-bone-muted">
                Tenants hear the album early, read the chapters first, and get
                the hidden lore.
              </p>
              <ClaimKeyForm source="home" className="mx-auto mt-8 max-w-lg" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
