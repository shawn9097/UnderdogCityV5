'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import GoldButton from '@/components/GoldButton';
import {
  ALBUM_TITLE,
  MANIFESTO,
  PRESAVE_URL,
  RELEASE_DATE_DISPLAY,
} from '@/lib/constants';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-void">
      {/*
        The masked king — provided portrait, never regenerated.
        Mobile: full-bleed, positioned to reveal the face.
        Desktop: held to the right ~58% so the face sits off-center, leaving
        clean void on the left for the headline. A left-fading gradient blends
        the portrait's edge into that negative space.
      */}
      <motion.div
        className="absolute inset-0 md:left-auto md:right-0 md:w-[58%]"
        style={{ y }}
      >
        <Image
          src="/portrait.jpg"
          alt="The masked king of Underdog City — a charcoal mask veined with gold kintsugi cracks, molten gold eyes, and a broken gold crown, hooded in black"
          fill
          priority
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover object-[center_28%] md:object-[center_35%]"
        />
        {/* Desktop: dissolve the portrait's left edge into the void */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-void via-void/55 to-transparent md:block"
        />
      </motion.div>

      {/* Mobile: oil-painting darkness so text stays legible over the face */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/30 to-void md:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void via-void/70 to-transparent md:hidden"
      />
      {/* Seam into the section below */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-void to-transparent md:block"
      />

      {/*
        Content. No entrance fade — this block holds the LCP text and must
        paint on first render. Bottom-aligned on mobile, centered-left on
        desktop over the dark negative space.
      */}
      <div className="relative flex min-h-[100svh] items-end md:items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-40 md:py-0">
          <div className="max-w-md text-center md:max-w-lg md:text-left">
            <h1 className="engraved font-display text-5xl uppercase leading-[0.95] tracking-[0.14em] text-gold-bright sm:text-6xl md:text-7xl md:tracking-[0.16em]">
              <span className="block">Underdog</span>
              <span className="block">City</span>
            </h1>

            <p className="mx-auto mt-6 max-w-sm font-body text-sm text-bone-muted md:mx-0 md:text-base">
              A dark-fantasy music world · Debut album{' '}
              <span className="font-display uppercase tracking-engraved text-bone">
                {ALBUM_TITLE}
              </span>{' '}
              · {RELEASE_DATE_DISPLAY}
            </p>

            {/*
              The manifesto is the one place the gutter breaks through the
              cathedral: a nu-metal battle cry, not scripture. Inter, heavy,
              uppercase, tight — deliberately NOT the Cinzel used everywhere
              else.
            */}
            <blockquote className="mt-8 border-l-2 border-gold pl-5">
              <p className="font-body text-xl font-extrabold uppercase leading-[1.1] tracking-tight text-bone md:text-2xl">
                {MANIFESTO}
              </p>
            </blockquote>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row md:justify-start">
              {/* Claim stays first (it's the site's #1 action) but takes the
                  outlined treatment; Presave gets the solid gold fill so it no
                  longer reads as the weaker button. Both are equally clickable. */}
              <GoldButton href="#claim" variant="outline">
                Claim Your Key
              </GoldButton>
              <GoldButton href={PRESAVE_URL} variant="solid" external>
                Presave the Album
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
