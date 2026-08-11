'use client';

import { useEffect, useState } from 'react';

/**
 * Branded load sequence: the mark draws itself, a counter runs, the curtain lifts.
 *
 * Safety rules, because a preloader that sticks is worse than none:
 *  - the lift is a CSS animation with fill-mode forwards, so it completes even
 *    if JavaScript stalls after hydration;
 *  - `<noscript>` hides it outright;
 *  - it runs once per session, and never under prefers-reduced-motion.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem('sine:loaded') === '1';
    } catch {
      /* private mode — just play it */
    }

    if (reduced || seen) {
      setSkip(true);
      document.documentElement.removeAttribute('data-loading');
      return;
    }

    document.documentElement.setAttribute('data-loading', '');
    try {
      sessionStorage.setItem('sine:loaded', '1');
    } catch {
      /* ignore */
    }

    const start = performance.now();
    const DURATION = 1150;
    let raf = 0;

    function tick(now: number) {
      const p = Math.min(1, (now - start) / DURATION);
      // Ease-out so the number decelerates into 100.
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const done = window.setTimeout(() => {
      document.documentElement.removeAttribute('data-loading');
    }, DURATION + 700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      document.documentElement.removeAttribute('data-loading');
    };
  }, []);

  if (skip) return null;

  return (
    <>
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: '#preloader{display:none!important}' }} />
      </noscript>

      <div id="preloader" aria-hidden="true">
        <div className="preloader__inner">
          <svg
            viewBox="0 0 240 60"
            fill="none"
            className="preloader__wave"
            preserveAspectRatio="none"
          >
            <path
              pathLength={1}
              d="M0 30C20 6 40 6 60 30S100 54 120 30 160 6 180 30s40 24 60 0"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="preloader__row">
            <span className="preloader__word">SINE</span>
            <span className="preloader__count tnum">
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
