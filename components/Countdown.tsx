'use client';

import { useEffect, useState } from 'react';
import { RELEASE_DATE_LOCAL } from '@/lib/constants';

type Parts = { days: string; hours: string; minutes: string; seconds: string };

function remaining(): Parts | null {
  const { year, month, day } = RELEASE_DATE_LOCAL;
  const target = new Date(year, month, day, 0, 0, 0); // visitor's local midnight
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    days: String(Math.floor(s / 86400)),
    hours: pad(Math.floor((s % 86400) / 3600)),
    minutes: pad(Math.floor((s % 3600) / 60)),
    seconds: pad(s % 60),
  };
}

/**
 * Engraved numerals, gold on void — a monument inscription, not an LED
 * readout. SSR renders a quiet placeholder; the clock starts after mount
 * so server and client markup never disagree.
 */
export default function Countdown({ className = '' }: { className?: string }) {
  const [parts, setParts] = useState<Parts | null | 'pending'>('pending');

  useEffect(() => {
    setParts(remaining());
    const t = setInterval(() => setParts(remaining()), 1000);
    return () => clearInterval(t);
  }, []);

  if (parts === null) {
    return (
      <p className={`font-display uppercase tracking-monument text-gold-bright ${className}`}>
        The vault is open.
      </p>
    );
  }

  const units: Array<[string, string]> =
    parts === 'pending'
      ? [
          ['—', 'Days'],
          ['—', 'Hours'],
          ['—', 'Minutes'],
          ['—', 'Seconds'],
        ]
      : [
          [parts.days, 'Days'],
          [parts.hours, 'Hours'],
          [parts.minutes, 'Minutes'],
          [parts.seconds, 'Seconds'],
        ];

  return (
    <div className={className}>
      <div
        className="mx-auto flex max-w-2xl items-stretch justify-center"
        role="timer"
        aria-label="Countdown to album release, July 31, 2026"
      >
        {units.map(([value, label], i) => (
          <div key={label} className="flex items-stretch">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="mx-3 w-px self-stretch bg-gradient-to-b from-transparent via-gold/50 to-transparent md:mx-6"
              />
            )}
            <div className="flex w-14 flex-col items-center md:w-24">
              <span className="engraved font-display text-3xl text-gold-bright md:text-6xl">
                {value}
              </span>
              <span className="mt-2 font-display text-[10px] uppercase tracking-monument text-bone-muted md:text-xs">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
