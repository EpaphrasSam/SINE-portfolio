'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

/**
 * Lenis smooth scroll, exposed on window so scroll-linked components can
 * read velocity without each holding their own instance.
 *
 * Deliberately NOT scroll-hijacking: no snapping, no locking, no direction
 * inversion. Wheel and keyboard behave normally, just interpolated.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Anchor links still need to work.
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href')!.slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    }
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduced]);

  return null;
}
