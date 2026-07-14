import { createClient } from '@supabase/supabase-js';

/**
 * Durable signup store. The publishable key is safe to ship by design:
 * RLS on public.signups allows the anon role to INSERT only — it can never
 * read, update, or delete rows. Baked fallbacks keep the env-less Vercel
 * preview fully functional; env vars override them.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://dnvynfthisoctkjayxuc.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'sb_publishable_TsvKhVbJ3QCqeg4gQBbLlQ_SNCDh50O';

export function supabase() {
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false },
  });
}
