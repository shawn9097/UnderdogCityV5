'use client';

import { useActionState } from 'react';
import { subscribe, type SubscribeState } from '@/app/actions/subscribe';
import { CTA_CLAIM } from '@/lib/constants';

const initial: SubscribeState = { status: 'idle', message: '' };

/**
 * The one email-capture form, reused on every page.
 * `source` tags which door the tenant came through.
 */
export default function ClaimKeyForm({
  source,
  className = '',
}: {
  source: string;
  className?: string;
}) {
  const [state, action, pending] = useActionState(subscribe, initial);

  if (state.status === 'success') {
    return (
      <div className={`border border-gold/60 bg-charcoal px-6 py-8 text-center ${className}`}>
        <p className="engraved font-display text-lg uppercase tracking-engraved text-gold-bright">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className={className}>
      <input type="hidden" name="source" value={source} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="min-w-0 flex-1 border border-gold/50 bg-void px-5 py-4 font-body text-bone placeholder:text-bone-muted focus:border-gold-bright"
        />
        <button
          type="submit"
          disabled={pending}
          className="cta-pulse border border-gold bg-charcoal px-8 py-4 font-display text-sm uppercase tracking-engraved text-gold-bright transition-colors duration-300 hover:border-gold-bright hover:text-gold-glow disabled:opacity-60 md:text-base"
        >
          {pending ? 'Forging…' : CTA_CLAIM}
        </button>
      </div>
      {state.status === 'error' && (
        <p
          role="alert"
          className="mt-3 border-l-2 border-crimson pl-3 font-body text-sm text-bone-muted"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
