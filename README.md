# Underdog City — V5

Official site for Underdog City (Cenotaph Records). Debut album **THRONE AT THE BOTTOM** — 07.31.2026.

Next.js (App Router) · TypeScript · Tailwind · Framer Motion.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
```

## Design law (do not break)

- **Colors**: only the eight brand tokens defined in `tailwind.config.ts` (`theme.colors` is fully replaced — the default Tailwind palette does not exist in this project). No pure white/black, no neon.
- **Fonts**: exactly two families — Cinzel (display) and Inter (body), loaded in `app/layout.tsx` via `next/font`. Never add a third.
- **Register**: dark fantasy — cathedral, engraving, tarnished gold, kintsugi. Never terminal/cyberpunk: no monospace display, glitch, scanlines, HUD, neon.
- **Lore**: the only approved world copy lives in `lib/constants.ts` (`HALO_LINES`, manifesto, teaser). Do not invent more.
- **No member/tenant counts** displayed anywhere, until further notice.

## Email capture

One server action for every form: `app/actions/subscribe.ts`.

1. Always inserts into Supabase `public.signups` (project `underdog-city` / `dnvynfthisoctkjayxuc`; RLS allows anon INSERT only — the publishable key in `lib/supabase.ts` is safe to ship and cannot read rows).
2. Forwards to Beehiiv (double opt-in) when `BEEHIIV_API_KEY` + `BEEHIIV_PUB_ID` are set — see `.env.example`.

Export signups anytime from the Supabase dashboard (`signups` table).

## Open TODOs (placeholders in code)

| Item | Where |
| --- | --- |
| Chapter 0 final text | `app/serial/page.tsx` — `<!-- CH0 TEXT -->` marker |
| Album artwork | `app/music/page.tsx` — `<!-- ALBUM ART HERE -->` marker (engraved placeholder panel until then) |
| Beehiiv keys | Vercel env: `BEEHIIV_API_KEY`, `BEEHIIV_PUB_ID` |
| Per-track streaming links | `app/music/page.tsx` — `POST-RELEASE` comment |

## Deploy

Vercel. Preview only until Shawn switches the production domain manually.
