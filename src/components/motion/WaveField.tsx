'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * The hero's signature: a field of sine lines that bend around the cursor.
 *
 * The visual language is the mark — SINE, a waveform — so the ambient motion
 * is literally the identity rather than a generic particle background.
 * Canvas 2D rather than WebGL: the whole language is 2D curves, so three.js
 * would cost ~150kB for nothing.
 */

const LINES = 26;
const SAMPLES = 90;
const INFLUENCE = 190; // px radius of the cursor bulge

export function WaveField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let t = 0;

    // Cursor state, eased so the bulge trails the pointer.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0 };

    function accent() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--c-accent')
        .trim();
      return raw || '126 156 255';
    }

    let stroke = accent();

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stroke = accent();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Ease the pointer toward its target.
      pointer.x += (pointer.tx - pointer.x) * 0.09;
      pointer.y += (pointer.ty - pointer.y) * 0.09;

      const gap = height / (LINES - 1);

      for (let i = 0; i < LINES; i++) {
        const baseY = i * gap;
        // Lines fade toward the bottom of the field.
        const depth = 1 - i / LINES;
        const alpha = 0.05 + depth * 0.22;
        const amp = 8 + depth * 16;
        const phase = i * 0.28;

        ctx.beginPath();
        ctx.strokeStyle = `rgb(${stroke} / ${alpha})`;
        ctx.lineWidth = 1.1;

        for (let s = 0; s <= SAMPLES; s++) {
          const x = (s / SAMPLES) * width;
          let y =
            baseY +
            Math.sin(x * 0.0055 + phase + t * 0.55) * amp +
            Math.sin(x * 0.0021 - t * 0.32 + phase) * amp * 0.45;

          // Cursor displacement — a gaussian push away from the pointer.
          const dx = x - pointer.x;
          const dy = baseY - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE) {
            const force = (1 - dist / INFLUENCE) ** 2;
            y += Math.sign(dy || 1) * force * 62 * pointer.active;
          }

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      pointer.active = 1;
    }
    function onPointerLeave() {
      pointer.active = 0;
      pointer.tx = -9999;
      pointer.ty = -9999;
    }

    resize();

    if (reduced) {
      // One static frame — the texture without the motion.
      draw();
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, width, height);
      t = 0;
      const gap = height / (LINES - 1);
      for (let i = 0; i < LINES; i++) {
        const baseY = i * gap;
        const depth = 1 - i / LINES;
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${stroke} / ${0.05 + depth * 0.18})`;
        ctx.lineWidth = 1.1;
        for (let s = 0; s <= SAMPLES; s++) {
          const x = (s / SAMPLES) * width;
          const y = baseY + Math.sin(x * 0.0055 + i * 0.28) * (8 + depth * 16);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else {
      raf = requestAnimationFrame(draw);
      window.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);
    }

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize);

    // Theme flips change the accent — repick it.
    const mo = new MutationObserver(() => {
      stroke = accent();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      mo.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
