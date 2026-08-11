'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Mark } from './Mark';
import { ThemeToggle } from './ThemeToggle';
import CommandPalette from './CommandPalette';
import { navItems } from '../data/routes';
import { site } from '../lib/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rule bg-ground/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-ink"
            aria-label={`${site.mark} — home`}
          >
            <Mark size={22} className="text-accent" />
            <span className="font-display text-sm font-semibold tracking-[0.18em]">
              {site.mark}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                    active ? 'text-accent' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  {item.label}
                  {active && (
                    <svg
                      viewBox="0 0 32 6"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-1.5 text-accent"
                    >
                      <path
                        d="M0 3C5.33 -1 10.67 -1 16 3S26.67 7 32 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 rounded-md border border-rule px-2.5 py-1.5 text-ink-3 transition-colors duration-200 hover:border-rule-strong hover:text-ink"
              aria-label="Search the site"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <kbd className="hidden font-mono text-[0.65rem] tracking-wider sm:inline">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-8 w-8 place-items-center rounded-md text-ink-3 transition-colors duration-200 hover:bg-raise hover:text-ink md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            className="border-t border-rule bg-ground md:hidden"
            aria-label="Primary mobile"
          >
            <ul className="mx-auto max-w-shell px-5 py-2 sm:px-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block border-b border-rule py-3 font-mono text-xs uppercase tracking-[0.12em] last:border-0 ${
                      isActive(item.href) ? 'text-accent' : 'text-ink-2'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <AnimatePresence>
        {showSearch && <CommandPalette onClose={() => setShowSearch(false)} />}
      </AnimatePresence>
    </>
  );
}
