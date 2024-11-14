'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import CommandPalette from './CommandPalette';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-violet-500 dark:text-violet-400 hover:opacity-75 transition-colors duration-150">
              SINE
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`text-sm ${
                      pathname === item.href
                        ? 'text-violet-500 dark:text-violet-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400'
                    } transition-colors duration-150 relative py-2`}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500 dark:bg-violet-400"
                        layoutId="navbar-underline-desktop"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </div>
              ))}

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => setShowSearch(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150 flex items-center gap-2 text-sm"
                >
                  <span>Search</span>
                  <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-zinc-800 rounded-md transition-colors duration-150">⌘K</kbd>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setShowSearch(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 md:hidden"
            >
              <div className="px-4 py-2">
                {navItems.map((item) => (
                  <div key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className={`inline-block py-2 px-4 text-sm ${
                        pathname === item.href
                          ? 'text-violet-500 dark:text-violet-400'
                          : 'text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400'
                      } transition-colors duration-150 relative`}
                    >
                      <span className="relative pb-2 inline-block">
                        {item.label}
                        {pathname === item.href && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-500 dark:bg-violet-400"
                            layoutId="navbar-underline-mobile"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Command Palette */}
      <AnimatePresence>
        {showSearch && <CommandPalette onClose={() => setShowSearch(false)} />}
      </AnimatePresence>
    </>
  );
}
