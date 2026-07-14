'use server';

import { supabase } from '@/lib/supabase';
import { SUBSCRIBE_SUCCESS } from '@/lib/constants';

export type SubscribeState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * The single email-capture path for every form on the site.
 *
 * 1. Always writes the email to Supabase (public.signups) so no signup is
 *    ever lost — even before Beehiiv is configured.
 * 2. Forwards to Beehiiv when BEEHIIV_API_KEY + BEEHIIV_PUB_ID are set.
 *    TODO(shawn): add both env vars in Vercel to activate Beehiiv.
 *    Double opt-in is requested per-subscription below; confirm it is also
 *    enabled in the Beehiiv publication settings.
 */
export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const source = String(formData.get('source') ?? 'site').slice(0, 40);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: 'error', message: 'That key needs a real address. Check the email and try again.' };
  }

  let stored = false;

  const { error } = await supabase().from('signups').insert({ email, source });
  if (!error || error.code === '23505') {
    // 23505 = duplicate email: their key is already claimed — treat as success.
    stored = true;
  }

  const beehiiv = await forwardToBeehiiv(email, source);

  // TEMP DIAGNOSTIC: a `source=diag` submission returns the Beehiiv outcome
  // directly in the response (no secrets) so it can be verified without
  // relying on log ingestion. Remove once Beehiiv is confirmed working.
  if (source === 'diag') {
    return { status: 'success', message: `DIAG :: ${beehiiv.detail}` };
  }

  if (stored || beehiiv.ok) {
    return { status: 'success', message: SUBSCRIBE_SUCCESS };
  }
  return {
    status: 'error',
    message: 'The door jammed. Try again in a moment.',
  };
}

type BeehiivResult = { ok: boolean; detail: string };

async function forwardToBeehiiv(email: string, source: string): Promise<BeehiivResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUB_ID;
  if (!apiKey || !pubId) {
    return {
      ok: false,
      detail: `env-missing hasKey=${!!apiKey} hasPub=${!!pubId} pubPrefix=${pubId ? pubId.slice(0, 4) : 'n/a'}`,
    };
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: false, // double opt-in confirmation is sent instead
          double_opt_override: 'on',
          utm_source: 'theunderdogcity.com',
          utm_medium: source,
        }),
      },
    );
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, detail: `http-${res.status} keyLen=${apiKey.length} pubPrefix=${pubId.slice(0, 4)} body=${body.slice(0, 200)}` };
    }
    return { ok: true, detail: `ok-${res.status}` };
  } catch (e) {
    return { ok: false, detail: `fetch-error ${(e as Error).message}` };
  }
}
