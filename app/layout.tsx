import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import Script from 'next/script';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  ALBUM_TITLE,
  RELEASE_DATE_DISPLAY,
  SITE_NAME,
  SITE_URL,
} from '@/lib/constants';
import './globals.css';

/* Exactly two font families, subset via next/font. No third family, ever. */
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const DESCRIPTION = `${SITE_NAME} — a dark-fantasy music world. The debut album ${ALBUM_TITLE} arrives ${RELEASE_DATE_DISPLAY}. Now accepting Tenants: claim your key.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'The masked king of Underdog City' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain =
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'theunderdogcity.com';
  // Analytics only on the real production deployment — never on previews or dev.
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === 'production'
    : process.env.NODE_ENV === 'production';

  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="grain bg-void font-body text-bone antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        {isProduction && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
