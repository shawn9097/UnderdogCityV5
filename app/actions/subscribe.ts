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

  const beehiivOk = await forwardToBeehiiv(email, source);

  if (stored || beehiivOk) {
    return { status: 'success', message: SUBSCRIBE_SUCCESS };
  }
  return {
    status: 'error',
    message: 'The door jammed. Try again in a moment.',
  };
}

async function forwardToBeehiiv(email: string, source: string): Promise<boolean> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUB_ID;
  if (!apiKey || !pubId) {
    // TEMP DIAGNOSTIC (no secrets): are the env vars even present, and is the
    // pub id shaped like pub_...? Remove once Beehiiv is confirmed working.
    console.warn('[beehiiv] skipped: env missing', {
      hasApiKey: !!apiKey,
      hasPubId: !!pubId,
      pubIdPrefix: pubId ? pubId.slice(0, 4) : null,
    });
    return false;
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
      // TEMP DIAGNOSTIC (no secrets): surface Beehiiv's rejection reason.
      const body = await res.text().catch(() => '');
      console.warn('[beehiiv] rejected', res.status, body.slice(0, 300));
    }
    return res.ok;
  } catch (e) {
    console.warn('[beehiiv] fetch error', (e as Error).message);
    return false;
  }
}
