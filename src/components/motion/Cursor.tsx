'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Custom cursor. Pointer-fine devices only — never on touch, where it would
 * be a floating artifact chasing taps.
 *
 * The native cursor stays visible (globals.css does not hide it) so the site
 * never becomes unusable if this fails to mount.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    function move(e: PointerEvent) {
      pos.x = e.clientX;
      pos.y = e.clientY;

      const target = (e.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], input, [data-cursor]'
      ) as HTMLElement | null;

      setLabel(target?.dataset?.cursor ?? (target ? '' : null));
    }

    function loop() {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hovering = label !== null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full bg-accent transition-[width,height,opacity] duration-200 ease-out ${
          hovering ? 'h-0 w-0 opacity-0' : 'h-1.5 w-1.5 opacity-100'
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 grid place-items-center rounded-full border border-accent transition-[width,height,background-color] duration-300 ease-out ${
          label ? 'h-16 w-16 bg-accent' : hovering ? 'h-10 w-10 bg-accent/10' : 'h-7 w-7'
        }`}
      >
        {label && (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-on-accent">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
