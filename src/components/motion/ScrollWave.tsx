'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll progress drawn as a waveform down the left edge.
 *
 * Amplitude tracks scroll velocity, so the line goes flat when you stop and
 * whips when you fling the page — the progress indicator and the site's
 * visual language are the same object.
 */
export function ScrollWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let smoothVel = 0;

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = 34;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function accent() {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue('--c-accent')
          .trim() || '122 150 255'
      );
    }

    function draw() {
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;
      smoothVel += (velocity - smoothVel) * 0.12;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      const stroke = accent();
      ctx.clearRect(0, 0, w, h);

      const amp = Math.min(11, 1.2 + Math.abs(smoothVel) * 0.45);
      const cx = w / 2;
      const end = h * progress;

      // Travelled portion — the waveform.
      ctx.beginPath();
      ctx.strokeStyle = `rgb(${stroke} / 0.85)`;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      for (let py = 0; py <= end; py += 3) {
        const px = cx + Math.sin(py * 0.055 + t) * amp;
        if (py === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Remaining portion — a flat hairline.
      ctx.beginPath();
      ctx.strokeStyle = `rgb(${stroke} / 0.16)`;
      ctx.lineWidth = 1;
      ctx.moveTo(cx, end);
      ctx.lineTo(cx, h);
      ctx.stroke();

      // Head.
      ctx.beginPath();
      ctx.fillStyle = `rgb(${stroke})`;
      ctx.arc(cx + Math.sin(end * 0.055 + t) * amp, end, 2.6, 0, Math.PI * 2);
      ctx.fill();

      t += 0.05;
      raf = requestAnimationFrame(draw);
    }

    size();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', size);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
    />
  );
}
