import type { Config } from 'tailwindcss';

/**
 * DESIGN LAW — the eight brand tokens below are the ONLY colors on this site.
 * `theme.colors` is fully replaced (not extended) so no default Tailwind
 * palette (blues, neons, pure white/black) can ever leak into a class name.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      void: '#0A0A0B',
      charcoal: '#151310',
      gold: '#A8772E',
      'gold-bright': '#C9A227',
      'gold-glow': '#E8B84B',
      bone: '#E3DCCB',
      'bone-muted': '#A9A192',
      crimson: '#6E1414',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        engraved: '0.18em',
        monument: '0.28em',
      },
      maxWidth: {
        reading: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
