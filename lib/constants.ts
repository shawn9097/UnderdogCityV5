/**
 * Single source of truth for all brand copy, dates, and links.
 * Manifesto / community strings are contractual — verbatim from the brief.
 * Do not invent additional lore copy anywhere on the site.
 */

export const SITE_NAME = 'Underdog City';
export const SITE_URL = 'https://theunderdogcity.com';

export const ALBUM_TITLE = 'THRONE AT THE BOTTOM';
export const RELEASE_DATE_DISPLAY = '07.31.2026';
/** Countdown target — interpreted in the visitor's local timezone. */
export const RELEASE_DATE_LOCAL = { year: 2026, month: 6, day: 31 }; // JS month index: 6 = July

export const PRESAVE_URL =
  'https://distrokid.com/hyperfollow/underdogcity/throne-at-the-bottom/';

export const MANIFESTO =
  "We all rule down here. There's only one rule in Underdog City: turn that shit up loud.";

export const COMMUNITY_HOOK = 'Now Accepting Tenants in Underdog City.';
export const CTA_CLAIM = 'Claim Your Key';
export const SUBSCRIBE_SUCCESS =
  'Your key has been claimed. Welcome to the city.';

export const SERIAL_TEASER =
  "I've got maybe a minute of blood left in me, and I'm going to waste it on a lie.";

export const MUSIC_TENANT_LINE =
  "Tenants don't wait. Claim your key and this door opens for you before release — the whole album, on-site, early.";

/** The ONLY approved lore lines for /halo. Several plot elements are secret. */
export const HALO_LINES = [
  'Above us, the Halo. Below it, everything they threw away.',
  "They don't bury their dead down here. They crown them.",
  'We all rule down here.',
  'Now accepting tenants.',
] as const;

export const TRACKLIST = [
  'Villain',
  'Down Here',
  'Who TF',
  'Chaos',
  'Stupid Little Bitch',
  'Lights Go Low',
  'No Saints',
  'Upbeat Gospel',
  'The Old Song',
  'The Truth',
  'Parasitic Love',
  'Came Back Wrong',
  'Throne At The Bottom',
  'Apathy vs. Agony',
] as const;

export const SOCIALS = [
  { label: 'YouTube', handle: '@underdogcity', url: 'https://youtube.com/@underdogcity' },
  { label: 'TikTok', handle: '@underdog.city', url: 'https://www.tiktok.com/@underdog.city' },
  { label: 'Instagram', handle: '@underdogcitymusic', url: 'https://www.instagram.com/underdogcitymusic' },
  { label: 'Facebook', handle: 'Underdog City', url: 'https://www.facebook.com/share/19KPHvgWcZ/' },
] as const;

export const LABEL_NAME = 'Cenotaph Records';
