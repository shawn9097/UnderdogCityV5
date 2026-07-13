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
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* The masked king — provided portrait, never regenerated */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/portrait.jpg"
          alt="The masked king of Underdog City — a charcoal mask veined with gold kintsugi cracks, molten gold eyes, and a broken gold crown, hooded in black"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </motion.div>

      {/* Oil-painting darkness for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-void/55 via-void/10 to-void"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void via-void/70 to-transparent"
      />

      {/* No entrance fade here: this block holds the LCP text and must paint
          with first render, not after hydration. */}
      <div className="relative mx-auto w-full max-w-4xl px-6 pb-16 pt-40 text-center md:pb-24">
        <h1 className="engraved font-display text-4xl uppercase tracking-[0.2em] text-gold-bright sm:text-5xl md:text-7xl md:tracking-monument lg:text-8xl">
          Underdog City
        </h1>

        <p className="mx-auto mt-5 max-w-2xl font-body text-sm text-bone-muted md:text-base">
          A dark-fantasy music world · Debut album{' '}
          <span className="font-display uppercase tracking-engraved text-bone">
            {ALBUM_TITLE}
          </span>{' '}
          · {RELEASE_DATE_DISPLAY}
        </p>

        <blockquote className="relative mx-auto mt-10 max-w-xl border-y border-gold/40 px-4 py-6">
          <p className="engraved font-display text-lg leading-relaxed text-bone md:text-2xl">
            “{MANIFESTO}”
          </p>
        </blockquote>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GoldButton href="#claim" variant="primary">
            Claim Your Key
          </GoldButton>
          <GoldButton href={PRESAVE_URL} variant="secondary" external>
            Presave the Album
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
