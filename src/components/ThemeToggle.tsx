'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // The blocking script in <head> has already set the class; read it back.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('light', next === 'light');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-8 w-8 place-items-center rounded-md text-ink-3 transition-colors duration-200 hover:bg-raise hover:text-ink"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {/* Rendered before hydration too — a neutral glyph either way. */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M18.4 5.6l-1.1 1.1M6.7 17.3l-1.1 1.1" />
          </>
        ) : (
          <path d="M20.4 14.9A8.5 8.5 0 1 1 9.1 3.6a7 7 0 0 0 11.3 11.3Z" />
        )}
      </svg>
    </button>
  );
}
