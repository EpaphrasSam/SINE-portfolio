'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
} from 'react';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Per-word masked reveal for headings.
 *
 * The words are in the server HTML as ordinary text — the mask and offset are
 * added on the client, so with JavaScript off this renders as a plain heading.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 42,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useIso(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setState('hidden');

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <span
            className="inline-block will-change-transform"
            style={
              state === 'hidden'
                ? { transform: 'translateY(105%)' }
                : state === 'shown'
                  ? {
                      transform: 'none',
                      transition: `transform 780ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms`,
                    }
                  : undefined
            }
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
