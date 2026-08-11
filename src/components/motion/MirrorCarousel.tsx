'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
import type { WorkEntry } from '../../data/work';

/**
 * 3D mirror carousel — the mechanic from the old multi-page Hurisoft site
 * (`Carousel3D`), rebuilt on this site's tokens.
 *
 * Slides are absolutely stacked and centred. Relative distance from the
 * active index drives translateX, scale, opacity and z-index, so the centre
 * card sits forward and its neighbours mirror away behind it on both sides.
 * Clicking a neighbour promotes it to centre.
 */

const AUTOPLAY_MS = 4600;

export function MirrorCarousel({ studies }: { studies: WorkEntry[] }) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [paused, setPaused] = useState(false);
  const interactedUntil = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    function measure() {
      const w = window.innerWidth;
      setPerView(w < 768 ? 1 : w < 1152 ? 2 : 3);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % studies.length) + studies.length) % studies.length);
      interactedUntil.current = Date.now() + AUTOPLAY_MS;
    },
    [studies.length]
  );

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      if (Date.now() < interactedUntil.current) return;
      setIndex((i) => (i + 1) % studies.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, paused, studies.length]);

  // Shortest signed distance around the ring, so slides wrap both ways.
  function offset(i: number) {
    const n = studies.length;
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  function placement(i: number) {
    const d = offset(i);
    const far = Math.abs(d);
    const spacing = perView === 1 ? 62 : perView === 2 ? 74 : 82;

    return {
      transform: `translateX(${d * spacing}%) scale(${Math.max(0.74, 1 - far * 0.13)})`,
      opacity: far > (perView === 1 ? 1 : 2) ? 0 : Math.max(0.28, 1 - far * 0.38),
      zIndex: 20 - far,
      filter: far === 0 ? 'none' : `blur(${Math.min(3, far * 1.4)}px)`,
      pointerEvents: (far > 2 ? 'none' : 'auto') as 'none' | 'auto',
    };
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative flex h-[30rem] items-center justify-center overflow-hidden sm:h-[34rem]"
        style={{ perspective: '1400px' }}
      >
        {studies.map((entry, i) => {
          const study = entry.project;
          const style = placement(i);
          const active = offset(i) === 0;

          return (
            <div
              key={entry.slug}
              style={style}
              aria-hidden={!active}
              className="absolute w-[78vw] max-w-[24rem] transition-all duration-700 ease-out will-change-transform sm:w-[26rem]"
            >
              <article
                onClick={() => !active && go(i)}
                className={`overflow-hidden rounded-xl border bg-surface transition-colors duration-500 ${
                  active
                    ? 'border-accent/45 shadow-2xl shadow-accent/10'
                    : 'cursor-pointer border-rule'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-raise">
                  {entry.images[0] && (
                    <Image
                      src={entry.images[0]}
                      alt={`${study.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 78vw, 26rem"
                      className="object-cover object-top"
                      priority={i < 2}
                    />
                  )}
                  <span className="absolute left-4 top-4 rounded bg-ground/75 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-2 backdrop-blur-sm tnum">
                    {String(i + 1).padStart(2, '0')} / {String(studies.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded border border-rule bg-raise px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-2">
                      {entry.detail.domain ?? (study.type === 'web' ? 'Web' : 'Mobile')}
                    </span>
                    <span className="rounded border border-rule bg-raise px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-2">
                      {entry.detail.status ?? 'Shipped'}
                    </span>
                  </div>

                  <h3 className="text-h3">{study.title}</h3>
                  <p className="mt-2.5 line-clamp-3 text-sm text-ink-2 text-pretty">
                    {study.preview}
                  </p>

                  <Link
                    href={`/work/${entry.slug}`}
                    data-cursor="Open"
                    tabIndex={active ? 0 : -1}
                    className="link-underline mt-5 inline-block text-sm"
                  >
                    View project ↗
                  </Link>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous project"
          className="grid h-10 w-10 place-items-center rounded-full border border-rule text-ink-2 transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {studies.map((entry, i) => (
            <button
              key={entry.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${entry.project.title}`}
              aria-current={offset(i) === 0}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                offset(i) === 0 ? 'w-8 bg-accent' : 'w-3 bg-rule-strong hover:bg-ink-3'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next project"
          className="grid h-10 w-10 place-items-center rounded-full border border-rule text-ink-2 transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
