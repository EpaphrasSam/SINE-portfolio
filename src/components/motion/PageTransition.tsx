'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Route transition. Five pages means five of these, which is where the
 * multi-page structure starts paying for itself.
 *
 * Content is never unmounted behind an opaque panel for long — the curtain
 * sweeps in and straight back out over ~600ms total.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // New route: start at the top, without Lenis smoothly scrolling there.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* The curtain — a wave-edged panel that sweeps up and away. */}
      <AnimatePresence>
        {/* The container is panel + wave tall, so animating it to -100%
            clears the wave edge too rather than parking it over the nav. */}
        <motion.div
          key={`curtain-${pathname}`}
          className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[112vh]"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="h-[100vh] w-full bg-accent" />
          {/* Wave-shaped trailing edge, so the wipe is not a flat rectangle. */}
          <svg
            className="block h-[12vh] w-full text-accent"
            viewBox="0 0 240 40"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 0C20 34 40 34 60 0S100 -34 120 0s40 34 60 0 40-34 60 0V0H0Z" />
          </svg>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
