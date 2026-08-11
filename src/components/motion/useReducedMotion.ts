'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/**
 * Single source of truth for the motion opt-out.
 * When true the animation layer does not merely shorten — it does not run.
 *
 * useSyncExternalStore rather than useEffect + setState: the preference is
 * external browser state, so this subscribes to it directly instead of
 * mirroring it into React state on mount.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false // server: assume motion is allowed, the client corrects on hydrate
  );
}
