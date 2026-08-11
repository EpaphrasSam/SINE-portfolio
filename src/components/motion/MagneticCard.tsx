'use client';

import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Tilts toward the cursor and parallaxes its image inside the mask.
 *
 * Written against refs and a rAF-free direct style write rather than React
 * state — a tilt that re-renders on every pointermove drops frames on a page
 * that is already running a canvas field.
 *
 * Children marked [data-parallax] drift opposite the tilt.
 */
export function MagneticCard({
  children,
  className = '',
  strength = 7,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    el.style.transform = `perspective(1000px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-6px)`;

    const art = el.querySelector<HTMLElement>('[data-parallax]');
    if (art) {
      art.style.transform = `scale(1.06) translate3d(${-px * 16}px, ${-py * 16}px, 0)`;
    }
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    const art = el.querySelector<HTMLElement>('[data-parallax]');
    if (art) art.style.transform = '';
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`transition-transform duration-500 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
