'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * A single word that swaps on a vertical mask.
 *
 * Deliberately not a typewriter: the old site cycled six generic job titles
 * one character at a time, and was blank a good fraction of the time. This
 * names real domains, and a word is always on screen.
 *
 * The widest word sets the box via an invisible sizer, so nothing reflows
 * as it cycles.
 */
export function RotatingWord({
  words,
  interval = 2400,
  className = '',
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setLeaving(true);
      window.setTimeout(() => {
        setI((n) => (n + 1) % words.length);
        setLeaving(false);
      }, 380);
    }, interval);
    return () => clearInterval(id);
  }, [reduced, interval, words.length]);

  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      {/* Sizer — reserves the widest word so the line never reflows. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {widest}
      </span>

      <span className="col-start-1 row-start-1 whitespace-nowrap">
        <span
          key={words[i]}
          className="inline-block will-change-transform"
          style={{
            transform: leaving ? 'translateY(-108%)' : 'translateY(0)',
            opacity: leaving ? 0 : 1,
            transition: leaving
              ? 'transform 360ms cubic-bezier(0.7,0,0.84,0), opacity 360ms linear'
              : 'transform 620ms cubic-bezier(0.16,1,0.3,1), opacity 320ms linear',
          }}
        >
          {words[i]}
        </span>
      </span>
    </span>
  );
}
