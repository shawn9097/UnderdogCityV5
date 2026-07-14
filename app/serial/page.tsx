import type { Metadata } from 'next';
import ClaimKeyForm from '@/components/ClaimKeyForm';
import SectionHeading from '@/components/SectionHeading';
import EngravedRule from '@/components/EngravedRule';
import Reveal from '@/components/Reveal';
import {
  ALBUM_TITLE,
  RELEASE_DATE_DISPLAY,
  SERIAL_TEASER,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'The Serial',
  description: `The story of Underdog City, chapter by chapter. The debut album ${ALBUM_TITLE} arrives ${RELEASE_DATE_DISPLAY}.`,
};

export default function SerialPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-36">
      <SectionHeading eyebrow="The Serial" title="The Story" />

      {/* Chapter index */}
      <Reveal className="mt-14">
        <a
          href="#chapter-0"
          className="group flex items-baseline justify-between gap-4 border border-gold/40 bg-charcoal px-6 py-5 transition-colors duration-300 hover:border-gold-bright"
        >
          <span className="font-display text-xs uppercase tracking-monument text-gold group-hover:text-gold-glow">
            Chapter 0
          </span>
          <span className="engraved flex-1 font-display text-lg uppercase tracking-engraved text-bone group-hover:text-gold-bright md:text-xl">
            Came Back Wrong
          </span>
          <span className="font-display text-xs uppercase tracking-engraved text-bone-muted">
            Read
          </span>
        </a>
      </Reveal>

      {/* Reading view — a page, not a webpage */}
      <article id="chapter-0" className="mt-20 scroll-mt-28">
        <header className="text-center">
          <p className="font-display text-xs uppercase tracking-monument text-gold">
            Chapter 0
          </p>
          <h2 className="engraved mt-3 font-display text-2xl uppercase tracking-engraved text-bone md:text-4xl">
            Came Back Wrong
          </h2>
          <EngravedRule className="mx-auto mt-6 max-w-xs" />
        </header>

        <div className="reading mx-auto mt-12 font-body">
          <p>“{SERIAL_TEASER}”</p>
          {/* <!-- CH0 TEXT --> TODO(shawn): paste the final Chapter 0 text here,
              replacing the note below. Keep paragraphs as plain <p> tags. */}
          <p className="mt-8 border-l-2 border-gold/40 pl-4 text-bone-muted">
            The full chapter is being carved. It will be published here.
          </p>
        </div>
      </article>

      {/* End-of-chapter CTA */}
      <Reveal className="mt-20">
        <div className="border-y border-gold/30 py-12 text-center">
          <p className="mx-auto max-w-md font-body text-sm leading-relaxed text-bone-muted">
            Claim your key to be notified when the next chapter drops.
          </p>
          <ClaimKeyForm source="serial" className="mx-auto mt-6 max-w-lg" />
        </div>
      </Reveal>
    </div>
  );
}
