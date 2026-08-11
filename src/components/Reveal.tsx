'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Variant = 'rise' | 'mask' | 'scale';

/**
 * Scroll reveal with a visible resting state.
 *
 * Anything sitting below 55% of the viewport at mount gets hidden and
 * animates on entry — using the full viewport height as the cutoff meant
 * sections right at the fold never animated at all, which read as the
 * animations simply not firing.
 *
 * The server HTML carries no hiding styles, so the page reads without JS.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  variant = 'rise',
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useIso(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Only skip elements comfortably inside the first screen.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.55) return;

    setState('hidden');

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hiddenStyle: Record<Variant, React.CSSProperties> = {
    rise: { opacity: 0, transform: 'translateY(34px)' },
    mask: { opacity: 0, transform: 'translateY(56px)', filter: 'blur(6px)' },
    scale: { opacity: 0, transform: 'scale(0.94) translateY(24px)' },
  };

  const duration = variant === 'mask' ? 900 : 700;
  const ease = 'cubic-bezier(0.16,1,0.3,1)';

  const style =
    state === 'hidden'
      ? { ...hiddenStyle[variant], willChange: 'transform, opacity' }
      : state === 'shown'
        ? {
            opacity: 1,
            transform: 'none',
            filter: 'none',
            transition: `opacity ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms, filter ${duration}ms ${ease} ${delay}ms`,
          }
        : undefined;

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
